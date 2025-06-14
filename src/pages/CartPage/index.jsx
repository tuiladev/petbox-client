import React, { useState, useCallback, useMemo } from 'react'
import Button from '~/components/common/Button'
import { formatCurrency } from '~/utils/formatters'

// Constants
const PRODUCT_VARIANTS = ['MEMO G6', 'MEMO G6+GĂNG TAY+ĐEN', 'GĂNG TAY']

// Product Image Component
const ProductImage = ({ src, alt, className = '' }) => (
  <div className={`flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 ${className}`}>
    <img
      src={src}
      alt={alt}
      className='h-full w-full object-cover'
      onError={(e) => {
        e.target.style.display = 'none'
        e.target.parentNode.innerHTML =
          '<div class="text-gray-400 text-xs flex-center h-full">📦</div>'
      }}
    />
  </div>
)

// Variant Selector Component
const VariantSelector = ({ selectedVariant, onVariantChange, productId }) => (
  <div className='relative'>
    <select
      value={selectedVariant}
      onChange={(e) => onVariantChange(productId, e.target.value)}
      className='w-full cursor-pointer appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2 text-sm text-gray-700 transition-colors focus:border-orange-500 focus:ring-0 focus:outline-none'
    >
      {PRODUCT_VARIANTS.map((variant) => (
        <option key={variant} value={variant}>
          {variant}
        </option>
      ))}
    </select>
    <svg
      className='pointer-events-none absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 transform text-gray-400'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
    </svg>
  </div>
)

// Price Display Component
const PriceDisplay = ({ originalPrice, salePrice, className = '' }) => (
  <div className={`space-y-1 ${className}`}>
    <p className='text-xs text-gray-400 line-through'>{formatCurrency(originalPrice)}</p>
    <p className='font-medium text-gray-900'>{formatCurrency(salePrice)}</p>
  </div>
)

// Quantity Control Component
const QuantityControl = ({ quantity, onQuantityChange, productId }) => (
  <div className='flex items-center rounded-lg border border-gray-200'>
    <button
      onClick={() => onQuantityChange(productId, quantity - 1)}
      className='flex h-8 w-8 items-center justify-center text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50'
      disabled={quantity <= 1}
    >
      −
    </button>
    <span className='min-w-[2rem] border-x border-gray-200 px-3 py-1 text-center'>{quantity}</span>
    <button
      onClick={() => onQuantityChange(productId, quantity + 1)}
      className='flex h-8 w-8 items-center justify-center text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700'
    >
      +
    </button>
  </div>
)

// Remove Button Component
const RemoveButton = ({ onRemove, productId }) => (
  <button
    onClick={() => onRemove(productId)}
    className='rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500'
    title='Xóa sản phẩm'
  >
    <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
      />
    </svg>
  </button>
)

// Cart Table Header Component
const CartTableHeader = () => (
  <div className='grid grid-cols-12 gap-4 rounded-t-lg bg-gray-50 p-4 font-semibold text-gray-600'>
    <div className='col-span-5'>Sản Phẩm</div>
    <div className='col-span-2 text-center'>Đơn Giá</div>
    <div className='col-span-2 text-center'>Số Lượng</div>
    <div className='col-span-2 text-center'>Số Tiền</div>
    <div className='col-span-1 text-center'>Thao Tác</div>
  </div>
)

// Single Cart Item Component
const CartItem = ({ product, onQuantityUpdate, onVariantUpdate, onProductRemove }) => {
  const totalItemPrice = product.salePrice * product.quantity

  return (
    <div className='border-t border-gray-100 bg-white p-4'>
      <div className='grid grid-cols-12 items-center gap-4'>
        {/* Product Information Section */}
        <div className='col-span-5 flex items-center gap-6'>
          <ProductImage src={product.image} alt={product.name} className='h-24 w-24' />
          <div className='min-w-0 flex-1'>
            <h3 className='mb-2 leading-tight font-medium text-gray-800'>{product.name}</h3>
            <VariantSelector
              selectedVariant={product.variant}
              onVariantChange={onVariantUpdate}
              productId={product.id}
            />
          </div>
        </div>

        {/* Unit Price Section */}
        <div className='col-span-2 text-center'>
          <PriceDisplay originalPrice={product.originalPrice} salePrice={product.salePrice} />
        </div>

        {/* Quantity Control Section */}
        <div className='col-span-2 flex-center'>
          <QuantityControl
            quantity={product.quantity}
            onQuantityChange={onQuantityUpdate}
            productId={product.id}
          />
        </div>

        {/* Total Price Section */}
        <div className='col-span-2 text-center'>
          <div className='text-lg font-semibold text-orange-600'>
            {formatCurrency(totalItemPrice)}
          </div>
        </div>

        {/* Remove Action Section */}
        <div className='col-span-1 text-center'>
          <RemoveButton onRemove={onProductRemove} productId={product.id} />
        </div>
      </div>
    </div>
  )
}

// Cart Table Component
const CartTable = ({ products, onQuantityUpdate, onVariantUpdate, onProductRemove }) => (
  <div className='mb-4 overflow-hidden rounded-lg border border-gray-200'>
    <CartTableHeader />
    <div>
      {products.map((product) => (
        <CartItem
          key={product.id}
          product={product}
          onQuantityUpdate={onQuantityUpdate}
          onVariantUpdate={onVariantUpdate}
          onProductRemove={onProductRemove}
        />
      ))}
    </div>
  </div>
)

// Promotion Banner Component
const PromotionBanner = () => (
  <div className='mb-6 rounded-lg border border-orange-200 bg-orange-50/50 p-4'>
    <div className='flex items-center'>
      <span className='mr-3 rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700'>
        Combo khuyến mãi
      </span>
      <span className='text-sm text-orange-700'>Mua thêm 2 sản phẩm để giảm 1%</span>
      <span className='ml-auto text-orange-600'>›</span>
    </div>
  </div>
)

// Shipping Information Component
const ShippingInformation = () => (
  <div className='mt-4 rounded-lg border border-gray-200 bg-white p-4'>
    <div className='flex items-center space-x-3'>
      <span className='mt-0.5 text-lg text-green-600'>🚚</span>
      <div className='flex-1 text-sm'>
        <span className='text-gray-700'>
          Giảm ₫300.000 phí vận chuyển đơn tối thiểu ₫0;
          <br />
          Giảm ₫500.000 phí vận chuyển đơn tối thiểu ₫500.000
        </span>
        <button className='ml-1 font-medium text-blue-600 hover:underline'>Tìm hiểu thêm</button>
      </div>
    </div>
  </div>
)

// Order Summary Component
const OrderSummary = ({ totalItemCount, totalAmount, onCheckoutClick }) => (
  <div className='mt-6 rounded-lg border border-gray-200 bg-white p-6'>
    <div className='flex items-center justify-between'>
      <div className='mr-6 flex-1 text-right'>
        <div className='mb-2 text-sm text-gray-600'>Tổng cộng ({totalItemCount} sản phẩm)</div>
        <div className='text-3xl font-bold text-orange-600'>{formatCurrency(totalAmount)}</div>
      </div>
      <Button
        variant='filled'
        size='lg'
        className='rounded-full bg-orange-600 px-8 py-4 text-lg font-semibold hover:bg-orange-700'
        onClick={onCheckoutClick}
      >
        Đặt Hàng
      </Button>
    </div>
  </div>
)

// Main Cart Page Component
const CartPage = () => {
  // Initial cart state
  const [cartProducts, setCartProducts] = useState([
    {
      id: 1,
      name: 'Serum Vaseline Gluta-Hya Dưỡng Da Sáng Mịn Sau 7 Ngày 33ml',
      variant: 'Bảo vệ sáng mịn',
      originalPrice: 150000,
      salePrice: 120000,
      quantity: 1,
      image: 'https://via.placeholder.com/80x80/f3f4f6/9ca3af?text=Product'
    },
    {
      id: 2,
      name: 'Quạt tản nhiệt MEMO G6 Quạt Tản Nhiệt Điện thoại/Gaming cho điện thoại',
      variant: 'GĂNG TAY',
      originalPrice: 115000,
      salePrice: 9000,
      quantity: 1,
      image: 'https://via.placeholder.com/80x80/f3f4f6/9ca3af?text=Product'
    },
    {
      id: 3,
      name: 'Quạt tản nhiệt MEMO G6 Quạt Tản Nhiệt Điện thoại/Gaming cho điện thoại',
      variant: 'MEMO G6',
      originalPrice: 70000,
      salePrice: 35000,
      quantity: 1,
      image: 'https://via.placeholder.com/80x80/f3f4f6/9ca3af?text=Product'
    }
  ])

  // Event handlers with useCallback for performance optimization
  const handleQuantityUpdate = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) return

    setCartProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId ? { ...product, quantity: newQuantity } : product
      )
    )
  }, [])

  const handleVariantUpdate = useCallback((productId, newVariant) => {
    setCartProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId ? { ...product, variant: newVariant } : product
      )
    )
  }, [])

  const handleProductRemove = useCallback((productId) => {
    setCartProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId)
    )
  }, [])

  const handleCheckoutClick = useCallback(() => {
    console.log('Proceeding to checkout with products:', cartProducts)
    // Navigate to checkout page logic here
  }, [cartProducts])

  // Computed values with useMemo for performance optimization
  const cartSummary = useMemo(() => {
    const totalItemCount = cartProducts.reduce((sum, product) => sum + product.quantity, 0)
    const totalAmount = cartProducts.reduce(
      (sum, product) => sum + product.salePrice * product.quantity,
      0
    )

    return { totalItemCount, totalAmount }
  }, [cartProducts])

  return (
    <div className='l-container mt-8 px-4 pb-8'>
      <PromotionBanner />

      <CartTable
        products={cartProducts}
        onQuantityUpdate={handleQuantityUpdate}
        onVariantUpdate={handleVariantUpdate}
        onProductRemove={handleProductRemove}
      />

      <ShippingInformation />

      <OrderSummary
        totalItemCount={cartSummary.totalItemCount}
        totalAmount={cartSummary.totalAmount}
        onCheckoutClick={handleCheckoutClick}
      />
    </div>
  )
}

export default CartPage
