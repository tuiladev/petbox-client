import { useEffect, useState } from 'react'

const Preloader = ({ isLoading, logoSrc, className = '' }) => {
  const [visible, setVisible] = useState(false)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    let fadeTimer, visibilityTimer

    if (isLoading) {
      setVisible(true)
      setTimeout(() => {
        setOpacity(1)
      }, 50)
    } else {
      setOpacity(0)
      visibilityTimer = setTimeout(() => {
        setVisible(false)
      }, 800)
    }

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(visibilityTimer)
    }
  }, [isLoading])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-all duration-800 ease-in-out ${className}`}
      style={{ opacity }}
    >
      <div className='flex flex-col items-center'>
        <div className='relative flex h-full w-full items-center justify-center'>
          <div
            className='absolute h-full w-full animate-spin rounded-full border-3 border-transparent border-t-blue-900'
            style={{ animationDuration: '1.5s' }}
          ></div>

          <div className='relative flex h-18 w-18 items-center justify-center overflow-hidden rounded-full p-2'>
            <img
              src={logoSrc}
              alt='Loading'
              className='h-full w-full object-cover'
              style={{
                animation: 'scaleAndFade 2.5s infinite ease-in-out'
              }}
            />
          </div>
        </div>

        <style jsx global>{`
          @keyframes scaleAndFade {
            0%,
            100% {
              transform: scale(0.8);
              opacity: 0.8;
            }
            50% {
              transform: scale(1.1);
              opacity: 1;
            }
          }

          img[alt='Loading'] {
            animation: scaleAndFade 2.5s infinite ease-in-out;
          }
        `}</style>
      </div>
    </div>
  )
}

export default Preloader
