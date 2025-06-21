import { DropdownTrigger } from '~/components/common/Dropdown'
import { useTranslation } from 'react-i18next'

const MenuTrigger = ({ dropdownState, className = '' }) => {
  const { t } = useTranslation('header')
  return (
    <DropdownTrigger triggerProps={dropdownState.getTriggerProps()} className={className}>
      <button
        className={`title-lg ${dropdownState.isOpen ? 'text-secondary' : 'text-primary'} hidden cursor-pointer rounded-sm focus:outline-none md:block`}
      >
        {t('navigation.menu')}
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
