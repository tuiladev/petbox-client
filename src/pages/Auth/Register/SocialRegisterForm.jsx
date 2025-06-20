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
import OtpForm from '../OtpForm'
import UserForm from './UserForm'

const SocialRegisterForm = () => {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const location = useLocation()
  const currentUser = useSelector(selectCurrentUser)

  // Map routes to step index
  const pathToStep = {
    '/register-social/update-info': 0,
    '/register-social/verify-otp': 1
  }

  // Step bar items
  const steps = [
    { name: t('register.steps.updateInfo'), step: 0 },
    { name: t('register.steps.verifyOtp'), step: 1 }
  ]

  // Redirect logged in user
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  const currentStep = pathToStep[location.pathname] ?? 0

  // Set document title based on step
  const titles = [t('register.steps.updateInfo'), t('register.enterOtp')]
  useDocumentTitle(titles[currentStep])

  // Determine which form component to render
  const renderForm = () => {
    switch (currentStep) {
      case 0:
        return <UserForm />
      case 1:
        return <OtpForm />
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

export default SocialRegisterForm
