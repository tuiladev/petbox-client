/* eslint-disable quotes */
import { useEffect } from 'react'

const useDocumentTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title
      ? `${title} | The Pet's Box - Phòng Khám Thú Y Thủ Đức`
      : "The Pet's Box - Phòng Khám Thú Y Thủ Đức"

    return () => {
      document.title = prevTitle
    }
  }, [title])
}

export default useDocumentTitle
