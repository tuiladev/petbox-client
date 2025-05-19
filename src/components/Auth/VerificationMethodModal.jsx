import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import Modal from '~/components/common/Modal'
import Button from '~/components/common/Button'

const sendSmsVerification = (phoneNumber) => {
  console.log('Gửi mã xác thực qua SMS đến số:', phoneNumber)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Đã gửi mã xác thực qua SMS' })
    }, 1000)
  })
}
const sendZaloVerification = (phoneNumber) => {
  console.log('Gửi mã xác thực qua Zalo đến số:', phoneNumber)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Đã gửi mã xác thực qua Zalo' })
    }, 1000)
  })
}

const VerificationMethodModal = ({ isOpen, onClose, phoneNumber, onSuccess }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const handleSmsVerification = async () => {
    setIsLoading(true)
    const result = await sendSmsVerification(phoneNumber)
    if (result.success) {
      onSuccess('sms')
    }
    setIsLoading(false)
    onClose()
  }
  const handleZaloVerification = async () => {
    setIsLoading(true)
    const result = await sendZaloVerification(phoneNumber)
    if (result.success) {
      onSuccess('zalo')
    }
    setIsLoading(false)
    onClose()
  }

  return createPortal(
    isOpen && (
      <Modal isOpen={isOpen}>
        <Modal.Overlay onClick={onClose} className='opacity-70' />
        <Modal.Content size='lg' className='px-8 py-6'>
          <h3 className='mx-auto mb-6 w-full text-center text-base leading-relaxed font-medium text-gray-800 md:max-w-4/5'>
            {t('auth.verification.sendToPhone')} {phoneNumber}
          </h3>

          <div className='grid gap-3 md:grid-cols-3'>
            <Button
              onClick={onClose}
              className='text-base-content! row-start-3 w-full rounded-sm border-1 border-gray-200 bg-white! hover:bg-gray-100! md:row-start-1'
              disabled={isLoading}
            >
              {t('auth.verification.cancel')}
            </Button>
            <Button
              onClick={handleSmsVerification}
              className='text-base-content! row-start-2 w-full rounded-sm border-1 border-gray-200 bg-white! hover:bg-gray-100! md:row-start-1'
              disabled={isLoading}
            >
              {t('auth.verification.sms')}
            </Button>

            <Button onClick={handleZaloVerification} className='w-full rounded-sm' disabled={isLoading}>
              {t('auth.verification.zalo')}
            </Button>
          </div>
        </Modal.Content>
      </Modal>
    ),
    document.body
  )
}

export default VerificationMethodModal
