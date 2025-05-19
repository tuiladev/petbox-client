// * Libraries
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { initializeApp } from 'firebase/app'
import { getAuth, PhoneAuthProvider, RecaptchaVerifier } from 'firebase/auth'

// * Redux
import { useDispatch, useSelector } from 'react-redux'
import {
  selectRegistrationData,
  updateRegistrationData
} from '~/redux/user/userSlice'
import { selectCurrentLanguage } from '~/redux/languages/languageSlice'

// * Components
import Button from '~/components/common/Button'
import FloatingInput from '~/components/utils/FloatingInput'
import SocialLogin from '~/components/Auth/SocialLogin'

// * Utils
import { PHONE_RULE, PHONE_RULE_MESSAGE } from '~/utils/validators'
import { formatPhoneNumber, normalizePhoneNumber } from '~/utils/formatters'
import { firebaseConfig } from '~/config/firebase'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const PhoneForm = () => {
  // States
  const [isLoading, setIsLoading] = useState(false)
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false)
  const recaptchaContainerRef = useRef(null)
  const recaptchaVerifierRef = useRef(null)

  // Translations
  const { t, i18n } = useTranslation()
  const currentLanguage = useSelector(selectCurrentLanguage)
  useEffect(() => {
    if (currentLanguage && i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [currentLanguage, i18n])

  // Redux & Navigation
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const isResetPassword = location.pathname.startsWith('/reset-password')
  const formData = useSelector(selectRegistrationData)

  // reCAPTCHA effect
  useEffect(() => {
    const initRecaptcha = () => {
      // Clear previous reCAPTCHA
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear()
      }

      // Initialize reCAPTCHA
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        auth,
        recaptchaContainerRef.current,
        {
          size: 'normal',
          callback: () => {
            setIsRecaptchaReady(true)
          },
          'expired-callback': () => {
            setIsRecaptchaReady(false)
            initRecaptcha()
          }
        }
      )

      recaptchaVerifierRef.current.render()
    }

    initRecaptcha()

    // Cleanup
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear()
      }
    }
  }, [])

  // Form handling
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: formData,
    mode: 'onSubmit'
  })

  const onSubmit = async (data) => {
    if (!isRecaptchaReady || !data.phoneNumber) {
      return
    }
    setIsLoading(true)
    const provider = new PhoneAuthProvider(auth)
    const phoneNumber = normalizePhoneNumber(data.phoneNumber)
    const sessionInfo = await provider.verifyPhoneNumber(
      phoneNumber,
      recaptchaVerifierRef.current
    )
    dispatch(
      updateRegistrationData({
        phoneNumber,
        sessionInfo
      })
    )
    navigate(
      isResetPassword ? '/reset-password/verify-otp' : '/register/verify-otp'
    )
    setIsLoading(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FloatingInput
          type='text'
          name='phoneNumber'
          label={t('auth.form.phoneNumber')}
          variant='outlined'
          autoFocus
          error={errors.phoneNumber?.message}
          {...register('phoneNumber', {
            required: t('auth.form.required'),
            validate: (value) =>
              PHONE_RULE.test(normalizePhoneNumber(value)) ||
              PHONE_RULE_MESSAGE,
            onBlur: (e) => {
              const formattedValue = formatPhoneNumber(e.target.value)
              setValue('phoneNumber', formattedValue, { shouldValidate: true })
            }
          })}
        />

        {/* reCAPTCHA container */}
        <div ref={recaptchaContainerRef} className='mt-4'></div>

        <Button
          type='submit'
          className='interceptor-loading text-primary mt-6 w-full rounded-full bg-cyan-600'
          disabled={!isRecaptchaReady || isLoading}
        >
          {t('auth.form.sendVerification')}
        </Button>
      </form>

      {!isResetPassword && (
        <>
          <div className='relative mt-10 mb-8'>
            <hr className='border-gray-300' />
            <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white px-3 text-sm text-gray-500'>
              {t('auth.form.or')}
            </span>
          </div>
          <SocialLogin isRegistered={false} />
        </>
      )}

      <div className='mt-6 text-center'>
        <p className='text-gray-600'>
          {!isResetPassword && <>{t('auth.register.hasAccount')} </>}
          {isResetPassword && <>{t('auth.resetPassword.backToLogin')} </>}
          <button
            type='button'
            onClick={() => navigate('/login')}
            className='cursor-pointer text-cyan-600'
          >
            {t('login')}
          </button>
        </p>
      </div>
    </>
  )
}

export default PhoneForm
