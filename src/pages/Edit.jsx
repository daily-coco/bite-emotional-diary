import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import { useContext, useEffect, useState } from 'react';
import { DiaryDispatchContext, DiaryStateContext } from '../App';

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  //[10/Edit]
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
  const data = useContext(DiaryStateContext); //[1] 현재 일기데이터를 app 컴포넌트에서 가져옴
  const [curDiaryItem, setCurDiaryItem] = useState();

  const onClickDelete = () => {
    if (window.confirm('일기를 정말 삭제할까요? 삭제 시 복구되지 않아요!😯')) {
      //일기 삭제 로직
      onDelete(params.id);
      nav('/', { replace: true });
    }
  };

  // [2] 수정하려는 일기 데이터를 필터해서 가져오는 이벤트 핸들러
  // [3] useEffect 안으로 코드 이동 및 관련 코드 주석처리
  // const getCurrentDiaryItem = () => {};

  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(params.id)
    );
    if (!currentDiaryItem) {
      window.alert('존재하지 않는 일기입니다.');
      nav('/', { replace: true });
      // Edit.jsx:29 You should call navigate() in a React.useEffect(), not when your component is first rendered.
      // useNavigator는 컴포넌트가 다 마운트 된 다음에 사용할 수 있다.
      // 이유 : useNavigator 쉽게 생각하면 파일 탐색기다. BrowserRouter의 기능이다보니 BrowserRouter가 다 렌더링이 되지 않을 때 호출하면 위와 같이 에러를 배출한다.
      // 여기 경우에는 컴포넌트가 호출되자마자 함께 실행되다보니 마운트가 되는 동시에 진행하다보니 오류가 발생된다.
    }

    //return currentDiaryItem;
    setCurDiaryItem(currentDiaryItem);
  }, [params.id]); // 컴포넌트 마운트 이후, 일기의 아이디가 바뀔 때,데이터가 변경될 때

  // const currentDiaryItem = getCurrentDiaryItem();
  // console.log(currentDiaryItem);

  // [8/Edit]
  const onSubmit = (input) => {
    if (window.confirm('일기를 정말 수정할까요?')) {
      onUpdate(
        params.id,
        input.createDate.getTime(),
        input.emotionId,
        input.content
      );
      nav('/', { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={'일기 수정하기'}
        leftChild={<Button text='< 뒤로가기' onClick={() => nav(-1)} />}
        rightChild={
          <Button text='삭제하기' type={'negative'} onClick={onClickDelete} />
        }
      />
      {/* [1] 수정하기 전의 데이터가 작성했던 데이터를 불러옴 */}
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
