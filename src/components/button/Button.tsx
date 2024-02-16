import "./Button.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  style: string;
}

const Button = ({ text, onClick, style }: ButtonProps) => (
  <button onClick={onClick} className={style}>
    {text}
  </button>
);

export default Button;
