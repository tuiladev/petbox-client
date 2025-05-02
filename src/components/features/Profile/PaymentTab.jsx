import React from 'react'
import { images } from '~/assets'
import Modal from '~/components/common/Modal'
import Button from '~/components/common/Button'
import TabHeading from './TabHeading'
import PaymentForm from './PaymentForm'
import useModal from '~/hooks/useModal'

// Component con hiển thị thẻ thanh toán
const PaymentCard = ({ method, onDelete, onSetDefault }) => {
  const renderCardLogo = () => {
    switch (method.type) {
      case 'Mastercard':
        return images.mastercard_icon
      case 'Visa':
        return images.visa_icon
      case 'Ví điện tử':
        return images.wallet_icon
      default:
        return null
    }
  }

  const formatCardNumber = (identifier) => {
    if (!identifier) return '**** **** **** ****'
    return identifier
  }

  return (
    <div className='group cursor-pointer space-y-3 rounded-lg border border-gray-200 p-4 transition-all duration-300 hover:shadow-md'>
      <div className='flex justify-between'>
        {/* Logo thẻ */}
        <div className='flex items-center gap-4'>
          <img
            src={renderCardLogo()}
            alt=''
            className='aspect-square h-8 w-8'
          />
          <span>{method.type}</span>
        </div>

        {/* Nút xóa */}
        {!method.isDefault && (
          <button
            onClick={() => onDelete && onDelete(method.id)}
            className='cursor-pointer opacity-0 transition-all duration-300 group-hover:text-red-500 group-hover:opacity-100'
          >
            Xóa
          </button>
        )}
      </div>

      {/* Thông tin thẻ */}
      <div className='space-y-2'>
        <p>{method.bank}</p>
        <h3 className='font-bold text-zinc-800'>{method.cardholder}</h3>
      </div>
      <p className='tracking-widest'>{formatCardNumber(method.identifier)}</p>
      {method.isDefault ? (
        <span className='text-sm font-bold text-amber-600'>Mặc định</span>
      ) : (
        <button
          onClick={() => onSetDefault && onSetDefault(method.id)}
          className='text-primary cursor-pointer text-sm'
        >
          Đặt làm mặc định
        </button>
      )}
    </div>
  )
}

const PaymentTab = ({ user }) => {
  const { isOpen, openModal, closeModal } = useModal()
  const [paymentMethods, setPaymentMethods] = React.useState(
    user?.paymentMethods || [
      {
        id: 1,
        type: 'Mastercard',
        bank: 'Ngân hàng Techcombank',
        cardholder: 'Đặng Văn Trung',
        identifier: '**** **** **** 9340',
        isDefault: true
      },
      {
        id: 2,
        type: 'Visa',
        bank: 'Ngân hàng VPBank',
        cardholder: 'Đặng Văn Trung',
        identifier: '**** **** **** 4231',
        isDefault: false
      },
      {
        id: 3,
        type: 'Ví điện tử',
        bank: 'Ví Momo',
        cardholder: 'Đặng Văn Trung',
        identifier: '0337336487',
        isDefault: false
      }
    ]
  )

  // Xử lý các event
  const handleDeletePayment = (id) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id))
  }

  const handleSetDefaultPayment = (id) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id
      }))
    )
  }

  const handleSavePayment = (formData) => {
    const newPayment = {
      id: Math.max(...paymentMethods.map((p) => p.id), 0) + 1,
      type: 'Visa', // Mặc định là Visa, có thể thay đổi dựa vào số thẻ
      bank: 'Ngân hàng',
      cardholder: formData.cardHolder,
      identifier: `**** **** **** ${formData.cardNumber.slice(-4)}`,
      isDefault: paymentMethods.length === 0
    }

    setPaymentMethods((prev) => [...prev, newPayment])
    closeModal()
  }

  return (
    <div className='space-y-8'>
      <TabHeading title='Phương Thức Thanh Toán' />
      {paymentMethods.length > 0 ? (
        <div className='grid grid-cols-3 gap-4'>
          {[...paymentMethods]
            .sort((a, b) => {
              if (a.isDefault === b.isDefault) return 0
              return a.isDefault ? -1 : 1
            })
            .map((method) => (
              <PaymentCard
                key={method.id}
                method={method}
                onDelete={handleDeletePayment}
                onSetDefault={handleSetDefaultPayment}
              />
            ))}
        </div>
      ) : (
        <p className='text-center text-gray-500'>
          Bạn chưa có phương thức thanh toán nào
        </p>
      )}
      <Button onClick={openModal} variant='filled' size='md' type='button'>
        + Thêm thẻ/ví
      </Button>

      {/* Modal thêm thẻ */}
      <Modal isOpen={isOpen}>
        <Modal.Overlay onClick={closeModal} />
        <Modal.Content size='lg'>
          <PaymentForm onClose={closeModal} onSave={handleSavePayment} />
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default PaymentTab
