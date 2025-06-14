// Libraries
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

// Redux & hooks
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, loginUserAPI } from '~/redux/user/userSlice'
import useDocumentTitle from '~/hooks/useDocumentTitle'

// Components
import Button from '~/components/common/Button'
import FloatingLabel from '~/components/utils/FloatingLabel'
import SocialLogin from '~/components/Auth/SocialLogin'
import FormContainer from '~/components/Auth/FormContainer'

// Utils
import { PHONE_RULE } from '~/utils/validators'
import { formatPhoneNumber } from '~/utils/formatters'

const LoginForm = () => {
  // Translations
  const { t } = useTranslation(['auth', 'formLabel', 'validationMessage'])

  useDocumentTitle(t('auth:login.title'))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)

  // Return to homepage if user is logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  // useForm to manage form state
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  })

  // Handler phone input
  const handlePhoneInput = (e) => {
    let value = e.target.value
    let lastChar = value.slice(-1)
    // Check if last type is a character
    if (lastChar && !/\d/.test(lastChar)) {
      setValue('phone', value.slice(0, -1))
      return
    }
    // Limit input length
    if (value.length > 17) {
      setValue('phone', value.slice(0, 17))
      return
    }
    // Format phone number for better UI
    if (value.length >= 9) {
      value = value.slice(0, 17)
      setValue('phone', formatPhoneNumber(value), { shouldValidate: true })
    }
  }

  // Handler submit login
  const submitLogin = (data) => {
    const phone = `+${data.phone.replace(/\D/g, '')}`
    if (phone.length != 12) {
      toast.error(t('validationMessage:invalidAuthInfo'))
      return
    }
    const password = data.password
    dispatch(loginUserAPI({ phone: phone, password: password })).then((res) => {
      if (!res.error) {
        navigate('/')
      }
    })
  }
  return (
    <FormContainer className='space-y-9'>
      <h2 className='text-center text-[2rem] font-bold text-cyan-600'>{t('auth:login.title')}</h2>

      <form onSubmit={handleSubmit(submitLogin)} className='space-y-4' noValidate>
        <FloatingLabel
          type='text'
          name='phone'
          label={t('formLabel:phone')}
          size='md'
          variant='outlined'
          error={errors?.phone?.message}
          {...register('phone', {
            required: 'required',
            validate: (value) => {
              let cleaned = value.replace(/\D/g, '')
              if (cleaned.length >= 11) {
                return PHONE_RULE.test(cleaned) || 'invalidPhone'
              }
              return true
            }
          })}
          onChange={handlePhoneInput}
        />

        <FloatingLabel
          type='password'
          name='password'
          label={t('formLabel:password')}
          size='md'
          variant='outlined'
          error={errors?.password?.message}
          {...register('password', {
            required: 'required',
            minLength: {
              value: 8,
              message: 'minPasswordLength'
            }
          })}
        />

        <div className='leading mx-2 mb-6 flex items-center justify-between'>
          <button
            type='button'
            onClick={() => navigate('/reset-password')}
            className='ml-auto cursor-pointer text-cyan-600 hover:text-cyan-700'
          >
            {t('auth:login.forgotPassword')}
          </button>
        </div>

        <Button
          size='md'
          type='submit'
          className='interceptor-loading !min-h-13 w-full !bg-cyan-600 hover:!border-cyan-500 hover:!bg-cyan-500'
        >
          {t('auth:login.button')}
        </Button>
      </form>

      <div className='relative'>
        <hr className='border-gray-300' />
        <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white px-3 text-sm text-gray-500'>
          {t('formLabel:or')}
        </span>
      </div>
      <SocialLogin />

      <div className='mt-14 text-center'>
        {t('auth:login.noAccount', 'Chưa có tài khoản?')}{' '}
        <button
          type='button'
          onClick={() => navigate('/register')}
          className='cursor-pointer text-cyan-600 hover:text-cyan-700'
        >
          {t('auth:login.signUp', 'Đăng ký')}
        </button>
      </div>
    </FormContainer>
  )
}

export default LoginForm
