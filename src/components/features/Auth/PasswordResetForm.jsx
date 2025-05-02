import { useState } from 'react'
import Button from '~/components/common/Button'
import FormInput from '../Auth/FormInput'

const PasswordResetForm = ({ onToggleForm }) => {
  const [formData, setFormData] = useState({
    email: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validation
    if (!formData.email) {
      setError('Vui lòng nhập email hoặc số điện thoại.')
      return
    }

    // Simulate API call
    try {
      // Giả lập gửi yêu cầu thành công
      setTimeout(() => {
        setSuccess(true)
      }, 1000)
    } catch (error) {
      console.error('Password reset error:', error)
      setError('Đã xảy ra lỗi khi gửi yêu cầu đặt lại mật khẩu.')
    }
  }

  return (
    <>
      <h2 className='mb-8 text-center text-4xl font-bold text-cyan-600'>
        Đặt Lại Mật Khẩu
      </h2>

      {error && (
        <div className='mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600'>
          {error}
        </div>
      )}

      {success ? (
        <div className='text-center'>
          <div className='mb-4 rounded-md bg-green-50 p-4 text-sm text-green-600'>
            Hướng dẫn đặt lại mật khẩu đã được gửi đến địa chỉ email/số điện
            thoại của bạn.
          </div>
          <p className='mb-4'>
            Vui lòng kiểm tra hộp thư đến và làm theo hướng dẫn để thiết lập mật
            khẩu mới.
          </p>
          <Button
            onClick={() => onToggleForm('login')}
            className='text-primary mt-2 w-full bg-cyan-600! text-lg'
          >
            Quay Lại Đăng Nhập
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className='mb-6 text-center leading-relaxed text-gray-600'>
            Nhập email hoặc số điện thoại đã đăng ký. Chúng tôi sẽ gửi hướng dẫn
            để đặt lại mật khẩu cho bạn.
          </p>

          <FormInput
            label='Email/ Số điện thoại'
            type='text'
            name='email'
            value={formData.email}
            onChange={handleChange}
            isRequired={true}
          />

          <Button
            type='submit'
            className='text-primary mt-2 w-full rounded-full bg-cyan-600! text-lg'
          >
            Gửi Yêu Cầu
          </Button>

          <div className='mt-8 text-center'>
            <button
              type='button'
              onClick={() => onToggleForm('login')}
              className='cursor-pointer text-cyan-600'
            >
              Quay lại trang đăng nhập
            </button>
          </div>
        </form>
      )}
    </>
  )
}

export default PasswordResetForm
