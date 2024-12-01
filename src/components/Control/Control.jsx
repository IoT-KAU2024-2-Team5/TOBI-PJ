import * as S from './Control.style';
import { useState } from 'react';

function Control () {
  const [ledValue, setLedValue] = useState(0);

  const handleSliderChange = (e) => {
    setLedValue(parseInt(e.target.value, 10));
  };

  return (
    <S.ControlContainer>
      <S.ModeContainer>
        <S.ModeTitle>IoT MODE</S.ModeTitle>
        <S.ModeToggle>
          모드 변경
          <S.Toggle />
        </S.ModeToggle>
        <S.ModeExplain1><strong>IoT MODE:</strong> 원격으로 직접 내 식물 관리가 가능해요.</S.ModeExplain1>
        <S.ModeExplain2><strong>AutoTobi MODE:</strong> 시스템이 자동으로 최적화된 식물 관리를 해줘요.</S.ModeExplain2>
      </S.ModeContainer>
      <S.ButtonsContainer>
        <S.Buttons1>
          <S.ButtonName>물주기</S.ButtonName>
          <S.Button />
        </S.Buttons1>
        <S.Buttons2>
          <S.ButtonName>상태 새로고침</S.ButtonName>
          <S.Button />
        </S.Buttons2>
      </S.ButtonsContainer>
      <S.LedContainer>
        <S.LedTitle>LED 조명 조절</S.LedTitle>
        <S.LedSliderContainer>
          <S.LabelContainer>
            <S.SliderLabel>조명 끔</S.SliderLabel>
            <S.SliderLabel>조명 최대</S.SliderLabel>
          </S.LabelContainer>
          <S.LedSlider
            type="range"
            min="0"
            max="100"
            step="10"
            value={ledValue}
            onChange={handleSliderChange}
          />
          <S.SliderSteps />
        </S.LedSliderContainer>
      </S.LedContainer>
      <S.ButtonMessage>물 주는 중 ...</S.ButtonMessage>
    </S.ControlContainer>
  )
}

export default Control;