import { useState } from 'react'
import useModal from '~/hooks/useModal'

// Components
import Button from '~/components/common/Button'
import Modal from '~/components/common/Modal'
import TabHeading from './TabHeading'
import AddressEditForm from '../forms/AddressEditForm'
import { useTranslation } from 'react-i18next'

const AddressTab = ({ user }) => {
  const { t } = useTranslation('profile')
  const { isOpen, openModal, closeModal } = useModal()
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [addresses, setAddresses] = useState(
    user?.addresses || [
      {
        id: 1,
        name: 'Đặng Văn Trung',
        phone: '(+84) 337 336 487',
        type: 'Nhà Riêng',
        province: 'TP. Hồ Chí Minh, Thành Phố Thủ Đức, Phường Bình Thọ',
        address: 'Số 55 Dân Chủ',
        isDefault: true
      },
      {
        id: 2,
        name: 'Nguyễn Ngọc Như Yến',
        phone: '(+84) 337 336 487',
        type: 'Văn Phòng',
        province: 'Hà Nội, Hai Bà Trưng, Bách Khoa',
        address: 'Số 1 Đại Cồ Việt',
        isDefault: false
      }
    ]
  )

  const handleUpdateAddress = (address) => {
    setSelectedAddress(address)
    openModal()
  }

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id))
  }

  const handleSetDefaultAddress = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id
      }))
    )
  }

  const handleSaveAddress = (formData) => {
    if (selectedAddress) {
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === selectedAddress.id ? { ...addr, ...formData } : addr))
      )
    } else {
      const newAddress = {
        ...formData,
        id: Math.max(...addresses.map((a) => a.id), 0) + 1,
        isDefault: addresses.length === 0
      }
      setAddresses((prev) => [...prev, newAddress])
    }
    closeModal()
  }

  const handleAddNewAddress = () => {
    setSelectedAddress(null)
    openModal()
  }

  return (
    <div className='space-y-8'>
      <TabHeading title='address' />
      {addresses.length > 0 ? (
        <div className='grid grid-cols-3 gap-4'>
          {[...addresses]
            .sort((a, b) => {
              if (a.isDefault === b.isDefault) return 0
              return a.isDefault ? -1 : 1
            })
            .map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onUpdate={handleUpdateAddress}
                onDelete={handleDeleteAddress}
                onSetDefault={handleSetDefaultAddress}
              />
            ))}
        </div>
      ) : (
        <p className='text-center text-gray-500'>Bạn chưa có địa chỉ giao hàng nào</p>
      )}
      <Button onClick={handleAddNewAddress} variant='filled' size='md' type='button'>
        + {t('action.addAddress')}
      </Button>

      <Modal isOpen={isOpen}>
        <Modal.Overlay onClick={closeModal} />
        <Modal.Content size='lg'>
          <AddressEditForm
            address={selectedAddress}
            onClose={closeModal}
            onSave={handleSaveAddress}
          />
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default AddressTab

// Get Icon base on address type
const getAddressTypeIcon = (type) => {
  switch (type?.toLowerCase()) {
    case 'văn phòng':
      return 'fi fi-rr-building'
    default:
      return 'fi fi-rr-home'
  }
}

const AddressCard = ({ address, onUpdate, onDelete, onSetDefault }) => {
  const { t } = useTranslation('profile')
  const handleCardClick = () => {
    onUpdate && onUpdate(address)
  }

  return (
    <div
      className='group flex h-full cursor-pointer flex-col justify-between rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:shadow-md'
      onClick={handleCardClick}
    >
      {/* Icon và nút hành động */}
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <i className={getAddressTypeIcon(address.type)}></i>
          <span className='text-gray-600'>{address.type}</span>
        </div>
        <div className='flex items-center gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100'>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onUpdate && onUpdate(address)
            }}
            className='text-primary cursor-pointer'
          >
            {t('action.update')}
          </button>
          {!address.isDefault && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete && onDelete(address.id)
              }}
              className='cursor-pointer text-red-500'
            >
              {t('action.remove')}
            </button>
          )}
        </div>
      </div>

      <div className='flex flex-grow flex-col justify-between'>
        {/* Thông tin người nhận */}
        <div className='mb-2 space-y-1'>
          <h3 className='font-semibold'>{address.name}</h3>
          <p className='text-sm'>{address.phone}</p>
          <p className='line-clamp-2 text-sm text-gray-500'>
            {`${address.address}, ${address.province}`}
          </p>
        </div>

        {/* Phần đặt mặc định */}
        <div>
          {!address.isDefault && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSetDefault && onSetDefault(address.id)
              }}
              className='text-primary cursor-pointer text-sm'
            >
              {t('action.setDefault')}
            </button>
          )}
          {address.isDefault && (
            <span className='text-sm font-bold text-amber-600'>{t('action.isDefault')}</span>
          )}
        </div>
      </div>
    </div>
  )
}
