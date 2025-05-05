import React from 'react'
import { Outlet } from 'react-router-dom'
import Button from '~/components/common/Button'
// import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'
import { useDispatch } from 'react-redux'
import { logoutUserAPI } from '~/redux/user/userSlice'

const MainLayout = () => {
  const dispatch = useDispatch()
  return (
    <div className='flex min-h-screen flex-col bg-white'>
      {/* <Header /> */}
      <main className='w-full'>
        <Outlet />
        <Button
          className='interceptor-loading'
          onClick={() => dispatch(logoutUserAPI())}
        >
          Logout
        </Button>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
