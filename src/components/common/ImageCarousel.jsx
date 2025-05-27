import { useState, useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Lightbox from './Lightbox'

const ImageCarousel = ({ images, options, className, productName }) => {
  // Initial state
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    watchDrag: false
  })

  // Handler scroll thumbnails
  const thumbContainerRef = useRef(null)
  const scrollThumbnails = (direction) => {
    const container = thumbContainerRef.current
    if (!container) return
    const children = container.children
    if (!children.length) return
    const thumbRect = children[0].getBoundingClientRect()
    const thumbWidth = thumbRect.width
    const style = getComputedStyle(container)
    const gap = parseFloat(style.columnGap) || 0
    const scrollAmt = thumbWidth + gap
    container.scrollBy({
      left: direction === 'next' ? scrollAmt : -scrollAmt,
      behavior: 'smooth'
    })
  }

  // Handler click on thumbnail
  const onThumbClick = useCallback(
    (index) => {
      // Make sure all api is ready (not undefined)
      if (!emblaMainApi || !emblaThumbsApi) return

      // Turn jump: true to disable animation
      emblaMainApi.scrollTo(index, true)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  // Sync selected index to thumbnail
  const onSelect = useCallback(() => {
    // Make sure them are already
    if (!emblaMainApi || !emblaThumbsApi) return

    // Take selected index
    const index = emblaMainApi.selectedScrollSnap()
    setSelectedIndex(index)

    // Sync to thumbnails
    emblaThumbsApi.scrollTo(index, true)
  }, [emblaMainApi, emblaThumbsApi])

  // Initial embla Api
  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
    return () => {
      emblaMainApi.off('select', onSelect).off('reInit', onSelect)
    }
  }, [emblaMainApi, onSelect])

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    // Root container (Carousel + Thumbnails)
    <div className={`${className}`}>
      {/* Embla viewport - Main carousel */}
      <div className='overflow-hidden' ref={emblaMainRef}>
        {/* Embla container */}
        <div className='flex'>
          {/* Embla slide */}
          {images.map((src, idx) => (
            <div
              className='aspect-square flex-shrink-0 basis-full cursor-pointer overflow-hidden rounded-2xl'
              key={idx + src}
              onClick={() => {
                setLightboxOpen(true)
              }}
            >
              <img src={src} alt='' className='aspect-square w-full object-cover object-center' />
            </div>
          ))}
        </div>
      </div>

      {/* Embla viewport - Thumbnails */}
      <div className='relative mt-2 overflow-hidden' ref={emblaThumbsRef}>
        {/* Previous button */}
        <button
          onClick={() => scrollThumbnails('prev')}
          className='absolute top-1/2 left-0 -translate-y-1/2 bg-gray-400 px-1 py-2 opacity-80'
        >
          <i className='fi fi-sr-angle-left block translate-y-0.5 cursor-pointer text-lg text-white' />
        </button>
        {/* Embla container */}
        <div className='flex overflow-x-auto' ref={thumbContainerRef}>
          {/* Embla slide */}
          {images.map((src, idx) => (
            <div
              key={idx + src}
              className='aspect-square flex-shrink-0 basis-1/5 overflow-hidden p-2'
            >
              <div
                className={`cursor-pointer overflow-hidden rounded-2xl border-2 border-transparent ${selectedIndex === idx ? '!border-primary' : ''}`}
                onMouseEnter={() => {
                  onThumbClick(idx)
                }}
                onClick={() => {
                  setLightboxOpen(true)
                }}
              >
                <img src={src} alt='' className='aspect-square w-full object-cover object-center' />
              </div>
            </div>
          ))}
        </div>
        {/* Next Button */}
        <button
          onClick={() => scrollThumbnails('next')}
          className='absolute top-1/2 right-0 -translate-y-1/2 bg-gray-400 px-1 py-2 opacity-80'
        >
          <i className='fi fi-sr-angle-right block translate-y-0.5 cursor-pointer text-lg text-white' />
        </button>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          startIndex={selectedIndex}
          onClose={() => setLightboxOpen(false)}
          productName={productName}
        />
      )}
    </div>
  )
}

export default ImageCarousel
