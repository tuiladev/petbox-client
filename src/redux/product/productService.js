import authorizedAxiosInstance from '~/middleware/axiosInstance'

export const getProductInfoAPI = async (slug) => {
  const response = await authorizedAxiosInstance.get(`/products/${slug}`)
  return response.data
}
