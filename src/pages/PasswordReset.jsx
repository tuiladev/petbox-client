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

const PasswordReset = ({ onToggleForm }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({})

  const submitResetPassword = (data) => {
    const { email, password } = data
    dispatch(loginUserAPI({ email, password })).then((res) => {
      if (!res.error) {
        navigate('/')
      }
    })
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
        <FormContainer width='max-w-[22rem]'>
          <h2 className='mb-8 text-center text-4xl font-bold text-cyan-600'>
            Đặt Lại Mật Khẩu
          </h2>

          {error && (
            <div className='mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600'>
              {error}
            </div>
          )}

          {success ? (
            <div className='text-center'>
              <div className='mb-4 rounded-md bg-green-50 p-4 text-sm text-green-600'>
                Hướng dẫn đặt lại mật khẩu đã được gửi đến địa chỉ email/số điện
                thoại của bạn.
              </div>
              <p className='mb-4'>
                Vui lòng kiểm tra hộp thư đến và làm theo hướng dẫn để thiết lập
                mật khẩu mới.
              </p>
              <Button
                onClick={() => onToggleForm('login')}
                className='text-primary mt-2 w-full bg-cyan-600! text-lg'
              >
                Quay Lại Đăng Nhập
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className='mb-6 text-center leading-relaxed text-gray-600'>
                Nhập email hoặc số điện thoại đã đăng ký. Chúng tôi sẽ gửi hướng
                dẫn để đặt lại mật khẩu cho bạn.
              </p>

              <FormInput
                label='Email/ Số điện thoại'
                type='text'
                name='email'
                value={formData.email}
                onChange={handleChange}
                isRequired={true}
              />

              <Button
                type='submit'
                className='text-primary mt-2 w-full rounded-full bg-cyan-600! text-lg'
              >
                Gửi Yêu Cầu
              </Button>

              <div className='mt-8 text-center'>
                <button
                  type='button'
                  onClick={() => onToggleForm('login')}
                  className='cursor-pointer text-cyan-600'
                >
                  Quay lại trang đăng nhập
                </button>
              </div>
            </form>
          )}
        </FormContainer>
      </div>
    </div>
  )
}

export default PasswordReset
