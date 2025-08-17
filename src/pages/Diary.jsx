import { useParams } from 'react-router-dom';

const Diary = () => {
  const params = useParams();
  console.log(params);
  return <div>Diary{params.id}번째 일기입니다.</div>;
};

export default Diary;
