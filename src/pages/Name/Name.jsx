import * as S from "./Name.style";
import { useNavigate } from "react-router-dom";
import { usePlantContext } from "../../contexts/PlantContext.jsx";
import Credits from "../../components/Credits/Credits";
import LogoNav from "../../components/LogoNav/LogoNav";
import Plant1 from "../../assets/산세베리아.svg";
import Plant2 from "../../assets/스킨답서스.svg";
import Plant3 from "../../assets/테이블야자.svg";

function Name() {
  const navigate = useNavigate();
  const { id, setPlantName } = usePlantContext();

  const plantImages = {
    산세베리아: Plant1,
    스킨답서스: Plant2,
    테이블야자: Plant3,
  };

  const backgroundImage = plantImages[id];

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const name = e.target.value || "토비";
      setPlantName(name);
      navigate("/plant");
    }
  };

  return (
    <S.NameWrapper>
      <Credits />
      <LogoNav />
      <S.BackgroundImage src={backgroundImage} alt={id} />
      <S.InfoContainer>
        <S.InfoMessage>나의 반려식물에게 이름을 지어주세요.</S.InfoMessage>
        <S.InfoMessage>(미입력시 토비로 지정)</S.InfoMessage>
      </S.InfoContainer>
      <S.NameInput
        placeholder={`나의 반려 ${id}`}
        onKeyDown={handleKeyDown}
      />
    </S.NameWrapper>
  );
}

export default Name;
