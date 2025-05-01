import axios from 'axios'
import { API_ROOT } from '@utils/constants'

export const createAccountAPI = async (data) => {
  await axios.post(`${API_ROOT}/v1/auth`, { fullName: data })
}
