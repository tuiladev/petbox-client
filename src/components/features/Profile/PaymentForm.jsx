import { useState } from 'react'
import Button from '~/components/common/Button'
import FloatingInput from '~/components/common/FloatingInput'

const CARD_TYPES = {
  VISA: {
    name: 'Visa',
    pattern: /^4/
  },
  MASTERCARD: {
    name: 'Mastercard',
    pattern: /^(5[1-5]|2[2-7])/
  },
  JCB: {
    name: 'JCB',
    pattern: /^35/
  },
  AMEX: {
    name: 'American Express',
    pattern: /^3[47]/
  },
  NAPAS: {
    name: 'NAPAS',
    pattern: /^9704/
  }
}

// Danh sách BIN của các ngân hàng Việt Nam
const BANK_BINS = {
  // Vietcombank
  970436: 'Ngân hàng TMCP Ngoại thương Việt Nam',
  // Agribank
  970405: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam',
  // BIDV
  970418: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
  // Techcombank
  970407: 'Ngân hàng TMCP Kỹ thương Việt Nam',
  // VPBank
  970432: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
  // ACB
  970416: 'Ngân hàng TMCP Á Châu',
  // MB Bank
  970422: 'Ngân hàng TMCP Quân đội',
  // Sacombank
  970403: 'Ngân hàng TMCP Sài Gòn Thương Tín',
  // VietinBank
  970415: 'Ngân hàng TMCP Công thương Việt Nam',
  // TPBank
  970423: 'Ngân hàng TMCP Tiên Phong',
  // VIB
  970441: 'Ngân hàng TMCP Quốc tế Việt Nam',
  // SHB
  970443: 'Ngân hàng TMCP Sài Gòn - Hà Nội',
  // OCB
  970448: 'Ngân hàng TMCP Phương Đông',
  // MSB
  970426: 'Ngân hàng TMCP Hàng Hải',
  // HDBank
  970437: 'Ngân hàng TMCP Phát triển TP. Hồ Chí Minh',
  // SeABank
  970440: 'Ngân hàng TMCP Đông Nam Á',
  // Bac A Bank
  970409: 'Ngân hàng TMCP Bắc Á',
  // PVCombank
  970412: 'Ngân hàng TMCP Đại Chúng Việt Nam',
  // Eximbank
  970431: 'Ngân hàng TMCP Xuất Nhập khẩu Việt Nam'
}

const PaymentForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardHolder: '',
    address: '',
    postalCode: ''
  })

  const [errors, setErrors] = useState({})
  const [errorMessages, setErrorMessages] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [cardInfo, setCardInfo] = useState({ type: '', bank: '' })

  const formatCardNumber = (value) => {
    // Loại bỏ khoảng trắng và ký tự không phải số
    const cleaned = value.replace(/\D/g, '')
    // Thêm khoảng trắng sau mỗi 4 số
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned
    return formatted
  }

  const detectCardType = (number) => {
    const cleanNumber = number.replace(/\D/g, '')

    // Kiểm tra NAPAS trước (thẻ nội địa)
    if (CARD_TYPES.NAPAS.pattern.test(cleanNumber)) {
      return CARD_TYPES.NAPAS.name
    }

    // Kiểm tra các loại thẻ quốc tế
    for (const [key, value] of Object.entries(CARD_TYPES)) {
      if (key !== 'NAPAS' && value.pattern.test(cleanNumber)) {
        return value.name
      }
    }
    return ''
  }

  const detectBank = (number) => {
    const cleanNumber = number.replace(/\D/g, '')
    // Kiểm tra 6 số đầu của thẻ (BIN)
    const bin = cleanNumber.slice(0, 6)

    // Nếu là thẻ NAPAS, hiển thị tên ngân hàng đầy đủ
    if (CARD_TYPES.NAPAS.pattern.test(cleanNumber)) {
      return BANK_BINS[bin] || 'Ngân hàng nội địa khác'
    }

    // Nếu là thẻ quốc tế
    return BANK_BINS[bin] || 'Ngân hàng quốc tế'
  }

  const formatExpiry = (value) => {
    // Loại bỏ các ký tự không phải số
    const cleaned = value.replace(/\D/g, '')

    // Nếu có 2 số trở lên
    if (cleaned.length >= 2) {
      const month = cleaned.slice(0, 2)
      const year = cleaned.slice(2, 4)

      // Kiểm tra tháng hợp lệ (01-12)
      if (parseInt(month) > 12) {
        return '12' + (year ? '/' + year : '')
      }
      if (parseInt(month) === 0) {
        return '01' + (year ? '/' + year : '')
      }

      return month + (year ? '/' + year : '')
    }

    return cleaned
  }

  const validateCardNumber = (number) => {
    const digits = number.replace(/\D/g, '')

    // Kiểm tra độ dài
    if (digits.length < 13 || digits.length > 19) {
      return {
        isValid: false,
        message: 'Số thẻ phải có từ 13 đến 19 chữ số'
      }
    }

    // Kiểm tra loại thẻ
    const cardType = detectCardType(digits)
    if (!cardType) {
      return {
        isValid: false,
        message: 'Loại thẻ không được hỗ trợ'
      }
    }

    // Với thẻ NAPAS, kiểm tra thêm độ dài chuẩn là 16 số và bắt đầu bằng 9704
    if (cardType === 'NAPAS' && digits.length !== 16) {
      return {
        isValid: false,
        message: 'Thẻ NAPAS phải có đúng 16 số'
      }
    }

    // Kiểm tra Luhn Algorithm (áp dụng cho cả thẻ nội địa và quốc tế)
    let sum = 0
    let isEven = false

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i], 10)

      if (isEven) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }

      sum += digit
      isEven = !isEven
    }

    if (sum % 10 !== 0) {
      return {
        isValid: false,
        message: 'Số thẻ không hợp lệ, vui lòng kiểm tra lại'
      }
    }

    return { isValid: true, message: '' }
  }

  const validateExpiry = (value) => {
    if (!value) return { isValid: false, message: 'Vui lòng nhập ngày hết hạn' }

    const [month, year] = value.split('/')
    const currentYear = new Date().getFullYear() % 100 // Lấy 2 số cuối của năm
    const currentMonth = new Date().getMonth() + 1 // Tháng từ 1-12

    if (!month || !year || month.length !== 2 || year.length !== 2) {
      return { isValid: false, message: 'Định dạng ngày không hợp lệ (MM/YY)' }
    }

    const monthNum = parseInt(month, 10)
    const yearNum = parseInt(year, 10)

    if (monthNum < 1 || monthNum > 12) {
      return { isValid: false, message: 'Tháng không hợp lệ' }
    }

    if (
      yearNum < currentYear ||
      (yearNum === currentYear && monthNum < currentMonth)
    ) {
      return { isValid: false, message: 'Thẻ đã hết hạn' }
    }

    return { isValid: true, message: '' }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value)
      // Giới hạn độ dài số thẻ (16 số + 3 khoảng trắng = 19)
      if (formattedValue.length > 19) return

      // Cập nhật thông tin thẻ khi người dùng nhập
      const cleanNumber = formattedValue.replace(/\D/g, '')
      if (cleanNumber.length >= 6) {
        const type = detectCardType(cleanNumber)
        const bank = detectBank(cleanNumber)
        setCardInfo({ type, bank })
      } else {
        setCardInfo({ type: '', bank: '' })
      }
    }

    if (name === 'expiry') {
      formattedValue = formatExpiry(value)
      // Chỉ cho phép nhập tối đa 5 ký tự (MM/YY)
      if (value.includes('/') && formattedValue.length > 5) return
      if (!value.includes('/') && formattedValue.length > 4) return
    }

    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3) // Chỉ cho phép số và giới hạn 3 ký tự
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue
    }))

    // Xóa lỗi khi người dùng bắt đầu nhập lại
    if (isSubmitted) {
      setErrors((prev) => ({ ...prev, [name]: false }))
      setErrorMessages((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  const validateForm = () => {
    const newErrors = {}
    const newErrorMessages = {}

    // Validate số thẻ
    const cardValidation = validateCardNumber(formData.cardNumber)
    if (!formData.cardNumber.trim() || !cardValidation.isValid) {
      newErrors.cardNumber = true
      newErrorMessages.cardNumber =
        cardValidation.message || 'Vui lòng nhập số thẻ'
    }

    // Validate ngày hết hạn
    const expiryValidation = validateExpiry(formData.expiry)
    if (!formData.expiry.trim() || !expiryValidation.isValid) {
      newErrors.expiry = true
      newErrorMessages.expiry =
        expiryValidation.message || 'Vui lòng nhập ngày hết hạn'
    }

    // Validate CVV
    if (!formData.cvv.trim() || formData.cvv.length !== 3) {
      newErrors.cvv = true
      newErrorMessages.cvv = 'CVV phải có 3 chữ số'
    }

    // Validate các trường còn lại
    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = true
      newErrorMessages.cardHolder = 'Vui lòng nhập họ tên chủ thẻ'
    }
    if (!formData.address.trim()) {
      newErrors.address = true
      newErrorMessages.address = 'Vui lòng nhập địa chỉ'
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = true
      newErrorMessages.postalCode = 'Vui lòng nhập mã bưu chính'
    }

    setErrors(newErrors)
    setErrorMessages(newErrorMessages)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    if (validateForm()) {
      // Thêm thông tin loại thẻ và ngân hàng vào dữ liệu gửi đi
      onSave({
        ...formData,
        cardType: cardInfo.type,
        bank: cardInfo.bank
      })
    }
  }

  return (
    <div className='p-6'>
      <h2 className='mb-6 text-xl font-semibold'>Thêm Thẻ Tín dụng/Ghi nợ</h2>

      <div className='mb-4 rounded-lg border border-green-100 bg-green-50 p-4'>
        <div className='flex items-center gap-2'>
          <i className='fi fi-rr-shield-check text-green-600'></i>
          <p className='text-sm text-green-700'>
            Thông tin thẻ của bạn được mã hóa và bảo vệ an toàn
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='space-y-1'>
          <FloatingInput
            label='Số thẻ'
            name='cardNumber'
            value={formData.cardNumber}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            error={errors.cardNumber}
          />
          {cardInfo.type && cardInfo.bank && (
            <p className='text-sm text-gray-600'>
              {cardInfo.type} - {cardInfo.bank}
            </p>
          )}
          {errors.cardNumber && errorMessages.cardNumber && (
            <p className='text-sm text-red-500'>{errorMessages.cardNumber}</p>
          )}
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-1'>
            <FloatingInput
              label='Ngày hết hạn (MM/YY)'
              name='expiry'
              value={formData.expiry}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              error={errors.expiry}
            />
            {errors.expiry && errorMessages.expiry && (
              <p className='text-sm text-red-500'>{errorMessages.expiry}</p>
            )}
          </div>

          <div className='space-y-1'>
            <FloatingInput
              label='Mã CVV'
              name='cvv'
              value={formData.cvv}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              error={errors.cvv}
            />
            {errors.cvv && errorMessages.cvv && (
              <p className='text-sm text-red-500'>{errorMessages.cvv}</p>
            )}
          </div>
        </div>

        <div className='space-y-1'>
          <FloatingInput
            label='Họ và tên chủ thẻ'
            name='cardHolder'
            value={formData.cardHolder}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            error={errors.cardHolder}
          />
          {errors.cardHolder && errorMessages.cardHolder && (
            <p className='text-sm text-red-500'>{errorMessages.cardHolder}</p>
          )}
        </div>

        <div className='space-y-1'>
          <FloatingInput
            label='Địa chỉ'
            name='address'
            value={formData.address}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            error={errors.address}
          />
          {errors.address && errorMessages.address && (
            <p className='text-sm text-red-500'>{errorMessages.address}</p>
          )}
        </div>

        <div className='space-y-1'>
          <FloatingInput
            label='Mã bưu chính'
            name='postalCode'
            value={formData.postalCode}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            error={errors.postalCode}
          />
          {errors.postalCode && errorMessages.postalCode && (
            <p className='text-sm text-red-500'>{errorMessages.postalCode}</p>
          )}
        </div>

        <div className='mt-6 flex justify-end gap-4'>
          <Button type='button' variant='outlined' onClick={onClose}>
            Trở Lại
          </Button>
          <Button type='submit' variant='filled'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PaymentForm
