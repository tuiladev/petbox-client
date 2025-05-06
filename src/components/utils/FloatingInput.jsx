import { useState } from 'react'

const FloatingInput = ({
  type,
  name,
  label,
  inputClassName,
  labelClassName,
  children,
  error,
  ...restProps
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const displayType = type === 'password' && showPassword ? 'text' : type

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='w-full'>
      <label htmlFor={name} className='relative block'>
        <input
          type={displayType}
          id={name}
          name={name}
          placeholder=' '
          className={`peer block w-full appearance-none rounded-full border-[1.5px] border-transparent bg-gray-50 p-4 not-placeholder-shown:border-gray-300 not-placeholder-shown:bg-white placeholder-shown:border-transparent placeholder-shown:bg-gray-50 focus:border-cyan-600 focus:bg-white focus:ring-0 focus:outline-none ${error ? 'border-red-500 focus:border-red-500' : ''} ${inputClassName}`}
          {...restProps}
        />
        <span
          className={`absolute top-1/2 left-4 z-10 origin-left -translate-y-1/2 cursor-text px-2 text-gray-500 duration-200 peer-focus:top-0 peer-focus:left-4 peer-focus:bg-white peer-focus:text-cyan-600 peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:left-4 peer-[&:not(:placeholder-shown)]:bg-white ${error ? 'peer-focus:text-red-500 peer-[&:not(:placeholder-shown)]:text-red-500' : 'peer-focus:text-cyan-600 peer-[&:not(:placeholder-shown)]:text-cyan-600'} ${labelClassName}`}
        >
          {label}
        </span>
        {type === 'password' && (
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute top-1/2 right-4 -translate-y-2/5 cursor-pointer text-gray-500 focus:outline-none'
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            <i
              className={`fi ${showPassword ? 'fi-rr-eye' : 'fi-rr-eye-crossed'} text-lg`}
            ></i>
          </button>
        )}
        {children}
      </label>
      {error && <p className='mt-1 ml-4 text-sm text-red-500'>{error}</p>}
    </div>
  )
}

export default FloatingInput
