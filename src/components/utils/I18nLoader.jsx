// src/components/I18nLoader.jsx
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import PageLoadingSpinner from './PageLoadingSpinner'

export default function I18nLoader({ children }) {
  const { ready, i18n } = useTranslation()
  const currentLang = useSelector((state) => state.language.currentLanguage)
  const [blocking, setBlocking] = useState(true)

  useEffect(() => {
    const MIN_TIME = 500
    const start = Date.now()
    const init = async () => {
      if (!ready) return
      if (i18n.language !== currentLang) {
        await i18n.changeLanguage(currentLang)
      }
      const elapsed = Date.now() - start
      const remain = Math.max(0, MIN_TIME - elapsed)
      setTimeout(() => setBlocking(false), remain)
    }
    init()
  }, [ready, currentLang, i18n])

  if (blocking) {
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-white'>
        <PageLoadingSpinner />
      </div>
    )
  }

  return children
}
