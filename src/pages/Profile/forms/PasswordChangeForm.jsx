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

const PasswordChangeForm = () => {
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
        label='Mật khẩu cũ'
        type='password'
        register={register('currentPassword', {
          required: 'required',
          pattern: {
            value: PASSWORD_RULE
          }
        })}
        error={errors.currentPassword?.message}
        name='currentPassword'
        setValue={setValue}
      />

      <UserInput
        label='Mật khẩu mới'
        type='password'
        register={register('newPassword', {
          required: 'required',
          pattern: {
            value: PASSWORD_RULE
          }
        })}
        error={errors.newPassword?.message}
        name='newPassword'
        setValue={setValue}
      />

      <UserInput
        label='Xác nhận mật khẩu'
        type='password'
        register={register('confirmPassword', {
          required: 'required',
          validate: (value) => value === watch('newPassword') || 'Mật khẩu xác nhận không khớp'
        })}
        error={errors.confirmPassword?.message}
        name='confirmPassword'
        setValue={setValue}
      />

      <Button
        children={<span>Đặt Lại Mật Khẩu</span>}
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
