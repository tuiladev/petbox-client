import { useState } from 'react'
import Button from '~/components/common/Button'
import CustomCheckbox from '~/components/common/CustomCheckbox'
import SocialLogin from './SocialLogin'
import FormInput from './FormInput'

const RegisterForm = ({ onToggleForm, handlerSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validate form
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Vui lòng điền đầy đủ thông tin')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }

    if (!formData.acceptTerms) {
      setError('Vui lòng đồng ý với điều khoản sử dụng')
      return
    }

    try {
      const result = await handlerSubmit(formData, e)
      if (!result.success) {
        setError(result.error || 'Đã xảy ra lỗi')
      }
    } catch (error) {
      console.error('Register submission error:', error)
      setError('Đã xảy ra lỗi không mong muốn')
    }
  }

  return (
    <>
      <h2 className='mb-8 text-center text-4xl font-bold text-cyan-600'>
        Tạo Tài Khoản
      </h2>

      {error && (
        <div className='mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600'>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormInput
          label='Họ và tên'
          type='text'
          name='fullName'
          value={formData.fullName}
          onChange={handleChange}
          isRequired={true}
        />

        <div className='flex'>
          <FormInput
            label='Email'
            type='text'
            name='email'
            value={formData.email}
            className='mr-3 w-3/4'
            isRequired={true}
            onChange={handleChange}
          />

          <FormInput
            label='Số điện thoại'
            type='tel'
            name='phone'
            value={formData.phone}
            className='grow'
            onChange={handleChange}
            isRequired={true}
          />
        </div>

        <FormInput
          label='Mật khẩu'
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          isRequired={true}
          hasToggleVisibility
        />

        <FormInput
          label='Xác nhận mật khẩu'
          type='password'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
          isRequired={true}
        />

        <div className='flex items-center'>
          <CustomCheckbox
            id='acceptTerms'
            name='acceptTerms'
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
            label={
              <>
                Đồng ý với{' '}
                <a href='#' className='text-cyan-600'>
                  điều khoản
                </a>{' '}
                sử dụng.
              </>
            }
          />
        </div>

        <Button
          type='submit'
          className='text-primary mt-6 w-full rounded-full bg-cyan-600!'
        >
          Đăng Ký
        </Button>
      </form>

      <div className='relative mt-10 mb-8'>
        <hr className='border-gray-300' />
        <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white px-3 text-sm text-gray-500'>
          Hoặc sử dụng
        </span>
      </div>

      <SocialLogin isRegistered={false} />

      <div className='mt-6 text-center'>
        <p className='text-gray-600'>
          Đã có tài khoản?{' '}
          <button
            type='button'
            onClick={() => onToggleForm('login')}
            className='cursor-pointer text-cyan-600'
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </>
  )
}

export default RegisterForm
