import { useLocation, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { updateRegistrationData } from '~/redux/user/userSlice'

import Button from '~/components/common/Button'
import FloatingInput from '~/components/utils/FloatingInput'

import {
  FEILD_REQUIRED_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'

const PasswordForm = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
          label='Mật khẩu'
          variant='outlined'
          autoFocus
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
          variant='outlined'
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: FEILD_REQUIRED_RULE_MESSAGE,
            validate: (value) => {
              return value === password || 'Mật khẩu không trùng khớp'
            }
          })}
        />
      </div>

      <Button
        type='submit'
        className='interceptor-loading text-primary mt-8 w-full rounded-full bg-cyan-600!'
      >
        {isResetPassword && 'Đặt lại mật khẩu'}
        {!isResetPassword && 'Tiếp tục'}
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
          Quay lại
        </button>
      </div>
    </form>
  )
}

export default PasswordForm
