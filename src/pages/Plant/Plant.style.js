import styled, { keyframes, css } from 'styled-components';
import bubble from '../../assets/messageBg.png';
import Death from '../../assets/Deathicon.png';
import Tip from '../../assets/Tipicon.png';

export const IconsContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 53px;
  display: flex;
  flex-direction: row;
  gap: 45px;
  align-items: center;
  justify-content: center;
`;

export const DeathContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: #FFFFFF;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  &:hover {
    text-decoration: underline;
  }
`;

export const DeathIcon = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${Death});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const TipContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: #FFFFFF;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  &:hover {
    text-decoration: underline;
  }
`;

export const TipIcon = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${Tip});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const TipCard = styled.div`
  position: absolute;
  top: 96px;
  right: 36px;
  width: 450px;
  height: 350px;
  background-image: ${(props) => `url(${props.tipImage})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 5;
`;

export const PlantWrapper = styled.div`
  font-family: Pretendard;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const PotContainer = styled.div`
  position: relative;
  top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* 반응형 레이아웃 */
  @media (max-width: 768px) {
    top: 300px;
  }

  @media (max-width: 480px) {
    top: 250px;
  }
`;

export const PotInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    gap: 8px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    gap: 5px;
    margin-bottom: 10px;
  }
`;

export const Username = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 48px;
  font-weight: 700;
  line-height: 40px;

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const DateCount = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 24px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const PlantImage = styled.img`
  width: 200px;
  height: auto;
  justify-content: center;

  @media (max-width: 768px) {
    width: 150px;
  }

  @media (max-width: 480px) {
    width: 100px;
  }
`;

export const StatusContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    margin-top: 15px;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;

export const ControlContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;

  /* 반응형 레이아웃 */
  @media (max-width: 768px) {
    height: auto;
  }

  @media (max-width: 480px) {
    height: auto;
  }

  cursor: pointer;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 150px;
  right: 90px;
  gap: 20px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

export const MessageBubble = styled.div`
  background-image: url(${bubble});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 375px;
  height: 85px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1A1A1A;
  text-align: center;
  font-size: 32px;
  font-weight: 700;

  ${(props) =>
    props.isVisible
      ? css`
          animation: ${fadeIn} 0.5s forwards, ${fadeOut} 0.5s 4.5s forwards;
        `
      : css`
          display: none;
        `}
`;

export const Message = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
