import React from 'react'

const Button = ({
  children,
  variant = 'filled',
  size = 'md',
  disabled = false,
  className = 'rounded-sm',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses =
    'font-semibold transition-all ease duration-300 focus:outline-none cursor-pointer'

  const variantClasses = {
    outlined:
      'bg-white border-[1.5px] text-primary border-primary hover:bg-primary hover:border-primary hover:text-white',
    filled: 'bg-primary overflow-hidden text-white relative hover:text-white z-10 hover:opacity-80',
    logout: 'bg-white border-2 text-red-500 border-red-500 hover:bg-red-500 hover:text-white'
  }

  const sizeClasses = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-3 px-4 text-base',
    lg: 'py-4 px-6 text-lg'
  }

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const buttonClasses = [
    baseClasses,
    variantClasses[variant] || variantClasses.filled,
    sizeClasses[size] || sizeClasses.md,
    disabledClasses,
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={buttonClasses} onClick={onClick} type={type} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export default Button
