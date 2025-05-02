import React from 'react'
import { DropdownTrigger } from '../../common'

const MenuTrigger = ({ dropdownState, className = '' }) => {
  return (
    <DropdownTrigger
      triggerProps={dropdownState.getTriggerProps()}
      className={className}
    >
      <button
        className={`title-xl ${dropdownState.isOpen ? 'text-secondary' : 'text-primary'} hidden cursor-pointer rounded-sm focus:outline-none md:block`}
      >
        Góc của Sen
        <i
          className={`fi fi-rr-caret-down ml-1 inline-block text-2xl transition-all duration-300 ${dropdownState.isOpen ? '-translate-y-1 rotate-z-180' : 'translate-y-1'}`}
        ></i>
      </button>

      {/* Mobile Trigger */}
      <i
        className={
          'text-primary fi fi-rr-apps block translate-y-1 text-3xl transition-all duration-300 md:hidden'
        }
      ></i>
    </DropdownTrigger>
  )
}

export default MenuTrigger
