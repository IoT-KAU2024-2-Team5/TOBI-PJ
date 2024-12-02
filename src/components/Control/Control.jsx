/* eslint-disable react/prop-types */
import * as S from './Control.style';
import { useState } from 'react';
import { usePlantContext } from '../../contexts/PlantContext.jsx';

function Control({ ledValue, setLedValue, data }) {
  const { id, mode, setMode, plantName } = usePlantContext();

  const [buttonState, setButtonState] = useState({ isWatering: false, isRefreshing: false });
  const [buttonMessage, setButtonMessage] = useState('');
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleSliderChange = (e) => {
    if (mode === 'auto') return;
    const newLedValue = parseInt(e.target.value, 10);
    setLedValue(newLedValue);
  };

  const fetchAllDatas = async () => {
    try {
      const response = await fetch('https://www.tobe-server.o-r.kr/api/datas', {
        method: 'GET', // GET 메서드
        headers: {
          'Content-Type': 'application/json', // 응답 데이터 타입 지정
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json(); // JSON 데이터를 파싱
      console.log('Fetched Data:', data); // 데이터 출력

      // 데이터를 localStorage에 저장
      data.forEach(item => {
        const key = `${item.id}_${item.mode}`; // 키 생성
        localStorage.setItem(key, JSON.stringify(item)); // 데이터 저장
      });

      return data; // 데이터 반환
    } catch (error) {
      console.error('Error fetching all datas:', error);
    }};

  const sendApiRequest = async (isWatering) => {
    const requestBody = {
        id,
        mode: "manual",
        humidity: data.humidity,
        humidityUpdatedAt: data.humidityUpdatedAt,
        led: ledValue,
        ledUpdatedAt: data.ledUpdatedAt,
        pump: isWatering, // isWatering 상태를 전송
        pumpUpdatedAt: data.pumpUpdatedAt,
        brightness: data.brightness,
        brightnessUpdatedAt: data.brightnessUpdatedAt,
        plantName,
        plantNameUpdatedAt: data.plantNameUpdatedAt,
    };

    try {
        const response = await fetch(`https://www.tobe-server.o-r.kr/api/datas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        console.log('Success:', result);
        setIsMessageVisible(true);

        setTimeout(() => setIsMessageVisible(false), 3000);
    } catch (error) {
        console.error('Failed to send API request:', error);
        setIsMessageVisible(true);

        setTimeout(() => setIsMessageVisible(false), 3000);
    }
};


  const handleButtonClick = async (type) => {
    if (mode === 'auto') return;

  if (type === 'refresh') {
    setButtonState((prev) => ({
      ...prev,
      isRefreshing: true,
    }));

    setButtonMessage('새로고침 중 ...');
    setIsMessageVisible(true);

    // 새로고침 동작 실행
    await fetchAllDatas();

    // 3초 후 버튼 활성화
    setTimeout(() => {
      setButtonState((prev) => ({
        ...prev,
        isRefreshing: false,
      }));
    }, 3000);

    setTimeout(() => {
      setIsMessageVisible(false);
    }, 3000);
  } else if (type === 'water') {
    // 기존 물주기 버튼 동작
    const newState = !buttonState.isWatering;
    setButtonState((prev) => ({
      ...prev,
      isWatering: newState,
    }));

    setButtonMessage(newState ? '물 주는 중 ...' : '물 주기 취소...');
    setIsMessageVisible(true);

    // API 요청 실행
    await sendApiRequest(newState);

    setTimeout(() => {
      setIsMessageVisible(false);
    }, 3000);
  }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'auto' ? 'manual' : 'auto'));
  };

  const handleLed = async () => {
    if (mode === 'auto') return;

    const requestBody = {
      id,
      mode: "manual",
      humidity: data.humidity,
      humidityUpdatedAt: data.humidityUpdatedAt,
      led: ledValue,
      ledUpdatedAt: new Date().toISOString(), // 현재 시간을 업데이트 시간으로 설정
      pump: data.pump,
      pumpUpdatedAt: data.pumpUpdatedAt,
      brightness: data.brightness,
      brightnessUpdatedAt: data.brightnessUpdatedAt,
      plantName,
      plantNameUpdatedAt: data.plantNameUpdatedAt,
    };

    try {
      const response = await fetch(`https://www.tobe-server.o-r.kr/api/datas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Success:', result);
      setButtonMessage('LED 값이 성공적으로 전송되었습니다!');
      setIsMessageVisible(true);
  
      setTimeout(() => setIsMessageVisible(false), 3000);
    } catch (error) {
      console.error('Failed to send LED value:', error);
      setButtonMessage('LED 값 전송 실패...');
      setIsMessageVisible(true);
  
      setTimeout(() => setIsMessageVisible(false), 3000);
    }
  };

  return (
    <S.ControlContainer>
      <S.ModeContainer>
        <S.ModeTitle>{mode === 'auto' ? 'Auto MODE' : 'IoT MODE'}</S.ModeTitle>
        <S.ModeToggle>
          모드 변경
          <S.Toggle isAutoMode={mode === 'auto'} onClick={toggleMode} />
        </S.ModeToggle>
        <S.ModeExplain1>
          <strong>IoT MODE:</strong> 원격으로 직접 내 식물 관리가 가능해요.
        </S.ModeExplain1>
        <S.ModeExplain2>
          <strong>AutoTobi MODE:</strong> 시스템이 자동으로 최적화된 식물 관리를 해줘요.
        </S.ModeExplain2>
      </S.ModeContainer>
      <S.ButtonsContainer>
        <S.Buttons1>
          <S.ButtonName isAutoMode={mode === 'auto'}>물주기</S.ButtonName>
          <S.Button
            isActive={buttonState.isWatering}
            onClick={() => handleButtonClick('water')}
            isDisabled={mode === 'auto'}
          />
        </S.Buttons1>
        <S.Buttons2>
          <S.ButtonName isAutoMode={mode === 'auto'}>상태 새로고침</S.ButtonName>
          <S.Button
            isActive={buttonState.isRefreshing}
            onClick={() => handleButtonClick('refresh')}
            isDisabled={mode === 'auto'}
          />
        </S.Buttons2>
      </S.ButtonsContainer>
      <S.LedContainer>
        <S.LedTitle onClick={handleLed} isAutoMode={mode === 'auto'}>LED 조명 조절</S.LedTitle>
        <S.LedSliderContainer>
          <S.LabelContainer>
            <S.SliderLabel>조명 끔</S.SliderLabel>
            <S.SliderLabel>조명 최대</S.SliderLabel>
          </S.LabelContainer>
          <S.LedSlider
            type="range"
            min="0"
            max="5"
            step="1"
            value={ledValue}
            onChange={handleSliderChange}
            disabled={mode === 'auto'}
          />
          <S.SliderSteps />
        </S.LedSliderContainer>
      </S.LedContainer>
      {buttonMessage && <S.ButtonMessage isVisible={isMessageVisible}>{buttonMessage}</S.ButtonMessage>}
    </S.ControlContainer>
  );
}

export default Control;
