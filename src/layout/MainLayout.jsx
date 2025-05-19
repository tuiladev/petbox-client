import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '~/components/Header/_id'
import Footer from '~/components/Footer/_id'

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
