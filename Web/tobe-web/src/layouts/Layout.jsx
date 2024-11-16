import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import * as S from './Layout.style';
import Footer from "../components/Footer/Footer";

const Layout = () => {

  return (
    <S.LayoutWrapper>
      <Outlet />
    </S.LayoutWrapper>
  );
};

export default Layout;
