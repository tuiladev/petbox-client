import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/provider/axiosInstance'
import { env } from '~/utils/enviroment'

const initialState = {
  currentUser: null
}

// Call API
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.post(
      `${env.API_ROOT}/${env.API_VERSION}/users/login`,
      data
    )
    toast.success('Login success')
    // Data from backend (services layer)
    // -> (user info)
    return response.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
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

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.put(
      `${env.API_ROOT}/${env.API_VERSION}/users/update`,
      data
    )
    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',
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
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
      toast.success('Đã cập nhật thông tin!')
    })
  }
})

// Selectors:
export const selectCurrentUser = (state) => state.user.currentUser

export default userSlice.reducer
