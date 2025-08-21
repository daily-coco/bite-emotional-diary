import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import { useContext } from 'react';
import { DiaryDispatchContext, DiaryStateContext } from '../App';
import useDiary from '../hooks/useDiary';
// useDiary 커스텀 훅 생성

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  //[10/Edit]
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);

  const curDiaryItem = useDiary(params.id);

  const onClickDelete = () => {
    if (window.confirm('일기를 정말 삭제할까요? 삭제 시 복구되지 않아요!😯')) {
      //일기 삭제 로직
      onDelete(params.id);
      nav('/', { replace: true });
    }
  };

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
