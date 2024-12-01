import styled from 'styled-components';
import ControlBoard from '../../assets/ControlBoard.svg';
import SwitchAuto from '../../assets/Switch_auto.svg';
import SwitchIot from '../../assets/Switch_iot.svg';
import ButtonOn from '../../assets/Btn_pressed.svg';
import ButtonOff from '../../assets/Btn_default.svg';
import LedSteps from '../../assets/Steps.png';

export const ControlContainer = styled.div`
  position: fixed;
  align-items: center;
  bottom: 0px;
  width: 1200px;
  height: 252px;
  background-image: url(${ControlBoard});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 1;

  /* Media Query for smaller screens */
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
    background-size: cover;
  }
`;

export const ModeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    align-items: flex-start;
    padding-left: 20px;
  }
`;

export const ModeTitle = styled.div`
  width: 151px;
  height: 40px;
  color: #1FAA67;
  text-align: center;
  font-size: 32px;
  font-weight: 900;
  margin-top: 45px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-top: 50px;
    margin-left: 100px;
  }
`;

export const ModeToggle = styled.div`
  position: absolute;
  top: 110px;
  left: 530px;
  width: 151px;
  height: 40px;
  color: #8A88FF;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  gap: 15px;

  @media (max-width: 768px) {
    top: 150px;
    left: 20px;
    font-size: 20px;
    gap: 10px;
  }
`;

export const Toggle = styled.div`
  width: 44px;
  height: 24px;
  background-image: url(${SwitchIot});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 768px) {
    width: 36px;
    height: 20px;
  }
`;

export const ModeExplain1 = styled.div`
  position: absolute;
  bottom: 60px;
  left: 530px;
  color: #FFFFFF;
  text-align: left;
  font-size: 20px;
  font-weight: 500;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ModeExplain2 = styled.div`
  position: absolute;
  bottom: 25px;
  left: 530px;
  color: #FFFFFF;
  text-align: left;
  font-size: 20px;
  font-weight: 500;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Buttons1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: absolute;
  right: 140px;
  top: 48px;

  @media (max-width: 768px) {
    right: 20px;
    top: 150px;
    gap: 10px;
  }
`;

export const Buttons2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: absolute;
  right: 140px;
  top: 93px;

  @media (max-width: 768px) {
    right: 20px;
    top: 100px;
    gap: 10px;
  }
`;

export const ButtonName = styled.div`
  color: #000000;
  font-size: 24px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const Button = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${ButtonOff});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

export const LedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LedTitle = styled.div`
  color: #000000;
  font-size: 24px;
  font-weight: 700;
  position: absolute;
  left: 100px;
  top: 48px;

  @media (max-width: 768px) {
    font-size: 15px;
    left: 20px;
    top: 90px;
  }
`;

export const LedSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  position: absolute;
  left: 20px;
  top: 114px;

  @media (max-width: 768px) {
    width: 300px;
    top: 100px;
    left: -70px;
  }
`;

export const LedSlider = styled.input`
  /* 유지 기존 스타일 */
`;

export const SliderLabel = styled.div`
  color: #1FAA67;
  text-align: center;
  font-size: 16px;
  font-weight: 700;

  @media (max-width: 768px) {
    display:none;
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 240px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    gap: 120px;
  }
`;

export const SliderSteps = styled.div`
  background-image: url(${LedSteps});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 300px;
  height: 50px;
  position: absolute;
  top: 22px;
  left: 101px;
  pointer-events: none;

  @media (max-width: 768px) {
    width: 250px;
    top: 20px;
    left: 50px;
  }
`;

export const ButtonMessage = styled.div`
  color: #93E2C2;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  position: absolute;
  right: 120px;
  bottom: 284px;

  @media (max-width: 768px) {
    font-size: 24px;
    bottom: 240px;
    right: 20px;
  }
`;
