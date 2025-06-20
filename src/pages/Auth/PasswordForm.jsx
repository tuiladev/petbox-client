// Libraries
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

// Redux & hooks
import { useDispatch, useSelector } from 'react-redux'
import { resetPasswordAPI } from '~/redux/user/userService'
import {
  resetRegistration,
  selectRegistrationData,
  updateRegistrationData
} from '~/redux/user/userSlice'

// Components
import Button from '~/components/common/Button'
import FloatingLabel from '~/components/utils/FloatingLabel'

// Utils
import { PASSWORD_RULE } from '~/utils/validators'

const PasswordForm = () => {
  // Get form state and reject illegal request
  const formData = useSelector(selectRegistrationData)
  useEffect(() => {
    if (!formData.isVerified) navigate('/register')
  }, [formData.isVerified])

  // Translation file
  const { t } = useTranslation(['auth', 'formLabel', 'validation'])

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // useForm set up
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: ''
  })

  // State and constants
  const [isPasswordTouched, setIsPasswordTouched] = useState(false)
  const isResetPassword = location.pathname.startsWith('/reset-password')
  const password = watch('password', '')
  const passwordConditions = [
    {
      condition: password.length >= 8,
      label: t('validation:minPasswordLength'),
      icon: password.length >= 8 ? 'fi fi-rr-check' : 'fi fi-rr-cross-small'
    },
    {
      condition: /(?=.*[a-z])(?=.*[A-Z])/.test(password),
      label: t('validation:atLeastOneUpperCase'),
      icon: /[A-Z]/.test(password) ? 'fi fi-rr-check' : 'fi fi-rr-cross-small'
    },
    {
      condition: /\d/.test(password),
      label: t('validation:atLeastOneNumber'),
      icon: /\d/.test(password) ? 'fi fi-rr-check' : 'fi fi-rr-cross-small'
    },
    {
      condition: /[\W_]/.test(password),
      label: t('validation:atLeastOneSpecialChar'),
      icon: /[\W_]/.test(password) ? 'fi fi-rr-check' : 'fi fi-rr-cross-small'
    }
  ]

  // Show condition hint
  const handlePasswordFocus = () => {
    setIsPasswordTouched(true)
  }

  // Handler on submit
  const onSubmit = async (data) => {
    if (!isResetPassword) {
      dispatch(updateRegistrationData({ password: data.password }))
      navigate('/register/user-info')
    } else {
      await resetPasswordAPI({ newPassword: data.password })
        .then(() => {
          toast.success('Cập nhật thành công! Vui lòng đăng nhập lại')
          dispatch(resetRegistration())
          navigate('/login')
        })
        .catch((error) => {
          dispatch(resetRegistration())
          navigate('/reset-password')
        })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className='space-y-5'>
        <FloatingLabel
          type='password'
          name='password'
          label={t('formLabel:password')}
          size='md'
          variant='outlined'
          error={errors?.password?.message}
          {...register('password', {
            required: 'required.default',
            pattern: {
              value: PASSWORD_RULE
            }
          })}
          onFocus={handlePasswordFocus}
          autoFocus
        />

        <FloatingLabel
          type='password'
          name='confirmPassword'
          label={t('formLabel:confirmPassword')}
          size='md'
          variant='outlined'
          error={errors?.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'required.default',
            validate: (value) => value === password || 'passwordMismatch'
          })}
        />

        {/* Password Strength Conditions */}
        {isPasswordTouched && (
          <div className='mt-6 ml-6 space-y-2 text-gray-600'>
            {passwordConditions.map((item, index) => (
              <p
                key={index}
                className={`text-sm font-semibold transition-all duration-300 ${password === '' ? 'text-gray-500 opacity-70' : item.condition ? 'text-green-600' : 'text-red-500'}`}
              >
                <i className={`${item.icon} mr-2 inline-block translate-y-0.5`} />
                {item.label}
              </p>
            ))}
          </div>
        )}
      </div>

      <Button
        type='submit'
        size='md'
        className='interceptor-loading text-primary mt-8 !min-h-13 w-full !bg-cyan-600 hover:!border-cyan-500 hover:!bg-cyan-500'
      >
        {isResetPassword ? t('auth:resetPassword.resetButton') : t('formLabel:continue')}
      </Button>

      <div className='mt-6 text-center'>
        <button
          type='button'
          onClick={() => {
            dispatch(resetRegistration())
            if (!isResetPassword) navigate('/register')
            else navigate('/reset-password')
          }}
          className='cursor-pointer text-cyan-600 hover:text-cyan-700'
        >
          {t('formLabel:back')}
        </button>
      </div>
    </form>
  )
}

export default PasswordForm
