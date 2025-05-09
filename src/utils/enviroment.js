const API_ROOT = import.meta.env.DEV
  ? 'http://localhost:8017'
  : 'https://petbox-api-e4a2.onrender.com'

const API_VERSION = 'v1'

export const env = { API_ROOT, API_VERSION }
