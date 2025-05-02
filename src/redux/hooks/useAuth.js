import { useSelector, useDispatch } from 'react-redux'
import { login, register, logout, reset } from '../slices/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  )

  const loginUser = (credentials) => {
    return dispatch(login(credentials))
  }

  const registerUser = (userData) => {
    return dispatch(register(userData))
  }

  const logoutUser = () => {
    dispatch(logout())
  }

  const resetAuthState = () => {
    dispatch(reset())
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    loginUser,
    registerUser,
    logoutUser,
    resetAuthState
  }
}

export default useAuth
