// Libraries
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { selectRegistrationData } from '~/redux/user/userSlice'
import { requestOtpAPI, verifyOtpAPI } from '~/redux/user/userSlice'

// Components
import Button from '~/components/common/Button'

const OtpForm = () => {
  // Translation
  const { t } = useTranslation(['auth', 'formLabel'])

  // Redux & navigation
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isResetPassword = location.pathname.startsWith('/reset-password')
  const formData = useSelector(selectRegistrationData)

  // Form state
  const [otp, setOtp] = useState(['', '', '', ''])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRefs = [useRef(), useRef(), useRef(), useRef()]

  // Navigate handling
  useEffect(() => {
    // Check if already verify phone number
    if (formData.isVerified)
      navigate(isResetPassword ? '/reset-password/new-password' : '/register/set-password')
  }, [formData.isVerified])

  // Countdown timer for OTP resend
  const MAX_RESENDS = 4
  const BASE_TIMEOUT = 30
  const [countdown, setCountdown] = useState(BASE_TIMEOUT)
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [countdown])

  // Next input focus
  const handleInputChange = (index, value) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value !== '' && index < 3) {
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
    if (!isOtpValid) {
      toast.error('Vui lòng nhập đủ 4 số mã OTP')
      return
    }
    // Set state and join the otp
    setIsSubmitting(true)
    const data = {
      phoneNumber: formData.phoneNumber,
      code: otp.join('')
    }
    // Call api
    dispatch(verifyOtpAPI(data))
    setIsSubmitting(false)
  }

  // Handle OTP resend
  const resendCount = formData.tries
  const handleResendOtp = async () => {
    // Limit the request otp
    if (countdown > 0 || resendCount >= MAX_RESENDS) return

    // Set state and call api
    setIsResending(true)
    const payload = {
      phoneNumber: formData.phoneNumber,
      actionType: isResetPassword ? 'reset-password' : 'register'
    }

    dispatch(requestOtpAPI(payload))
      .unwrap()
      .then(() => {
        const timeout = BASE_TIMEOUT * (resendCount + 1)
        setCountdown(timeout)
      })
      .finally(() => {
        setIsResending(false)
      })
  }

  const isOtpValid = otp.every((char) => char.length === 1 && !isNaN(char))
  return (
    <>
      <p className='mb-6 text-center leading-relaxed text-gray-600'>
        {t('auth:otp.sentTo')} <br />
        <span className='font-medium'>{formData.phoneNumber}</span>
      </p>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='flex flex-col items-center'>
          <div className='my-2 flex justify-center gap-x-3'>
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type='text'
                autoFocus={index === 0}
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className='block h-16 w-16 rounded-2xl border-[1.5px] border-gray-300 p-3 text-center text-[1.75rem] leading-none focus:border-cyan-500 focus:ring-0 focus:outline-none disabled:opacity-50'
                placeholder=''
              />
            ))}
          </div>

          <div className='mt-6 text-center'>
            {resendCount < MAX_RESENDS &&
              (countdown > 0 ? (
                <p className='mb-2 text-gray-600'>
                  {t('auth:otp.noCode')}{' '}
                  <span className='font-medium text-cyan-600'>
                    {countdown} {t('auth:otp.secondsRemaining')}
                  </span>
                </p>
              ) : (
                <button
                  type='button'
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className='font-medium text-cyan-600 hover:text-cyan-700 disabled:opacity-50'
                >
                  {isResending ? t('auth:otp.resending') : t('auth:otp.resend')}
                </button>
              ))}
          </div>
        </div>

        <Button
          type='submit'
          className='interceptor-loading text-primary mt-6 w-full rounded-full bg-cyan-600!'
          disabled={isSubmitting || !isOtpValid}
        >
          {isSubmitting ? t('auth:otp.verifying') : t('auth:otp.confirm')}
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
            {t('formLabel:back')}
          </button>
        </div>
      </form>
    </>
  )
}

export default OtpForm
