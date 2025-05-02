import React, { useState } from 'react'
import FormInput from '../Auth/FormInput'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../common'
import SocialLogin from './SocialLogin'
import CustomCheckbox from '../../common/CustomCheckbox'
import { useAuth } from '../../../redux/hooks/useAuth'

export const LoginForm = ({ onToggleForm, onForgotPassword }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Truyền giá trị vào cả email và phone dựa trên định dạng nhập vào
      const credentials = {
        password: password
      }

      // Kiểm tra xem input là email hay số điện thoại dựa trên định dạng
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone)
      if (isEmail) {
        credentials.email = emailOrPhone
      } else {
        credentials.phone = emailOrPhone
      }

      await loginUser(credentials).unwrap()
      navigate('/')
    } catch (error) {
      console.error('Login form error:', error)
      setError(typeof error === 'string' ? error : 'Đăng nhập không thành công')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h2 className='mb-8 text-center text-4xl font-bold text-cyan-600'>
        Đăng Nhập
      </h2>

      {error && (
        <div className='mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600'>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <FormInput
          label='Email/Số điện thoại'
          type='text'
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          placeholder='Nhập email/số điện thoại của bạn'
          isRequired
        />

        <FormInput
          label='Mật khẩu'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Nhập mật khẩu của bạn'
          isRequired
          hasToggleVisibility
        />

        <div className='mb-0 flex items-center justify-between'>
          <CustomCheckbox
            id='remember'
            name='remember'
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            label='Ghi nhớ đăng nhập'
          />
          <button
            type='button'
            onClick={onForgotPassword}
            className='cursor-pointer text-sm text-cyan-600 hover:text-cyan-700'
          >
            Quên mật khẩu?
          </button>
        </div>

        <Button
          type='submit'
          className='text-primary mt-6 w-full rounded-full bg-cyan-600!'
          disabled={loading}
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>
      </form>

      <div className='relative mt-10 mb-8'>
        <hr className='border-gray-300' />
        <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white px-3 text-sm text-gray-500'>
          Hoặc sử dụng
        </span>
      </div>

      <SocialLogin isRegistered={true} />

      <div className='mt-6 text-center'>
        <p className='text-gray-600'>
          Chưa có tài khoản?{' '}
          <button
            type='button'
            onClick={() => onToggleForm('register')}
            className='cursor-pointer text-cyan-600 hover:text-cyan-700'
          >
            Đăng ký
          </button>
        </p>
      </div>
    </>
  )
}

export default LoginForm
