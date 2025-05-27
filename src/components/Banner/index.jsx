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
    <section className='flex w-full flex-col gap-6 pt-4 pb-24'>
      <div className='grid h-full max-h-[32rem] w-full grid-cols-3 grid-rows-2 gap-6'>
        {/* Hero Section */}
        <div className='relative col-span-2 row-span-2 flex flex-col justify-center overflow-hidden rounded-3xl bg-gray-100'>
          <motion.div
            className='absolute top-1/2 left-0 w-4/5 -translate-y-1/2 px-20 text-white'
            variants={container}
            initial='hidden'
            animate='visible'
          >
            <motion.h2
              className='title-4xl mt-3 mb-3 text-4xl leading-tight capitalize'
              variants={fadeInUp}
            >
              {t('title')}
            </motion.h2>
            <motion.p className='mb-10 w-1/2 text-lg font-medium' variants={fadeInUp}>
              {t('subtitle')}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button
                size='lg'
                className='w-full rounded-full leading-none capitalize hover:border-white! hover:bg-transparent! md:w-fit'
                variant='outlined'
              >
                {t('button')}{' '}
                <span className='ml-2'>
                  <i className='fi fi-rr-arrow-right inline-block translate-y-0.5' />
                </span>
              </Button>
            </motion.div>
          </motion.div>
          <img
            src={images.banner_2}
            alt='Cute cat'
            className='h-full w-full rounded-3xl object-cover object-top'
          />
        </div>

        {/* Promo top right */}
        <div className='relative overflow-hidden rounded-3xl bg-gray-100'>
          <a
            href='#'
            className='absolute left-0 z-20 flex h-full w-full flex-col items-center justify-center text-center text-white'
          >
            <motion.p
              className='font-secondary pb-3 text-3xl font-bold'
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
            >
              {t('sale')}
              <span className='after:content-[] relative z-0 ml-3 text-3xl after:absolute after:-inset-2 after:-z-1 after:rounded-full after:bg-amber-300'>
                15%
              </span>
            </motion.p>
            <motion.p
              className='text-2xl font-semibold'
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
        <div className='relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gray-100'>
          <span className='title-2xl absolute -top-10 -right-5 h-32 w-32 rounded-full bg-pink-500 pt-16 pl-6 font-bold text-white shadow'>
            -12%
          </span>
          <div className='absolute p-6'>
            <motion.div
              className='mt-10 mb-6 text-white'
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.7, ease: 'easeOut' }}
            >
              <p className='text-lg leading-tight'>{t('forYour')}</p>
              <p className='title-2xl mt-2'>{t('onlineAppointment')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7, ease: 'easeOut' }}
            >
              <Button size='md' className='rounded-full px-8 font-bold!' variant='filled'>
                {t('appointment')}{' '}
                <span className='ml-2'>
                  <i className='fi fi-rr-arrow-right inline-block translate-y-0.5' />
                </span>
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
