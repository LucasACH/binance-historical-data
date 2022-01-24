interface ButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className='bg-indigo-500 whitespace-nowrap rounded-md shadow-sm h-fit py-2 px-4 text-white disabled:bg-indigo-200'
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
