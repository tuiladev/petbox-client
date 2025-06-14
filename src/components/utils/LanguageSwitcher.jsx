import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Dropdown from '~/components/common/Dropdown'
import useDropdown from '~/hooks/useDropdown'
import PageLoadingSpinner from './PageLoadingSpinner'

// Define the language options
const languages = {
  en: {
    flag: 'https://img.icons8.com/color/48/great-britain.png',
    name: 'English'
  },
  vi: {
    flag: 'https://img.icons8.com/color/48/vietnam.png',
    name: 'Tiếng Việt'
  }
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const { isOpen, setIsOpen, getTriggerProps, getContentProps } = useDropdown({ openMode: 'click' })
  const [isLoading, setIsLoading] = useState(false)

  const handleLanguageChange = (lang) => {
    // Don't change if equal current language
    if (lang === i18n.language) return

    // Close dropdown & show spinner
    setIsOpen(false)
    setIsLoading(true)

    // Handler onchange language
    const onChange = () => {
      setTimeout(() => {
        setIsLoading(false)
        i18n.off('languageChanged', onChange)
      }, 500)
    }

    // Change language
    i18n.on('languageChanged', onChange)
    i18n.changeLanguage(lang)
  }

  return (
    <>
      {isLoading && <PageLoadingSpinner caption='Loading ...' />}
      <Dropdown className='relative ml-2'>
        <Dropdown.Trigger
          className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 ${isOpen ? 'text-white' : ''} hover:text-white focus:text-white`}
          triggerProps={getTriggerProps()}
        >
          <img
            src={languages[i18n.language].flag}
            alt={languages[i18n.language].name}
            className='h-6 w-6'
          />
          <span>{languages[i18n.language].name}</span>
          <svg
            className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </Dropdown.Trigger>

        <Dropdown.Content
          isOpen={isOpen}
          position='center'
          className='top-full! z-50 mt-2 w-40 overflow-hidden'
          contentProps={getContentProps()}
        >
          {Object.entries(languages).map(([code, { flag, name }]) => (
            <button
              key={code}
              className={`group flex w-full cursor-pointer items-center gap-2 px-2 py-3 text-left ${i18n.language === code ? 'bg-primary/5' : ''}`}
              onClick={() => handleLanguageChange(code)}
            >
              <img src={flag} alt={code} className='h-6 w-6' />
              <span className='text-base-content group-hover:text-primary'>{name}</span>
            </button>
          ))}
        </Dropdown.Content>
      </Dropdown>
    </>
  )
}
