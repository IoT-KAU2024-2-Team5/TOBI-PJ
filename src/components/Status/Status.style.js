import styled from 'styled-components';
import StatBoard from '../../assets/StatBoard.svg';

export const StatusContainer = styled.div`
  position: fixed;
  align-items: center;
  top: 35px;
  left: 80px;
  width: 325px;
  height: 464px;
  background-image: url(${StatBoard});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 0;

  /* 반응형 */
  @media (max-width: 768px) {
    top: 20px;
    left: 80px;
    width: 320px;
    height: 350px;
    background-size: 350px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    top: 10px;
    left: 50px;
    width: 280px;
    height: 230px;
    background-size: 280px;
    border-radius: 20px;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 21px;
  margin-top: 40px;

  /* 반응형 */
  @media (max-width: 768px) {
    gap: 15px;
    margin-top: 30px;
  }

  @media (max-width: 480px) {
    gap: 10px;
    margin-top: 20px;
  }
`;

export const Container2 = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;

  /* 반응형 */
  @media (max-width: 768px) {
    margin-top: 30px;
  }

  @media (max-width: 480px) {
    margin-top: 20px;
  }
`;

export const Title = styled.div`
  color: #000000;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 반응형 */
  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const PlantName = styled.div`
  color: #1FAA67;
  font-size: 32px;
  font-weight: 700;
  margin-top: 10px;

  /* 반응형 */
  @media (max-width: 768px) {
    font-size: 23px;
  }

  @media (max-width: 480px) {
    font-size: 19px;
  }
`;

export const Status = styled.div`
  display: flex;
  flex-direction: row;
  width: 248px;
  height: 48px;
  align-items: center;
  justify-content: center;

  /* 반응형 */
  @media (max-width: 768px) {
    width: 200px;
    height: 30px;
  }

  @media (max-width: 480px) {
    width: 180px;
    height: 26px;
  }
`;

export const StatusIcon = styled.div`
  width: 48px; 
  height: 48px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  position: absolute;
  left: 10%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 반응형 */
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 480px) {
    width: 26px;
    height: 26px;
  }
`;

export const StatusTitle = styled.div`
  height: 48px;
  color: #000000;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  position: relative;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 반응형 */
  @media (max-width: 768px) {
    font-size: 15px;
    height: 20px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    height: 16px;
  }
`;

export const StatusFigure = styled.div`
  height: 48px;
  color: #000000;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  position: relative;
  left: 10px;

  /* 반응형 */
  @media (max-width: 768px) {
    font-size: 15px;
    height: 20px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    height: 16px;
  }
`;

export const StatusFigureStrong = styled.div`
  height: 48px;
  color: #000000;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  position: relative;
  left: 10px;

  /* 반응형 */
  @media (max-width: 768px) {
    font-size: 15px;
    height: 20px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    height: 16px;
  }
`;
