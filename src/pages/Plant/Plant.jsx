import * as S from './Plant.style';
import { useEffect, useState } from 'react';
import { usePlantContext } from '../../contexts/PlantContext.jsx';
import Plant1 from '../../assets/산세베리아.svg';
import Plant2 from '../../assets/스킨답서스.svg';
import Plant3 from '../../assets/테이블야자.svg';
import Tip1 from '../../assets/Tip1.png';
import Tip2 from '../../assets/Tip2.png';
import Tip3 from '../../assets/Tip3.png';
import Control from '../../components/Control/Control';
import Status from '../../components/Status/Status';

function Plant() {
  const {
    id,
    plantName,
    led,
    setLed,
    mode,
  } = usePlantContext();

  const [plantData, setPlantData] = useState(null);

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

  useEffect(() => {
    if (id && mode) {
      const storedData = localStorage.getItem(`${id}_${mode}`);
      if (storedData) {
        setPlantData(JSON.parse(storedData));
      }
    }
  }, [id, mode]);

  const plantImages = {
    산세베리아: Plant1,
    스킨답서스: Plant2,
    테이블야자: Plant3,
  };

  const tipImages = {
    산세베리아: Tip1,
    스킨답서스: Tip2,
    테이블야자: Tip3,
  };

  const plantImage = plantImages[id];
  const tipImage = tipImages[id];

  const calculateDateCount = () => {
    const creationDate = new Date();
    const currentDate = new Date();
    const timeDiff = currentDate - creationDate;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  };

  const dateCount = calculateDateCount();

  const [messages, setMessages] = useState([]);
  const messageTexts = [
    '만나서 반가워요!',
    '77분 전에 물을 줬어요.',
    '산소 만드는 중 🎵',
    '오늘 하루는 어떠셨나요?',
  ];
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTipCardVisible, setTipCardVisible] = useState(false);

  const handlePlantClick = () => {
    setMessages((prev) => {
      const newMessages = [...prev];
      if (newMessages.length >= 3) newMessages.shift();
      newMessages.push({
        id: Date.now(),
        text: messageTexts[messageIndex],
      });
      return newMessages;
    });
    setMessageIndex((prevIndex) => (prevIndex + 1) % messageTexts.length);
  };

  const handleTipClick = () => {
    setTipCardVisible((prevVisible) => !prevVisible);
  };

  return (
    <S.PlantWrapper>
      <Status
        ledValue={led}
        plant={id}
        data={plantData} // 로컬스토리지에서 가져온 데이터를 전달
      />
      <S.PotContainer>
        <S.PotInfo>
          <S.Username>{plantName}</S.Username>
          <S.DateCount>D + {dateCount}</S.DateCount>
        </S.PotInfo>
        <S.PlantImage src={plantImage} alt={id} onClick={handlePlantClick} />
      </S.PotContainer>
      <S.IconsContainer>
        <S.TipContainer onClick={handleTipClick}>
          <S.TipIcon /> Tip !
        </S.TipContainer>
        <S.DeathContainer>
          <S.DeathIcon /> 식물이 시들었어요
        </S.DeathContainer>
      </S.IconsContainer>
      <Control ledValue={led} setLedValue={setLed} data={plantData} />
      {isTipCardVisible && <S.TipCard tipImage={tipImage} />}
      <S.MessageContainer>
        {messages.map((message) => (
          <S.MessageBubble key={message.id} isVisible>
            <S.Message>{message.text}</S.Message>
          </S.MessageBubble>
        ))}
      </S.MessageContainer>
    </S.PlantWrapper>
  );
}

export default Plant;
