import { memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { images } from '../../../assets'
import { userMenu } from '../../../data/mockdata'
import useDropdown from '../../../hooks/useDropdown'
import { IconLink, Dropdown } from '../../common'
import { useAuth } from '../../../redux/hooks/useAuth'

export const UserCard = memo(({ user, className = '' }) => {
  return (
    <div
      className={`bg-gradient-to-r from-amber-50 via-yellow-300 to-amber-500 p-6 md:p-4 ${className}`}
    >
      <div className='mb-4 flex items-center gap-x-4'>
        <UserAvatar user={user} />
        <div>
          <p className='title-lg line-clamp-1 text-gray-800'>
            {user?.fullName || 'Người dùng'}
          </p>
          <p className=''>{user?.email || 'user@example.com'}</p>
        </div>
      </div>
      <MembershipInfo user={user} />
    </div>
  )
})

export const UserAvatar = memo(({ user, className = '' }) => {
  return (
    <div
      className={`border-secondary group relative aspect-square h-14 w-14 rounded-full border-2 bg-white p-1 ${className}`}
    >
      <img
        src={user?.avatar || images.user_1}
        alt={user?.name || 'Người dùng'}
        className='aspect-square w-full rounded-full object-cover group-hover:cursor-pointer'
      />
      {user && (
        <img
          src={images.member_icon}
          alt='Membership'
          className='absolute top-full right-0 translate-x-1/4 -translate-y-3/4'
        />
      )}
    </div>
  )
})

const MenuItem = memo(({ item, onClick }) => {
  const isLogoutItem =
    item.icon.includes('sign-out') ||
    item.text.toLowerCase().includes('đăng xuất')

  const handleClick = useCallback(
    (e) => {
      if (isLogoutItem && onClick) {
        e.preventDefault()
        onClick()
      }
    },
    [isLogoutItem, onClick]
  )

  // Sử dụng Link cho điều hướng nội bộ
  if (!isLogoutItem) {
    return (
      <li className='group w-full'>
        <Link
          to={item.url}
          className={
            'hover:bg-secondary/10 hover:text-secondary flex w-full items-center py-2 pr-4 pl-8 font-medium transition-colors duration-200'
          }
        >
          {item.icon && (
            <span className='mr-3 translate-y-0.5 text-xl'>
              <i className={item.icon}></i>
            </span>
          )}
          {item.text}
        </Link>
      </li>
    )
  }

  // Sử dụng button cho logout
  const linkProps = {
    url: item.url,
    icon: item.icon,
    text: item.text,
    className: `w-full pl-8 pr-4 py-2 font-medium ${
      isLogoutItem ? 'py-4 pr-4 text-red-500 border-t border-gray-200' : ''
    }`,
    iconClassName: 'text-xl mr-3 translate-y-0.5',
    onClick: handleClick,
    // Props cho hiệu ứng
    hoverEffect: isLogoutItem
      ? 'hover:bg-red-100'
      : 'hover:bg-secondary/10 hover:text-secondary',
    transitionEffect: 'transition-colors duration-200'
  }

  return (
    <li className='group w-full'>
      <IconLink {...linkProps} />
    </li>
  )
})

const MenuGroup = memo(({ group, onLogout }) => {
  return (
    <>
      {group.title && (
        <p className='title-md text-primary px-4 py-3 uppercase'>
          {group.title}
        </p>
      )}
      {group.items.map((item) => (
        <MenuItem key={item.url || item.text} item={item} onClick={onLogout} />
      ))}
    </>
  )
})

const MembershipInfo = memo(({ user }) => {
  const membershipLevel = user?.membershipLevel || 'Hội viên cao cấp'
  const membershipPoints = user?.points || 0

  return (
    <div
      className={
        'flex w-full gap-x-4 rounded-full bg-white px-5 py-3 font-semibold shadow-sm'
      }
    >
      <p className='text-secondary capitalize'>{membershipLevel}</p>
      <p className='text-primary ml-auto'>
        {membershipPoints.toLocaleString()} điểm
      </p>
    </div>
  )
})

const Usertools = ({ className = '' }) => {
  const { user, logoutUser } = useAuth()
  const dropdownState = useDropdown({ openMode: 'hover' })

  return (
    <Dropdown className={className}>
      <Dropdown.Trigger triggerProps={dropdownState.getTriggerProps()}>
        <UserAvatar user={user} />
      </Dropdown.Trigger>

      <Dropdown.Content
        size='xs'
        position='right'
        contentProps={dropdownState.getContentProps()}
        isOpen={dropdownState.isOpen}
        className='overflow-hidden'
      >
        <UserCard user={user} />
        {userMenu.map((group, index) => (
          <MenuGroup key={index} group={group} onLogout={logoutUser} />
        ))}
      </Dropdown.Content>
    </Dropdown>
  )
}

export default Usertools
