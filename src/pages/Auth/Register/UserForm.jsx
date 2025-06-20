// Libraries
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

// Redux & hooks
import { useDispatch, useSelector } from 'react-redux'
import {
  selectRegistrationData,
  updateRegistrationData,
  registerUserAPI,
  resetRegistration,
  socialLoginAPI,
  requestOtpAPI,
  updateUserAPI
} from '~/redux/user/userSlice'

// Components
import Button from '~/components/common/Button'
import FloatingLabel from '~/components/utils/FloatingLabel'
import DatePickerDialog from '~/components/DatePickerDialog'
import { EMAIL_RULE, NAME_RULE, PHONE_RULE } from '~/utils/validators'

// Utils
import { formatDate, formatPhoneNumber, parseDate, maskDateInput } from '~/utils/formatters'

// MAIN COMPONENT
export default function UserForm() {
  // Import translation file
  const { t } = useTranslation(['auth', 'formLabel', 'validation'])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Determine which fields to show
  const isSocialRegister = location.pathname.startsWith('/register-social')
  const formData = useSelector(selectRegistrationData)
  const hasEmail = Boolean(formData.email)
  const hasPhone = Boolean(formData.phone)

  // useForm hook setup
  const {
    control,
    register,
    setFocus,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields }
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      fullName: formData.fullName || '',
      email: formData.email || '',
      phone: formData.phone || '',
      birthDate: ''
    }
  })

  /* ---------- Email helper ---------- */
  const emailValue = useWatch({ control, name: 'email' })
  const emailHelper = useMemo(() => {
    if (touchedFields.email && emailValue === '')
      return { msg: t('formLabel:emailForInvoice'), kind: 'info' }
    return null
  }, [touchedFields.email, emailValue])

  /* ---------- Phone helper ---------- */
  const phoneValue = useWatch({ control, name: 'phone' })
  const [isExists, setIsExists] = useState(false)
  const phoneHelper = useMemo(() => {
    if (touchedFields.phone && isExists)
      return { msg: t('formLabel:phoneAlreadyExists'), kind: 'error' }
    if (touchedFields.phone && phoneValue === '')
      return { msg: t('formLabel:phoneReviceOTP'), kind: 'info' }
    return null
  }, [touchedFields.phone, phoneValue, isExists])

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

  /* ---------- On Errors ---------- */
  const onError = (formErrors) => {
    const msgMap = {
      fullName: t('validation:required.name'),
      birthDate: t('validation:required.birthDate'),
      email: t('validation:required.email'),
      phone: t('validation:required.phone')
    }
    for (const key of Object.keys(formErrors)) {
      if (formErrors[key]?.type === 'required.default') {
        toast.error(msgMap[key])
        setFocus(key)
        return
      }
      return
    }
  }

  /* ---------- On Submit ---------- */
  const onSubmit = async (data) => {
    data.phone = `+${data.phone.replace(/\D/g, '')}`
    data.birthDate = parseDate(data.birthDate)
    const { fullName, email, birthDate, phone } = data

    // Normal register with phone number
    if (!isSocialRegister) {
      const registerData = {
        fullName,
        email,
        birthDate,
        password: formData.password,
        type: 'normal'
      }
      await dispatch(registerUserAPI(registerData))
        .unwrap()
        .then(() => {
          navigate('/')
        })
        .catch(() => {
          dispatch(resetRegistration())
          navigate('/register')
        })
    }

    // Social register
    const payload = {
      phone,
      actionType: 'register'
    }
    dispatch(requestOtpAPI(payload))
      .unwrap()
      .then((res) => {
        console.log(res)
        dispatch(updateRegistrationData({ ...data, type: 'social' }))
        navigate('/register-social/verify-otp')
      })
      .catch((error) => {
        if (error.errorCode === 'USER_ALREADY_EXISTS') setIsExists(true)
        if (error.errorCode === 'TOKEN_EXPIRED') {
          dispatch(resetRegistration())
          navigate('/register')
        }
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
      <div className='space-y-5'>
        {/* Full Name */}
        <FloatingLabel
          type='text'
          label={t('formLabel:fullName')}
          size='md'
          variant='outlined'
          error={errors?.fullName?.message}
          {...register('fullName', {
            required: true,
            pattern: {
              value: NAME_RULE,
              message: 'invalid.name'
            }
          })}
          autoFocus
        />

        {/* Email */}
        {!hasEmail && (
          <FloatingLabel
            type='email'
            label={t('formLabel:email')}
            size='md'
            variant='outlined'
            helper={emailHelper}
            error={errors?.email?.message}
            {...register('email', {
              required: true,
              pattern: { value: EMAIL_RULE, message: t('formLabel:invalid.email') }
            })}
          />
        )}

        {/* Phone */}
        {!hasPhone && (
          <FloatingLabel
            type='text'
            label={t('formLabel:phone')}
            size='md'
            variant='outlined'
            error={errors?.phone?.message}
            helper={phoneHelper}
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
        )}

        {/* Birth Date */}
        <Controller
          control={control}
          name='birthDate'
          rules={{
            required: true,
            validate: (value) => {
              const date = dayjs(value, 'DD/MM/YYYY', true)
              if (!date.isValid()) return 'invalid.birthDate'
              const age = dayjs().diff(date, 'year')
              if (age < 16 || age >= 100) return 'invalid.birthDate'
              return true
            }
          }}
          render={({ field, fieldState }) => (
            <FloatingLabel
              {...field}
              value={field.value}
              onChange={(e) => field.onChange(maskDateInput(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === 'Backspace') {
                  field.onChange('')
                  e.preventDefault()
                }
              }}
              type='text'
              label={t('formLabel:birthDate')}
              size='md'
              variant='outlined'
              error={fieldState.error?.message}
            >
              <DatePickerDialog
                selectedDate={parseDate(field.value)}
                onSelect={(date) => field.onChange(formatDate(date))}
                trigger={
                  <button
                    type='button'
                    tabIndex={-1}
                    className='absolute top-1/2 right-4 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:bg-gray-100'
                    aria-label='Chọn ngày sinh'
                  >
                    <i className='fi fi-rr-calendar-day translate-y-0.5 text-lg' />
                  </button>
                }
              />
            </FloatingLabel>
          )}
        />
        <p className='px-4 leading-normal'>
          {t('formLabel:agreeTo')} <br />
          <a href='#' className='font-semibold text-cyan-600'>
            {t('formLabel:termOfUse')}{' '}
          </a>
          {t('formLabel:and')} <br />
          <a href='#' className='font-semibold text-cyan-600'>
            {t('formLabel:privacyPolicy')}
          </a>
        </p>
      </div>

      {/* Actions */}
      <div className='mt-8 flex flex-col gap-3'>
        <Button
          type='submit'
          size='md'
          className='interceptor-loading text-primary !min-h-13 w-full rounded-full bg-cyan-600! hover:!border-cyan-500 hover:!bg-cyan-500'
          disabled={isSubmitting}
        >
          {isSubmitting ? t('auth:register.processing') : t('auth:register.completeButton')}
        </Button>

        <div className='mt-3 text-center'>
          <button
            type='button'
            onClick={() => navigate('/register/set-password')}
            className='cursor-pointer text-cyan-600 hover:text-cyan-700'
          >
            {t('formLabel:back')}
          </button>
        </div>
      </div>
    </form>
  )
}
