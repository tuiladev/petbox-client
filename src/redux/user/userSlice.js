import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/middleware/axiosInstance'
import { env } from '~/config/enviroment'

const initialState = {
  currentUser: null,
  // Step state for registration process
  registration: {
    formData: {
      phoneNumber: '',
      sessionInfo: '',
      password: '',
      newPassword: '',
      fullName: '',
      birthDate: '',
      gender: ''
    }
  }
}

export const registerUserAPI = createAsyncThunk(
  'user/registerUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.post(
      `${env.API_ROOT}/${env.API_VERSION}/users/register`,
      data
    )
    return response.data
  }
)

// Thêm API gửi OTP (nếu cần)
export const sendOtpAPI = createAsyncThunk(
  'user/sendOtpAPI',
  async (phoneNumber) => {
    const response = await authorizedAxiosInstance.post(
      `${env.API_ROOT}/${env.API_VERSION}/users/send-otp`,
      {
        phoneNumber
      }
    )
    toast.success('Đã gửi mã OTP')
    return response.data
  }
)

// Thêm API xác thực số điện thoại (nếu cần)
export const verifyPhoneAPI = createAsyncThunk(
  'user/verifyPhoneAPI',
  async ({ phoneNumber, otp }) => {
    const response = await authorizedAxiosInstance.post(
      `${env.API_ROOT}/${env.API_VERSION}/users/verify-phone`,
      {
        phoneNumber,
        otp
      }
    )
    toast.success('Xác thực thành công')
    return response.data
  }
)

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

export const googleLoginAPI = createAsyncThunk(
  'user/googleLoginAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.post(
      `${env.API_ROOT}/${env.API_VERSION}/users/google-login`,
      {
        code: data.code
      }
    )
    toast.success('Login success')
    return response.data
  }
)

export const zaloLoginAPI = createAsyncThunk(
  'user/zaloLoginAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.post(
      `${env.API_ROOT}/${env.API_VERSION}/users/zalo-login`,
      data
    )
    toast.success('Login success')
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
  reducers: {
    updateRegistrationData: (state, action) => {
      state.registration.formData = {
        ...state.registration.formData,
        ...action.payload
      }
    },
    resetRegistration: (state) => {
      state.registration = initialState.registration
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
    builder.addCase(googleLoginAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
    builder.addCase(zaloLoginAPI.fulfilled, (state, action) => {
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
  }
})

export const { updateRegistrationData, resetRegistration } = userSlice.actions

export const selectRegistrationData = (state) =>
  state.user.registration.formData

export const selectCurrentUser = (state) => state.user.currentUser

export default userSlice.reducer
