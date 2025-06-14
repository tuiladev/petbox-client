import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import { forwardRef } from 'react'

// === CONFIG STYLE ===
const VARIANT = {
  outlined: {
    input:
      'rounded-full border border-gray-300 bg-white min-h-14 pl-4 pr-13 px-6 focus:border-cyan-600 focus:ring-0 outline-none',
    label:
      'absolute block z-10 origin-left top-1/2 left-4 -translate-y-1/2 cursor-text px-2 text-gray-500 transition-all duration-200 peer-focus:top-0 peer-focus:left-4 peer-focus:bg-white peer-focus:text-sm peer-focus:font-semibold peer-focus:text-cyan-600 peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:left-4 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:font-semibold'
  }
}

const SIZE = {
  sm: {
    input: 'min-h-10 py-2',
    label: 'peer-focus:text-xs peer-[&:not(:placeholder-shown)]:text-xs'
  },
  md: {
    input: 'min-h-[52px] py-4',
    label: 'peer-focus:text-sm peer-[&:not(:placeholder-shown)]:text-sm'
  }
}

const HELPER_MAP = {
  default: { class: 'mt-1 ml-4 text-[13px] leading-normal text-gray-500', icon: '' },
  error: {
    class: 'mt-1 ml-4 text-[13px] leading-normal text-red-500',
    icon: 'fi fi-rr-exclamation'
  },
  success: {
    class: 'mt-1 ml-4 text-[13px] leading-normal text-green-600',
    icon: 'fi fi-rr-check-circle text-xs'
  },
  warning: {
    class: 'mt-1 ml-4 text-[13px] leading-normal text-yellow-500',
    icon: 'fi fi-rr-warning text-xs'
  },
  info: {
    class: 'mt-1 ml-4 text-[13px] leading-normal text-blue-500',
    icon: 'fi fi-rr-info text-xs'
  }
}

// === HELPER TEXT COMPONENT ===
function HelperText({ message, kind = 'default' }) {
  const { t } = useTranslation('validationMessage')
  if (!message) return null
  const cfg = HELPER_MAP[kind] || HELPER_MAP.default
  return (
    <p className={clsx(cfg.class, 'flex items-center')}>
      {cfg.icon && <i className={clsx(cfg.icon, 'mr-[6px] translate-y-0.25')} />} {t(message)}
    </p>
  )
}

// === MAIN COMPONENT ===
const FloatingLabel = forwardRef(
  (
    {
      type = 'text',
      name,
      label,
      size = 'md',
      variant = 'outlined',
      helper,
      error,
      children,
      ...rest
    },
    ref
  ) => {
    const [showPwd, setShowPwd] = useState(false)
    const hasError = error && error !== 'required'

    // ===== CLASS COMPOSITION =====
    const v = VARIANT[variant] || {}
    const s = SIZE[size] || {}
    const inputClass = clsx(
      'peer block w-full appearance-none disabled:cursor-not-allowed',
      v.input,
      s.input,
      hasError && 'border-red-500 focus:border-red-500'
    )
    const labelClass = clsx(
      v.label,
      s.label,
      hasError && 'peer-focus:text-red-500 peer-[&:not(:placeholder-shown)]:text-red-500'
    )

    const inputType = type === 'password' && showPwd ? 'text' : type

    return (
      <div className='w-full'>
        <label htmlFor={name} className='relative block'>
          <input
            ref={ref}
            id={name}
            name={name}
            type={inputType}
            placeholder=' '
            className={inputClass}
            {...rest}
          />
          <span className={labelClass}>{label}</span>

          {/* Password toggle */}
          {type === 'password' && (
            <button
              type='button'
              tabIndex={-1}
              onClick={() => setShowPwd((prev) => !prev)}
              className='absolute top-1/2 right-6 -translate-y-2/5 cursor-pointer text-gray-500 focus:outline-none'
              aria-label={showPwd ? 'hidePassword' : 'showPassword'}
            >
              <i className={clsx('fi', showPwd ? 'fi-rr-eye' : 'fi-rr-eye-crossed', 'text-lg')} />
            </button>
          )}

          {type !== 'password' && children}
        </label>

        <HelperText
          message={hasError ? error : helper?.msg}
          kind={hasError ? 'error' : helper?.kind}
        />
      </div>
    )
  }
)
export default FloatingLabel
