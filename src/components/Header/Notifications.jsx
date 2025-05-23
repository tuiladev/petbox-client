import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getNotifications } from '~/data/mockdata'
import Dropdown from '~/components/common/Dropdown'
import NotificationItem from '~/components/common/NotificationItem'
import EmptyNotification from '~/components/common/EmptyNotification'
import useDropdown from '~/hooks/useDropdown'

const Notifications = () => {
  const notifications = getNotifications()
  const [notificationsList, setNotificationsList] = useState(notifications)
  const dropdownState = useDropdown({ openMode: 'click' })

  const unreadCount = notificationsList.filter((notif) => !notif.isRead).length

  const hasUnreadWarning = notificationsList.some(
    (notif) => !notif.isRead && notif.type === 'warning'
  )

  const toggleReadStatus = (id, newReadStatus) => {
    setNotificationsList((currentNotifications) =>
      currentNotifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: newReadStatus } : notif
      )
    )
  }

  return (
    <Dropdown>
      <Dropdown.Trigger triggerProps={dropdownState.getTriggerProps()}>
        <Link to='/notifications' className='relative translate-y-1'>
          <i
            className={`fi fi-rr-bell text-2xl transition-transform duration-300 hover:scale-110 ${dropdownState.isOpen ? 'text-secondary' : hasUnreadWarning ? 'text-red-500' : 'text-primary'}`}
          ></i>
          {unreadCount > 0 && (
            <span
              className={`absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white ${hasUnreadWarning ? 'bg-red-500' : 'bg-secondary'}`}
            >
              {unreadCount}
            </span>
          )}
        </Link>
      </Dropdown.Trigger>

      <Dropdown.Content
        size='sm'
        position='right'
        className='hidden p-0! md:block'
        contentProps={dropdownState.getContentProps()}
        isOpen={dropdownState.isOpen}
      >
        <div className='title-xl text-primary border-b border-gray-200 p-4'>Thông báo</div>

        {notificationsList && notificationsList.length > 0 ? (
          <ul>
            {notificationsList.slice(0, 3).map((notification, index) => (
              <NotificationItem
                key={index}
                notification={notification}
                toggleRead={toggleReadStatus}
              />
            ))}
          </ul>
        ) : (
          <EmptyNotification />
        )}

        <Link
          to='/notifications'
          className='text-primary group block border-t border-gray-200 p-4 text-center transition-colors duration-300 hover:bg-gray-50'
        >
          Xem tất cả{' '}
          <i className='fi fi-rr-arrow-right pointer-events-none inline-block -translate-x-5 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100'></i>
        </Link>
      </Dropdown.Content>
    </Dropdown>
  )
}

export default Notifications
