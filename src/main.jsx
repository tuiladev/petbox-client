import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import App from './App'
import './index.css'
import { store } from '~/redux/store'
import { injectStore } from '~/middleware/axiosInstance'
import './config/i18nConfig'
import PageLoadingSpinner from '~/components/utils/PageLoadingSpinner'
import I18nLoader from './components/utils/I18nLoader'

injectStore(store)
const persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate
      loading={<PageLoadingSpinner caption='Khôi phục state...' />}
      persistor={persistor}
    >
      <Suspense fallback={<PageLoadingSpinner caption='Đang tải app...' />}>
        <I18nLoader>
          <App />
        </I18nLoader>
      </Suspense>
    </PersistGate>
  </Provider>
)
