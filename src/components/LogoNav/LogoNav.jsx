import * as S from './LogoNav.style';
import { useNavigate } from 'react-router-dom';

function LogoNav () {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  };

  return(
    <S.LogoContainer onClick={handleNavigate}/>
  )
}

export default LogoNav;