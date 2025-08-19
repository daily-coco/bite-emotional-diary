import Button from './Button';
import './Editor.css';
import EmotionItem from './EmotionItem';
// 이것도 외부로 빼서 관리할 수 있는 부분이니깐 빼두기 (고도화때)
const emotionList = [
  {
    emotionId: 1,
    emotionName: '최고',
  },
  {
    emotionId: 2,
    emotionName: '좋음',
  },
  {
    emotionId: 3,
    emotionName: '그럭저럭',
  },
  {
    emotionId: 4,
    emotionName: '나쁨',
  },
  {
    emotionId: 5,
    emotionName: '끔찍함',
  },
];

const Editor = () => {
  const emotionId = 1;
  return (
    <div className='Editor'>
      <section className='date_section'>
        <h4>오늘의 날짜</h4>
        <input type='date' />
      </section>

      <section className='emotion_section'>
        <h4>오늘의 감정</h4>
        {/* 이렇게 코드를 작성하면 일일이 다 수정해줘야하기 때문에 위에 별도의 변수로 객체를 생성해서 데이터를 만들어주고, map으로 데이터들을 돌려줘서 관리하는 혀앹로 */}
        {/* <EmotionItem emotionId={1} emotionName={'완전 좋음'} />
        <EmotionItem emotionId={2} emotionName={'좋음'} />
        <EmotionItem emotionId={3} emotionName={'보통'} />
        <EmotionItem emotionId={4} emotionName={'나쁨'} />
        <EmotionItem emotionId={5} emotionName={'완전 나쁨'} /> */}
        <div className='emotion_list_wrapper'>
          {emotionList.map((item) => {
            return (
              <EmotionItem
                key={item.emotionId}
                {...item}
                isSelected={item.emotionId === emotionId}
              />
            );
          })}
        </div>
      </section>

      <section className='content_section'>
        <h4>오늘의 일기</h4>
        <textarea placeholder='오늘은 어땠나요?'></textarea>
      </section>

      <section className='button_section'>
        <Button text={'저장하기'} />
        <Button text={'취소하기'} />
      </section>
    </div>
  );
};

export default Editor;
