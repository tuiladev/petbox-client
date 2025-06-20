// Libraries
import React from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

// Redux & hooks
import { useDispatch } from 'react-redux'
import { updateRegistrationData, requestOtpAPI } from '~/redux/user/userSlice'

// Components
import Button from '~/components/common/Button'
import FloatingLabel from '~/components/utils/FloatingLabel'
import SocialLogin from '~/components/Auth/SocialLogin'

// Utils
import { PHONE_RULE } from '~/utils/validators'
import { formatPhoneNumber } from '~/utils/formatters'

const PhoneForm = () => {
  const { t } = useTranslation(['auth', 'formLabel', 'validation'])
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isResetPassword = location.pathname.startsWith('/reset-password')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
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

  const onSubmit = async (data) => {
    const phone = `+${data.phone.replace(/\D/g, '')}`
    if (phone.length != 12) {
      toast.error(t('validation:invalid.authInfo'))
      return
    }
    const payload = {
      phone: phone,
      actionType: isResetPassword ? 'reset-password' : 'register'
    }

    dispatch(requestOtpAPI(payload)).then((res) => {
      if (!res.error) {
        dispatch(updateRegistrationData({ phone: phone }))
        navigate(isResetPassword ? '/reset-password/verify-otp' : '/register/verify-otp')
      }
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' noValidate>
        <FloatingLabel
          type='text'
          name='phone'
          label={t('formLabel:phone')}
          size='md'
          variant='outlined'
          error={errors?.phone?.message}
          {...register('phone', {
            required: 'required.default',
            validate: (value) => {
              let cleaned = value.replace(/\D/g, '')
              if (cleaned.length >= 11) {
                return PHONE_RULE.test(cleaned) || 'invalid.phone'
              }
              return true
            }
          })}
          onChange={handlePhoneInput}
        />

        <Button
          type='submit'
          size='md'
          className='interceptor-loading !min-h-13 w-full !bg-cyan-600 hover:!border-cyan-500 hover:!bg-cyan-500'
          disabled={isSubmitting}
        >
          {isSubmitting ? t('auth:register.processing') : t('formLabel:sendVerification')}
        </Button>
      </form>

      {!isResetPassword && (
        <>
          <div className='relative'>
            <hr className='border-gray-300' />
            <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white px-3 text-sm text-gray-500'>
              {t('formLabel:or')}
            </span>
          </div>
          <SocialLogin />
        </>
      )}

      <div className='mt-14 text-center'>
        <p className='text-gray-600'>
          {!isResetPassword && t('auth:register.hasAccount')}{' '}
          {isResetPassword && t('auth:resetPassword.backToLogin')}{' '}
          <button
            type='button'
            onClick={() => navigate('/login')}
            className='cursor-pointer text-cyan-600 hover:text-cyan-700'
          >
            {t('auth:login.button')}
          </button>
        </p>
      </div>
    </>
  )
}

export default PhoneForm
