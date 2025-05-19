import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { selectCurrentLanguage } from '~/redux/languages/languageSlice'
import useDocumentTitle from '~/hooks/useDocumentTitle'

import FormContainer from '~/components/Auth/FormContainer'
import StepBar from '~/components/common/StepBar'
import PhoneForm from '../PhoneForm'
import OtpForm from '../OtpForm'
import PasswordForm from '../PasswordForm'
import UserForm from './UserForm'

const RegisterForm = () => {
  const { t, i18n } = useTranslation()
  useDocumentTitle(t('auth.register.title'))
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  const currentLanguage = useSelector(selectCurrentLanguage)

  // Language switch effect
  useEffect(() => {
    if (currentLanguage && i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [currentLanguage, i18n])

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

  // Determine current step for stepbar
  let currentStep = 0
  if (otpStep) currentStep = 1
  else if (passwordStep) currentStep = 2
  else if (userStep) currentStep = 3

  const steps = [
    { name: t('auth.register.steps.verifyOtp'), step: 1 },
    { name: t('auth.register.steps.createPassword'), step: 2 },
    { name: t('auth.register.steps.complete'), step: 3 }
  ]

  return (
    <>
      {/* Step Bar - Only show on OTP, Password and User steps */}
      {(otpStep || passwordStep || userStep) && (
        <StepBar steps={steps} currentStep={currentStep} />
      )}
      <FormContainer>
        <h2 className='mb-10 text-center text-4xl font-bold text-cyan-600'>
          {phoneStep && t('auth.register.title')}
          {otpStep && t('auth.register.enterOtp')}
          {passwordStep && t('auth.register.createPassword')}
          {userStep && t('auth.register.completeRegistration')}
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
