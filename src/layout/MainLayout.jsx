import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'

const MainLayout = () => {
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
