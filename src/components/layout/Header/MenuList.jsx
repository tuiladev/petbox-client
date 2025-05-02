import React, { memo, useState } from 'react'
import { IconLink } from '../../common'

export const MenuItem = memo(({ category, className = '' }) => {
  return (
    <li
      className={`border-t border-gray-100 p-4 pl-12 md:ml-4 md:border-none md:p-0 md:not-last:mb-4 ${className}`}
    >
      <IconLink
        icon={category.icon}
        text={category.text}
        url={category.url}
        gap='gap-x-4'
        className='font-medium'
        iconClassName='text-xl'
        hoverEffect='hover:text-secondary'
      />
    </li>
  )
})

const MenuList = memo(({ isMobile = false, title, items }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='border-t border-gray-100 last:border-b md:border-none'>
      <div
        className={`flex items-center justify-between border-l-4 px-6 py-3 md:mb-6 md:p-0 md:px-0 ${isMobile ? 'cursor-pointer' : 'border-none'} ${isOpen ? 'border-primary' : 'border-l-transparent'}`}
        onClick={isMobile ? toggleAccordion : undefined}
      >
        <p className='title-xl text-primary capitalize'>{title}</p>
        {isMobile && (
          <i
            className={`fi transition-color flex aspect-square h-10 w-10 items-center justify-center rounded-sm text-xs duration-500 ${!isOpen ? 'fi-rr-minus text-primary bg-blue-50' : 'fi-rr-plus bg-primary text-white'}`}
          ></i>
        )}
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out will-change-transform ${
          isMobile && !isOpen ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
        }`}
      >
        <ul>
          {items.map((item, index) => (
            <MenuItem key={index} category={item} />
          ))}
        </ul>
      </div>
    </div>
  )
})

export default MenuList
