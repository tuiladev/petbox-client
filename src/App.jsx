import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Redux
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'

// React Toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Components
import Home from '~/pages/Home'
import About from '~/pages/About'
import Blog from '~/pages/Blog'
import Article from '~/pages/Article'
import Contact from '~/pages/Contact'
import Services from '~/pages/Services'
import Shop from '~/pages/Shop'
import NotFound from '~/pages/NotFound'
import Auth from '~/pages/Auth'

// Layouts
import MainLayout from '~/layout/MainLayout'
import Profile from './pages/Profile/Profile'

const ProtectedRoute = () => {
  const user = useSelector(selectCurrentUser)
  if (!user) {
    return <Navigate to='/login' replace={true} />
  }
  return <Outlet />
}

function App() {
  return (
    <GoogleOAuthProvider clientId='1043487308280-rfe3nmcb1avbkv7n7eg5ved64vji0tfp.apps.googleusercontent.com'>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path='/login' element={<Auth />} />
          <Route path='/register/*' element={<Auth />} />
          <Route path='/reset-password/*' element={<Auth />} />

          {/* Main Layout Routes */}
          <Route path='/' element={<MainLayout />}>
            <Route path='' element={<Home />} />
            <Route path='about' element={<About />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path='account'>
                <Route path=':tabName' element={<Profile />} />
              </Route>
            </Route>

            {/* Blog Routes */}
            <Route path='blog'>
              <Route index element={<Blog />} />
              <Route path=':articleID' element={<Article />} />
            </Route>

            {/* Other Routes */}
            <Route path='contact' element={<Contact />} />
            <Route path='services' element={<Services />} />
            <Route path='shop' element={<Shop />} />

            {/* 404 Route */}
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
