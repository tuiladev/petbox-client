export const env = {
  // Backend intergation
  API_ROOT: import.meta.env.VITE_API_ROOT,
  API_VERSION: import.meta.env.VITE_API_VERSION,

  // Frontend intergation
  BASE_URL: import.meta.env.VITE_BASE_URL,

  // Google Auth
  GOOGLE_APP_ID: import.meta.env.VITE_GOOGLE_APP_ID,
  GOOGLE_CALLBACK_URL: import.meta.env.VITE_GOOGLE_CALLBACK_URL
}
