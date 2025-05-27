import { useMemo, useState } from 'react'
import { formatCurrency } from '~/utils/formatters'
import { useTranslation } from 'react-i18next'
import Button from '~/components/common/Button'
import { Link } from 'react-router-dom'
import QuantityControl from './../../components/common/QuantityControl'

const ProductDetailTop = ({ product }) => {
  // Translation
  const { t } = useTranslation('product')

  // Sort variant by sales price
  const sortedVariants = useMemo(
    () => [...product.variants].sort((a, b) => a.price - b.price),
    [product.variants]
  )

  const [selectedVariant, setSelectedVariant] = useState(sortedVariants[0])
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    console.log('Add to cart')
  }

  const handleBuyNow = () => {
    console.log('Buy Now')
  }

  const handleAddToWishlist = () => {
    console.log('Add to wish list')
  }

  const handleCompare = () => {
    console.log('Compare to')
  }

  return (
    <div className='col-span-3 space-y-6'>
      <div className='space-y-4 border-b-1 border-gray-200 pb-6'>
        {/* Category */}
        <div className='text-primary inline-block rounded-full border border-gray-300 px-4 py-1 text-sm font-semibold uppercase'>
          {product.category.name}
        </div>

        {/* Name and rating */}
        <div className='space-y-2'>
          <h1 className='title-3xl'>{product.name}</h1>
          <div className='flex items-center gap-3'>
            <span>(4.8)</span>
            <div className='flex items-center border-r-[1.5px] border-r-gray-400 pr-4'>
              {[1, 2, 3, 4].map((star) => (
                <i key={star} className='fi fi-sr-star text-lg text-yellow-400'></i>
              ))}
              <i className='fi fi-rr-star text-lg text-gray-300'></i>
            </div>
            <Link to='#'>2 {t('review')}</Link>
          </div>
        </div>

        {/* Price */}
        <div className='text-secondary text-4xl font-bold'>
          {formatCurrency(selectedVariant.salePrice)}
        </div>
      </div>

      {/* Body */}
      <div className='space-y-6'>
        {/* Variant selector */}
        <div className='flex flex-wrap items-center gap-2'>
          <span className='inline-block font-semibold'>{t('type')}</span>
          {sortedVariants.map((variant) => (
            <button
              key={variant._id}
              onClick={() => {
                setSelectedVariant(variant)
                setQuantity(1)
              }}
              className={
                `cursor-pointer rounded-full border px-4 py-3 transition-all duration-200 ` +
                (selectedVariant._id === variant._id
                  ? 'border-primary bg-primary text-white shadow-md'
                  : 'hover:border-primary border-gray-300 bg-white text-gray-700')
              }
            >
              {variant.variantType.name}
            </button>
          ))}
        </div>

        {/* Quantity & Add to Cart */}
        <div className='flex w-full items-center gap-4'>
          {/* Quantity Selector */}
          <span className='inline-block font-semibold'>{t('quantity')}</span>
          <QuantityControl maxQuantity={selectedVariant.stock} />

          {/* Stock Status */}
          {selectedVariant.stock > 0 ? (
            <div className='text-green-600 capitalize'>
              <i className='fi fi-rr-check-circle mr-1 inline-block translate-y-0.5'></i>
              {t('stock')} : {selectedVariant.stock} {t('product')}
            </div>
          ) : (
            <div className='text-red-600 capitalize'>
              <i className='fi fi-rr-cross-circle mr-1 inline-block translate-y-0.5'></i>
              {t('soldOut')}
            </div>
          )}
        </div>

        <div className='flex w-full gap-4 lg:w-3/5'>
          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={selectedVariant.stock === 0}
            variant='outlined'
            size='md'
            className={`flex-1 rounded-full capitalize ${selectedVariant.stock === 0 ? 'pointer-events-none' : ''}`}
          >
            {t('addToCart')}
          </Button>

          {/* Buy Now Button */}
          <Button
            onClick={handleBuyNow}
            disabled={selectedVariant.stock === 0}
            variant='filled'
            size='md'
            className={`!bg-secondary flex-1 rounded-full capitalize ${selectedVariant.stock === 0 ? 'pointer-events-none' : ''}`}
          >
            <i className='fi fi-rr-shopping-cart mr-2 inline-block translate-y-0.5 text-lg'></i>
            {t('buyItNow')}
          </Button>
        </div>

        {/* Action Buttons */}
        <div className='flex space-x-4 pt-4'>
          {/* Add to wish list button */}
          <button
            onClick={handleAddToWishlist}
            className='hover:text-primary group cursor-pointer items-center capitalize transition-colors duration-200'
          >
            <i className='fi fi-rr-heart mr-2 inline-block translate-y-1 text-xl'></i>
            {t('addToWishList')}
          </button>
          {/* Share button */}
          <div className='hover:text-primary group flex cursor-pointer items-center border-l-[1.5px] border-l-gray-400 pl-4 capitalize transition-colors duration-200'>
            <i className='fi fi-rr-redo mr-2 inline-block translate-y-1 text-xl'></i>
            {t('share')} :
            <div className='ml-4 flex gap-2'>
              <button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700'>
                <i className='fi fi-brands-facebook inline-block translate-y-0.5'></i>
              </button>
              <button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-pink-600 text-white transition-colors hover:bg-pink-700'>
                <i className='fi fi-brands-instagram inline-block translate-y-0.5'></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailTop
