// import Start from "../pages/Start/Start";
// import Login from "../components/Login";
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Start from '../pages/Start/Start';
import OnBoarding from '../pages/OnBoarding/OnBoarding';
import Main from '../pages/Main/Main';
import SearchByEmotion from '../pages/SearchByEmotion/SearchByEmotion';
import EmotionView from '../pages/EmotionView/EmotionView';
import FastDiary from '../pages/FastDiary/FastDiary';
import DiaryView from '../pages/DiaryView/DiaryView';
import SlowDiary from '../pages/SlowDiary/SlowDiary';
import MyPage from '../pages/MyPage/MyPage';
import CharacterWiki from '../pages/CharacterWiki/CharacterWiki';
import DiaryList from '../pages/DiaryList/DiaryList';
import LoginCallback from '../components/common/buttons/KakaoLogin/LoginCallback/LoginCallback';
import Loading from '../pages/Loading/Loading';
import SharedView from '../pages/SharedView/SharedView';
import Information from '../pages/Information/Information';
import Weather from '../pages/Weather/Weather';
import LoginError from '../pages/LoginError/LoginError';
import SearchDiary from '../pages/SearchDiary/SearchDiary';

/*이런 식으로 작성하기*/
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Start />,
      },
    ],
  },
]);

export default router;
