import { Outlet } from 'react-router'
import AuthBanner from '~/components/Auth/AuthBanner'
import Logo from '~/components/common/Logo'

const AuthLayout = () => {
  return (
    // Main container for the login and register forms
    <div className='l-container flex h-screen gap-4 bg-white md:py-18!'>
      <AuthBanner />
      <div className='relative flex grow items-center justify-center overflow-hidden'>
        {/* Logo for mobile */}
        <Logo type='light' className='absolute top-0 left-0 mb-9 max-w-60! md:hidden' />

        {/* Auth forms */}
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
