import { env } from '~/config/enviroment'
const generateCodeVerifier = (length = 43) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const generateCodeChallenge = async (codeVerifier) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  let base64 = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
  return base64
}

const createAuthUrl = async () => {
  const codeVerifier = generateCodeVerifier()
  const codeChallenge = await generateCodeChallenge(codeVerifier)
  localStorage.setItem('zalo_code_verifier', codeVerifier)

  const state = Date.now().toString()
  localStorage.setItem('zalo_state', state)
  const zaloAuthUrl = `https://oauth.zaloapp.com/v4/permission?app_id=${env.APP_ID}&redirect_uri=${env.CALLBACK_URL}&code_challenge=${codeChallenge}&state=${state}`

  return zaloAuthUrl
}

export const ZaloProvider = {
  createAuthUrl
}
