import api from './api'

const login = async (credentials) => {
  // Lấy email, phone và password từ credentials
  const { email, phone, password } = credentials

  // Gửi cả email và phone đến API
  const response = await api.post('/auth/login', { email, phone, password })

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user))
    localStorage.setItem('token', response.data.token)
  }

  return response.data.user
}

const register = async (userData) => {
  const requestData = {
    fullName: userData.fullName || userData.name, // Hỗ trợ cả hai trường
    email: userData.email,
    phone: userData.phone,
    password: userData.password
  }

  try {
    const response = await api.post('/auth/register', requestData)
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('token', response.data.token)
    }

    return response.data.user
  } catch (error) {
    console.error('Register error:', error)
    throw error
  }
}

const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

const authService = {
  login,
  register,
  logout
}

export default authService
