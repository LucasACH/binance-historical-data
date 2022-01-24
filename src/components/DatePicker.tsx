interface DatePickerProps {
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  max?: string | number | undefined;
  min?: string | number | undefined;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  onChange,
  max,
  min,
}) => {
  return (
    <div className='w-full'>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <div className='mt-1 relative'>
        <div className='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-2 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
          <span className='flex items-center'>
            <input
              type='date'
              className='w-full'
              onChange={onChange}
              max={max}
              min={min}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
