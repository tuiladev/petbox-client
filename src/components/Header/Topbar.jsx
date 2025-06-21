import { getStoreInfo, socials } from '~/config/siteConfig'
import IconLink from '~/components/common/IconLink.jsx'
import LanguageSwitcher from '../utils/LanguageSwitcher'
import { useTranslation } from 'react-i18next'

const Topbar = ({ className = '', showOnMobile = false }) => {
  const { t } = useTranslation('common')
  const storeInfo = getStoreInfo()
  return (
    <div className={`bg-primary ${showOnMobile ? 'block' : 'hidden sm:block'} ${className}`}>
      <div className='l-container flex flex-wrap items-center justify-center gap-y-4 py-2! text-white md:justify-between'>
        {/* Left Side */}
        <div className='flex items-center gap-x-4'>
          <LanguageSwitcher />
        </div>

        {/* Right Side */}
        <div className='flex items-center gap-x-4 text-white'>
          {/* Contact */}
          <IconLink
            icon={storeInfo[0].icon}
            text={t(`${storeInfo[0].text}`)}
            url={storeInfo[0].url}
            iconClassName='text-white translate-y-0.5'
            textClassName='hidden sm:inline'
          />

          {/* Separate */}
          <span className='text-gray-400' aria-hidden='true'>
            /
          </span>
          <span>{t('follow')}</span>

          {/* Social Media */}
          <div className='flex items-center gap-x-3'>
            {socials.map((social, index) => (
              <IconLink
                key={index}
                icon={social.icon}
                url={social.url}
                external={true}
                iconClassName='text-white translate-y-0.5'
                textClassName='sr-only'
                text={social.text}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
