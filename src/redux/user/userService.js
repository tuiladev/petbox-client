import authorizedAxiosInstance from '~/middleware/axiosInstance'

export const refreshTokenAPI = async (data) => {
  const response = await authorizedAxiosInstance.get('/users/refresh-token', data)
  return response.data
}

export const resetPasswordAPI = async (data) => {
  const response = await authorizedAxiosInstance.put('/users/reset-password', data)
  return response.data
}
