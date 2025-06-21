import { useTranslation } from 'react-i18next'

const TabHeading = ({ title = '' }) => {
  const { t } = useTranslation('profile')
  return (
    <h2 className='title-lg text-primary mb-6 font-semibold capitalize'>{t(`tab.${title}`)}</h2>
  )
}

export default TabHeading
