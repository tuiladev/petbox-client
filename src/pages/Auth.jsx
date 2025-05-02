/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '~/components/features/Auth/LoginForm'
import RegisterForm from '~/components/features/Auth/RegisterForm'
import PasswordResetForm from '~/components/features/Auth/PasswordResetForm'
import Logo from '~/components/common/Logo'
import { usePageLoader } from '~/hooks/usePageLoader'
import { useDocumentTitle } from '~/hooks/useDocumentTitle'
import { useAuth } from '~/redux/hooks/useAuth'

const Auth = () => {
  const { loginUser, registerUser, isAuthenticated } = useAuth()
  const [currentForm, setCurrentForm] = useState('login')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  usePageLoader()

  // Set document title based on current form
  useDocumentTitle(
    currentForm === 'login'
      ? 'Đăng Nhập'
      : currentForm === 'register'
        ? 'Tạo Tài Khoản'
        : 'Đặt Lại Mật Khẩu'
  )

  // Kiểm tra xem người dùng đã đăng nhập chưa
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  // Xử lý đăng nhập
  const handleLogin = async (formData, event) => {
    setError('')
    try {
      await loginUser({
        email: formData.email,
        password: formData.password
      }).unwrap()
      navigate('/')
      return { success: true }
    } catch (error) {
      setError(error || 'Đăng nhập không thành công')
      return { success: false, error }
    }
  }

  // Xử lý đăng ký
  const handleRegister = async (formData, event) => {
    setError('')
    try {
      const result = await registerUser({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      }).unwrap()
      navigate('/')
      return { success: true }
    } catch (error) {
      // Xử lý message error từ API
      const errorMessage =
        typeof error === 'string'
          ? error
          : error.data?.message || 'Đăng ký không thành công'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  // Content captions for banner
  const getBannerCaption = (formType) => {
    switch (formType) {
      case 'login':
        return 'Mỗi thú cưng đều xứng đáng với những điều đặc biệt !'
      case 'register':
        return 'Nhận ngay sổ sức khoẻ điện tử thú cưng khi đăng ký mới'
      case 'reset':
        return 'Bạn đã quên mật khẩu? Đừng lo, chúng tôi sẽ giúp bạn!'
      default:
        return ''
    }
  }

  const [currentCaption, setCurrentCaption] = useState(
    getBannerCaption('login')
  )
  const [previousCaption, setPreviousCaption] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleForm = (formType) => {
    setPreviousCaption(currentCaption)
    setCurrentForm(formType)
    setIsAnimating(true)
    setCurrentCaption(getBannerCaption(formType))
    setTimeout(() => {
      setIsAnimating(false)
    }, 1000) // Match this to your animation duration
  }

  return (
    <div className='l-container flex h-screen gap-4 bg-white md:py-18!'>
      <div className="hidden w-full max-w-2/5 flex-col items-center rounded-2xl bg-[url('./src/assets/images/auth/auth_banner.jpg')] bg-cover bg-center px-8 py-16 shadow-lg md:flex lg:max-w-lg">
        <Logo type='dark' className='mb-9 max-w-2xs!' />
        <div className='relative h-28 w-full overflow-hidden'>
          {previousCaption && (
            <h2
              className={`font-secondary absolute z-0 w-full text-center text-2xl leading-normal font-bold text-white transition-all duration-1000 lg:text-3xl ${isAnimating ? 'animate-slideOutBottom' : 'hidden'}`}
            >
              {previousCaption}
            </h2>
          )}
          <h2
            className={`font-secondary absolute z-10 w-full text-center text-2xl leading-normal font-bold text-white transition-all duration-1000 lg:text-3xl ${
              isAnimating ? 'animate-slideInTop' : ''
            }`}
          >
            {currentCaption}
          </h2>
        </div>
      </div>
      <div className='relative flex grow items-center justify-center overflow-hidden'>
        <Logo
          type='light'
          className='absolute top-0 left-0 mb-9 max-w-60! md:hidden'
        />

        {/* Login Form */}
        <div
          className={`absolute top-1/2 left-1/2 w-full max-w-[22rem] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
            currentForm === 'login'
              ? 'animate-zoomIn z-10 opacity-100'
              : 'animate-fadeOut pointer-events-none z-0 opacity-0'
          }`}
        >
          <LoginForm
            onToggleForm={toggleForm}
            handlerSubmit={handleLogin}
            onForgotPassword={() => toggleForm('reset')}
          />
        </div>

        {/* Register Form */}
        <div
          className={`absolute top-1/2 left-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
            currentForm === 'register'
              ? 'animate-slideInRight z-10 opacity-100'
              : 'pointer-events-none hidden'
          }`}
        >
          <RegisterForm
            onToggleForm={toggleForm}
            handlerSubmit={handleRegister}
          />
        </div>

        {/* Password Reset Form */}
        <div
          className={`absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
            currentForm === 'reset'
              ? 'animate-slideInRight z-10 opacity-100'
              : 'pointer-events-none hidden'
          }`}
        >
          <PasswordResetForm onToggleForm={toggleForm} />
        </div>
      </div>
    </div>
  )
}

export default Auth
