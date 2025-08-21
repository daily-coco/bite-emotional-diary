import './EmotionItem.css';
import { getEmotionImage } from '../util/get-emotion-image';

const EmotionItem = ({ emotionId, emotionName, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`EmotionItem ${
        isSelected ? `EmotionItem_on_${emotionId}` : ''
      }`}
    >
      <img src={getEmotionImage(emotionId)} className='emotion_img' />
      <div className='emotion_name'>{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
