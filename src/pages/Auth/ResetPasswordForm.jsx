import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'

import FormContainer from '~/components/features/Auth/FormContainer'
import StepBar from '~/components/common/StepBar'
import PhoneForm from './PhoneForm'
import OtpForm from './OtpForm'
import PasswordForm from './PasswordForm'

const ResetPasswordForm = () => {
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)

  // Return to homepage if user is logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  const location = useLocation()
  const phoneStep = location.pathname === '/reset-password'
  const otpStep = location.pathname === '/reset-password/verify-otp'
  const passwordStep = location.pathname === '/reset-password/new-password'

  // Xác định bước hiện tại cho stepbar
  let currentStep = 0
  if (otpStep) currentStep = 1
  else if (passwordStep) currentStep = 2

  const steps = [
    { name: 'Xác nhận OTP', step: 1 },
    { name: 'Tạo mật khẩu mới', step: 2 }
  ]

  return (
    <>
      {/* Step Bar - Chỉ hiển thị ở các bước OTP, Password*/}
      {(otpStep || passwordStep) && (
        <StepBar steps={steps} currentStep={currentStep} />
      )}
      <FormContainer>
        <h2 className='mb-10 text-center text-4xl leading-tight font-bold text-cyan-600'>
          {phoneStep && 'Quên Mật Khẩu'}
          {otpStep && 'Nhập Mã Xác Nhận'}
          {passwordStep && 'Tạo Mật Khẩu'}
        </h2>

        {/* Auth forms */}
        {phoneStep && <PhoneForm />}
        {otpStep && <OtpForm />}
        {passwordStep && <PasswordForm />}
      </FormContainer>
    </>
  )
}

export default ResetPasswordForm
