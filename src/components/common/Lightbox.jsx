import { useState, useEffect, useRef } from 'react'

function Lightbox({ images, startIndex, onClose, productName }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex)
  const lightboxRef = useRef(null)

  // Prevent body scroll while open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft') navigate(-1)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Focus container
  useEffect(() => {
    lightboxRef.current?.focus()
  }, [])

  const navigate = (direction) => {
    setCurrentIndex((i) => (i + direction + images.length) % images.length)
  }

  return (
    <div
      className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/15'
      onClick={onClose}
      ref={lightboxRef}
      tabIndex={-1}
    >
      <div
        className='h-full max-h-[36rem] w-full max-w-4xl gap-x-4 rounded-lg bg-white p-3 shadow-lg md:flex'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Image Section */}
        <div className='relative flex flex-1 items-center justify-center overflow-hidden rounded-md'>
          <button
            className='bg-opacity-30 absolute left-0 z-10 cursor-pointer bg-gray-400 px-3 py-5 text-white'
            onClick={() => navigate(-1)}
          >
            <i className='fi fi-sr-angle-left block translate-y-0.5 text-lg text-white' />
          </button>
          <img
            src={images[currentIndex]}
            alt={`Preview ${currentIndex + 1}`}
            className='h-full w-full object-contain object-center transition-opacity duration-300 ease-in-out'
          />
          <button
            className='bg-opacity-30 absolute right-0 z-10 cursor-pointer bg-gray-400 px-3 py-5 text-white'
            onClick={() => navigate(1)}
          >
            <i className='fi fi-sr-angle-right block translate-y-0.5 text-lg text-white' />
          </button>
        </div>

        {/* Thumbnails Sidebar */}
        <div className='hidden overflow-y-auto md:block md:w-1/3'>
          <p className='py-4 text-lg leading-normal font-semibold'>{productName}</p>
          <div className='grid grid-cols-3 gap-4'>
            {images.map((src, idx) => (
              <div
                key={idx + src}
                className={`aspect-square cursor-pointer overflow-hidden rounded-md border-2 p-2 hover:opacity-80 ${
                  idx === currentIndex ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => setCurrentIndex(idx)}
              >
                <img
                  src={src}
                  alt={`Thumb ${idx + 1}`}
                  className='w-full object-cover object-center'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lightbox
