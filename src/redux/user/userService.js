import authorizedAxiosInstance from '~/provider/axiosInstance'
import { env } from '~/utils/enviroment'

export const googleLoginAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(
    `${env.API_ROOT}/${env.API_VERSION}/users/google-login`,
    { code: data.code }
  )
  return response.data
}

export const refreshTokenAPI = async (data) => {
  const response = await authorizedAxiosInstance.get(
    `${env.API_ROOT}/${env.API_VERSION}/users/refresh-token`,
    data
  )
  return response.data
}
