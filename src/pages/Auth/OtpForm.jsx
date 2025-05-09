import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectRegistrationData } from '~/redux/user/userSlice'

import Button from '~/components/common/Button'

const OtpForm = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formData = useSelector(selectRegistrationData)

  const [otp, setOtp] = useState(['', '', '', ''])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(60)
  const [isResending, setIsResending] = useState(false)
  const inputRefs = [useRef(), useRef(), useRef(), useRef()]

  const isResetPassword = location.pathname.startsWith('/reset-password')

  // Countdown time to re-send otp
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
    if (value !== '' && index < 3) {
      inputRefs[index + 1].current.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpValue = otp.join('')

    // Kiểm tra OTP đã đủ 4 số chưa
    if (otpValue.length !== 4) {
      setError('Vui lòng nhập đủ 4 chữ số')
      return
    }

    setIsSubmitting(true)
    setError('')

    // Giả lập xử lý thành công
    setTimeout(() => {
      if (!isResetPassword) navigate('/register/set-password')
      else navigate('/reset-password/new-password')
    }, 1000)
  }

  // Xử lý khi người dùng gửi lại OTP
  const handleResendOtp = async () => {
    if (countdown > 0) return
    setIsResending(true)
    // Giả lập gửi lại OTP thành công
    setTimeout(() => {
      setCountdown(60)
      setIsResending(false)
    }, 1000)
    setIsResending(false)
  }

  return (
    <>
      <p className='mb-6 text-center leading-relaxed text-gray-600'>
        Mã xác thực được gửi qua tin nhắn đến <br />
        <span className='font-medium'>{formData.phoneNumber}</span>
      </p>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='flex flex-col items-center'>
          <div className='flex justify-center gap-x-3'>
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type='text'
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className='block h-14 w-14 border-b-2 border-gray-300 text-center text-2xl font-semibold focus:border-cyan-500 focus:ring-0 focus:outline-none disabled:opacity-50'
                placeholder='⚬'
              />
            ))}
          </div>

          {error && <p className='mt-2 text-sm text-red-500'>{error}</p>}

          <div className='mt-6 text-center'>
            <p className='mb-2 text-gray-600'>
              {countdown > 0 ? (
                <>
                  Không nhận được mã? Gửi lại sau{' '}
                  <span className='font-medium text-cyan-600'>
                    {countdown}s
                  </span>
                </>
              ) : (
                <button
                  type='button'
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className='font-medium text-cyan-600 hover:text-cyan-700 disabled:opacity-50'
                >
                  {isResending ? 'Đang gửi lại...' : 'Gửi lại mã'}
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
          {isSubmitting ? 'Đang xác thực...' : 'Xác nhận'}
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
            Quay lại
          </button>
        </div>
      </form>
    </>
  )
}

export default OtpForm
