// Libraries
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

// Redux & hooks
import { useDispatch } from 'react-redux'
import { resetPasswordAPI } from '~/redux/user/userService'
import { resetRegistration, updateRegistrationData } from '~/redux/user/userSlice'

// Components
import Button from '~/components/common/Button'
import FloatingInput from '~/components/utils/FloatingInput'

// Utils
import { PASSWORD_RULE } from '~/utils/validators'

const PasswordForm = () => {
  const { t } = useTranslation(['auth', 'formLabel', 'validationMessage'])
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isPasswordTouched, setIsPasswordTouched] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: ''
  })

  const isResetPassword = location.pathname.startsWith('/reset-password')
  const password = watch('password', '')

  const passwordConditions = [
    {
      condition: password.length >= 8,
      label: t('validationMessage:minPasswordLength'),
      icon: password.length >= 8 ? 'fi fi-rr-check' : 'fi fi-rr-cross-small'
    },
    {
      condition: /(?=.*[a-z])(?=.*[A-Z])/.test(password),
      label: t('validationMessage:atLeastOneUpperCase'),
      icon: /[A-Z]/.test(password) ? 'fi fi-rr-check' : 'fi fi-rr-cross-small'
    },
    {
      condition: /\d/.test(password),
      label: t('validationMessage:atLeastOneNumber'),
      icon: /\d/.test(password) ? 'fi fi-rr-check' : 'fi fi-rr-cross-small'
    },
    {
      condition: /[\W_]/.test(password),
      label: t('validationMessage:atLeastOneSpecialChar'),
      icon: /[\W_]/.test(password) ? 'fi fi-rr-check' : 'fi fi-rr-cross-small'
    }
  ]

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

  const handlePasswordFocus = () => {
    setIsPasswordTouched(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className='space-y-5'>
        <FloatingInput
          type='password'
          name='password'
          label={t('formLabel:password')}
          variant='outlined'
          autoFocus
          error={errors.password?.message}
          onFocus={handlePasswordFocus}
          {...register('password', {
            required: t('validationMessage:required'),
            pattern: {
              value: PASSWORD_RULE
            }
          })}
        />

        <FloatingInput
          type='password'
          name='confirmPassword'
          label={t('formLabel:confirmPassword')}
          variant='outlined'
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: t('validationMessage:required'),
            validate: (value) => value === password || t('validationMessage:passwordMismatch')
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
        className='interceptor-loading text-primary mt-8 w-full rounded-full bg-cyan-600!'
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
