import React, { useEffect, useRef, useState } from 'react'

const FormInput = ({
  label,
  type,
  name,
  value,
  className = '',
  onChange,
  isRequired = false,
  hasToggleVisibility = false
}) => {
  // Password show/hide
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Input animation
  const [isFocus, setIsFocus] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const inputRef = useRef(null)
  const inputLabel = useRef(null)

  // Kiểm tra khi component mount hoặc value thay đổi
  useEffect(() => {
    if (value) {
      setHasValue(true)
    } else {
      setHasValue(false)
    }
  }, [value])

  // Xử lý sự kiện click bên ngoài input
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setIsFocus(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Xử lý sự kiện click vào label
  const handleLabelClick = () => {
    inputRef.current.focus()
  }

  // Xử lý focus và blur
  const handleFocus = () => {
    setIsFocus(true)
  }

  const handleBlur = () => {
    if (!value) {
      setIsFocus(false)
    }
  }

  // Determine the input type based on hasToggleVisibility and showPassword
  const inputType = hasToggleVisibility
    ? showPassword
      ? 'text'
      : 'password'
    : type

  return (
    <div className={`relative mb-6 ${className}`}>
      <input
        ref={inputRef}
        type={inputType}
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e)
          setHasValue(e.target.value !== '')
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={isRequired}
        className={`w-full rounded-full py-4 pr-4 pl-6 text-base font-normal text-gray-800 ${isFocus ? 'bg-white outline-2 outline-cyan-600' : hasValue ? 'bg-white outline-1 outline-cyan-600' : 'bg-zinc-100'}`}
      />
      <label
        className={`absolute origin-top-left cursor-text text-base font-medium transition-all duration-300 ${
          isFocus || hasValue
            ? '-top-0.5 left-4 -translate-y-1/2 bg-white px-2 text-sm text-cyan-600'
            : 'top-1/2 left-6 -translate-y-1/2 text-gray-500'
        }`}
        ref={inputLabel}
        onClick={handleLabelClick}
      >
        {label}
      </label>
      {hasToggleVisibility && (
        <button
          type='button'
          onClick={togglePasswordVisibility}
          className='absolute top-[calc(50%+2px)] right-6 -translate-y-1/2 transform cursor-pointer text-lg'
        >
          <i
            className={`fi ${showPassword ? 'fi-rr-eye-crossed' : 'fi-rr-eye'} text-gray-400`}
          ></i>
        </button>
      )}
    </div>
  )
}

export default FormInput
