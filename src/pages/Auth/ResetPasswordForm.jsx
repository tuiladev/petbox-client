// Libraries
import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'

// Redux & hooks
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import useDocumentTitle from '~/hooks/useDocumentTitle'

// Components
import FormContainer from '~/components/Auth/FormContainer'
import StepBar from '~/components/common/StepBar'
import PhoneForm from './PhoneForm'
import OtpForm from './OtpForm'
import PasswordForm from './PasswordForm'

const ResetPasswordForm = () => {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const location = useLocation()
  const currentUser = useSelector(selectCurrentUser)

  // Map routes to step index
  const pathToStep = {
    '/reset-password': 0,
    '/reset-password/verify-otp': 1,
    '/reset-password/new-password': 2
  }

  // StepBar items: one-based step numbers
  const steps = [
    { name: t('resetPassword.steps.verifyOtp'), step: 1 },
    { name: t('resetPassword.steps.createNewPassword'), step: 2 }
  ]

  // Redirect away if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  // Determine current step
  const currentStep = pathToStep[location.pathname] ?? 0

  // Set document title per step
  const titles = [
    t('resetPassword.title'),
    t('resetPassword.enterOtp'),
    t('resetPassword.createNewPassword')
  ]
  useDocumentTitle(titles[currentStep])

  // Select the right form component
  const renderForm = () => {
    switch (currentStep) {
      case 0:
        return <PhoneForm />
      case 1:
        return <OtpForm />
      case 2:
        return <PasswordForm />
      default:
        return null
    }
  }

  return (
    <>
      {/* Show StepBar for steps > 0 */}
      {currentStep > 0 && <StepBar steps={steps} currentStep={currentStep + 1} />}

      <FormContainer>
        <h2 className='mb-10 text-center text-4xl leading-tight font-bold text-cyan-600'>
          {titles[currentStep]}
        </h2>

        {renderForm()}
      </FormContainer>
    </>
  )
}

export default ResetPasswordForm
