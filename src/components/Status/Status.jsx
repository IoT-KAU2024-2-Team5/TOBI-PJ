/* eslint-disable react/prop-types */
import * as S from './Status.style';
import ledIcon from '../../assets/led.png';
import sunIcon from '../../assets/sun.png';
import waterIcon from '../../assets/water.png';
import { usePlantContext } from '../../contexts/PlantContext';

function Status({ plant, data, ledValue }) {
  // `null`일 경우 기본값을 0으로 설정
  const humidity = data?.humidity ?? 0;
  const brightness = data?.brightness ?? 0;
  const { mode } = usePlantContext();

  // mode에 따라 표시할 단계 결정
  const ledDisplay = mode === "auto" ? `${data?.led}` : `${ledValue}`;

  return (
    <S.StatusContainer>
      <S.Container>
        <S.Status>
          <S.StatusIcon imageUrl={waterIcon} />
          <S.StatusTitle>토양습도:</S.StatusTitle>
          <S.StatusFigure>{humidity}%</S.StatusFigure>
        </S.Status>
        <S.Status>
          <S.StatusIcon imageUrl={sunIcon} />
          <S.StatusTitle>햇빛:</S.StatusTitle>
          <S.StatusFigureStrong>{brightness}</S.StatusFigureStrong>
        </S.Status>
        <S.Status>
          <S.StatusIcon imageUrl={ledIcon} />
          <S.StatusTitle>LED:</S.StatusTitle>
          <S.StatusFigureStrong>{ledDisplay}단계</S.StatusFigureStrong>
        </S.Status>
      </S.Container>
      <S.Container2>
        <S.Title>나의 식물 종류</S.Title>
        <S.PlantName>{plant}</S.PlantName>
      </S.Container2>
    </S.StatusContainer>
  );
}

export default Status;
