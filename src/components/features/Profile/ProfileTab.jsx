import { useState } from 'react'
import Button from '~/components/common/Button'
import { UserAvatar } from '~/components/layout/Header/UserTools'
import TabHeading from './TabHeading'

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

// Component quản lý form thông tin cá nhân
const PersonalInfoForm = ({ user }) => {
  const [name, setName] = useState(user?.fullName || '')

  const handleUpdateSubmit = (e) => {
    e.preventDefault()
    // Xử lý cập nhật thông tin cá nhân
  }

  return (
    <form onSubmit={handleUpdateSubmit} className='col-span-3 space-y-4'>
      <FormField
        label='Họ và tên'
        value={name}
        onChange={(e) => setName(e.target.value)}
        type='text'
      />

      <FormField
        label='Email'
        value={user?.email || ''}
        disabled={true}
        showChangeButton={true}
      />

      <FormField
        label='Số điện thoại'
        value={user?.phone || ''}
        disabled={true}
        showChangeButton={true}
      />

      <Button
        children={<span>Lưu Thay Đổi</span>}
        variant='filled'
        size='md'
        type='submit'
      />
    </form>
  )
}

// Component quản lý form thay đổi mật khẩu
const PasswordChangeForm = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleResetPassword = (e) => {
    e.preventDefault()
    // Xử lý reset mật khẩu
  }

  return (
    <form onSubmit={handleResetPassword} className='col-span-3 space-y-4'>
      <FormField
        label='Mật khẩu cũ'
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        type='password'
      />

      <FormField
        label='Mật khẩu mới'
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        type='password'
      />

      <FormField
        label='Xác nhận mật khẩu'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type='password'
      />

      <Button
        children={<span>Đặt Lại Mật Khẩu</span>}
        variant='filled'
        size='md'
        type='submit'
      />
    </form>
  )
}

// Component Field tái sử dụng
const FormField = ({
  label,
  value,
  onChange,
  type = 'text',
  disabled = false,
  showChangeButton = false
}) => {
  return (
    <div className='flex items-center gap-4'>
      <label className='w-full max-w-1/4 text-gray-600'>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${disabled ? 'px-3 py-2' : 'w-full rounded-md border border-gray-300 px-3 py-2 outline-none'}`}
      />
      {showChangeButton && (
        <button type='button' className='text-primary cursor-pointer'>
          Thay đổi
        </button>
      )}
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
export default ProfileTab
