const API_ROOT = import.meta.env.DEV
  ? 'http://localhost:8017'
  : 'https://petbox-api-e4a2.onrender.com'

const API_VERSION = 'v1'
const APP_ID = import.meta.env.VITE_APP_ID
const CALLBACK_URL = import.meta.env.VITE_CALLBACK_URL

export const env = { API_ROOT, API_VERSION, APP_ID, CALLBACK_URL }
