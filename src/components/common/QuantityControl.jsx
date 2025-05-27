import { useEffect, useState } from 'react'

const QuantityControl = ({ maxQuantity }) => {
  const [quantity, setQuantity] = useState(0)

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity)
    }
  }

  useEffect(() => {
    setQuantity(0)
  }, [maxQuantity])

  return (
    <div className='flex items-center rounded-full border border-gray-300 p-1'>
      <button
        onClick={() => handleQuantityChange(-1)}
        disabled={quantity <= 1}
        className='cursor-pointer rounded-full bg-gray-100 p-2 disabled:cursor-not-allowed disabled:opacity-50'
      >
        <i className='fi fi-rr-minus'></i>
      </button>
      <span className='text-secondary min-w-[60px] text-center text-lg font-semibold'>
        {quantity}
      </span>
      <button
        onClick={() => handleQuantityChange(1)}
        disabled={quantity >= maxQuantity}
        className='inline-block cursor-pointer rounded-full bg-gray-100 p-2 disabled:cursor-not-allowed disabled:opacity-50'
      >
        <i className='fi fi-rr-plus'></i>
      </button>
    </div>
  )
}

export default QuantityControl
