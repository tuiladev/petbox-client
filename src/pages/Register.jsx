import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { regitserUserAPI } from '~/redux/slices/authSlice'
import { toast } from 'react-toastify'

import Button from '~/components/common/Button'
import Logo from '~/components/common/Logo'
import AuthBanner from '~/components/features/Auth/AuthBanner'
import CustomCheckbox from '~/components/utils/CustomCheckbox'
import FloatingInput from '~/components/utils/FloatingInput'
import SocialLogin from '../components/features/Auth/SocialLogin'
import FormContainer from '~/components/features/Auth/FormContainer'

import {
  FEILD_REQUIRED_RULE_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  })

  const submitRegister = (data) => {
    const { fullName, email, phoneNumber, password } = data

    dispatch(regitserUserAPI({ fullName, email, phoneNumber, password })).then(
      (res) => {
        if (!res.error) {
          toast.success('Đăng ký thành công! Vui lòng đăng nhập.')
          navigate('/login')
        }
      }
    )
  }

  return (
    // Main container for the login and register forms
    <div className='l-container flex h-screen gap-4 bg-transparent'>
      <AuthBanner />
      <div className='relative flex grow items-center justify-center overflow-hidden'>
        {/* Logo for mobile */}
        <Logo
          type='light'
          className='absolute top-0 left-0 mb-9 max-w-60! md:hidden'
        />

        {/* Form */}
        <FormContainer width='max-w-lg'>
          <h2 className='mb-10 text-center text-4xl font-bold text-cyan-600'>
            Tạo tài khoản
          </h2>

          <form
            onSubmit={handleSubmit(submitRegister)}
            className='space-y-6'
            noValidate
          >
            <FloatingInput
              type='text'
              name='fullName'
              label='Họ và tên'
              error={errors.fullName?.message}
              {...register('fullName', {
                required: FEILD_REQUIRED_RULE_MESSAGE
              })}
            />

            <div className='flex gap-4'>
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
                type='text'
                name='phoneNumber'
                label='Số điện thoại'
                error={errors.phoneNumber?.message}
                {...register('phoneNumber', {
                  required: FEILD_REQUIRED_RULE_MESSAGE,
                  pattern: {
                    value: PHONE_RULE,
                    message: PHONE_RULE_MESSAGE
                  }
                })}
              />
            </div>

            <FloatingInput
              type='password'
              name='password'
              label='Mật khẩu'
              error={errors.password?.message}
              {...register('password', {
                required: FEILD_REQUIRED_RULE_MESSAGE,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                }
              })}
            />

            <FloatingInput
              type='password'
              name='confirmPassword'
              label='Xác nhận mật khẩu'
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: FEILD_REQUIRED_RULE_MESSAGE,
                validate: (value, formValues) =>
                  value === formValues.password ||
                  'Mật khẩu xác nhận không khớp!'
              })}
            />

            <div className='flex items-center'>
              <CustomCheckbox
                label={
                  <>
                    Đồng ý với{' '}
                    <a href='#' className='text-cyan-600'>
                      điều khoản
                    </a>{' '}
                    sử dụng.
                  </>
                }
                error={errors.terms?.message}
                {...register('terms', {
                  required: 'Bạn phải đồng ý với điều khoản sử dụng!'
                })}
              />
            </div>

            <Button
              type='submit'
              className='intercepter-loading text-primary mt-6 w-full rounded-full bg-cyan-600!'
            >
              Đăng Ký
            </Button>
          </form>

          <div className='relative mt-10 mb-8'>
            <hr className='border-gray-300' />
            <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white px-3 text-sm text-gray-500'>
              Hoặc sử dụng
            </span>
          </div>

          <SocialLogin isRegistered={false} />

          <div className='mt-6 text-center'>
            <p className='text-gray-600'>
              Đã có tài khoản?{' '}
              <button
                type='button'
                onClick={() => navigate('/login')}
                className='cursor-pointer text-cyan-600'
              >
                Đăng nhập
              </button>
            </p>
          </div>
        </FormContainer>
      </div>
    </div>
  )
}

export default Register
