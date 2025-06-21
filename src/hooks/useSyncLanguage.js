import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { selectCurrentLanguage } from '~/redux/user/userSlice'

export const useSyncLanguage = () => {
  const currentLanguage = useSelector(selectCurrentLanguage)
  const { i18n } = useTranslation()

  useEffect(() => {
    if (currentLanguage && i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [currentLanguage, i18n])

  return currentLanguage
}
