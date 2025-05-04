import { useState, useEffect } from 'react'

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className='fixed right-6 bottom-20 z-50 cursor-pointer rounded-full bg-amber-600 p-3 text-white shadow-lg transition-all duration-300 hover:bg-amber-400 md:right-12'
          aria-label='Go to top'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M12 19V5M5 12l7-7 7 7' />
          </svg>
        </button>
      )}
    </>
  )
}

export default GoToTopButton
