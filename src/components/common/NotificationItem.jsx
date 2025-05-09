import React from 'react'
import { useState } from 'react'

const NotificationItem = ({ notification, toggleRead }) => {
  const [isRead, setIsRead] = useState(notification.isRead)

  const getIconColor = () => {
    if (!isRead) {
      if (notification.type === 'delivered') return 'text-green-500'
      if (notification.type === 'shipping') return 'text-blue-500'
      if (notification.type === 'warning') return 'text-red-500'
      if (notification.type === 'promotion') return 'text-yellow-500'
    }
    return 'text-gray-800'
  }

  const getIconBgColor = () => {
    if (!isRead) {
      if (notification.type === 'delivered') return 'bg-green-100'
      if (notification.type === 'shipping') return 'bg-blue-100'
      if (notification.type === 'warning') return 'bg-red-100'
      if (notification.type === 'promotion') return 'bg-yellow-100'
    }
    return 'bg-gray-100'
  }

  const getBaseBg = () => {
    if (isRead) return 'opacity-60 bg-gray-50'
    if (notification.type === 'delivered') return 'bg-green-50/50'
    if (notification.type === 'shipping') return 'bg-blue-50/50'
    if (notification.type === 'warning') return 'bg-red-50'
    if (notification.type === 'promotion') return 'bg-amber-50/50'
    return 'bg-gray-50/50'
  }

  const getHoverEffect = () => {
    if (!isRead) {
      if (notification.type === 'delivered')
        return 'hover:bg-green-50 hover:translate-x-2 hover:-translate-y-2'
      if (notification.type === 'shipping')
        return 'hover:bg-blue-50 hover:translate-x-2 hover:-translate-y-2'
      if (notification.type === 'warning')
        return 'hover:bg-red-50 hover:translate-x-2 hover:-translate-y-2'
      if (notification.type === 'promotion')
        return 'hover:bg-yellow-50 hover:translate-x-2 hover:-translate-y-2'
    }
    return 'hover:bg-gray-100'
  }

  return (
    <li>
      <a
        href={notification.url}
        className={`flex items-center gap-x-4 rounded px-4 py-3 ${getBaseBg()} ${
          notification.type === 'warning' && !isRead
            ? 'border-l-4 border-red-500'
            : ''
        } ${getHoverEffect()} relative z-10 transition-all duration-300 ease-in-out hover:shadow-md`}
        onClick={(e) => {
          e.preventDefault()
          const newReadStatus = !isRead
          setIsRead(newReadStatus)
          toggleRead(notification.id, newReadStatus)
        }}
      >
        <div
          className={`aspect-square h-12 w-12 rounded-full ${getIconBgColor()} flex shrink-0 items-center justify-center transition-colors duration-300`}
        >
          <i
            className={`text-lg ${getIconColor()} ${notification.icon} transition-colors duration-300`}
          ></i>
        </div>
        <div className='flex-1'>
          <p
            className={`title-md mb-2 line-clamp-2 font-medium! ${
              notification.type === 'warning' && !isRead
                ? 'text-red-500'
                : 'text-zinc-700'
            } transition-colors duration-300`}
          >
            {notification.title}
          </p>
          <span
            className={
              'flex items-center gap-x-1 text-sm text-gray-500 transition-colors duration-300'
            }
          >
            <i className='fi fi-rr-clock text-xs'></i>
            {notification.time}
          </span>
        </div>
      </a>
    </li>
  )
}

export default NotificationItem
