import { useLocation, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { updateRegistrationData } from '~/redux/user/userSlice'
import { selectCurrentLanguage } from '~/redux/languages/languageSlice'
import { useEffect } from 'react'

import Button from '~/components/common/Button'
import FloatingInput from '~/components/utils/FloatingInput'

import {
  FEILD_REQUIRED_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'

const PasswordForm = () => {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentLanguage = useSelector(selectCurrentLanguage)

  // Language switch effect
  useEffect(() => {
    if (currentLanguage && i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [currentLanguage, i18n])
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: '',
    mode: 'onChange'
  })

  const isResetPassword = location.pathname.startsWith('/reset-password')
  const password = watch('password')

  const onSubmit = async (data) => {
    if (!isResetPassword) {
      dispatch(updateRegistrationData({ password: data.password }))
      navigate('/register/user-info')
    } else {
      // dispatch(resetPasswordAPI({ password: data.password }))
      navigate('/login')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className='space-y-5'>
        <FloatingInput
          type='password'
          name='password'
          label={t('auth.form.password')}
          variant='outlined'
          autoFocus
          error={errors.password?.message}
          {...register('password', {
            required: t('auth.form.required'),
            pattern: {
              value: PASSWORD_RULE,
              message: PASSWORD_RULE_MESSAGE
            }
          })}
        />

        <FloatingInput
          type='password'
          name='confirmPassword'
          label={t('auth.form.confirmPassword')}
          variant='outlined'
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: t('auth.form.required'),
            validate: (value) => {
              return value === password || t('auth.form.passwordMismatch')
            }
          })}
        />
      </div>

      <Button
        type='submit'
        className='interceptor-loading text-primary mt-8 w-full rounded-full bg-cyan-600!'
      >
        {isResetPassword && t('auth.resetPassword.resetButton')}
        {!isResetPassword && t('auth.form.continue')}
      </Button>

      <div className='mt-6 text-center'>
        <button
          type='button'
          onClick={() => {
            if (!isResetPassword) navigate('/register/verify-otp')
            else navigate('/reset-password/verify-otp')
          }}
          className='cursor-pointer text-cyan-600 hover:text-cyan-700'
        >
          {t('auth.form.back')}
        </button>
      </div>
    </form>
  )
}

export default PasswordForm
