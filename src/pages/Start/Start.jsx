import * as S from './Start.style';
import { useNavigate } from 'react-router-dom';
import { usePlantContext } from '../../contexts/PlantContext.jsx';
import Credits from '../../components/Credits/Credits';
import { useEffect } from 'react';

function Start() {
  const navigate = useNavigate();
  const { id, plantName, led, mode } = usePlantContext();
  useEffect(() => {
    const fetchAllDatas = async () => {
      try {
        const response = await fetch('https://www.tobe-server.o-r.kr/api/datas', {
          method: 'GET', // GET 메서드
          headers: {
            'Content-Type': 'application/json', // 응답 데이터 타입 지정
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json(); // JSON 데이터를 파싱
        console.log('Fetched Data:', data); // 데이터 출력

        // 데이터를 localStorage에 저장
        data.forEach(item => {
          const key = `${item.id}_${item.mode}`; // 키 생성
          localStorage.setItem(key, JSON.stringify(item)); // 데이터 저장
        });

        return data; // 데이터 반환
      } catch (error) {
        console.error('Error fetching all datas:', error);
      }
    };
    
    // 함수 호출 예시
    fetchAllDatas();

    
  }, []);

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
