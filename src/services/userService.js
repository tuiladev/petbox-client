import api from './api'

const getProfile = async () => {
  const response = await api.get('/users/profile')
  return response.data
}

const updateProfile = async (userData) => {
  const response = await api.put('/users/profile', userData)
  return response.data
}

const updateAddress = async (addressData) => {
  const response = await api.put('/users/address', addressData)
  return response.data
}

const updatePayment = async (paymentData) => {
  const response = await api.put('/users/payment', paymentData)
  return response.data
}

const getPets = async () => {
  const response = await api.get('/users/pets')
  return response.data
}

const userService = {
  getProfile,
  updateProfile,
  updateAddress,
  updatePayment,
  getPets
}

export default userService
