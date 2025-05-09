import { useNavigate, useLocation } from 'react-router'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import {
  selectRegistrationData,
  updateRegistrationData
} from '~/redux/user/userSlice'

import Button from '~/components/common/Button'
import FloatingInput from '~/components/utils/FloatingInput'
import SocialLogin from '~/components/features/Auth/SocialLogin'
import VerificationMethodModal from '~/components/features/Auth/VerificationMethodModal'

import {
  FEILD_REQUIRED_RULE_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE
} from '~/utils/validators'
import { formatPhoneNumber, normalizePhoneNumber } from '~/utils/formatters'

const PhoneForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formData = useSelector(selectRegistrationData)
  const location = useLocation()
  const isResetPassword = location.pathname.startsWith('/reset-password')
  const [showModal, setShowModal] = useState(false)
  const [formattedPhone, setFormattedPhone] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: formData,
    mode: 'onSumbit'
  })

  const onSubmit = async (data) => {
    const formatted = formatPhoneNumber(data.phoneNumber)
    setFormattedPhone(formatted)
    setShowModal(true)
  }

  const handleVerificationSuccess = (method) => {
    dispatch(
      updateRegistrationData({
        phoneNumber: formattedPhone,
        verificationType: method
      })
    )

    if (isResetPassword) {
      navigate('/reset-password/verify-otp')
    } else {
      navigate('/register/verify-otp')
    }
  }

  return (
    <>
      {/* Verification Method Modal */}
      <VerificationMethodModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        phoneNumber={formattedPhone}
        onSuccess={handleVerificationSuccess}
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FloatingInput
          type='text'
          name='phoneNumber'
          label='Số điện thoại'
          variant='outlined'
          autoFocus
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

        <Button
          type='submit'
          className='interceptor-loading text-primary mt-6 w-full rounded-full bg-cyan-600!'
        >
          Gửi Mã Xác Thực
        </Button>
      </form>

      {!isResetPassword && (
        <>
          <div className='relative mt-10 mb-8'>
            <hr className='border-gray-300' />
            <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white px-3 text-sm text-gray-500'>
              HOẶC
            </span>
          </div>

          <SocialLogin isRegistered={false} />
        </>
      )}
      <div className='mt-6 text-center'>
        <p className='text-gray-600'>
          {!isResetPassword && <>Đã có tài khoản? </>}
          {isResetPassword && <>Quay lại trang </>}
          <button
            type='button'
            onClick={() => navigate('/login')}
            className='cursor-pointer text-cyan-600'
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </>
  )
}

export default PhoneForm
