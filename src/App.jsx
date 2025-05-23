// Libraries
import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Routes
import { routes } from '~/routes/routes'

// Utils
import PageLoadingSpinner from '~/components/utils/PageLoadingSpinner'
import { env } from './config/enviroment'

function App() {
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
      <BrowserRouter>
        <Suspense fallback={<PageLoadingSpinner />}>
          <Routes>
            {routes.map(({ path, element, children }) => (
              <Route key={path} path={path} element={element}>
                {children?.map((child, idx) =>
                  child.index ? (
                    <Route index element={child.element} key={idx} />
                  ) : (
                    <Route path={child.path} element={child.element} key={idx} />
                  )
                )}
              </Route>
            ))}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
