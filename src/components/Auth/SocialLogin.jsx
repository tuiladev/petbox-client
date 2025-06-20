import { useGoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { images } from '~/assets'
import { socialLoginAPI } from '~/redux/user/userSlice'
import { ZaloProvider } from '~/middleware/zaloProvider'

const SocialLogin = ({ isRegistered }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Use Google Login
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    redirect_uri: 'https://petbox-client.vercel.app',
    onSuccess: (codeResponse) => {
      const data = {
        provider: 'google',
        ...codeResponse
      }
      dispatch(socialLoginAPI(data))
        .then(() => {
          navigate('/')
        })
        .catch(() => {
          navigate('/register-social/update-info')
        })
    }
  })

  // Use Zalo Login
  const zaloLogin = async () => {
    const url = await ZaloProvider.createAuthUrl()
    window.location.href = url
  }

  return (
    <div className='flex w-full items-center justify-center gap-4'>
      <button
        type='button'
        onClick={() => googleLogin()}
        className={`group flex-center min-h-13 w-1/2 cursor-pointer rounded-full px-4 py-2 outline-1 outline-gray-300 transition-all duration-300 ease-in-out hover:bg-sky-50 hover:outline-sky-500`}
      >
        <img
          src='https://img.icons8.com/color/48/google-logo.png'
          alt='google-logo'
          className='size-7'
        />
        <span className={`${isRegistered ? 'hidden' : 'pl-2 group-hover:text-sky-600'}`}>
          Google
        </span>
      </button>
      <button
        type='button'
        onClick={() => zaloLogin()}
        className={`group flex-center min-h-13 w-1/2 cursor-pointer rounded-full px-2 py-2 outline-1 outline-gray-300 transition-all duration-300 ease-in-out hover:bg-sky-50 hover:outline-sky-500`}
      >
        <img src={images.zalo_icon} alt='zalo-logo' className='size-7' />
        <span className={`${isRegistered ? 'hidden' : 'pl-2 group-hover:text-sky-600'}`}>Zalo</span>
      </button>
    </div>
  )
}

export default SocialLogin
