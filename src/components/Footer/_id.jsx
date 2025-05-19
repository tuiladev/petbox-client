import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { selectCurrentLanguage } from '~/redux/languages/languageSlice'
import {
  getCategories,
  getHelps,
  getServices,
  getStoreInfo,
  socials
} from '~/data/mockdata'
import IconLink from '~/components/common/IconLink'
import Logo from '~/components/common/Logo'

const FooterCol = ({ title = '', list }) => {
  return (
    <div className='w-full'>
      <h3 className='title-xl relative mb-10 capitalize'>
        {title}
        <span className='bg-secondary absolute top-full left-0 mt-3 h-1 w-8 rounded-full'></span>
      </h3>
      <ul className='space-y-6'>
        {list.map((item, index) => (
          <li key={index} className=''>
            <Link className="relative py-1 transition-all duration-300 ease-in-out after:absolute after:top-full after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 after:ease-in-out after:content-[''] hover:after:w-full">
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Footer = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = useSelector(selectCurrentLanguage)

  useEffect(() => {
    if (currentLanguage && i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [currentLanguage, i18n])

  const localCategories = getCategories()
  const localServices = getServices()
  const localStoreInfo = getStoreInfo()
  const helps = getHelps()
  return (
    <footer className='bg-primary text-white shadow-lg'>
      <div className='l-container'>
        <div className='grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 md:gap-y-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]'>
          {/* Logo and Description */}
          <div className='col-span-1 w-9/10 md:max-lg:col-span-3'>
            <Logo type='dark' className='mb-4' />
            <p className='mb-8 leading-relaxed text-gray-200'>
              {t('footer.description')}
            </p>

            <div className='mt-6'>
              <h3 className='title-md mb-3'>{t('footer.followUs')}</h3>
              {/* Social Media */}
              <div className='flex items-center gap-x-4'>
                {socials.map((social, index) => (
                  <IconLink
                    key={index}
                    icon={social.icon}
                    url={social.url}
                    external={true}
                    iconClassName='text-white text-xl translate-y-0.5'
                    textClassName='sr-only'
                    text={social.text}
                  />
                ))}
              </div>
            </div>
          </div>
          <FooterCol title={t('footer.products')} list={localCategories} />
          <FooterCol title={t('footer.services')} list={localServices} />
          <FooterCol title={t('footer.contact')} list={localStoreInfo} />
        </div>
      </div>

      {/* Bottom Footer */}
      <div className='border-t border-gray-50 text-white'>
        <div className='l-container mx-auto flex flex-col items-center justify-between gap-y-2 py-6! md:flex-row'>
          <p>
            {t('footer.copyright')} {new Date().getFullYear()} The Pet&apos;s
            Box
          </p>
          <ul className='flex flex-wrap justify-center gap-x-6'>
            {helps.map((item, index) => (
              <Link key={index} href={item.url}>
                {item.text}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
