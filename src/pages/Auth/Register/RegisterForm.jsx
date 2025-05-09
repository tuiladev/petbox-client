import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'

import FormContainer from '~/components/features/Auth/FormContainer'
import StepBar from '~/components/common/StepBar'
import PhoneForm from '../PhoneForm'
import OtpForm from '../OtpForm'
import PasswordForm from '../PasswordForm'
import UserForm from './UserForm'

const RegisterForm = () => {
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)

  // Return to homepage if user is logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  const location = useLocation()
  const phoneStep = location.pathname === '/register'
  const otpStep = location.pathname === '/register/verify-otp'
  const passwordStep = location.pathname === '/register/set-password'
  const userStep = location.pathname === '/register/user-info'

  // Xác định bước hiện tại cho stepbar
  let currentStep = 0
  if (otpStep) currentStep = 1
  else if (passwordStep) currentStep = 2
  else if (userStep) currentStep = 3

  const steps = [
    { name: 'Xác nhận OTP', step: 1 },
    { name: 'Tạo mật khẩu', step: 2 },
    { name: 'Hoàn tất', step: 3 }
  ]

  return (
    <>
      {/* Step Bar - Chỉ hiển thị ở các bước OTP, Password và User */}
      {(otpStep || passwordStep || userStep) && (
        <StepBar steps={steps} currentStep={currentStep} />
      )}
      <FormContainer>
        <h2 className='mb-10 text-center text-4xl font-bold text-cyan-600'>
          {phoneStep && 'Đăng Ký'}
          {otpStep && 'Nhập Mã Xác Nhận'}
          {passwordStep && 'Tạo Mật Khẩu'}
          {userStep && 'Hoàn Tất Đăng Ký'}
        </h2>

        {/* Auth forms */}
        {phoneStep && <PhoneForm />}
        {otpStep && <OtpForm />}
        {passwordStep && <PasswordForm />}
        {userStep && <UserForm />}
      </FormContainer>
    </>
  )
}

export default RegisterForm
