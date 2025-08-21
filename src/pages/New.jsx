import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DiaryDispatchContext } from '../App';

const New = () => {
  const nav = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);
  const onSubmit = (input) => {
    //input은 Editor에 State로 정의한 input State
    onCreate(input.createDate.getTime(), input.emotionId, input.content);
    nav('/', { replace: true }); // 작성 완료 후 홈으로 이동
    // useNavigate(to, option) : option 자리에 replace를 적어주면
    // 1) to로 적은 url로 이동 + 2) 뒤로 가기 방지 시키는 옵션임
  };

  return (
    <div>
      <Header
        title={'새 일기 쓰기'}
        leftChild={<Button text={'< 뒤로가기'} onClick={() => nav(-1)} />}
      />

      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
