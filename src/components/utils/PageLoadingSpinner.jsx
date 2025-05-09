const PageLoadingSpinner = ({ caption = '' }) => {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-y-4 bg-white'>
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
