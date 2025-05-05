const CustomCheckbox = ({ label, error, ...restProps }) => {
  return (
    <div>
      <div className='inline-flex items-center'>
        <label className='relative flex cursor-pointer items-center'>
          <input
            type='checkbox'
            className='peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-200 bg-white transition-all checked:border-cyan-600 checked:bg-cyan-600'
            id='check-custom-style'
            {...restProps}
          />
          <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100'>
            <i className='fi fi-rr-check text-sm'></i>
          </span>
        </label>
        <label htmlFor='check-custom-style' className='ml-2 cursor-pointer'>
          {label}
        </label>
      </div>
      {error && <p className='mt-1 ml-4 text-sm text-red-500'>{error}</p>}
    </div>
  )
}

export default CustomCheckbox
