// React
import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'

// Redux
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { injectStore } from '~/middleware/axiosInstance'
import { store } from '~/redux/store'

// Components
import './index.css'  
import App from './App'
import PageLoadingSpinner from '~/components/utils/PageLoadingSpinner'

// Config I18n
import './config/i18nConfig'

// Make redux store available in axios (use redux store outside of react component)
injectStore(store)

// Create a persistor to store the Redux state in localStorage (with persist config ~/redux/store.js)
// Make a sync state process between Redux & localStorage
const persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  // Provide redux store for the entire application
  <Provider store={store}>
    {/* Make sure the component only shows when it has state (sync from localStorage to redux store) */}
    <PersistGate
      loading={<PageLoadingSpinner caption='Khôi phục state...' />}
      persistor={persistor}
    >
      <Suspense fallback={<PageLoadingSpinner caption='Đang tải app...' />}>
        <App />
      </Suspense>
    </PersistGate>
  </Provider>
)
