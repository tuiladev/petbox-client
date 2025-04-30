import { Outlet } from 'react-router'
import Footer from '~/components/layout/Footer'
import Header from '~/components/layout/Header'

const MainLayout = () => {
  return (
    <div className='l-container'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
