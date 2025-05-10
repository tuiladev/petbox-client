import { useGoogleLogin } from '@react-oauth/google'
import { googleLoginAPI } from '~/redux/user/userService'

const SocialLogin = ({ isRegistered }) => {
  // Use Google Login
  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => googleLoginAPI(codeResponse),
    flow: 'auth-code'
  })

  return (
    <div className='flex w-full items-center justify-center gap-3'>
      <button
        type='button'
        onClick={() => googleLogin()}
        className={`group flex ${isRegistered ? '' : 'flex-1'} cursor-pointer items-center justify-center rounded-full p-3 outline-1 outline-gray-300 transition-all duration-300 ease-in-out hover:bg-sky-50 hover:outline-sky-500`}
      >
        <img
          width='24'
          height='24'
          src='https://img.icons8.com/color/48/google-logo.png'
          alt='google-logo'
        />
        <span
          className={`${isRegistered ? 'hidden' : 'pl-2 group-hover:text-sky-600'}`}
        >
          Google
        </span>
      </button>
    </div>
  )
}

export default SocialLogin
