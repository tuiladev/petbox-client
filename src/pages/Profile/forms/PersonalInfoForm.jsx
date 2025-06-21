/* eslint-disable react/no-children-prop */
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { maskSensitiveInfo } from '~/utils/formatters'
import { useEffect } from 'react'

// Components
import Button from '~/components/common/Button'
import UserInput from '~/components/Profile/UserInput'

// Validate message
import { updateUserAPI } from '~/redux/user/userSlice'
import { useTranslation } from 'react-i18next'

const PersonalInfoForm = ({ user }) => {
  const { t } = useTranslation('formLabel')
  const dispatch = useDispatch()

  // Default value for form
  const initialFormData = {
    fullName: user?.fullName,
    email: maskSensitiveInfo(user?.email),
    phone: maskSensitiveInfo(user?.phone)
  }

  // Config useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: initialFormData
  })

  // Handler update
  const updateSubmit = (data) => {
    const updateData = {}
    if (data.fullName !== initialFormData.fullName) {
      updateData.fullName = data.fullName
      dispatch(updateUserAPI(updateData)).then(() => reset())
    }
  }

  // Re initial value form
  useEffect(() => {
    reset(initialFormData)
  }, [user, reset])

  return (
    <form
      onSubmit={handleSubmit(updateSubmit)}
      className='col-span-3 space-y-4'
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
        }
      }}
    >
      <UserInput
        label={t('fullName')}
        register={register('fullName', {
          required: 'required.default'
        })}
        error={errors.fullName?.message}
      />

      <UserInput label={t('email')} register={register('email')} disabled={true} />

      <UserInput label={t('phone')} register={register('phone')} disabled={true} />

      <Button
        children={<span>{t('saveChange')}</span>}
        variant='filled'
        size='md'
        disabled={!isDirty || !isValid}
        type='submit'
        className={`interceptor-loading rounded-sm ${!isDirty || !isValid ? 'pointer-events-none' : ''}`}
      />
    </form>
  )
}

export default PersonalInfoForm
