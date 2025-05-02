const CustomCheckbox = ({
  id,
  name,
  checked,
  onChange,
  label,
  required,
  className = ''
}) => (
  <div className={`flex items-center ${className}`}>
    <div className='relative flex items-center'>
      <input
        type='checkbox'
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className='absolute h-0 w-0 opacity-0'
      />
      <label
        htmlFor={id}
        className={`mr-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-gray-300 ${
          checked ? 'bg-cyan-600' : 'bg-white'
        }`}
      >
        {checked && <span className='h-2 w-2 rounded-full bg-white'></span>}
      </label>
    </div>
    <label htmlFor={id} className='cursor-pointer text-sm text-gray-600'>
      {label}
      {required && <span className='ml-1 text-red-500'>*</span>}
    </label>
  </div>
)

export default CustomCheckbox
