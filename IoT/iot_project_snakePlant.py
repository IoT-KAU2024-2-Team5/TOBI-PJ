import json
import boto3
from datetime import datetime
from decimal import Decimal

def decimal_to_int(obj):
    if isinstance(obj, list):
        return [decimal_to_int(i) for i in obj]
    elif isinstance(obj, dict):
        return {k: decimal_to_int(v) for k, v in obj.items()}
    elif isinstance(obj, Decimal):
        return int(obj)
    return obj

def update_led_and_pump_in_state_table(plant_id, des_led, des_pump):
    """
    LED와 Pump 값을 계산하여 상태 테이블에 저장
    """
    current_time = datetime.utcnow().isoformat()

    # UpdateExpression 생성
    update_expression = "SET #led = :led, #pump = :pump, #ledUpdatedAt = :ledUpdatedAt, #pumpUpdatedAt = :pumpUpdatedAt"
    expression_attribute_names = {
        "#led": "led",
        "#pump": "pump",
        "#ledUpdatedAt": "ledUpdatedAt",
        "#pumpUpdatedAt": "pumpUpdatedAt",
    }
    expression_attribute_values = {
        ":led": des_led,
        ":pump": des_pump,
        ":ledUpdatedAt": current_time,
        ":pumpUpdatedAt": current_time,
    }

    # 상태 테이블 업데이트
    response = state_table.update_item(
        Key={"id": "산세베리아"},
        UpdateExpression=update_expression,
        ExpressionAttributeNames=expression_attribute_names,
        ExpressionAttributeValues=expression_attribute_values,
    )
    print(f"State table updated successfully for id: {"산세베리아"}, LED: {des_led}, Pump: {des_pump}")
    return response

# DynamoDB 리소스 생성
dynamodb = boto3.resource('dynamodb')
iot_client = boto3.client('iot-data')  # IoT Data 클라이언트 생성
sns_client = boto3.client('sns')  # SNS 클라이언트 생성

# 상태 테이블
state_table_name = "iot_project_DB"
state_table = dynamodb.Table(state_table_name)
print(state_table)

# 로그 테이블 (mode는 제외)
log_tables = {
    "brightness": dynamodb.Table("iot_project_brightness_DB"),
    "humidity": dynamodb.Table("iot_project_humidity_DB"),
    "led": dynamodb.Table("iot_project_led_DB"),
    "pump": dynamodb.Table("iot_project_pump_DB"),
}

# SNS 주제 ARN
SNS_TOPIC_ARN = "arn:aws:sns:ap-northeast-2:205930636344:emailToUser"

def send_sns_alert(message, subject):
    """
    SNS 알림을 보내는 함수
    """
    try:
        response = sns_client.publish(
            TopicArn=SNS_TOPIC_ARN,
            Message=message,
            Subject=subject
        )
        print(f"SNS 알림 발송 성공: {response}")
    except Exception as e:
        print(f"SNS 알림 발송 실패: {e}")


def hdl_led(id, brightness):
    # LED 제어 로직
    print("in hdl_led: ", id, brightness)
    if id == "산세베리아":
        if brightness < 409:
            return 10
        elif brightness < 819:
            return 9
        elif brightness < 1228:
            return 8
        elif brightness < 1638:
            return 7
        elif brightness < 2047:
            return 6
        elif brightness < 2457:
            return 5
        elif brightness < 2866:
            return 4
        elif brightness < 3276:
            return 3
        elif brightness < 3685:
            return 2
        elif brightness <= 4095:
            return 1
        else:
            return 0
    elif id == "스킨답서스":
        if brightness < 372:
            return 10
        elif brightness < 745:
            return 9
        elif brightness < 1118:
            return 8
        elif brightness < 1491:
            return 7
        elif brightness < 1863:
            return 6
        elif brightness < 2236:
            return 5
        elif brightness < 2609:
            return 4
        elif brightness < 2982:
            return 3
        elif brightness < 3354:
            return 2
        elif brightness < 3727:
            return 1
        else:
            return 0
    elif id == "테이블야자":
        if brightness < 409:
            return 10
        elif brightness < 819:
            return 9
        elif brightness < 1228:
            return 8
        elif brightness < 1638:
            return 7
        elif brightness < 2047:
            return 6
        elif brightness < 2457:
            return 5
        elif brightness < 2866:
            return 4
        elif brightness < 3276:
            return 3
        elif brightness < 3685:
            return 2
        elif brightness <= 4095:
            return 1
        else:
            return 0
    else:
        print("Unable to recognize Plant_id")
        return None

def hdl_pump(id, humidity):
    # 펌프 제어 로직 (식물 종류와 습도에 따라 다름)
    print("in hdl_pump: ", id, humidity)
    if id == "테이블야자":
        if humidity < 30:
            return 1
        else:
            return 0
    elif id == "스킨답서스":
        if humidity < 20:
            return 1
        else:
            return 0
    elif id == "산세베리아":
        if humidity < 10:
            return 1
        else:
            return 0
    else:
        print("Unable to recognize Plant_id")
    return False


def lambda_handler(event, context):
    try:
        # IoT Core 이벤트에서 reported 상태 가져오기
        state = event.get('state', {})
        reported = state.get('reported', {})
        if not reported:
            raise ValueError("No 'reported' state found in the event.")
        print("Extracted reported state:", reported)

        """
        # 필수 필드 확인
        plant_id = reported.get('id')
        if plant_id is None:
            raise ValueError("The 'id' field is required in the 'reported' state.")
        print(f"Processing update for id: {plant_id}")
        """

        # 현재 시간 추가
        current_time = datetime.utcnow().isoformat()

        # 상태 테이블에서 이전 값 가져오기
        db_response = state_table.get_item(Key={"id": "산세베리아"})
        previous_state = db_response.get('Item', {})
        print(f"Previous state from DB: {previous_state}")

        ##previous_state = > led, pump

        # 상태 테이블 업데이트를 위한 UpdateExpression 생성
        update_expression = "SET"
        expression_attribute_values = {}
        expression_attribute_names = {}


        for key, value in reported.items():

            # **타입 변환 로직 추가**
            """
            if key == "pump":
                # pump는 Boolean으로 변환 (숫자 0/1 -> False/True)
                value = bool(value) if isinstance(value, int) else value
            elif key == "led":
                # led는 정수형으로 변환
                value = int(value) if not isinstance(value, int) else value
            """

            if key in ["humidity", "brightness"]:
                # humidity와 brightness는 정수형으로 변환
                value = int(value) if not isinstance(value, int) else value
                    

            """
            # LED 밝기가 변경되었을 경우 SNS 알림
            if key == "led" and value != previous_state.get("led"):
                send_sns_alert(
                    message=f"LED를 {value} 단계로 설정했습니다!",
                    subject="LED 밝기 변경 알림"
                )

            # 펌프 상태가 변경되었을 경우 SNS 알림
            if key == "pump" and value != previous_state.get("pump"):
                pump_message = (
                    "식물에 물을 주기 시작합니다!" if value else "식물에 물 주기를 멈춥니다!"
                )
                send_sns_alert(
                    message=pump_message,
                    subject="펌프 상태 변경 알림"
                )
            """
            update_expression += f" #{key} = :{key},"
            expression_attribute_names[f"#{key}"] = key
            expression_attribute_values[f":{key}"] = value

            # UpdatedAt 필드 추가
            if "UpdatedAt" not in key:
                update_expression += f" #{key}UpdatedAt = :{key}UpdatedAt,"
                expression_attribute_names[f"#{key}UpdatedAt"] = f"{key}UpdatedAt"
                expression_attribute_values[f":{key}UpdatedAt"] = current_time

            # 로그 테이블에 데이터 추가 (mode는 제외)
            if key in log_tables:
                log_table = log_tables[key]
                log_item = {
                    "id": "산세베리아",
                    "updatedAt": current_time,
                    "value": value
                }
                try:
                    print(f"Inserting log into {log_table.table_name}: {log_item}")
                    log_table.put_item(Item=log_item)
                except Exception as e:
                    print(f"Failed to log {key} in {log_table.table_name}: {e}")

        # UpdateExpression 마지막 쉼표 제거
        update_expression = update_expression.rstrip(",")
        print("Final UpdateExpression:", update_expression)
        print("ExpressionAttributeNames:", expression_attribute_names)
        print("ExpressionAttributeValues:", expression_attribute_values)

        # 상태 테이블 업데이트 실행
        response = state_table.update_item(
            Key={"id": "산세베리아"},
            UpdateExpression=update_expression,
            ExpressionAttributeNames=expression_attribute_names,
            ExpressionAttributeValues=expression_attribute_values
        )
        print(f"State table {state_table_name} updated successfully for id: 산세베리아")


        # ** IoT Shadow 업데이트 **
        try:
            # DynamoDB에서 최신 데이터 가져오기
            db_response = state_table.get_item(Key={"id": "산세베리아"})
            latest_item = db_response.get('Item', {})
            mode = latest_item.get('mode', 'auto')
            print(f"Latest item from DB: {latest_item}")

            desired_state = {}

            if mode == 'auto':
                # hdl_led와 hdl_pump를 사용하여 desired 상태 계산
                brightness = latest_item.get('brightness', 0)
                humidity = latest_item.get('humidity', 0)

                desired_led = hdl_led('산세베리아', brightness)
                desired_pump = hdl_pump('산세베리아', humidity)

                update_led_and_pump_in_state_table("산세베리아", desired_led, desired_pump)

                desired_state = {
                    "state": {
                        "desired": {
                            "led": desired_led,
                            "pump": desired_pump
                        }
                    }
                }

                log_table = log_tables["led"]
                log_item = {
                    "id": "산세베리아",
                    "updatedAt": current_time,
                    "value": desired_led
                }

                try:
                    print(f"Inserting log into {log_table.table_name}: {log_item}")
                    log_table.put_item(Item=log_item)
                except Exception as e:
                    print(f"Failed to log {key} in {log_table.table_name}: {e}")

                
                log_table = log_tables["pump"]
                log_item = {
                    "id": "산세베리아",
                    "updatedAt": current_time,
                    "value": desired_pump
                }

                try:
                    print(f"Inserting log into {log_table.table_name}: {log_item}")
                    log_table.put_item(Item=log_item)
                except Exception as e:
                    print(f"Failed to log {key} in {log_table.table_name}: {e}")


            elif mode == "manual":
                manual_led = latest_item.get('led', 0)
                manual_pump = latest_item.get('pump', 0)

                print("테스트")
                print(manual_led, manual_pump) 
                desired_state = {
                    "state": {
                        "desired": {
                            "led": decimal_to_int(manual_led),
                            "pump": decimal_to_int(manual_pump)
                        }
                    }
                }

                log_table = log_tables["led"]
                log_item = {
                    "id": "산세베리아",
                    "updatedAt": current_time,
                    "value": decimal_to_int(manual_led)
                }

                try:
                    print(f"Inserting log into {log_table.table_name}: {log_item}")
                    log_table.put_item(Item=log_item)
                except Exception as e:
                    print(f"Failed to log {key} in {log_table.table_name}: {e}")

                
                log_table = log_tables["pump"]
                log_item = {
                    "id": "산세베리아",
                    "updatedAt": current_time,
                    "value": decimal_to_int(manual_pump)
                }

                try:
                    print(f"Inserting log into {log_table.table_name}: {log_item}")
                    log_table.put_item(Item=log_item)
                except Exception as e:
                    print(f"Failed to log {key} in {log_table.table_name}: {e}")



            # IoT Shadow 업데이트 호출
            iot_client.update_thing_shadow(
                thingName="Iot",  # 사물 이름
                shadowName="iot_shadow",  # Shadow 이름
                payload=json.dumps(desired_state)  # Shadow 업데이트 페이로드
            )
            print("Shadow update payload:", json.dumps(desired_state))
            print("IoT Shadow updated successfully.")

        except Exception as e:
            print(f"Error updating IoT Shadow: {e}")

        # 성공 응답 반환
        return {
            "statusCode": 200,
            "body": json.dumps({"message": "State table and Shadow updated successfully with SNS alerts."})
        }

    except Exception as e:
        print(f"Error occurred: {e}")
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Failed to update tables or Shadow", "error": str(e)})
        }
