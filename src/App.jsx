import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Notfound from './pages/Notfound';
/**
 * 1. '/' : 모든 일기를 조회하는 Home 페이지 경로
 * 2. '/new' : 새로운 일기를 작성하는 new 페이지
 * 3. '/diary' : 일기를 상세히 조회하는 Diary 페이지
 */

function App() {
  const nav = useNavigate();

  const onClickButton = () => {
    nav('/new');
  };
  return (
    <>
      <button onClick={onClickButton}>New 페이지로 이동 </button>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<New />} />
        <Route path='/diary/:id' element={<Diary />} />
        <Route path='*' element={Notfound}></Route>
      </Routes>
    </>
  );
}

export default App;
