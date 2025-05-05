import authorizedAxiosInstance from '~/provider/axiosInstance'
import { env } from '~/utils/enviroment'

export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(
    `${env.API_ROOT}/${env.API_VERSION}/users/register`,
    data
  )
  return response.data
}

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

export const checkAPI = async (data) => {
  const response = await authorizedAxiosInstance.get(
    `${env.API_ROOT}/${env.API_VERSION}/users/status`,
    data
  )
  return response.data
}
