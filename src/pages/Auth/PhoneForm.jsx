// Libraries
import React from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

// Redux & hooks
import { useDispatch, useSelector } from 'react-redux'
import {
  selectRegistrationData,
  updateRegistrationData,
  requestOtpAPI
} from '~/redux/user/userSlice'

// Components
import Button from '~/components/common/Button'
import FloatingInput from '~/components/utils/FloatingInput'
import SocialLogin from '~/components/Auth/SocialLogin'

// Utils
import { PHONE_RULE, PHONE_RULE_MESSAGE } from '~/utils/validators'
import { formatPhoneNumber, normalizePhoneNumber } from '~/utils/formatters'
import { toast } from 'react-toastify'

const PhoneForm = () => {
  const { t } = useTranslation(['auth', 'formLabel', 'validationMessage'])
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formData = useSelector(selectRegistrationData)

  const isResetPassword = location.pathname.startsWith('/reset-password')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: { phoneNumber: formData.phoneNumber || '' },
    mode: 'onBlur'
  })

  const onBlurFormat = (e) => {
    const formatted = formatPhoneNumber(e.target.value)
    setValue('phoneNumber', formatted, { shouldValidate: true })
  }

  const onSubmit = async (data) => {
    const normalized = normalizePhoneNumber(data.phoneNumber)
    const payload = {
      phoneNumber: normalized,
      actionType: isResetPassword ? 'reset-password' : 'register'
    }

    dispatch(requestOtpAPI(payload)).then((res) => {
      if (!res.error) {
        dispatch(updateRegistrationData({ phoneNumber: normalized }))
        navigate(isResetPassword ? '/reset-password/verify-otp' : '/register/verify-otp')
      }
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FloatingInput
          type='text'
          id='phoneNumber'
          {...register('phoneNumber', {
            required: t('validationMessage:required'),
            validate: (value) => PHONE_RULE.test(normalizePhoneNumber(value)) || PHONE_RULE_MESSAGE,
            onBlur: onBlurFormat
          })}
          label={t('formLabel:phoneNumber')}
          variant='outlined'
          inputStyle='w-full'
          error={errors.phoneNumber?.message}
        />

        <Button
          type='submit'
          className='mt-6 w-full rounded-full bg-cyan-600! text-white'
          disabled={isSubmitting}
        >
          {isSubmitting ? t('auth:register.processing') : t('formLabel:sendVerification')}
        </Button>
      </form>

      {!isResetPassword && (
        <>
          <div className='relative mt-10 mb-8'>
            <hr className='border-gray-300' />
            <span className='absolute inset-x-0 top-1/2 mx-auto w-max -translate-y-1/2 bg-white px-3 text-sm text-gray-500'>
              {t('formLabel:or')}
            </span>
          </div>
          <SocialLogin isRegistered={false} />
        </>
      )}

      <div className='mt-6 text-center'>
        <p className='text-gray-600'>
          {!isResetPassword && t('auth:register.hasAccount')}{' '}
          {isResetPassword && t('auth:resetPassword.backToLogin')}{' '}
          <button
            type='button'
            onClick={() => navigate('/login')}
            className='cursor-pointer text-cyan-600'
          >
            {t('auth:login.button')}
          </button>
        </p>
      </div>
    </>
  )
}

export default PhoneForm
