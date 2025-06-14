// Libraries
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router'

// Redux & hooks
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import useDocumentTitle from '~/hooks/useDocumentTitle'

// Components
import FormContainer from '~/components/Auth/FormContainer'
import StepBar from '~/components/common/StepBar'
import PhoneForm from '../PhoneForm'
import OtpForm from '../OtpForm'
import PasswordForm from '../PasswordForm'
import UserForm from './UserForm'

const RegisterForm = () => {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const location = useLocation()
  const currentUser = useSelector(selectCurrentUser)

  // Map routes to step index
  const pathToStep = {
    '/register': 0,
    '/register/verify-otp': 1,
    '/register/set-password': 2,
    '/register/user-info': 3
  }

  // Step bar items
  const steps = [
    { name: t('register.steps.verifyOtp'), step: 1 },
    { name: t('register.steps.createPassword'), step: 2 },
    { name: t('register.steps.complete'), step: 3 }
  ]

  // Redirect logged in user
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  const currentStep = pathToStep[location.pathname] ?? 0

  // Set document title based on step
  const titles = [
    t('register.title'),
    t('register.enterOtp'),
    t('register.createPassword'),
    t('register.steps.complete')
  ]
  useDocumentTitle(titles[currentStep])

  // Determine which form component to render
  const renderForm = () => {
    switch (currentStep) {
      case 0:
        return <PhoneForm />
      case 1:
        return <OtpForm />
      case 2:
        return <PasswordForm />
      case 3:
        return <UserForm />
      default:
        return null
    }
  }

  return (
    <>
      {/* Show StepBar for steps > 0 */}
      {currentStep > 0 && <StepBar steps={steps} currentStep={currentStep} />}

      <FormContainer className='space-y-9'>
        <h2 className='mb-10 text-center text-[2rem] font-bold text-cyan-600'>
          {titles[currentStep]}
        </h2>

        {renderForm()}
      </FormContainer>
    </>
  )
}

export default RegisterForm
