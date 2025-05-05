import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { loginUserAPI } from '~/redux/user/userSlice'

import Button from '~/components/common/Button'
// import CustomCheckbox from '~/components/utils/CustomCheckbox'
import FloatingInput from '~/components/utils/FloatingInput'
import SocialLogin from '../../components/features/Auth/SocialLogin'
import FormContainer from '~/components/features/Auth/FormContainer'

import {
  FEILD_REQUIRED_RULE_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE
} from '~/utils/validators'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({})

  const submitLogin = (data) => {
    const { email, password } = data
    dispatch(loginUserAPI({ email, password })).then((res) => {
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
          type='email'
          name='email'
          label='Email'
          error={errors.email?.message}
          {...register('email', {
            required: FEILD_REQUIRED_RULE_MESSAGE,
            pattern: {
              value: EMAIL_RULE,
              message: EMAIL_RULE_MESSAGE
            }
          })}
        />

        <FloatingInput
          type='password'
          name='password'
          label='Mật khẩu'
          error={errors.password?.message}
          {...register('password', {
            required: FEILD_REQUIRED_RULE_MESSAGE
          })}
        />

        <div className='mx-2 mb-0 flex items-center justify-between'>
          {/* <CustomCheckbox label='Lưu đăng nhập' {...register('remember')} /> */}
          <button
            type='button'
            onClick={() => navigate('/auth/reset-password')}
            className='ml-auto cursor-pointer text-cyan-600 hover:text-cyan-700'
          >
            Quên mật khẩu?
          </button>
        </div>

        <Button
          type='submit'
          className='intercepter-loading text-primary mt-6 w-full rounded-full bg-cyan-600!'
        >
          Đăng Nhập
        </Button>
      </form>

      <div className='relative mt-10 mb-8'>
        <hr className='border-gray-300' />
        <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white px-3 text-sm text-gray-500'>
          Hoặc sử dụng
        </span>
      </div>

      <SocialLogin isRegistered={true} />

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
