/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/middleware/axiosInstance'

const initialState = {
  currentUser: null,
  // Step state for registration process
  registration: {
    formData: {
      password: '',
      fullName: '',
      birthDate: '',
      gender: '',
      isVerified: false,
      tries: 0
    }
  }
}

export const registerUserAPI = createAsyncThunk(
  'user/registerUserAPI', async (data) => {
  const response = await authorizedAxiosInstance
    .post('/users/register', data)
  return response.data
})

export const loginUserAPI = createAsyncThunk('user/loginUserAPI', async (data) => {
  const response = await authorizedAxiosInstance.post('/users/login', data)
  toast.success('Login success')
  // Data from backend (services layer)
  // -> (user info)
  return response.data
})

export const socialLoginAPI = createAsyncThunk('user/socialLogin', async (data) => {
  const response = await authorizedAxiosInstance.post('/users/social-login', data)
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

export const requestOtpAPI = createAsyncThunk('user/requestOtpAPI', async (data) => {
  const response = await authorizedAxiosInstance.post('/users/request-otp', data)
  return response.data
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
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
    builder.addCase(socialLoginAPI.fulfilled, (state, action) => {
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
    builder.addCase(registerUserAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
      state.registration.isSubmitting = false
      state.registration.isComplete = true
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
