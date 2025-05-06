import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { maskSensitiveInfo } from '~/utils/formatters'

// Components
import Button from '~/components/common/Button'
import TabHeading from './TabHeading'
import { UserAvatar } from '~/components/layout/Header/UserTools'

// Validate message
import {
  FEILD_REQUIRED_RULE_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import { updateUserAPI } from '~/redux/user/userSlice'

const ProfileTab = ({ user }) => {
  return (
    <>
      <TabHeading title='Hồ sơ cá nhân' />
      <div className='grid grid-cols-3'>
        <div className='col-span-2 space-y-8'>
          <PersonalInfoForm user={user} />
          <PasswordChangeForm />
        </div>
        {/* Avatar section */}
        <ProfileAvatar user={user} />
      </div>
    </>
  )
}
export default ProfileTab

// Component quản lý form thông tin cá nhân
const PersonalInfoForm = ({ user }) => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty, isValid },
    setValue
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullName: user?.fullName || '',
      email: maskSensitiveInfo(user?.email) || '',
      phoneNumber: maskSensitiveInfo(user?.phoneNumber) || ''
    }
  })

  const updateSubmit = (data) => {
    const updateData = Object.keys(dirtyFields).reduce(
      (acc, field) => ({ ...acc, [field]: data[field] }),
      {}
    )
    if (Object.keys(updateData).length > 0) {
      dispatch(updateUserAPI(updateData))
    }
    console.log(updateData)
  }

  return (
    <form
      onSubmit={handleSubmit(updateSubmit)}
      className='col-span-3 space-y-4'
    >
      <FormField
        label='Họ và tên'
        register={register('fullName', {
          required: FEILD_REQUIRED_RULE_MESSAGE
        })}
        error={errors.fullName?.message}
      />

      <FormField
        label='Email'
        register={register('email', {
          required: FEILD_REQUIRED_RULE_MESSAGE,
          pattern: {
            value: EMAIL_RULE,
            message: EMAIL_RULE_MESSAGE
          }
        })}
        disabled={true}
        showChangeButton={true}
        error={errors.email?.message}
        name='email'
        setValue={setValue}
      />

      <FormField
        label='Số điện thoại'
        register={register('phoneNumber', {
          required: FEILD_REQUIRED_RULE_MESSAGE,
          validate: (value) => {
            if (value === maskSensitiveInfo(user?.phoneNumber)) return true
            return PHONE_RULE.test(value) || PHONE_RULE_MESSAGE
          }
        })}
        disabled={true}
        showChangeButton={true}
        error={errors.phoneNumber?.message}
        name='phoneNumber'
        setValue={setValue}
      />

      <Button
        children={<span>Lưu Thay Đổi</span>}
        variant='filled'
        size='md'
        disabled={!isDirty || !isValid}
        type='submit'
        className={`interceptor-loading rounded-sm ${!isDirty || !isValid ? 'pointer-events-none' : ''}`}
      />
    </form>
  )
}

// Component quản lý form thay đổi mật khẩu
const PasswordChangeForm = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, dirtyFields },
    watch,
    setValue
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const updateSubmit = (data) => {
    const updateData = Object.keys(dirtyFields).reduce(
      (acc, field) => ({ ...acc, [field]: data[field] }),
      {}
    )
    if (Object.keys(updateData).length > 0) {
      dispatch(updateUserAPI(updateData))
    }
    console.log(updateData)
  }

  return (
    <form
      onSubmit={handleSubmit(updateSubmit)}
      className='col-span-3 space-y-4'
    >
      <FormField
        label='Mật khẩu cũ'
        type='password'
        register={register('oldPassword', {
          required: FEILD_REQUIRED_RULE_MESSAGE
        })}
        error={errors.oldPassword?.message}
        name='oldPassword'
        setValue={setValue}
      />

      <FormField
        label='Mật khẩu mới'
        type='password'
        register={register('newPassword', {
          required: FEILD_REQUIRED_RULE_MESSAGE,
          pattern: {
            value: PASSWORD_RULE,
            message: PASSWORD_RULE_MESSAGE
          }
        })}
        error={errors.newPassword?.message}
        name='newPassword'
        setValue={setValue}
      />

      <FormField
        label='Xác nhận mật khẩu'
        type='password'
        register={register('confirmPassword', {
          required: FEILD_REQUIRED_RULE_MESSAGE,
          validate: (value) =>
            value === watch('newPassword') || 'Mật khẩu xác nhận không khớp'
        })}
        error={errors.confirmPassword?.message}
        name='confirmPassword'
        setValue={setValue}
      />

      <Button
        children={<span>Đặt Lại Mật Khẩu</span>}
        variant='filled'
        size='md'
        disabled={!isDirty || !isValid}
        type='submit'
        className={`interceptor-loading rounded-sm ${!isDirty || !isValid ? 'pointer-events-none' : ''}`}
      />
    </form>
  )
}

const FormField = ({
  label,
  type = 'text',
  disabled = false,
  showChangeButton = false,
  register,
  error,
  name,
  setValue
}) => {
  const [isDisabled, setIsDisabled] = useState(disabled)

  const handleChangeClick = () => {
    setIsDisabled(false)
    if (setValue && name) {
      setValue(name, '')
    }
  }

  return (
    <div className='flex items-center gap-4'>
      <label className='w-full max-w-[25%] text-gray-600'>{label}</label>
      <div className='grid-cols-[auto, 1fr] grid w-full'>
        <input
          type={type}
          disabled={isDisabled}
          className={`col-start-1 rounded-md border border-gray-300 px-3 py-2 outline-none ${isDisabled ? 'border-transparent' : 'col-span-2'}`}
          {...register}
        />
        {showChangeButton && isDisabled && (
          <button
            type='button'
            className='text-primary col-start-2 inline cursor-pointer'
            onClick={handleChangeClick}
          >
            Thay đổi
          </button>
        )}
        {error && (
          <p className='col-span-2 mt-1 text-sm text-red-500'>{error}</p>
        )}
      </div>
    </div>
  )
}

// Component Avatar cho Profile
const ProfileAvatar = ({ user }) => {
  return (
    <div className='col-span-1 flex max-w-2xs flex-col items-center justify-center'>
      <div className='h-32 w-32 overflow-hidden rounded-full border-2 border-gray-200'>
        <UserAvatar user={user} className='h-full w-full border-0' />
      </div>
      <button
        type='button'
        className='text-primary mt-2 cursor-pointer text-sm'
      >
        Upload Ảnh
      </button>
    </div>
  )
}
