import styled from 'styled-components';
import Flower from '../../assets/PlantLink.png';

export const StartWrapper = styled.div`
  color: #00E688;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FlowerContainer = styled.div`
  width: 100px;
  height: 100px;
  position: fixed;
  left: 40px;
  top: 61px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`;

export const FlowerIcon = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${Flower});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

`;

export const FlowerText = styled.div`
  width: 100px;
  height: 40px;
  color: #8A88FF;
  text-align: center;
  font-size: 20px;
  font-weight: 400;

  /* Media Query for smaller screens */
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const IntroContainer = styled.div`
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 900;
  line-height: 40px;

  /* Media Query for smaller screens */
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

export const EngTitle = styled.div`
  text-align: center;
  font-family: Pretendard;
  font-size: 96px;
  font-style: normal;
  font-weight: 900;

  /* Media Query for smaller screens */
  @media (max-width: 768px) {
    font-size: 72px;
  }
`;

export const KorTitle = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  font-family: Pretendard;
  font-size: 64px;
  font-style: normal;
  font-weight: 900;
  letter-spacing: 6.4px;

  /* Media Query for smaller screens */
  @media (max-width: 768px) {
    font-size: 48px;
  }
`;
