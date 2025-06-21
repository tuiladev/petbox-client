import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import TabHeading from './TabHeading'
import { UserAvatar } from '~/components/Header/UserTools'
import PersonalInfoForm from '../forms/PersonalInfoForm'
import PasswordChangeForm from '../forms/PasswordChangeForm'
import { updateUserAPI } from '~/redux/user/userSlice'
import { env } from '~/config/enviroment'

const ProfileTab = ({ user }) => {
  return (
    <>
      <TabHeading title='personalInfo' />
      <div className='grid grid-cols-3'>
        <div className='col-span-2 space-y-8'>
          <PersonalInfoForm user={user} />
          <PasswordChangeForm />
        </div>
        <ProfileAvatar user={user} />
      </div>
    </>
  )
}

const ProfileAvatar = ({ user }) => {
  const [uploading, setUploading] = useState(false)
  const dispatch = useDispatch()
  const formRef = useRef(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      onFormSubmit()
    }
  }

  const onFormSubmit = async () => {
    const formData = new FormData(formRef.current)
    const file = formData.get('file')
    if (!file || file.size === 0) return
    await handleSubmit({ file, formData })
    formRef.current.reset()
  }

  const handleSubmit = async (data) => {
    const { formData } = data
    setUploading(true)
    formData.append('upload_preset', env.CLOUDINARY_UPLOAD_PRESET)
    try {
      const response = await fetch(env.CLOUDINARY_URL, {
        method: 'POST',
        body: formData
      })
      const result = await response.json()
      if (result.secure_url) {
        dispatch(updateUserAPI({ avatar: result.secure_url }))
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='col-span-1 flex max-w-2xs flex-col items-center justify-center'>
      <div className='h-32 w-32 overflow-hidden rounded-full border-2 border-gray-200'>
        <UserAvatar user={user} className='h-full w-full border-0' />
      </div>

      <form ref={formRef}>
        <label className='text-primary mt-2 cursor-pointer text-sm'>
          {uploading ? 'Đang tải...' : 'Upload Ảnh'}
          <input
            type='file'
            name='file'
            accept='image/*'
            onChange={handleFileChange}
            className='hidden'
            disabled={uploading}
          />
        </label>
      </form>
    </div>
  )
}

export default ProfileTab
