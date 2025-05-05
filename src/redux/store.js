import { configureStore } from '@reduxjs/toolkit'
import authReducer from '~/redux/user/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
})
