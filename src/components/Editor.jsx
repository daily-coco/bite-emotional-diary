import { useNavigate } from 'react-router-dom';
import Button from './Button';
import './Editor.css';
import EmotionItem from './EmotionItem';
//[6/Edit] useEffect 추가
import { useState, useEffect } from 'react';

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

// [4] 작성하기 버튼 관련 이벤트 연결을 위한 프롭스 추가 (*onSubmit)
// [5/Edit] initData 추가
const Editor = ({ initData, onSubmit }) => {
  // const emotionId = 1; // 임시용(확인용)
  //[1] 사용자가 input에 입력한 값들을 저장하는 state

  // state에 여러개의 값을 저장할 때는 useState를 객체로 만들어서 데이터를 저장한다.
  const [input, setInput] = useState({
    createDate: new Date(),
    emotionId: 3,
    content: '',
  });

  // 취소하기 버튼 클릭 시
  const nav = useNavigate();

  //[7/Edit] useEffect 추가
  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createDate: new Date(Number(initData.createDate)),
      });
    }
  }, [initData]);

  //[2-1] 문자열로 데이터 객체 변환
  const getStringDate = (targetDate) => {
    //날짜 - YYYY-MM-DD
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();

    // 날짜 자리수 맞춰주기(10 이하)
    if (month < 10) {
      month = `0${month}`;
    }
    if (date < 10) {
      date = `0${date}`;
    }
    return `${year}-${month}-${date}`;
  };
  //[2-2] 변경될 때마다 데이터 픽커 값 반영 및 저장될 수 있도록 이벤트 핸들러 추가
  const onChangeInput = (e) => {
    console.log(e.target.name); // 어떤 요소의 입력이 들어왔는지 체크
    console.log(e.target.value); // 현재 입력된 값이 무엇인지?

    let name = e.target.name;
    let value = e.target.value;

    if (name === 'createDate') {
      // input State 안의 객체는 값들이 객체타입이고, 특히 날짜 경우에는 Date 형태이다보니 지금 픽커에서 입력한 값은 '문자'이기 떄문에 이를 그대로 넣어주면 안되기 때문에 형변환을 내부에서 업데이트 전에 처리해준다.
      value = new Date(value);
    }
    setInput({
      ...input, // 기존 state 객체 input 유지
      [name]: value, // 업데이트된 객체의 키:벨류/ 값 업데이트
    });
  };

  //[4] onSubmit
  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  // [임시용] 고도화 때 레이어팝업으로 변경하기! 로직 까먹을 수도 있을 것을 대비해 confirm으로 임시 UI/Ux처리
  const onClickCancel = () => {
    const confirmData = confirm('정말로 작성하던 일기를 그만 쓰겠습니까?');
    if (confirmData) {
      nav(-1);
    }
  };

  return (
    <div className='Editor'>
      <section className='date_section'>
        <h4>오늘의 날짜</h4>
        <input
          type='date'
          name='createDate'
          onChange={onChangeInput}
          value={getStringDate(input.createDate)}
        />
        {/* [2] input은 date로된 객체로된 값을 이해하지 못하기 때문에 getStringDate를 통해서 변환된 값을 넣어준다.  */}
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
                onClick={() =>
                  onChangeInput({
                    target: {
                      name: 'emotionId',
                      value: item.emotionId,
                    },
                  })
                }
                key={item.emotionId}
                {...item}
                isSelected={item.emotionId === input.emotionId}
              />
            );
          })}
        </div>
      </section>

      <section className='content_section'>
        <h4>오늘의 일기</h4>
        <textarea
          placeholder='오늘은 어땠나요?'
          name='content'
          //[3] 이벤트 연결
          onChange={onChangeInput}
          value={input.content}
        ></textarea>
      </section>

      <section className='button_section'>
        <Button text={'취소하기'} onClick={onClickCancel} />
        {/* Editor 컴포넌트 경우에는 수정과 신규 일기 생성에 같이 이용되고 있다. 이점을 유의해서 이벤트핸들러를 만들어줘야한다. */}
        <Button
          onClick={onClickSubmitButton}
          text={'작성하기'}
          type={'positive'}
        />
      </section>
    </div>
  );
};

export default Editor;
