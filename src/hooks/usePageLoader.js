import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePreloader } from '../context/PreloaderContext'

export const usePageLoader = () => {
  const location = useLocation()
  const { showPreloader, hidePreloader } = usePreloader()
  const [startTime, setStartTime] = useState(0)

  useEffect(() => {
    // Lưu thời điểm bắt đầu
    const start = performance.now()
    setStartTime(start)
    showPreloader()

    // Thời gian tối thiểu (ms) để preloader hiển thị
    const MIN_DISPLAY_TIME = 300
    // Thời gian tối đa (ms) để preloader hiển thị trong trường hợp trang tải chậm
    const MAX_DISPLAY_TIME = 3000

    // Hàm ẩn preloader
    const hideLoader = () => {
      const now = performance.now()
      const elapsedTime = now - start

      if (elapsedTime < MIN_DISPLAY_TIME) {
        // Nếu thời gian hiển thị chưa đủ tối thiểu, chờ thêm
        setTimeout(() => {
          hidePreloader()
        }, MIN_DISPLAY_TIME - elapsedTime)
      } else {
        // Đã đạt thời gian tối thiểu, ẩn ngay lập tức
        hidePreloader()
      }
    }

    // Sử dụng Promise.all để theo dõi tất cả các nguồn tài nguyên quan trọng
    const contentLoaded = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve()
      } else {
        window.addEventListener('load', resolve, { once: true })
      }
    })

    // Nếu trang tải quá lâu, ẩn preloader sau thời gian tối đa
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(resolve, MAX_DISPLAY_TIME)
    })

    // Tải xong HOẶC hết thời gian tối đa
    Promise.race([contentLoaded, timeoutPromise]).then(hideLoader)

    return () => {
      window.removeEventListener('load', hideLoader)
    }
  }, [location.pathname])
}
