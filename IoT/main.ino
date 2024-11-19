#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#define SEALEVEPRESSURE_HPA (1013.25)
#include <AWS_IOT.h>
#include <WiFi.h>
#include <Arduino_JSON.h> // refer JSONObject example for more information!!!

const int soilSensorPin = 34;

unsigned long lastSoilPublish = 0;
const long soilSensorInterval = 10000; // 흙 센서 읽을 주기

// 실제 코드에서는 30초에 한 번 씩 센서로 부터 습도 값을 읽어오면 됨.
// 펌프 작동 시간 (3초) 테스트용
const int pumpRunTime = 3000;


// AWS 세팅
AWS_IOT SoilSensor;

char HOST_ADDRESS[] = "a3u6f7kxcvhhvh-ats.iot.ap-northeast-2.amazonaws.com";
// 구독할 주제
char sTOPIC_NAME[] = "$aws/things/Iot/shadow/update/delta";
// 퍼블리싱 주제
char pTOPIC_NAME[] = "$aws/things/Iot/shadow/update/accepted";



char CLIENT_ID[]= "Goomin";
int status = WL_IDLE_STATUS;
int msgCount=0,msgReceived = 0;
char payload[512];
char rcvdPayload[512];

// wifi 세팅
const char* ssid = "G";
const char* password = "88880000";

const int buttonPin = 15;
const int A_1A = 18;           // 모터 드라이브 A_1A 핀 (ESP32 GPIO 18으로 설정)
const int A_2A = 19;           // 모터 드라이브 A_2A 핀 (ESP32 GPIO 19으로 설정)


void mySubCallBackHandler (char *topicName, int payloadLen, char *payLoad);


void setup() {
    Serial.begin(115200);
    delay(1000);


    // 와이파이 설정하기
    Serial.print("WIFI status = ");
    Serial.println(WiFi.getMode());
    WiFi.disconnect(true);
    delay(1000);
    WiFi.mode(WIFI_STA);
    delay(1000);

    Serial.print("WIFI status = ");
    Serial.println(WiFi.getMode()); //++choi
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    
    Serial.println("Connected to WiFi");

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


    delay(2000);
}

void loop() {
    // 구독한 topic에서 아날로그 값을 읽고 보여주기
    if(msgReceived == 1) {
        msgReceived = 0;
        Serial.print("Received Message:");
        Serial.println(rcvdPayload);
        
        // Parse JSON
        JSONVar myObj = JSON.parse(rcvdPayload);
        JSONVar state = myObj["state"];
        String humid = (const char*) state["test"];
        Serial.print("Now Soil Humid : ");
        Serial.println(humid);
        // 내부 로직 필요
    }


    if (millis() - lastSoilPublish > soilSensorInterval) { // 타이머 발생 조건
        lastSoilPublish = millis();

        int val = analogRead(soilSensorPin);
        Serial.print("Soil Sensor : ");
        Serial.println(val);

        // payload 생성
        sprintf(payload, "{\"state\" : { \"reported\" : { \"humid\": %d } } }", val);
        
        if(SoilSensor.publish(pTOPIC_NAME, payload) == 0) {
            Serial.print("Soil Sensor Publish Message :");
            Serial.println(payload);
            motorControl(val);
        } else {
            Serial.println("Soil Sensor Publish failed");
        }
    }
}


// 콜백 함수
void mySubCallBackHandler (char *topicName, int payloadLen, char *payLoad)
{
    strncpy(rcvdPayload,payLoad,payloadLen);
    rcvdPayload[payloadLen] = 0;
    msgReceived = 1;
}


// 버튼을 눌러 수동으로 모터를 작동시키는 함수
void checkManualControl() {
    if (digitalRead(buttonPin) == HIGH) {  // 버튼이 눌렸을 때
        Serial.println("Button pressed. Manual motor ON for 30 seconds.");
        startMotor();
        delay(pumpRunTime);            
        stopMotor();
    }
}


// 모터 제어 함수: 습도가 30 이상일 때 30초간 모터 작동
void motorControl(int humidity) {
    if (humidity >= 30) {
        // 습도가 높으면 자동으로 모터 작동
        startMotor();
        delay(pumpRunTime); 
        stopMotor();
    } else {
        // 습도와 무관하게 버튼을 사용한 급수
        // 수동 작동 체크
        checkManualControl();
    }
}



// 모터를 켜는 함수
void startMotor() {
    digitalWrite(A_1A, HIGH);           // 모터 정방향 회전
    digitalWrite(A_2A, LOW);
}


// 모터를 끄는 함수
void stopMotor() {
    Serial.println("Motor OFF.");
    digitalWrite(A_1A, LOW);            // 모터 정지
    digitalWrite(A_2A, LOW);
}

