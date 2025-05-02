import React, { useState } from 'react'
import { Button } from '~/components/common/Button'
import SocialLogin from './SocialLogin'
import FormInput from './FormInput'

const AuthForm = ({ isRegistered, onToggleForm, handlerSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    remember: false,
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

    // Validation cho đăng ký
    if (!isRegistered) {
      if (formData.password !== formData.confirmPassword) {
        setError('Mật khẩu xác nhận không khớp')
        return
      }
      if (!formData.acceptTerms) {
        setError('Vui lòng đồng ý với điều khoản sử dụng')
        return
      }
    }

    try {
      const result = await handlerSubmit(formData, e)
      if (!result.success) {
        setError(result.error || 'Đã xảy ra lỗi')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setError('Đã xảy ra lỗi không mong muốn')
    }
  }

  // Component cho checkbox tùy chỉnh
  const CustomCheckbox = ({ id, name, checked, label, required }) => (
    <div className='ml-4 flex items-center'>
      <div className='relative flex items-center'>
        <input
          type='checkbox'
          id={id}
          name={name}
          checked={checked}
          onChange={handleChange}
          className='absolute h-0 w-0 opacity-0'
        />
        <label
          htmlFor={id}
          className={`mr-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-gray-300 ${
            checked ? 'bg-cyan-600' : 'bg-white'
          }`}
        >
          {checked && <span className='h-2 w-2 rounded-full bg-white'></span>}
        </label>
      </div>
      <label htmlFor={id} className='cursor-pointer text-sm text-gray-600'>
        {label}
        {required && <span className='ml-1 text-red-500'>*</span>}
      </label>
    </div>
  )

  const inputs = document.querySelectorAll('input[required]')
  inputs.forEach((input) => {
    input.oninvalid = function () {
      this.setCustomValidity('Vui lòng nhập đầy đủ thông tin')
    }
    input.oninput = function () {
      this.setCustomValidity('')
    }
  })

  return (
    <>
      <h2 className='mb-8 text-center text-4xl font-bold text-cyan-600'>
        {isRegistered ? 'Đăng Nhập' : 'Tạo Tài Khoản'}
      </h2>

      {error && (
        <div className='mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600'>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {!isRegistered && (
          <FormInput
            label='Họ và tên'
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            isRequired={true}
          />
        )}

        <div className='flex'>
          <FormInput
            label={isRegistered ? 'Email/ Số điện thoại' : 'Email'}
            type='text'
            name='email'
            value={formData.email}
            className={isRegistered ? 'w-full' : 'mr-3 w-3/4'}
            isRequired={true}
            onChange={handleChange}
          />

          {!isRegistered && (
            <FormInput
              label='Số điện thoại'
              type='tel'
              name='phone'
              value={formData.phone}
              className='grow'
              onChange={handleChange}
              isRequired={true}
            />
          )}
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

        {!isRegistered && (
          <FormInput
            label='Xác nhận mật khẩu'
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            isRequired={true}
            onChange={handleChange}
          />
        )}

        <div className='flex items-center justify-between'>
          {isRegistered ? (
            <>
              <CustomCheckbox
                id='remember'
                name='remember'
                checked={formData.remember}
                label='Ghi nhớ đăng nhập'
              />
              <a
                href='#'
                className='text-gray-600 hover:text-[color:var(--color-primary)]'
              >
                Quên mật khẩu
              </a>
            </>
          ) : (
            <CustomCheckbox
              id='acceptTerms'
              name='acceptTerms'
              checked={formData.acceptTerms}
              required
              label={
                <>
                  Đồng ý với{' '}
                  <a href='#' className='text-[color:var(--color-primary)]'>
                    điều khoản
                  </a>{' '}
                  sử dụng.
                </>
              }
            />
          )}
        </div>

        <Button
          type='submit'
          className='text-primary mt-6 w-full bg-cyan-600! text-lg'
        >
          {isRegistered ? 'Đăng Nhập' : 'Đăng Ký'}
        </Button>

        <div className='relative mt-10 mb-8'>
          <hr className='border-gray-300' />
          <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white px-3 text-sm text-gray-500'>
            Hoặc sử dụng
          </span>
        </div>

        <SocialLogin isRegistered={isRegistered} />

        <div className='mt-6 text-center'>
          <p className='text-gray-600'>
            {isRegistered ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
            <button
              type='button'
              onClick={onToggleForm}
              className='cursor-pointer text-cyan-600'
            >
              {isRegistered ? 'Đăng ký' : 'Đăng nhập'}
            </button>
          </p>
        </div>
      </form>
    </>
  )
}

export default AuthForm
