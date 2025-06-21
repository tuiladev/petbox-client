export const env = {
  // Backend intergation
  API_ROOT: import.meta.env.VITE_API_ROOT,
  API_VERSION: import.meta.env.VITE_API_VERSION,

  // Frontend intergation
  BASE_URL: import.meta.env.VITE_BASE_URL,

  // Google Auth
  GOOGLE_APP_ID: import.meta.env.VITE_GOOGLE_APP_ID,
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  VITE_GOOGLE_REDIRECT_URL: import.meta.env.VITE_GOOGLE_REDIRECT_URL,

  // Zalo Auth
  ZALO_APP_ID: import.meta.env.VITE_ZALO_APP_ID,
  ZALO_CALLBACK_URL: import.meta.env.VITE_ZALO_CALLBACK_URL,

  // Cloudinary
  CLOUDINARY_UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_URL: import.meta.env.VITE_CLOUDINARY_URL
}
