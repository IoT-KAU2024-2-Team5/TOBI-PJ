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

#define OLED_MOSI       13
#define OLED_CLK        14
#define OLED_DC         26
#define OLED_CS         12
#define OLED_RESET      27

#define PIN_NEOPIXEL    21  // 네오픽셀 데이터 핀
#define NUMPIXELS       16  // 네오픽셀 LED 개수
#define CDS_PIN         23  // CDS 센서 핀
#define BUTTON_PIN      15  // 버튼 핀
#define SOIL_SENSOR_PIN 34  // 흙 센서 핀
#define MOTOR_A_PIN     18  // 모터 드라이브 A 핀 (ESP32 GPIO 18으로 설정)
#define MOTOR_B_PIN     19  // 모터 드라이브 B 핀 (ESP32 GPIO 19으로 설정)

#define HUMID_MAX       4095
#define HUMID_MIN       0
#define pumpInterval    10000
#define STEPS           5


Adafruit_SH1106 display(OLED_MOSI, OLED_CLK, OLED_DC, OLED_RESET, OLED_CS);
Adafruit_NeoPixel pixels(NUMPIXELS, PIN_NEOPIXEL, NEO_GRB + NEO_KHZ800);

unsigned long lastSoilPublish = 0;
const long soilSensorInterval = 20000; // 흙 센서 읽을 주기


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
bool pump = true;
int led = 0;

String modes = "auto";
String lastWateringTime = "";

const unsigned int motorCycle = 3000;
unsigned long lastPump = 0;
unsigned long pumpRunTime = 0;
unsigned long pumpStartTime = 0;
bool pumpFlag = false;
bool buttonFlag = false;

void setup() {
    Serial.begin(115200);
    oled_init();
    wifi_init();
    aws_init();
    led_init();
    motor_init();
    watertime_init();
    delay(2000);

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
        String deltaMode = state["mode"];
        
        if (deltaMode == "auto") { // auto 모드로 변경
            modes = "auto"; 
            Serial.println("Auto Mode!");
        }
        else if (deltaMode == "manual") {
            modes = "manual";
            Serial.println("Manual Mode!");
            if(state.hasOwnProperty("pump")) pump = state["pump"];
            if(state.hasOwnProperty("led")) led = state["led"];
            Serial.print("Pump Value : ");
            Serial.println(pump);
            Serial.print("Led Value : ");
            Serial.println(led);

        }
        else { // 모드가 변경되지 않는 경우
            Serial.println("No Mode Change");
            if(state.hasOwnProperty("pump")) pump = state["pump"];
            if(state.hasOwnProperty("led")) led = state["led"];
            Serial.print("Pump Value : ");
            Serial.println(pump);
            Serial.print("Led Value : ");
            Serial.println(led);
        }

        brightness_process(); // 메시지가 올 때 마다 led 값을 갱신할 수 있음
    }

    if (modes == "auto" && millis() - lastPump > pumpInterval && pumpFlag == false) { // 일정시간마다 펌프를 시작
        lastPump = millis(); // 람다로 보내기 위해 추가 퍼블리싱 필요
        pumpFlag = true; // 펌프 ON
        pumpStartTime = millis(); // 펌프 타이머 시작
        Serial.println("Auto Motor Start!");
        startMotor();
    }

    
    if (modes == "manual" && millis() - lastPump > pumpInterval && pumpFlag == true ) {
        lastPump = millis();
        // pumpFlag = pump; // critical section...?, 사용자가 보낸 메시지의 pump(true)에 따라 동작
        pumpStartTime = millis();
        Serial.println("Manual Motor Start!");
        startMotor();
    }


    if (pumpFlag == true && millis() - pumpStartTime > motorCycle) { // 일정 시간이 지나면 펌프 타이머로 모터 중단
        Serial.println("Motor Stop!");
        stopMotor();
        update_watering_time();
        oled_process(); // oled 처리 프로세스
        pumpFlag = false;
    }


    if (modes == "auto" && millis() - lastSoilPublish > soilSensorInterval) { // auto mode에서 타이머가 발생하는 경우
        soilhumid = normalization(analogRead(SOIL_SENSOR_PIN)); // 0 ~ 4095 -> 정규화 필요
        brightness = analogRead(CDS_PIN);  // CDS 센서 값 읽기
        Serial.print("Soil Humid : ");
        Serial.print(soilhumid);
        Serial.println("%");
        Serial.print("Brightness : ");
        Serial.println(brightness);

        // payload 생성
        sprintf(payload, "{ \"state\" : { \"reported\" : { \"id\": \"%s\", \"humidity\": %d, \"brightness\" : %d, \"pump\" : %d, \"led\" : %d } } }", 
        "산세베리아", soilhumid, brightness, pump, led);
        Serial.println(payload);
        
        if(SoilSensor.publish(pTOPIC_NAME, payload) == 0) {
            Serial.print("ESP32 Publish Message :");
        } else {
            Serial.println("ESP32 Publish failed");
        }
        lastSoilPublish = millis();
    }

    if (modes == "manual") { // 람다에서 쉐도우를 수정해서 발생하는 델타를 이용하여 작업을 수행
        // 밝기 작업
        pixels.setBrightness(led);  // 밝기를 br 값으로 설정
        pixels.show();  // 네오픽셀 업데이트

    }
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
    delay(1000);
}

void aws_init(void) {
    // AWS 연결하기
    if (SoilSensor.connect(HOST_ADDRESS, CLIENT_ID) == 0) {
        Serial.println("Connected to AWS");
        delay(1000);
        if(0==SoilSensor.subscribe(sTOPIC_NAME,mySubCallBackHandler)) {
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
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)){
      Serial.println("Failed to obtain time");
      return;
  }
  Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
  Serial.println("Year: " + String(timeinfo.tm_year+1900) + ", Month: " + String(timeinfo.tm_mon+1));
}


void update_watering_time(void) {
    struct tm timeinfo;
    if (getLocalTime(&timeinfo)) {
        char timeString[32];
        strftime(timeString, sizeof(timeString), "%d:%H:%M", &timeinfo); // HH:MM:SS
        lastWateringTime = String(timeString);
        Serial.print("Last Watering Time Recorded: ");
        Serial.println(lastWateringTime);
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
    display.print("brightness : ");
    display.println(brightness);
    display.print("Watering ");
    display.println(lastWateringTime);
    display.display();
}

void brightness_process(void) {
    int br_setup = constrain(led * 255 / STEPS, 0, 255);
    Serial.println(br_setup);
    Serial.println("Call Led Control");
    for (int i = 0; i < NUMPIXELS; i++) {
        pixels.setPixelColor(i, pixels.Color(br_setup, br_setup, br_setup));
    }
    pixels.show();  // 네오픽셀 업데이트
}


// 정규화 함수
int normalization(int value) {
    if (value <= HUMID_MIN) return 0;
    if (value > HUMID_MAX) return 100;
    return (value - HUMID_MIN) * 100 / (HUMID_MAX - HUMID_MIN);
}