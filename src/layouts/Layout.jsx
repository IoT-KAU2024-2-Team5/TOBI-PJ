import { Outlet } from "react-router-dom";
import * as S from './Layout.style';

const Layout = () => {

  return (
    <S.LayoutWrapper>
      <Outlet />
    </S.LayoutWrapper>
  );
};

export default Layout;
