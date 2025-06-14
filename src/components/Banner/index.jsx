import { useTranslation } from 'react-i18next'
import Button from '~/components/common/Button'
import { images } from '~/assets'
import { motion } from 'framer-motion'

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
}
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
}

const Banner = () => {
  const { t } = useTranslation('banner')

  return (
    <section className='md:pt-4 md:pb-24'>
      <div className='grid w-full grid-cols-2 grid-rows-[2fr_1fr] gap-4 md:max-h-[32rem] md:grid-cols-3 md:grid-rows-2 md:gap-6'>
        {/* Hero Section */}
        <div className='relative col-span-2 flex flex-col justify-center overflow-hidden rounded-3xl bg-gray-100 md:row-span-2 md:h-full'>
          <motion.div
            className='absolute top-1/2 left-0 -translate-y-1/2 px-10 text-white md:w-4/5 lg:px-20'
            variants={container}
            initial='hidden'
            animate='visible'
          >
            <motion.h2
              className='title-4xl mt-3 mb-3 pr-3 capitalize md:w-full'
              variants={fadeInUp}
            >
              {t('title')}
            </motion.h2>
            <motion.p
              className='mb-5 w-2/3 leading-normal md:mb-10 md:w-1/2 md:text-lg'
              variants={fadeInUp}
            >
              {t('subtitle')}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button
                size='md'
                variant='filled'
                iconRight='fi fi-sr-arrow-right'
                className='!text-primary !bg-white hover:!border-white hover:!bg-transparent hover:!text-white'
              >
                <span className='mr-2 uppercase'>{t('button')}</span>
              </Button>
            </motion.div>
          </motion.div>
          <img
            src={images.banner_2}
            alt='Cute cat'
            className='aspect-10/9 rounded-3xl object-cover object-top md:h-full md:w-full'
          />
        </div>

        {/* Promo top right */}
        <div className='relative overflow-hidden rounded-3xl bg-gray-100 md:h-full'>
          <a
            href='#'
            className='absolute left-0 z-20 flex h-full w-full flex-col items-center justify-center text-center text-white'
          >
            <motion.p
              className='title-2xl pb-3'
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
            >
              {t('sale')}
              <span className='after:content-[] relative z-0 ml-3 text-2xl after:absolute after:-inset-2 after:-z-1 after:rounded-full after:bg-amber-300 md:text-3xl'>
                15%
              </span>
            </motion.p>
            <motion.p
              className='w-2/3 text-xl font-semibold md:w-full md:text-2xl'
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
            >
              {t('forMembership')}
            </motion.p>
          </a>
          <img
            src={images.banner_1}
            alt='Cute cat'
            className='h-full w-full rounded-3xl object-cover object-center'
          />
          <div className='absolute top-0 left-0 z-10 h-full w-full bg-black/15'></div>
        </div>

        {/* Promo bottom right */}
        <div className='relative overflow-hidden rounded-3xl bg-gray-100 md:h-full'>
          <span className='title-3xl absolute -top-8 -right-8 flex h-28 w-28 items-center justify-center rounded-full bg-pink-500 pt-6 pr-6 font-bold text-white shadow md:-top-8 md:-right-8 md:h-32 md:w-32'>
            -12%
          </span>
          <div className='absolute top-1/2 left-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2'>
            <motion.div
              className='mb-2 text-white md:mb-6'
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.7, ease: 'easeOut' }}
            >
              <p className='md:text-xl md:leading-tight'>{t('forYour')}</p>
              <p className='title-2xl mt-2'>{t('onlineAppointment')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7, ease: 'easeOut' }}
            >
              <Button size='md' variant='filled' iconRight='fi fi-sr-arrow-right'>
                <span className='mr-2'>{t('appointment')}</span>
              </Button>
            </motion.div>
          </div>
          <img
            src={images.banner_3}
            alt='Cute cat'
            className='h-full w-full rounded-3xl object-cover object-center'
          />
        </div>
      </div>
    </section>
  )
}

export default Banner
