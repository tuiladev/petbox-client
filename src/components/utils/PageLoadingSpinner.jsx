import { useEffect } from 'react'

const PageLoadingSpinner = ({ caption = '' }) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden')
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])
  return (
    <div className='fixed inset-0 z-99999 flex flex-col items-center justify-center gap-y-4 bg-white'>
      <div
        className='inline-block size-8 animate-spin rounded-full border-3 border-current border-t-transparent text-blue-600 dark:text-blue-500'
        role='status'
        aria-label='loading'
      ></div>
      {caption && <p className='ml-4 text-lg text-blue-600'>{caption}</p>}
    </div>
  )
}

export default PageLoadingSpinner
