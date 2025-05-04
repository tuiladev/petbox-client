import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/services/axiosInstance'
import { env } from '~/utils/enviroment'

const initialState = {
  currentUser: null
}

// Call API
export const loginUserAPI = createAsyncThunk(
  'auth/loginUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.post(
      `${env.API_ROOT}/${env.API_VERSION}/users/login`,
      data
    )
    // Data from backend (services layer)
    // -> (access token, refresh token, user info)
    return response.data
  }
)

export const regitserUserAPI = createAsyncThunk(
  'auth/regitserUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.post(
      `${env.API_ROOT}/${env.API_VERSION}/users/register`,
      data
    )
    // Data from backend (services layer)
    // -> (user info)
    return response.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'auth/logoutUserAPI',
  async (showSuccessMessage = true) => {
    const response = await authorizedAxiosInstance.delete(
      `${env.API_ROOT}/${env.API_VERSION}/users/logout`
    )
    if (showSuccessMessage) {
      toast.success('Logout success')
    }
    // loggedOut: true from backend with status code: 200
    return response.data
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUser = null
    })
  }
})

// Selectors:
export const selectCurrentUser = (state) => state.auth.currentUser

export default authSlice.reducer
