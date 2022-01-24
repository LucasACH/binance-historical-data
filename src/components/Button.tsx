interface ButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  progress?: number;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  progress,
}) => {
  return (
    <button
      className='bg-indigo-500 w-full whitespace-nowrap rounded-md overflow-hidden shadow-sm relative h-fit py-2 px-4 text-white disabled:bg-opacity-50'
      onClick={onClick}
      disabled={disabled}
    >
      {label}
      <div
        className='absolute left-0 top-0 -z-10 h-full bg-indigo-500 ani'
        style={{
          width: ((progress as number) * 100).toString() + '%',
          transition: 'width 0.3s',
        }}
      ></div>
    </button>
  );
};

export default Button;
