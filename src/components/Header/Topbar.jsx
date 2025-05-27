import { getStoreInfo, getSocials } from '~/config/siteConfig'
import IconLink from '~/components/common/IconLink.jsx'
import LanguageSwitcher from '../utils/LanguageSwitcher'

const Topbar = ({ className = '', showOnMobile = false }) => {
  const storeInfo = getStoreInfo()
  const socials = getSocials()
  return (
    <div className={`bg-primary ${showOnMobile ? 'block' : 'hidden sm:block'} ${className}`}>
      <div className='l-container flex flex-wrap items-center justify-center gap-y-4 py-2! text-white md:justify-between'>
        {/* Left Side */}
        <div className='flex items-center gap-x-4'>
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Address */}
          {storeInfo.length > 0 && (
            <IconLink
              icon={storeInfo[0].icon}
              text={storeInfo[0].text}
              url={storeInfo[0].url}
              internal={storeInfo[0].url.startsWith('/')}
              iconClassName='text-white translate-y-0.5'
              textClassName='hidden sm:inline'
            />
          )}
          {/* Separate */}
          <span className='text-gray-400' aria-hidden='true'>
            /
          </span>

          {/* Contact */}
          {storeInfo.length > 1 && (
            <IconLink
              icon={storeInfo[1].icon}
              text={storeInfo[1].text}
              url={storeInfo[1].url}
              iconClassName='text-white translate-y-0.5'
              textClassName='hidden sm:inline'
            />
          )}
        </div>

        {/* Right Side */}
        <div className='flex items-center gap-x-4 text-white'>
          {/* Business Hour */}
          {storeInfo.length > 2 && (
            <IconLink
              icon={storeInfo[2].icon}
              text={storeInfo[2].text}
              iconClassName='translate-y-0.5'
              textClassName='hidden sm:inline'
            />
          )}

          {/* Separate */}
          <span className='text-gray-400' aria-hidden='true'>
            /
          </span>

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
