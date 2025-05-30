import React, { lazy } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import AuthLayout from '~/layout/AuthLayout'
import MainLayout from '~/layout/MainLayout'

// Lazy-load page components
const Home = lazy(() => import('~/pages/Home'))
const About = lazy(() => import('~/pages/About'))
const Shop = lazy(() => import('~/pages/Shop'))
const Blog = lazy(() => import('~/pages/Blog'))
const Article = lazy(() => import('~/pages/Article'))
const Contact = lazy(() => import('~/pages/Contact'))
const Services = lazy(() => import('~/pages/Services'))
const NotFound = lazy(() => import('~/pages/NotFound'))
const Profile = lazy(() => import('~/pages/Profile/_id'))
const LoginForm = lazy(() => import('~/pages/Auth/LoginForm'))
const RegisterForm = lazy(() => import('~/pages/Auth/Register/RegisterForm'))
const ResetPasswordForm = lazy(() => import('~/pages/Auth/ResetPasswordForm'))
const AccountVerify = lazy(() => import('~/components/Auth/AccountVerify'))
const CartPage = lazy(() => import('~/pages/CartPage'))

// Products
const ProductDetail = lazy(() => import('~/pages/ProductDetail'))
import { productLoader } from '~/pages/ProductDetail'

// ProtectedRoute wrapper
export const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectCurrentUser)
  return user ? children : <Navigate to='/login' replace />
}

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
    handle: { breadcrumb: 'navigation.home' },
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About />, handle: { breadcrumb: 'navigation.about' } },
      {
        path: 'shop',
        element: <Outlet />,
        handle: { breadcrumb: 'navigation.allProducts' },
        children: [
          { index: true, element: <Shop /> },
          {
            path: 'product/:slug',
            element: <ProductDetail />,
            loader: productLoader,
            handle: { breadcrumb: ({ data }) => data.name }
          }
        ]
      },
      { path: 'cart-view', element: <CartPage /> },
      {
        path: 'account/:tabName',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: 'userMenu.account' }
      },
      { path: 'blog', element: <Blog />, handle: { breadcrumb: 'navigation.blog' } },
      {
        path: 'blog/:articleID',
        element: <Article />,
        handle: { breadcrumb: 'navigation.blog' }
      },
      { path: 'contact', element: <Contact />, handle: { breadcrumb: 'navigation.contact' } },
      { path: 'services', element: <Services />, handle: { breadcrumb: 'navigation.services' } },
      { path: '*', element: <NotFound />, handle: { breadcrumb: 'navigation.notFound' } }
    ]
  }
]
