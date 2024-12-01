import styled from 'styled-components';
import Logo from '../../assets/Logo.svg';

export const LogoContainer = styled.div`
  position: absolute;
  top: 60px;
  width: 400px;
  height: 120px;
  background-image: url(${Logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;

  /* Media Query for smaller screens */
  @media (max-width: 768px) {
    top: 60px;
    left: 10px;
    width: 150px; /* 크기를 축소 */
    height: 45px;
  }
`