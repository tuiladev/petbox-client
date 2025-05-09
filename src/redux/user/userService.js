import authorizedAxiosInstance from '~/provider/axiosInstance'
import { env } from '~/utils/enviroment'

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(
    `${env.API_ROOT}/${env.API_VERSION}/users/verify`,
    data
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
