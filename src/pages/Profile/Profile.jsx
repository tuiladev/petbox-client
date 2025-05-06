import { useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'

// Redux selector
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'

// Tabs components
import AddressTab from './tabs/AddressTab'
import NotificationTab from './tabs/NotificationTab'
import PaymentTab from './tabs/PaymentTab'
import PetTab from './tabs/PetTab'
import ProfileTab from './tabs/ProfileTab'

// Another component
import Sidebar from '~/components/features/Profile/Sidebar'

const Profile = () => {
  // Defaul route to profile tab
  const navigate = useNavigate()
  const { tabName = 'profile' } = useParams()
  const [activeMenuItem, setActiveMenuItem] = useState(tabName)

  // Take userInfo
  const user = useSelector(selectCurrentUser)

  // Set active tab class style
  useEffect(() => {
    setActiveMenuItem(tabName)
  }, [tabName])

  // Handler user click
  const handleMenuItemChange = (menuItem) => {
    setActiveMenuItem(menuItem)
    navigate(`/account/${menuItem}`)
  }

  // Render page base tabName from url
  const getContent = () => {
    switch (tabName) {
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
        return <Navigate to='/404' />
    }
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
