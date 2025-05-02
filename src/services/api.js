import axios from 'axios'

// Tạo instance Axios với config chung
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add interceptors
api.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu có
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor cho việc xử lý lỗi chung
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý các lỗi phổ biến (401, 403, 500)
    if (error.response && error.response.status === 401) {
      // Redirect đến trang login nếu token hết hạn
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      window.location.href = '/auth'
    }
    return Promise.reject(error)
  }
)

export default api
