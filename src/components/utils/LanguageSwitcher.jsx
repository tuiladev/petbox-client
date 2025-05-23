import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { setLanguage } from '~/redux/languages/languageSlice'
import Dropdown from '~/components/common/Dropdown'
import useDropdown from '~/hooks/useDropdown'
import PageLoadingSpinner from './PageLoadingSpinner'

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
  const dispatch = useDispatch()
  const currentLanguage = useSelector((state) => state.language.currentLanguage)
  const { i18n } = useTranslation()
  const { isOpen, getTriggerProps, getContentProps } = useDropdown({ openMode: 'click' })

  const handleLanguageChange = (lang) => {
    if (lang === i18n.language) return

    i18n.changeLanguage(lang).then(() => {
      dispatch(setLanguage(lang))
      window.location.reload()
    })
  }

  return (
    <>
      <Dropdown className='relative ml-2'>
        <Dropdown.Trigger
          className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 ${isOpen ? 'text-white' : ''} hover:text-white focus:text-white`}
          triggerProps={getTriggerProps()}
        >
          <img src={languages[currentLanguage].flag} alt={currentLanguage} className='h-6 w-6' />
          <span>{languages[currentLanguage].name}</span>
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
              className={`group flex w-full cursor-pointer items-center gap-2 px-2 py-3 text-left ${currentLanguage === code ? 'bg-primary/5' : ''}`}
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
