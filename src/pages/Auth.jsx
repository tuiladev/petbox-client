import { Link } from 'react-router'

export const Login = () => {
  return (
    <div className='l-container h-screen flex items-center justify-center flex-col'>
      <h1 className='text-7xl font-bold font-secondary'>This is Login Page!...</h1>
      <Link to='/auth/register' className='text-lg font-bold'>
        Register Here
      </Link>
    </div>
  )
}

export const Register = () => {
  return (
    <div className='l-container h-screen flex items-center justify-center flex-col'>
      <h1 className='text-7xl font-bold font-secondary'>This is Register Page!...</h1>
      <Link to='/auth/login' className='text-lg font-bold'>
        Login Here
      </Link>
    </div>
  )
}

const Auth = () => {
  return (
    <div>
      <div className='l-container h-screen flex items-center justify-center'>
        <h1 className='text-7xl font-bold font-secondary'>This is Auth Page!...</h1>
      </div>
    </div>
  )
}
export default Auth
