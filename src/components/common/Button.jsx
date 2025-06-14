import clsx from 'clsx'

// ============= COMPONENT =============
export default function Button({
  variant = 'filled',
  type = 'button',
  size = 'xs',
  color = 'info',
  iconLeft,
  iconRight,
  disabled = false,
  onClick,
  className,
  children,
  ...props
}) {
  const VARIANT_MAP = {
    outlined: getOutlinedClasses(color, size),
    filled: getFilledClasses(color, size)
  }

  const composedClass = clsx(
    BASE_STYLE,
    VARIANT_MAP[variant],
    SIZE_MAP[size],
    disabled && DISABLED_STYLE,
    className
  )

  return (
    <button
      type={type}
      className={`${composedClass} ${children ? '' : 'size-14'} flex-center`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      <i className={`${iconLeft} text-inherit`} />
      {children}
      <i className={`${iconRight} text-inherit`} />
    </button>
  )
}

// ============= BASE STYLES =============
const BASE_STYLE = 'cursor-pointer rounded-full flex-center capitalize'
const DISABLED_STYLE = 'opacity-50 cursor-not-allowed'

// ============= SIZE MAP =============
const SIZE_MAP = {
  xs: 'min-h-6 px-1 py-0.5 text-xs',
  sm: 'min-h-9 px-1 py-0.5 md:px-2 md:py-1',
  md: 'min-h-12 px-2 py-1 md:px-4 md:py-2 font-semibold',
  lg: 'min-h-15 px-4 py-2 md:px-6 md:py-3 md:text-lg font-bold'
}

// ============= BORDER MAP =============
const BORDER_WIDTH_MAP = {
  xs: 'border-[1px]',
  sm: 'border-[1.25px]',
  md: 'border-[1.5px]',
  lg: 'border-[2px]'
}

// ============= VARIANTS =============
const getOutlinedClasses = (color = 'info', size = 'sm') => {
  const BASE_STYLES = {
    info: 'border-primary text-primary',
    success: 'border-teal-600 text-teal-600',
    warning: 'border-secondary text-secondary',
    danger: 'border-red-600 text-red-600'
  }

  const HOVER_STYLES = {
    info: 'hover:bg-primary/10 hover:border-primary',
    success: 'hover:bg-teal-50 hover:border-teal-500',
    warning: 'hover:bg-secondary/10 hover:border-secondary',
    danger: 'hover:bg-red-50 hover:border-red-500'
  }

  const border = BORDER_WIDTH_MAP[size]
  const base = BASE_STYLES[color]
  const hover = HOVER_STYLES[color]
  const transition = 'transition-all duration-300 linear'

  return `bg-transparent ${border} ${base} ${hover} ${transition}`
}

const getFilledClasses = (color = 'info', size = 'sm') => {
  const BASE_STYLES = {
    info: 'bg-primary/90',
    success: 'bg-teal-600',
    warning: 'bg-secondary',
    danger: 'bg-red-600'
  }

  const HOVER_STYLES = {
    info: 'hover:bg-sky-700 hover:border-sky-700',
    success: 'hover:bg-teal-700 hover:border-teal-700',
    warning: 'hover:bg-orange-600 hover:border-orange-600',
    danger: 'hover:bg-red-700 hover:border-red-700'
  }

  const border = BORDER_WIDTH_MAP[size]
  const base = BASE_STYLES[color]
  const hover = HOVER_STYLES[color]
  const transition = 'transition-all duration-300 ease'

  return `text-white border-transparent ${border} ${base} ${hover} ${transition}`
}
