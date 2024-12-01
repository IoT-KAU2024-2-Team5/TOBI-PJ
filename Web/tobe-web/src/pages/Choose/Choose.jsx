import * as S from './Choose.style';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Credits from '../../components/Credits/Credits';
import LogoNav from '../../components/LogoNav/LogoNav';
import Icon from '../../assets/infoicon.svg';
import Plant1 from '../../assets/산세베리아.svg';
import Plant2 from '../../assets/스킨답서스.svg';
import Plant3 from '../../assets/테이블야자.svg';

function Choose() {
  const navigate = useNavigate();
  const [selectedPlant, setSelectedPlant] = useState(null);

  const handleNavigate = (plantName) => {
    console.log(selectedPlant);
    setSelectedPlant(plantName); // 선택된 식물 상태 저장
    navigate('/name', { state: { plant: plantName } }); // navigate 시 상태 전달
  };  

  return (
    <S.ChooseWrapper>
      <Credits/>
      <LogoNav/>
      <S.InfoContainer>
        <S.InfoIcon>
          <img src={Icon}/>
        </S.InfoIcon>
        <S.InfoMessage>
          나의 반려식물과 가장 비슷한 화분을 골라주세요.
        </S.InfoMessage>
      </S.InfoContainer>
      <S.PlantChoices>
      <S.PlantCard
          onClick={() => handleNavigate('산세베리아')}
          data-plant-name="산세베리아"
        >
          <img src={Plant1} />
          <S.PlantName>산세베리아</S.PlantName>
          <S.PlantInfo>
            <S.Info># 공기정화</S.Info>
            <S.Info># 수직형 잎</S.Info>
            <S.Info># 초보식물집사용</S.Info>
          </S.PlantInfo>
        </S.PlantCard>
        <S.PlantCard
          onClick={() => handleNavigate('스킨답서스')}
          data-plant-name="스킨답서스"
        >
          <img src={Plant2} />
          <S.PlantName>스킨답서스</S.PlantName>
          <S.PlantInfo>
            <S.Info># 공기정화</S.Info>
            <S.Info># 넝쿨식물</S.Info>
            <S.Info># 매력적인 잎사귀</S.Info>
          </S.PlantInfo>
        </S.PlantCard>
        <S.PlantCard
          onClick={() => handleNavigate('테이블야자')}
          data-plant-name="테이블야자"
        >
          <img src={Plant3} />
          <S.PlantName>테이블야자</S.PlantName>
          <S.PlantInfo>
            <S.Info># 우리집 야자나무</S.Info>
            <S.Info># 공기 독소 제거</S.Info>
            <S.Info># 병충해에 강해요</S.Info>
          </S.PlantInfo>
        </S.PlantCard>
      </S.PlantChoices>
    </S.ChooseWrapper>
  )
}

export default Choose;