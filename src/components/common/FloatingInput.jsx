import { useState } from 'react'

const FloatingInput = ({
  label,
  value,
  onChange,
  onKeyDown,
  name,
  type = 'text',
  error = false
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className='relative'>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full rounded-md border px-3 py-3 transition-all outline-none ${!value && error ? 'border-red-500' : 'border-gray-300'} focus:border-primary`}
        placeholder=' '
      />
      <label
        className={`pointer-events-none absolute left-3 transition-all duration-200 ${
          isFocused || value
            ? '-top-2 bg-white px-1 text-xs'
            : 'top-1/2 -translate-y-1/2 text-base'
        } ${!value && error ? 'text-red-500' : 'text-gray-500'} `}
      >
        {label}
      </label>
    </div>
  )
}

export default FloatingInput
