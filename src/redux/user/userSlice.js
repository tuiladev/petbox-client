import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/middleware/axiosInstance'
import { data } from 'react-router-dom'

const initialState = {
  currentUser: null,
  // Step state for registration process
  registration: {
    formData: {
      phone: '',
      password: '',
      email: '',
      fullName: '',
      birthDate: '',
      isVerified: false,
      tries: 0,
      key: ''
    }
  }
}

export const registerUserAPI = createAsyncThunk('user/registerUserAPI', async (data) => {
  const response = await authorizedAxiosInstance.post('/users/register', data)
  return response.data
})

export const loginUserAPI = createAsyncThunk('user/loginUserAPI', async (data) => {
  const response = await authorizedAxiosInstance.post('/users/login', data)
  // Data from backend (services layer)
  // -> (user info)
  return response.data
})

export const socialLoginAPI = createAsyncThunk('user/socialLogin', async (data, thunkAPI) => {
  const response = await authorizedAxiosInstance.post('/users/social-login', data)
  if (response.status === 202)
    return thunkAPI.rejectWithValue({
      pending: true,
      key: response.data.key,
      fullName: response.data.name,
      email: response.data.email
    })
  return response.data
})

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (showSuccessMessage = true) => {
    const response = await authorizedAxiosInstance.delete('/users/logout')
    if (showSuccessMessage) {
      toast.success('Logout success')
    }
    // loggedOut: true from backend with status code: 200
    return response.data
  }
)

export const updateUserAPI = createAsyncThunk('user/updateUserAPI', async (data) => {
  const response = await authorizedAxiosInstance.put('/users/update', data)
  return response.data
})

export const requestOtpAPI = createAsyncThunk('user/requestOtpAPI', async (data, thunkAPI) => {
  try {
    const response = await authorizedAxiosInstance.post('/users/request-otp', data)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorCode: error.response?.data?.errorCode,
      message: error.response?.data?.message,
      statusCode: error.response?.status
    })
  }
})

export const verifyOtpAPI = createAsyncThunk('user/verifyOtpAPI', async (data) => {
  const response = await authorizedAxiosInstance.post('/users/verify-otp', data)
  return response.data
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateRegistrationData: (state, action) => {
      state.registration.formData = {
        ...state.registration.formData,
        ...action.payload
      }
    },
    resetRegistration: (state) => {
      state.registration.formData = initialState.registration.formData
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
    builder.addCase(socialLoginAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
    builder.addCase(socialLoginAPI.rejected, (state, action) => {
      if (action.payload?.pending) {
        state.registration.formData.fullName = action.payload.fullName
        state.registration.formData.email = action.payload.email
        state.registration.formData.key = action.payload.key
      }
    })
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUser = null
    })
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
    builder.addCase(requestOtpAPI.fulfilled, (state, action) => {
      state.registration.formData.tries = action.payload.counter
    })
    builder.addCase(verifyOtpAPI.fulfilled, (state, action) => {
      state.registration.formData.isVerified = !!action.payload.verified
    })
  }
})

export const { updateRegistrationData, resetRegistration } = userSlice.actions

export const selectRegistrationData = (state) => state.user.registration.formData
export const selectCurrentUser = (state) => state.user.currentUser

export default userSlice.reducer
