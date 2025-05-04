import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slices/authSlice'

// React Toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Components
import Home from '~/pages/Home'
import Account from '~/pages/Account'
import About from '~/pages/About'
import Blog from '~/pages/Blog'
import Article from '~/pages/Article'
import Contact from '~/pages/Contact'
import Services from '~/pages/Services'
import Shop from '~/pages/Shop'
import NotFound from '~/pages/NotFound'
import MainLayout from '~/layout/MainLayout'
import Login from './pages/Login'
import Register from './pages/Register'

const ProtectedRoute = () => {
  const user = useSelector(selectCurrentUser)
  if (!user) {
    return <Navigate to='/login' replace={true} />
  }
  return <Outlet />
}

function App() {
  return (
    <>
      <ToastContainer
        position='bottom-right'
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
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* Main Layout Routes */}
          <Route path='/' element={<MainLayout />}>
            <Route path='' element={<Home />} />
            <Route path='about' element={<About />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path='account'>
                <Route path=':tabName' element={<Account />} />
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
    </>
  )
}

export default App
