import React from 'react'
import useDocumentTitle from '~/hooks/useDocumentTitle'

// Components
import Banner from '~/components/Banner'

const Home = () => {
  useDocumentTitle('Trang Chủ')
  return (
    <div className='l-container'>
      {/* Banner */}
      <Banner />
    </div>
  )
}

export default Home
