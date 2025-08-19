import { useState } from 'react';
import Button from './Button';
import DiaryItem from './DiaryItem';
import './DiaryList.css';
import { useNavigate } from 'react-router-dom';

const DiaryList = ({ data }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState('latest');

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedDate = () => {
    return data.toSorted((a, b) => {
      if (sortType === 'oldest') {
        return Number(a.createDate) - Number(b.createDate); // 더 오래된
      } else {
        return Number(b.createDate) - Number(a.createDate); // 최신순
      }
    }); // toSorted를 사용하여 원본 배열은 그대로 두고 정렬된 새로운 배열을 반환한다.
  };

  const sortedData = getSortedDate();

  return (
    <div className='DiaryList'>
      <div className='menu_bar'>
        <select onChange={onChangeSortType}>
          <option value={'latest'}>최신순</option>
          <option value={'oldest'}>오래된순</option>
        </select>
        <Button
          text={'새 일기 쓰기'}
          type={'positive'}
          onClick={() => nav('/new')}
        />
      </div>
      <div className='list_wrapper'>
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
