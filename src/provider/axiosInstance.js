import axios from 'axios'
import { toast } from 'react-toastify'
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

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Block spam api call
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    // Handle status codes that are not 2xx (200 -> 299)
    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }

    // Block spam api call
    interceptorLoadingElements(false)

    // Throw error via toast except 410 GONE refresh token
    if (error.response?.status !== 410) {
      toast.error(errorMessage)
    }
    return Promise.reject(error)
  }
)
