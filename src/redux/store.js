import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from '~/redux/user/userSlice'
import languageReducer from '~/redux/languages/languageSlice'

const reducers = combineReducers({
  user: userReducer,
  language: languageReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'language'], // only navigation will be persisted
  blacklist: [] // navigation will not be persisted
}

const persistedReducers = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: ['persist/PERSIST'] }
    })
})
