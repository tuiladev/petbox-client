import TabHeading from './TabHeading'
import { UserAvatar } from '~/components/Header/UserTools'
import PersonalInfoForm from '../forms/PersonalInfoForm'
import PasswordChangeForm from '../forms/PasswordChangeForm'

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

const ProfileAvatar = ({ user }) => {
  return (
    <div className='col-span-1 flex max-w-2xs flex-col items-center justify-center'>
      <div className='h-32 w-32 overflow-hidden rounded-full border-2 border-gray-200'>
        <UserAvatar user={user} className='h-full w-full border-0' />
      </div>
      <button type='button' className='text-primary mt-2 cursor-pointer text-sm'>
        Upload Ảnh
      </button>
    </div>
  )
}
