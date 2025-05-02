import React from 'react'
import { Link } from 'react-router-dom'
import { images } from '../assets'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const NotFound = () => {
  useDocumentTitle('404 | Không Tìm Thấy')
  return (
    <div className='flex flex-col items-center justify-center py-12 md:h-full'>
      <img
        src={images.Not_found}
        alt='404 Not Found'
        className='mb-8 w-1/2 md:w-1/3'
      />
      <div className='flex flex-col items-center justify-center text-center'>
        <h2 className='text-primary font-secondary mb-6 text-4xl font-black capitalize md:text-7xl'>
          Không Tìm Thấy
        </h2>
        <p className='mb-8 text-lg text-gray-600'>
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <div className='flex gap-4'>
          <Link
            to='/'
            className='bg-primary hover:bg-secondary rounded-lg px-6 py-3 text-white transition-colors duration-300'
          >
            Về trang chủ
          </Link>
          <button
            onClick={() => window.history.back()}
            className='hover:text-primary cursor-pointer rounded-lg bg-gray-200 px-6 py-3 text-gray-800 transition-colors hover:bg-gray-300'
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
