import * as S from './Start.style';
import { useNavigate } from 'react-router-dom';
import { usePlantContext } from '../../contexts/PlantContext.jsx';
import Credits from '../../components/Credits/Credits';

function Start() {
  const navigate = useNavigate();
  const { id, plantName, led, mode } = usePlantContext();
  

  const handleNavigate = () => {
    navigate('/choose');
  };

  const handleNavigatePlant = () => {
    navigate('/plant', { state: { id, plantName, led, mode } });
  };

  return (
    <S.StartWrapper>
      <S.FlowerContainer onClick={handleNavigatePlant}>
        <S.FlowerIcon></S.FlowerIcon>
        <S.FlowerText>my plant</S.FlowerText>
      </S.FlowerContainer>
      <Credits />
      <S.IntroContainer>
        온오프라인으로 함께하는 나의 반려 식물
      </S.IntroContainer>
      <S.TitleContainer onClick={handleNavigate}>
        <S.EngTitle>TO-BI</S.EngTitle>
        <S.KorTitle>토-비</S.KorTitle>
      </S.TitleContainer>
    </S.StartWrapper>
  );
}

export default Start;
