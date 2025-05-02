import { useState } from 'react'
import Button from '~/components/common/Button'
import FloatingInput from '~/components/common/FloatingInput'

const AddressSelect = ({ value, onChange, error = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [activeTab, setActiveTab] = useState('province')
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')

  // Mock data - trong thực tế sẽ lấy từ API
  const provinces = [
    'An Giang',
    'Bà Rịa - Vũng Tàu',
    'Bình Dương',
    'Bình Phước',
    'Bình Thuận',
    'Bình Định'
  ]
  const districts = ['Quận 1', 'Quận 2', 'Quận 3']
  const wards = ['Phường 1', 'Phường 2', 'Phường 3']

  const handleSelect = (type, value) => {
    switch (type) {
      case 'province':
        setSelectedProvince(value)
        setActiveTab('district')
        break
      case 'district':
        setSelectedDistrict(value)
        setActiveTab('ward')
        break
      case 'ward':
        setSelectedWard(value)
        setIsOpen(false)
        onChange(`${selectedProvince}, ${selectedDistrict}, ${value}`)
        break
    }
  }

  const handleClear = (e) => {
    e.stopPropagation()
    onChange('')
    setSelectedProvince('')
    setSelectedDistrict('')
    setSelectedWard('')
  }

  return (
    <div className='relative'>
      <div
        className={`relative w-full cursor-pointer rounded-md border px-3 py-3 transition-all outline-none ${!value && error ? 'border-red-500' : 'border-gray-300'} ${isOpen ? 'border-primary' : ''} `}
        onClick={() => {
          setIsOpen(!isOpen)
          setIsFocused(true)
        }}
        onBlur={() => setIsFocused(false)}
      >
        <div className='min-h-5'>{value}</div>
        <label
          className={`pointer-events-none absolute left-3 transition-all duration-200 ${
            isFocused || value
              ? '-top-2 bg-white px-1 text-xs'
              : 'top-1/2 -translate-y-1/2 text-base'
          } ${!value && error ? 'text-red-500' : 'text-gray-500'} `}
        >
          Tỉnh/Thành phố, Quận/Huyện, Phường/Xã
        </label>
        {value && (
          <button
            className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600'
            onClick={handleClear}
          >
            ×
          </button>
        )}
      </div>

      {isOpen && (
        <div className='absolute right-0 left-0 z-50 mt-1 rounded-md border bg-white shadow-lg'>
          <div className='flex border-b'>
            <div
              className={`flex-1 cursor-pointer p-3 text-center ${
                activeTab === 'province'
                  ? 'text-primary border-primary border-b-2'
                  : ''
              }`}
              onClick={() => setActiveTab('province')}
            >
              Tỉnh/Thành phố
            </div>
            <div
              className={`flex-1 cursor-pointer p-3 text-center ${
                activeTab === 'district'
                  ? 'text-primary border-primary border-b-2'
                  : ''
              } ${!selectedProvince ? 'cursor-not-allowed opacity-50' : ''}`}
              onClick={() => selectedProvince && setActiveTab('district')}
            >
              Quận/Huyện
            </div>
            <div
              className={`flex-1 cursor-pointer p-3 text-center ${
                activeTab === 'ward'
                  ? 'text-primary border-primary border-b-2'
                  : ''
              } ${!selectedDistrict ? 'cursor-not-allowed opacity-50' : ''}`}
              onClick={() => selectedDistrict && setActiveTab('ward')}
            >
              Phường/Xã
            </div>
          </div>
          <div className='max-h-60 overflow-y-auto'>
            {activeTab === 'province' &&
              provinces.map((province) => (
                <div
                  key={province}
                  className='cursor-pointer p-3 hover:bg-gray-100'
                  onClick={() => handleSelect('province', province)}
                >
                  {province}
                </div>
              ))}
            {activeTab === 'district' &&
              districts.map((district) => (
                <div
                  key={district}
                  className='cursor-pointer p-3 hover:bg-gray-100'
                  onClick={() => handleSelect('district', district)}
                >
                  {district}
                </div>
              ))}
            {activeTab === 'ward' &&
              wards.map((ward) => (
                <div
                  key={ward}
                  className='cursor-pointer p-3 hover:bg-gray-100'
                  onClick={() => handleSelect('ward', ward)}
                >
                  {ward}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

const AddressEditForm = ({ address, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: address?.name || '',
    phone: address?.phone || '',
    province: address?.province || '',
    address: address?.address || '',
    type: address?.type || 'Nhà Riêng'
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    if (isSubmitted) {
      setErrors((prev) => ({
        ...prev,
        [name]: !value.trim()
      }))
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault() // Ngăn form submit khi ấn enter
    }
  }

  const handleProvinceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      province: value
    }))

    if (isSubmitted) {
      setErrors((prev) => ({
        ...prev,
        province: !value.trim()
      }))
    }
  }

  const handleTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      type
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = true
    if (!formData.phone.trim()) newErrors.phone = true
    if (!formData.province.trim()) newErrors.province = true
    if (!formData.address.trim()) newErrors.address = true

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    if (validateForm()) {
      onSave(formData)
    }
  }

  return (
    <div className='p-6'>
      <h2 className='mb-6 text-xl font-semibold'>Cập nhật địa chỉ</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <FloatingInput
          label='Họ và tên'
          name='name'
          value={formData.name}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          error={errors.name}
        />

        <FloatingInput
          label='Số điện thoại'
          name='phone'
          type='tel'
          value={formData.phone}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          error={errors.phone}
        />

        <AddressSelect
          value={formData.province}
          onChange={handleProvinceChange}
          error={errors.province}
        />

        <FloatingInput
          label='Địa chỉ cụ thể'
          name='address'
          value={formData.address}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          error={errors.address}
        />

        <div>
          <label className='mb-1 block text-sm text-gray-500'>
            Loại địa chỉ:
          </label>
          <div className='mt-2 flex gap-4' onClick={(e) => e.stopPropagation()}>
            <div onClick={() => handleTypeChange('Nhà Riêng')}>
              <CustomCheckbox
                type='radio'
                label='Nhà Riêng'
                checked={formData.type === 'Nhà Riêng'}
                onChange={() => {}}
                name='type'
              />
            </div>
            <div onClick={() => handleTypeChange('Văn Phòng')}>
              <CustomCheckbox
                type='radio'
                label='Văn Phòng'
                checked={formData.type === 'Văn Phòng'}
                onChange={() => {}}
                name='type'
              />
            </div>
          </div>
        </div>

        <div className='mt-6 flex justify-end gap-4'>
          <Button type='button' variant='outlined' onClick={onClose}>
            Trở Lại
          </Button>
          <Button type='submit' variant='filled'>
            Hoàn thành
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddressEditForm
