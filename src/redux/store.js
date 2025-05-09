import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from '~/redux/user/userSlice'

const reducers = combineReducers({
  user: userReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // only navigation will be persisted
  blacklist: [] // navigation will not be persisted
}

const persistedReducers = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers
})
