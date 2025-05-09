import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { loginUserAPI } from '~/redux/user/userSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { useSelector } from 'react-redux'

import Button from '~/components/common/Button'
// import CustomCheckbox from '~/components/utils/CustomCheckbox'
import FloatingInput from '~/components/utils/FloatingInput'
import SocialLogin from '../../components/features/Auth/SocialLogin'
import FormContainer from '~/components/features/Auth/FormContainer'

import {
  FEILD_REQUIRED_RULE_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE
} from '~/utils/validators'
import { formatPhoneNumber, normalizePhoneNumber } from '~/utils/formatters'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)

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
        Đăng Nhập
      </h2>

      <form
        onSubmit={handleSubmit(submitLogin)}
        className='space-y-6'
        noValidate
      >
        <FloatingInput
          type='text'
          name='phoneNumber'
          label='Số điện thoại'
          variant='outlined'
          error={errors.phoneNumber?.message}
          {...register('phoneNumber', {
            required: FEILD_REQUIRED_RULE_MESSAGE,
            validate: (value) => {
              return (
                PHONE_RULE.test(normalizePhoneNumber(value)) ||
                PHONE_RULE_MESSAGE
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
          label='Mật khẩu'
          variant='outlined'
          error={errors.password?.message}
          {...register('password', {
            required: FEILD_REQUIRED_RULE_MESSAGE
          })}
        />

        <div className='mx-2 mb-0 flex items-center justify-between'>
          {/* <CustomCheckbox label='Lưu đăng nhập' {...register('remember')} /> */}
          <button
            type='button'
            onClick={() => navigate('/reset-password')}
            className='ml-auto cursor-pointer text-cyan-600 hover:text-cyan-700'
          >
            Quên mật khẩu?
          </button>
        </div>

        <Button
          type='submit'
          className='interceptor-loading text-primary mt-6 w-full rounded-full bg-cyan-600!'
        >
          Đăng Nhập
        </Button>
      </form>

      <div className='relative mt-10 mb-8'>
        <hr className='border-gray-300' />
        <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white px-3 text-sm text-gray-500'>
          HOẶC
        </span>
      </div>

      <SocialLogin />

      <div className='mt-6 text-center'>
        <p className='text-gray-600'>
          Chưa có tài khoản?{' '}
          <button
            type='button'
            onClick={() => navigate('/register')}
            className='cursor-pointer text-cyan-600 hover:text-cyan-700'
          >
            Đăng ký
          </button>
        </p>
      </div>
    </FormContainer>
  )
}

export default LoginForm
