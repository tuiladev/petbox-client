import React from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const Home = () => {
  useDocumentTitle('Trang Chủ')
  return (
    <div className='l-container'>
      <h1 className='mb-6 text-3xl font-bold'>Chào mừng đến với PetShop</h1>
      <p className='text-gray-600'>
        Trang chủ của cửa hàng thú cưng hàng đầu Việt Nam
      </p>
    </div>
  )
}

export default Home
