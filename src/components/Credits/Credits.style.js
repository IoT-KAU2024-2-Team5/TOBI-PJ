import styled from 'styled-components';
import Credits from '../../assets/Team5.svg';

export const CreditsContainer = styled.div`
  position: absolute;
  right: 46px;
  top: 61px;
  width: 214px;
  height: 80px;
  background-image: url(${Credits});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  /* Media Query for smaller screens */
  @media (max-width: 768px) {
    width: 160px; /* 줄어든 너비 */
    height: 60px; /* 줄어든 높이 */
  }
`