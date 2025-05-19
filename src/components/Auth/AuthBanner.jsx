import { useTranslation } from 'react-i18next'
import { images } from '~/assets'
import Logo from '~/components/common/Logo'

const AuthBanner = () => {
  const { t } = useTranslation()
  return (
    <div className='relative hidden w-full max-w-2/5 overflow-hidden rounded-2xl shadow-lg md:block lg:max-w-lg'>
      <div className='absolute top-12 left-1/2 z-10 w-9/10 -translate-x-1/2'>
        <Logo type='dark' className='mx-auto mb-9 max-w-2xs!' />
        <h2 className='title-2xl text-center leading-normal! text-white'>
          {t('banner.slogan')}
        </h2>
      </div>
      {/* Backgound images */}
      <img
        src={images.auth_banner}
        alt='Banner'
        className='h-full w-full object-cover object-center'
      />
    </div>
  )
}

export default AuthBanner
