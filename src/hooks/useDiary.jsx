// 커스터 훅이 된 함수 안에서는 useContex나 useEffect와 같은

import { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';
import { useNavigate } from 'react-router-dom';

// 리액트 훅을 자유롭게 호출 및 사용이 가능하다
const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();
  const nav = useNavigate();
  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    if (!currentDiaryItem) {
      window.alert('존재하지 않는 일기입니다.');
      nav('/', { replace: true });
    }

    //return currentDiaryItem;
    setCurDiaryItem(currentDiaryItem);
  }, [id]); // 컴포넌트 마운트 이후, 일기의 아이디가 바뀔 때,데이터가 변경될 때

  return curDiaryItem;
};

export default useDiary;
