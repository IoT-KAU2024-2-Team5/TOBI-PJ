import * as S from './Plant.style';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Plant1 from '../../assets/산세베리아.svg';
import Plant2 from '../../assets/스킨답서스.svg';
import Plant3 from '../../assets/테이블야자.svg';
import Control from '../../components/Control/Control';
import Status from '../../components/Status/Status';

function Plant () {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate('/', { replace: true });
    }
  }, [location.state, navigate]);

  const { plant = '산세베리아', username = '토비' } = location.state || {};

  const plantImages = {
    산세베리아: Plant1,
    스킨답서스: Plant2,
    테이블야자: Plant3,
  };

  const plantImage = plantImages[plant] || Plant1;

  const dateCount = "00";

  return (
    <S.PlantWrapper>
      <Status/>
      <S.PotContainer>
        <S.PotInfo>
          <S.Username>{username}</S.Username>
          <S.DateCount>D + {dateCount}</S.DateCount>
        </S.PotInfo>
        <S.PlantImage src={plantImage} alt={plant} />
      </S.PotContainer>
      <Control/>
    </S.PlantWrapper>
  )
}

export default Plant;