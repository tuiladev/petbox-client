import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectRegistrationData,
  updateRegistrationData,
  registerUserAPI,
  resetRegistration
} from '~/redux/user/userSlice'

import Button from '~/components/common/Button'
import FloatingInput from '~/components/utils/FloatingInput'

import { FEILD_REQUIRED_RULE_MESSAGE } from '~/utils/validators'
import { normalizePhoneNumber } from '~/utils/formatters'

const UserForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formData = useSelector(selectRegistrationData)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      fullName: formData.fullName || '',
      birthDate: formData.birthDate || '',
      gender: formData.gender || ''
    },
    mode: 'onChange'
  })

  const onSubmit = async (data) => {
    dispatch(updateRegistrationData(data))
    const registerData = {
      ...formData,
      ...data
    }
    registerData.phoneNumber = normalizePhoneNumber(formData.phoneNumber)
    dispatch(registerUserAPI(registerData))
    dispatch(resetRegistration())
    navigate('/')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className='space-y-5'>
        <FloatingInput
          type='text'
          name='fullName'
          label='Họ và tên'
          variant='outlined'
          autoFocus
          error={errors.fullName?.message}
          {...register('fullName', {
            required: FEILD_REQUIRED_RULE_MESSAGE
          })}
        />

        <div className='relative'>
          <input
            type='date'
            placeholder='Ngày sinh'
            className={`block w-full appearance-none rounded-full border-1 border-gray-300 px-6 py-4 focus:ring-0 focus:outline-none ${errors.birthDate ? 'border-red-500' : ''}`}
            {...register('birthDate', {
              required: FEILD_REQUIRED_RULE_MESSAGE
            })}
          />
          {errors.birthDate && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.birthDate.message}
            </p>
          )}
        </div>

        <div className='relative'>
          <div className='relative'>
            <select
              id='gender'
              className={`block w-full appearance-none rounded-full border-1 border-gray-300 px-6 py-4 pr-10 focus:ring-0 focus:outline-none ${errors.gender ? 'border-red-500' : ''}`}
              {...register('gender', {
                required: FEILD_REQUIRED_RULE_MESSAGE
              })}
            >
              <option value='' disabled>
                Chọn giới tính
              </option>
              <option value='male'>Nam</option>
              <option value='female'>Nữ</option>
              <option value='other'>Khác</option>
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4'>
              <i className='fi fi-rr-angle-small-down' />
            </div>
          </div>
          {errors.gender && (
            <p className='mt-1 text-sm text-red-500'>{errors.gender.message}</p>
          )}
        </div>
      </div>

      <div className='mt-8 flex flex-col gap-3'>
        <Button
          type='submit'
          className='interceptor-loading text-primary w-full rounded-full bg-cyan-600!'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Đang xử lý...' : 'Hoàn tất đăng ký'}
        </Button>

        <div className='mt-3 text-center'>
          <button
            type='button'
            onClick={() => navigate('/register/set-password')}
            className='cursor-pointer text-cyan-600 hover:text-cyan-700'
          >
            Quay lại
          </button>
        </div>
      </div>
    </form>
  )
}

export default UserForm
