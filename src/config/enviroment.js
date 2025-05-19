export const env = {
  // Backend intergation
  API_ROOT: import.meta.env.VITE_API_ROOT,
  API_VERSION: import.meta.env.VITE_API_VERSION,

  // Frontend intergation
  BASE_URL: import.meta.env.VITE_BASE_URL,

  // Google Auth
  GOOGLE_APP_ID: import.meta.env.VITE_GOOGLE_APP_ID,
  GOOGLE_CALLBACK_URL: import.meta.env.VITE_GOOGLE_CALLBACK_URL,

  // Firebase config
  FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: import.meta.env
    .VITE_FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}
