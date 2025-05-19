import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { selectCurrentLanguage } from '~/redux/languages/languageSlice'

import FormContainer from '~/components/Auth/FormContainer'
import StepBar from '~/components/common/StepBar'
import PhoneForm from './PhoneForm'
import OtpForm from './OtpForm'
import PasswordForm from './PasswordForm'

const ResetPasswordForm = () => {
  const { t, i18n } = useTranslation()
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
  const phoneStep = location.pathname === '/reset-password'
  const otpStep = location.pathname === '/reset-password/verify-otp'
  const passwordStep = location.pathname === '/reset-password/new-password'

  // Determine current step for stepbar
  let currentStep = 0
  if (otpStep) currentStep = 1
  else if (passwordStep) currentStep = 2

  const steps = [
    { name: t('auth.resetPassword.steps.verifyOtp'), step: 1 },
    { name: t('auth.resetPassword.steps.createNewPassword'), step: 2 }
  ]

  return (
    <>
      {/* Step Bar - Only show on OTP and Password steps */}
      {(otpStep || passwordStep) && (
        <StepBar steps={steps} currentStep={currentStep} />
      )}
      <FormContainer>
        <h2 className='mb-10 text-center text-4xl leading-tight font-bold text-cyan-600'>
          {phoneStep && t('auth.resetPassword.title')}
          {otpStep && t('auth.resetPassword.enterOtp')}
          {passwordStep && t('auth.resetPassword.createPassword')}
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
