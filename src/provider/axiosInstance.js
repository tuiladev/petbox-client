import axios from 'axios'
import { toast } from 'react-toastify'
import { refreshTokenAPI } from '~/redux/user/userService'
import { logoutUserAPI } from '~/redux/user/userSlice'
import { interceptorLoadingElements } from '~/utils/formatters'

/*
 * Authorized axios instance
 * @author: the-pets-box
 * @date: 03-05-2025
 * ----
 * Configuration for authorized axios instance
 * 1. Create axios instance (with timeout and credential)
 * 2. Block spam api call with utils class interceptorLoadingElements
 * 3. ADD A REQUEST INTERCEPTOR:
 *   - Block spam api call
 * 4. ADD A RESPONSE INTERCEPTOR:
 *   - Block spam api call
 *   - Throw error via toast except 410 GONE
 *     (refresh token implementing.....)
 * 5. Return authorized axios instance
 */

let axiosReduxStore

export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore
}

let authorizedAxiosInstance = axios.create()
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10
authorizedAxiosInstance.defaults.withCredentials = true

export default authorizedAxiosInstance

// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // Block spam api call
    interceptorLoadingElements(true)
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Create an Promise to recall error api cause by 410 GONE (needed refreshToKen)
let refreshTokenPromise = null

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Block spam api call
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    // Block spam api call
    interceptorLoadingElements(false)

    // Handle status codes that are not 2xx (200 -> 299)
    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }

    // Case 1: Handle status code: 401 and refresh token
    if (error.response?.status === 401)
      axiosReduxStore.dispatch(logoutUserAPI(false)) // false to not show message (force logout)

    // Case 2: Handle status code: 410 GONE (refresh token)
    const originalRequests = error.config

    if (error.response?.status === 410 && originalRequests) {
      // Check if refreshTokenPromise is null
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then((data) => {
            return data?.accessToken // Already in httpOnly (Backend service)
          })
          .catch(() => {
            axiosReduxStore.dispatch(logoutUserAPI(false)) // Any another error -> logout force !
          })
          .finally(() => {
            refreshTokenPromise = null // Reset refreshTokenPromise to null after
          })
      }
      // eslint-disable-next-line no-unused-vars
      return refreshTokenPromise.then((accessToken) => {
        // Attension: save accessToken in localStorage if you want to use it in other place
        // (in this case, we have added it to httpOnly via backend service)

        // Recall error api cause by 410 GONE (needed refreshToKen)
        return authorizedAxiosInstance(originalRequests)
      })
    }

    if (error.response?.status !== 410) {
      // Throw error via toast except 410 GONE refresh token
      toast.error(errorMessage)
    }
    return Promise.reject(error)
  }
)
