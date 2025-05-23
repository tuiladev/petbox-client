import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import AuthLayout from '~/layout/AuthLayout'
import MainLayout from '~/layout/MainLayout'

// Lazy-load page components
const Home = lazy(() => import('~/pages/Home'))
const About = lazy(() => import('~/pages/About'))
const Blog = lazy(() => import('~/pages/Blog'))
const Article = lazy(() => import('~/pages/Article'))
const Contact = lazy(() => import('~/pages/Contact'))
const Services = lazy(() => import('~/pages/Services'))
const Shop = lazy(() => import('~/pages/Shop'))
const NotFound = lazy(() => import('~/pages/NotFound'))
const Profile = lazy(() => import('~/pages/Profile/_id'))
const LoginForm = lazy(() => import('~/pages/Auth/LoginForm'))
const RegisterForm = lazy(() => import('~/pages/Auth/Register/RegisterForm'))
const ResetPasswordForm = lazy(() => import('~/pages/Auth/ResetPasswordForm'))
const AccountVerify = lazy(() => import('~/components/Auth/AccountVerify'))

// ProtectedRoute wrapper
export const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectCurrentUser)
  return user ? children : <Navigate to='/login' replace />
}

// Unified routes array
export const routes = [
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginForm /> },
      { path: 'register/*', element: <RegisterForm /> },
      { path: 'reset-password/*', element: <ResetPasswordForm /> },
      { path: 'verify-account', element: <AccountVerify /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      {
        path: 'account/:tabName',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:articleID', element: <Article /> },
      { path: 'contact', element: <Contact /> },
      { path: 'services', element: <Services /> },
      { path: 'shop', element: <Shop /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]
