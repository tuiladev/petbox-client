import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { zaloLoginAPI } from '~/redux/user/userSlice'
import PageLoadingSpinner from '~/components/utils/PageLoadingSpinner'

const AccountVerify = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const authorization_code = params.get('code')
    const state = params.get('state')
    const codeVerifier = localStorage.getItem('zalo_code_verifier')

    const savedState = localStorage.getItem('zalo_state')
    if (state !== savedState) {
      localStorage.removeItem('zalo_code_verifier')
      localStorage.removeItem('zalo_state')
      return
    }

    const payload = {
      authorization_code: authorization_code,
      codeVerifier: codeVerifier
    }
    console.log('This is payload from frontend: ', payload)
    if (authorization_code && codeVerifier) {
      dispatch(zaloLoginAPI(payload)).then((res) => {
        if (!res.error) {
          navigate('/')
        }
      })
      localStorage.removeItem('zalo_code_verifier')
      localStorage.removeItem('zalo_state')
    }
  }, [dispatch, navigate])

  return <PageLoadingSpinner caption='Đang xác thực tài khoản ...' />
}

export default AccountVerify
