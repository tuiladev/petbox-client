/* eslint-disable react/no-children-prop */
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

// Components
import Button from '~/components/common/Button'
import UserInput from '~/components/Profile/UserInput'

// Validate message
import { PASSWORD_RULE } from '~/utils/validators'
import { updateUserAPI } from '~/redux/user/userSlice'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const PasswordChangeForm = () => {
  const { t } = useTranslation('formLabel')
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    reset,
    setValue
  } = useForm({
    mode: 'onSubmit'
  })

  const updateSubmit = (data) => {
    const updateData = {}
    if (data.currentPassword !== data.newPassword) {
      updateData.currentPassword = data.currentPassword
      updateData.newPassword = data.newPassword
      dispatch(updateUserAPI(updateData))
      reset()
    } else toast.error('Mật khẩu mới không được trùng với mật khẩu cũ!')
  }

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
        label={t('oldPassword')}
        type='password'
        register={register('currentPassword', {
          required: 'required.default',
          pattern: {
            value: PASSWORD_RULE
          }
        })}
        error={errors.currentPassword?.message}
        name='currentPassword'
        setValue={setValue}
      />

      <UserInput
        label={t('newPassword')}
        type='password'
        register={register('newPassword', {
          required: 'required.default',
          pattern: {
            value: PASSWORD_RULE
          }
        })}
        error={errors.newPassword?.message}
        name='newPassword'
        setValue={setValue}
      />

      <UserInput
        label={t('confirmPassword')}
        type='password'
        register={register('confirmPassword', {
          required: 'required.default',
          validate: (value) => value === watch('newPassword') || 'Mật khẩu xác nhận không khớp'
        })}
        error={errors.confirmPassword?.message}
        name='confirmPassword'
        setValue={setValue}
      />

      <Button
        children={<span>{t('resetPassword')}</span>}
        variant='filled'
        size='md'
        disabled={!isDirty}
        type='submit'
        className={`interceptor-loading rounded-sm ${!isDirty ? 'pointer-events-none' : ''}`}
      />
    </form>
  )
}

export default PasswordChangeForm
