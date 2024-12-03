#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <AWS_IOT.h>
#include <WiFi.h>
#include <Arduino_JSON.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH1106.h>
#include <Adafruit_NeoPixel.h>
#include "time.h"
#include <EEPROM.h>

#define OLED_MOSI       13
#define OLED_CLK        14
#define OLED_DC         26
#define OLED_CS         12
#define OLED_RESET      27

#define PIN_NEOPIXEL    21  // 네오픽셀 데이터 핀
#define NUMPIXELS       12  // 네오픽셀 LED 개수
#define CDS_PIN         35  // CDS 센서 핀
#define BUTTON_PIN      15  // 버튼 핀
#define SOIL_SENSOR_PIN 34  // 흙 센서 핀
#define MOTOR_A_PIN     18  // 모터 드라이브 A 핀 (ESP32 GPIO 18으로 설정)
#define MOTOR_B_PIN     19  // 모터 드라이브 B 핀 (ESP32 GPIO 19으로 설정)

#define HUMID_MAX       4095
#define HUMID_MIN       0
#define pumpInterval    3000
#define STEPS           10


Adafruit_SH1106 display(OLED_MOSI, OLED_CLK, OLED_DC, OLED_RESET, OLED_CS);
Adafruit_NeoPixel pixels(NUMPIXELS, PIN_NEOPIXEL, NEO_GRB + NEO_KHZ800);

unsigned long lastSoilPublish = 0;
const long soilSensorInterval = 14000; // 흙 센서 읽을 주기


AWS_IOT SoilSensor; // AWS 세팅
char HOST_ADDRESS[] = "a3u6f7kxcvhhvh-ats.iot.ap-northeast-2.amazonaws.com";  // 구독할 주제
char sTOPIC_NAME[] = "$aws/things/Iot/shadow/name/iot_shadow/update/delta";
char pTOPIC_NAME[] = "$aws/things/Iot/shadow/name/iot_shadow/update";  // 퍼블리싱 주제 

char CLIENT_ID[]= "Goomin";
int status = WL_IDLE_STATUS;
int msgCount=0,msgReceived = 0;
char payload[512];
char rcvdPayload[512];

const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 3600*9; // 3600
const int daylightOffset_sec = 0; // 3600


// wifi 세팅
const char* ssid = "G";
const char* password = "88880000";

int soilhumid = 0;
int humidity = 0;
int brightness = 0;
int pump = 0;
int led = 0;

String modes = "auto";
String lastWateringTime = "";

const unsigned int motorCycle = 2000;
unsigned long lastPump = 0;
unsigned long pumpRunTime = 0;
unsigned long pumpStartTime = 0;
bool pumpFlag = false;
bool buttonFlag = false;

void setup() {
    Serial.begin(115200);
    wifi_init();
    aws_init();
    led_init();
    motor_init();
    watertime_init();
    oled_init();
    delay(100);

    Serial.println("ESP32 Setting Clear!");
}


void loop() {
    // 구독한 topic에서 아날로그 값을 읽고 보여주기
    if(msgReceived == 1) {
        Serial.print("ESP32 Get Delta, ");
        msgReceived = 0;
        JSONVar shadowMsg = JSON.parse(rcvdPayload);
        Serial.println(rcvdPayload);
        JSONVar state = shadowMsg["state"];
        pump = state["pump"];
        led = state["led"];
        brightness_process(); // 메시지가 올 때 마다 led 값을 갱신할 수 있음
        Serial.println("======");
        Serial.println(pump);
        Serial.println(led);
    }

    if (pumpFlag == false && pump == true) {
        lastPump = millis();
        if (pump == true && pumpFlag == false) {
            pumpFlag = true; // 펌프 ON
            pumpStartTime = millis(); // 펌프 타이머 시작
            Serial.println("Auto Motor Start!");
            startMotor();
        } else {
            Serial.println("Auto Mode: Pump is off, motor not started.");
        }
    }


    if (pumpFlag == true && millis() - pumpStartTime > motorCycle) { // 일정 시간이 지나면 펌프 타이머로 모터 중단
        Serial.println("Motor Stop!");
        stopMotor();
        update_watering_time();
        pumpFlag = false;
        pump =false;
    }

    // 펌프가 비활성화 상태일 때 모터 강제 중단 (안전장치)
    if (pump == false && pumpFlag == true) {
        Serial.println("Pump deactivated. Stopping motor.");
        stopMotor();               // 모터 중단
        pumpFlag = false;          // 플래그 초기화
    }


    if (millis() - lastSoilPublish > soilSensorInterval) { // auto mode에서 타이머가 발생하는 경우
        soilhumid = normalization(analogRead(SOIL_SENSOR_PIN));
        Serial.print("SSSS : ");
        Serial.println(analogRead(SOIL_SENSOR_PIN));
        Serial.println(normalization(analogRead(SOIL_SENSOR_PIN)));
        brightness = analogRead(CDS_PIN);  // CDS 센서 값 읽기
        Serial.print("Soil Humid : ");
        Serial.print(soilhumid);
        Serial.println("%");
        Serial.print("Brightness : ");
        Serial.println(brightness);

        // payload 생성
        sprintf(payload, "{ \"state\" : { \"reported\" : { \"humidity\": %d, \"brightness\" : %d } } }", 
        soilhumid, brightness, pump, led);
        Serial.println(payload);
        
        if(SoilSensor.publish(pTOPIC_NAME, payload) == 0) {
            Serial.println("ESP32 Publish Message");
        } else {
            Serial.println("ESP32 Publish failed");
        }
        lastSoilPublish = millis();
    }
    oled_process(); // oled 처리 프로세스
}


// 콜백 함수
void mySubCallBackHandler (char *topicName, int payloadLen, char *payLoad)
{
    strncpy(rcvdPayload,payLoad,payloadLen);
    rcvdPayload[payloadLen] = 0;
    msgReceived = 1;
}


// 모터를 켜는 함수
void startMotor() {
    digitalWrite(MOTOR_A_PIN, HIGH);           // 모터 정방향 회전
    digitalWrite(MOTOR_B_PIN, LOW);
}


// 모터를 끄는 함수
void stopMotor() {
    digitalWrite(MOTOR_A_PIN, LOW);            // 모터 정지
    digitalWrite(MOTOR_B_PIN, LOW);
    delay(10);
}

// Led 초기화
void led_init(void) {
    pixels.begin();
    for (int i = 0; i < NUMPIXELS; i++) {
        pixels.setPixelColor(i, pixels.Color(255, 255, 255));
    }
    pixels.show();
    delay(10);
}


void motor_init(void) {
    pinMode(MOTOR_A_PIN, OUTPUT);
    pinMode(MOTOR_B_PIN, OUTPUT);
    delay(10);
    digitalWrite(MOTOR_A_PIN, LOW);           
    digitalWrite(MOTOR_B_PIN, LOW);
}


void oled_init(void) {
    // OLED 초기화
    display.begin(SH1106_SWITCHCAPVCC);
    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(WHITE);
    display.setCursor(0, 0);
    display.println("Initializing...");
    display.display();
    delay(10);

    soilhumid = normalization(analogRead(SOIL_SENSOR_PIN));
    oled_process();
}

void wifi_init(void) {
    Serial.print("WIFI status = ");
    Serial.println(WiFi.getMode());
    WiFi.disconnect(true);
    delay(1000);
    WiFi.mode(WIFI_STA);
    delay(1000);

    Serial.print("WIFI status = ");
    Serial.println(WiFi.getMode()); 
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    
    Serial.println("Connected to WiFi");
    delay(500);
}

void aws_init(void) {
    // AWS 연결하기
    if (SoilSensor.connect(HOST_ADDRESS, CLIENT_ID) == 0) {
        Serial.println("Connected to AWS");
        delay(1000);
        if(0 == SoilSensor.subscribe(sTOPIC_NAME,mySubCallBackHandler)) {
            Serial.println("Subscribe Successfull");    
        }
        else {
            Serial.println("Subscribe Failed, Check the Thing Name and Certificates");
            while(1);
        }
    }
    else {
        Serial.println("AWS connection failed, Check the HOST Address");
        while(1);
    }
}


void watertime_init(void) {
    configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
    struct tm timeinfo; // config 단계에서 시간을 확인
    if (!getLocalTime(&timeinfo)) {
        lastWateringTime = "00:00:00";
        Serial.println("Failed to obtain time");
        return;
    }
    Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
}


void update_watering_time(void) {
    struct tm timeinfo;
    if (getLocalTime(&timeinfo)) {
        char timeString[32];
        strftime(timeString, sizeof(timeString), "%d:%H:%M", &timeinfo); // DD:HH:MM
        lastWateringTime = String(timeString);
        Serial.print("Last Watering Time Recorded: ");
        Serial.println(lastWateringTime);
        Serial.println("=================");
    } else {
        Serial.println("Failed to get time for Last Watering.");
    }
}

void oled_process(void) {
    // OLED에 Soil Humid 표시
    display.clearDisplay();
    display.setCursor(0, 0);
    display.setTextSize(1);
    display.setTextColor(WHITE);
    display.print("Soil Humid : ");
    display.print(soilhumid);
    display.println("%");
    display.print("Led Level  : ");
    display.println(led);
    display.print("Watering ");
    display.println(lastWateringTime);
    display.display();
}


void brightness_process(void) {
    //int br_setup = constrain(led * 255 / STEPS, 0, 255);
    //Serial.println(br_setup);
    Serial.println("Call Led Control");
     for (int i = 0; i < NUMPIXELS; i++) {
        if (i < led) {
            pixels.setPixelColor(i, pixels.Color(255, 255, 255));
        } else {
            pixels.setPixelColor(i, pixels.Color(0, 0, 0));  // 나머지 LED는 끄기
        }
    }
    pixels.show();  // 네오픽셀 업데이트
    delay(50);
}


// 정규화 함수
int normalization(int value) {
    if (value <= HUMID_MIN) return 0;
    if (value > HUMID_MAX) return 100;
    return (value - HUMID_MIN) * 100 / (HUMID_MAX - HUMID_MIN);
}