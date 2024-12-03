import styled from 'styled-components';
import Icon from "../../assets/infoicon.png";

export const ChooseWrapper = styled.div`
  font-family: Pretendard;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InfoContainer = styled.div`
  width: 660px;
  height: 40px;
  display: flex;
  flex-direction: row;
  gap: 18px;
  align-items: center;
  margin-top: 229px;

  /* Media Query for smaller screens */
  @media (max-width: 768px) {
    width: 90%;
    flex-direction: column;
    gap: 10px;
    margin-top: 100px;
  }
`;

export const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background-image: url(${Icon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  /* Media Query for smaller screens */
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
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
    font-size: 15px;
  }
`;

export const PlantChoices = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 200px;
  margin-top: 100px;

  /* Media Query for smaller screens */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 50px;
    margin-top: 50px;
  }
`;

export const PlantCard = styled.div`
  width: 200px;
  height: 383.681px;
  cursor: pointer;
  position: relative;
  margin-top: 0;

  img {
    width: 100%;
    height: 100%;
    transition: opacity 0.4s ease-in-out;
  }

  &:hover img {
    opacity: 0.2; 
  }

  &:hover > div {
    display: flex;
  }

  /* Media Query for smaller screens */
  @media (max-width: 768px) {
    width: 100px;
    height: 250px;
  }
`;

export const PlantName = styled.div`
  display: none;
  justify-items: center;
  position: absolute;
  top: 105px;
  left: 50%;
  width: 200px;
  transform: translate(-50%, -50%);
  color: #FFF;
  text-align: center;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  z-index: 10;

  ${PlantCard}:hover & {
    display: block;
  }

  /* Media Query for smaller screens */
  @media (max-width: 768px) {
    font-size: 24px;
    width: 150px;
  }
`;

export const PlantInfo = styled.div`
  display: none;
  gap: 20px;
  flex-direction: column;
  position: absolute;
  top: 290px;
  left: 50%;
  width: 200px;
  transform: translate(-50%, -50%);
  z-index: 10;

  /* Media Query for smaller screens */
  @media (max-width: 768px) {
    gap: 10px;
    width: 150px;
  }
`;

export const Info = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;

  /* Media Query for smaller screens */
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
