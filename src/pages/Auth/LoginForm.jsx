import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import i18n from '~/config/i18n'
import { useTranslation } from 'react-i18next'
import useDocumentTitle from '~/hooks/useDocumentTitle'
import { loginUserAPI } from '~/redux/user/userSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { selectCurrentLanguage } from '~/redux/languages/languageSlice'

import Button from '~/components/common/Button'
import FloatingInput from '~/components/utils/FloatingInput'
import SocialLogin from '../../components/Auth/SocialLogin'
import FormContainer from '~/components/Auth/FormContainer'

import {
  FEILD_REQUIRED_RULE_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE
} from '~/utils/validators'
import { formatPhoneNumber, normalizePhoneNumber } from '~/utils/formatters'

const LoginForm = () => {
  const { t } = useTranslation()
  useDocumentTitle(t('auth.login.title', 'Đăng nhập'))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  const currentLanguage = useSelector(selectCurrentLanguage)

  useEffect(() => {
    if (currentLanguage && i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [currentLanguage])

  // Return to homepage if user is logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  })

  const submitLogin = (data) => {
    const phoneNumber = normalizePhoneNumber(data.phoneNumber)
    const password = data.password
    dispatch(loginUserAPI({ phoneNumber, password })).then((res) => {
      if (!res.error) {
        navigate('/')
      }
    })
  }

  return (
    <FormContainer>
      <h2 className='mb-10 text-center text-4xl font-bold text-cyan-600'>
        {t('auth.login.title', 'Đăng Nhập')}
      </h2>

      <form
        onSubmit={handleSubmit(submitLogin)}
        className='space-y-6'
        noValidate
      >
        <FloatingInput
          type='text'
          name='phoneNumber'
          label={t('auth.form.phoneNumber', 'Số điện thoại')}
          variant='outlined'
          error={errors.phoneNumber?.message}
          {...register('phoneNumber', {
            required: t('auth.form.required', FEILD_REQUIRED_RULE_MESSAGE),
            validate: (value) => {
              return (
                PHONE_RULE.test(normalizePhoneNumber(value)) ||
                t('auth.form.invalidPhone', PHONE_RULE_MESSAGE)
              )
            },
            onBlur: (e) => {
              const formattedValue = formatPhoneNumber(e.target.value)
              setValue('phoneNumber', formattedValue, { shouldValidate: true })
            }
          })}
        />

        <FloatingInput
          type='password'
          name='password'
          label={t('auth.form.password', 'Mật khẩu')}
          variant='outlined'
          error={errors.password?.message}
          {...register('password', {
            required: t('auth.form.required', FEILD_REQUIRED_RULE_MESSAGE)
          })}
        />

        <div className='mx-2 mb-0 flex items-center justify-between'>
          <button
            type='button'
            onClick={() => navigate('/reset-password')}
            className='ml-auto cursor-pointer text-cyan-600 hover:text-cyan-700'
          >
            {t('auth.login.forgotPassword', 'Quên mật khẩu?')}
          </button>
        </div>

        <Button
          type='submit'
          className='interceptor-loading text-primary mt-6 w-full rounded-full bg-cyan-600!'
        >
          {t('auth.login.button', 'Đăng Nhập')}
        </Button>
      </form>

      <div className='relative mt-10 mb-8'>
        <hr className='border-gray-300' />
        <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white px-3 text-sm text-gray-500'>
          {t('auth.form.or')}
        </span>
      </div>
      <SocialLogin />

      <div className='mt-6 text-center'>
        <p className='text-gray-600'>
          {t('auth.login.noAccount', 'Chưa có tài khoản?')}{' '}
          <button
            type='button'
            onClick={() => navigate('/register')}
            className='cursor-pointer text-cyan-600 hover:text-cyan-700'
          >
            {t('auth.login.signUp', 'Đăng ký')}
          </button>
        </p>
      </div>
    </FormContainer>
  )
}

export default LoginForm
