import React from 'react'
import { Outlet } from 'react-router-dom'
import { usePageLoader } from '~/hooks/usePageLoader'
import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'

const MainLayout = () => {
  usePageLoader()
  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <Header />
      <main className='w-full'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
