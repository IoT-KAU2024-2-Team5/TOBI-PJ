import styled from 'styled-components';

export const PlantWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const PotContainer = styled.div`
  position: relative;
  top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;

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
`;
