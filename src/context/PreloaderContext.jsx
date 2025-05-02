import { createContext, useContext, useState } from 'react'
import Preloader from '~/components/common/Preloader'
import { images } from '~/assets'

// Tạo context
const PreloaderContext = createContext({
  showPreloader: () => {},
  hidePreloader: () => {}
})

// Tạo Provider component
export const PreloaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  const showPreloader = () => setIsLoading(true)
  const hidePreloader = () => setIsLoading(false)

  return (
    <PreloaderContext.Provider value={{ showPreloader, hidePreloader }}>
      <Preloader isLoading={isLoading} logoSrc={images.pre_loader} />
      {children}
    </PreloaderContext.Provider>
  )
}

// Custom hook để sử dụng context
export const usePreloader = () => useContext(PreloaderContext)
