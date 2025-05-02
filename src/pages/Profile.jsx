import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  AddressTab,
  PaymentTab,
  PetTab,
  ProfileTab,
  NotificationTab,
  Sidebar
} from '../components/features/Profile'
import { profileMenuItems } from '../data/mockdata'
import { useAuth } from '../redux/hooks/useAuth'

const Profile = () => {
  const navigate = useNavigate()
  const { section = 'profile' } = useParams()
  const [activeMenuItem, setActiveMenuItem] = useState(section)

  const { isAuthenticated, user } = useAuth()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: `/account/${section}` } })
    }
  }, [isAuthenticated, navigate, section])

  useEffect(() => {
    setActiveMenuItem(section)
  }, [section])

  const handleMenuItemChange = (menuItem) => {
    setActiveMenuItem(menuItem)
    navigate(`/account/${menuItem}`)
  }

  const getContent = () => {
    if (!isAuthenticated) return null
    switch (section) {
      case 'profile':
        return <ProfileTab user={user} />
      case 'address':
        return <AddressTab user={user} />
      case 'payment':
        return <PaymentTab user={user} />
      case 'pets':
        return <PetTab user={user} />
      case 'notifications':
        return <NotificationTab user={user} />
      default:
        // Default content for other menu items
        return (
          <div className='p-6'>
            <h2 className='mb-4 text-xl font-semibold'>
              Nội dung cho
              {
                profileMenuItems.find((item) => item.id === activeMenuItem)
                  ?.label
              }
            </h2>
            <p className='text-gray-500'>
              Tính năng này đang được phát triển...
            </p>
          </div>
        )
    }
  }

  if (!isAuthenticated) {
    return (
      <div className='p-6 text-center'>
        Đang chuyển hướng đến trang đăng nhập...
      </div>
    )
  }
  return (
    <div className='l-container pt-12! pb-24!'>
      <h2 className='title-xl mb-6 ml-14 text-gray-800'>
        Chào mừng, {user.fullName}
      </h2>
      <div className='flex gap-8'>
        <Sidebar
          activeTab={activeMenuItem}
          onTabChange={handleMenuItemChange}
          className='w-full max-w-xs'
        />
        <div className='grow'>{getContent()}</div>
      </div>
    </div>
  )
}

export default Profile
