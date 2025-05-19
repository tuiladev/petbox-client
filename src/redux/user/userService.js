import authorizedAxiosInstance from '~/middleware/axiosInstance'
import { env } from '~/config/enviroment'

export const refreshTokenAPI = async (data) => {
  const response = await authorizedAxiosInstance.get(
    `${env.API_ROOT}/${env.API_VERSION}/users/refresh-token`,
    data
  )
  return response.data
}

export const verifyOTP = async (data) => {
  const response = await authorizedAxiosInstance.post(`/users/verify-otp`, data)
  return response.data
}
