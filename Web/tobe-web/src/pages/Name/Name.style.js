import styled from 'styled-components';

export const NameWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

export const TopContainer = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1000px;
  height: auto; 
  opacity: 0.2;
  transform: translate(-50%, -50%);
  z-index: -0.5;
  pointer-events: none;

  /* Media Query for smaller screens */
  @media (max-width: 768px) {
    width: 550px;
  }

  @media (max-width: 480px) {
    width: 350px;
  }
`;

export const InfoContainer = styled.div`
  width: 660px;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-top: 229px;
  z-index: 1;

  /* Media Query for smaller screens */
  @media (max-width: 768px) {
    width: 90%;
    margin-top: 180px;
  }

  @media (max-width: 480px) {
    margin-top: 130px;
  }
`;

export const InfoMessage = styled.div`
  color: #8A88FF;
  text-align: center;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;

  /* Media Query for smaller screens */
  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const NameInput = styled.input`
  display: flex;
  margin-top: 120px;
  background-color: #FFF;
  width: 400px;
  height: 86px;
  border: none;
  border-radius: 999px;
  outline: none;
  color: #000000;
  text-align: center;
  font-size: 32px;
  font-weight: 400;
  z-index: 1;

  &::placeholder {
    color: #000000;
    opacity: 0.5; 
  }

  /* Media Query for smaller screens */
  @media (max-width: 768px) {
    width: 300px;
    height: 70px;
    font-size: 24px;
  }

  @media (max-width: 480px) {
    width: 250px;
    height: 60px;
    font-size: 18px;
  }
`;
