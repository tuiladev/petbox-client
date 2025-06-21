// Libraries
import React, { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Routes
import { routes } from '~/routes/routes'
const router = createBrowserRouter(routes)

// Utils
import PageLoadingSpinner from '~/components/utils/PageLoadingSpinner'
import { env } from './config/enviroment'
import { useSyncLanguage } from '~/hooks/useSyncLanguage'

function App() {
  useSyncLanguage()
  return (
    <GoogleOAuthProvider clientId={env.GOOGLE_CLIENT_ID}>
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
      <Suspense fallback={<PageLoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </GoogleOAuthProvider>
  )
}

export default App
