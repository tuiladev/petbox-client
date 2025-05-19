// Libaries
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { selectRegistrationData } from '~/redux/user/userSlice'
import { selectCurrentLanguage } from '~/redux/languages/languageSlice'
import { verifyOTP } from '~/redux/user/userService'

// Components
import Button from '~/components/common/Button'
import { toast } from 'react-toastify'

const OtpForm = () => {
  // Translation
  const { t, i18n } = useTranslation()
  const currentLanguage = useSelector(selectCurrentLanguage)
  useEffect(() => {
    if (currentLanguage && i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [currentLanguage, i18n])

  // Redux & navigation
  const location = useLocation()
  const isResetPassword = location.pathname.startsWith('/reset-password')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formData = useSelector(selectRegistrationData)

  // Form state
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(60)
  const [isResending, setIsResending] = useState(false)
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  // Next input focus
  const handleInputChange = (index, value) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value !== '' && index < 6) {
      inputRefs[index + 1].current.focus()
    }
  }

  // Backspace key handler
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus()
    }
  }

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      phoneNumber: formData.phoneNumber,
      sessionInfo: formData.sessionInfo,
      otp: otp.join('')
    }
    setIsSubmitting(true)
    // Call API to verify OTP
    await verifyOTP(data)
      .then(() => {
        toast.success(t('auth.otp.success'))
        setIsSubmitting(false)
        navigate(isResetPassword ? '/reset-password' : '/register/set-password')
      })
      .catch(toast.error(t('auth.otp.error')))
  }

  // Handle OTP resend
  const handleResendOtp = async () => {
    if (countdown > 0) return
    setIsResending(true)
    // Resend OTP logic here
    // ...
    setIsResending(false)
  }

  return (
    <>
      <p className='mb-6 text-center leading-relaxed text-gray-600'>
        {t('auth.otp.sentTo')} <br />
        <span className='font-medium'>{formData.phoneNumber}</span>
      </p>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='flex flex-col items-center'>
          <div className='my-2 flex justify-center gap-x-3'>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type='text'
                autoFocus={index === 0}
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className='block h-12 w-12 border-b-[1.5px] border-gray-300 pb-2 text-center text-[1.75rem] leading-none font-semibold focus:border-cyan-500 focus:ring-0 focus:outline-none disabled:opacity-50'
                placeholder=''
              />
            ))}
          </div>

          {error && <p className='mt-2 text-sm text-red-500'>{error}</p>}

          <div className='mt-6 text-center'>
            <p className='mb-2 text-gray-600'>
              {countdown > 0 ? (
                <>
                  {t('auth.otp.noCode')}{' '}
                  <span className='font-medium text-cyan-600'>
                    {countdown}
                    {t('auth.otp.secondsRemaining')}
                  </span>
                </>
              ) : (
                <button
                  type='button'
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className='font-medium text-cyan-600 hover:text-cyan-700 disabled:opacity-50'
                >
                  {isResending ? t('auth.otp.resending') : t('auth.otp.resend')}
                </button>
              )}
            </p>
          </div>
        </div>

        <Button
          type='submit'
          className='interceptor-loading text-primary mt-6 w-full rounded-full bg-cyan-600!'
          disabled={isSubmitting}
        >
          {isSubmitting ? t('auth.otp.verifying') : t('auth.otp.confirm')}
        </Button>

        <div className='mt-2 text-center'>
          <button
            type='button'
            onClick={() => {
              if (!isResetPassword) navigate('/register')
              else navigate('/reset-password')
            }}
            className='cursor-pointer text-cyan-600 hover:text-cyan-700'
          >
            {t('auth.form.back')}
          </button>
        </div>
      </form>
    </>
  )
}

export default OtpForm
