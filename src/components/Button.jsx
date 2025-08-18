import './Button.css';

const Button = ({ text, type, onClick }) => {
  return (
    <button
      className={type ? `Button Button_${type}` : 'Button'}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
