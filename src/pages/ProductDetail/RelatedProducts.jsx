import React, { useCallback } from 'react'
// import { formatCurrency } from '~/utils/formatters'
import useEmblaCarousel from 'embla-carousel-react'

export default function RelatedProducts({ products = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const handleAddToCart = (product) => {
    console.log('Add to cart:', product._id)
  }

  const handleQuickView = (product) => {
    console.log('Quick view:', product._id)
  }

  const handleAddToWishlist = (product) => {
    console.log('Add to wishlist:', product._id)
  }

  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <i
        key={star}
        className={`fi ${
          star <= rating ? 'fi-sr-star text-yellow-400' : 'fi-rr-star text-gray-300'
        } text-sm`}
      ></i>
    ))
  }

  const getDiscountPercentage = (originalPrice, salePrice) => {
    if (!originalPrice || originalPrice <= salePrice) return 0
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
  }

  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className='mt-12 p-4'>
      {/* Header */}
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <h2 className='text-2xl font-bold text-gray-900'>Related Products</h2>
          <div className='flex gap-1'>
            <div className='h-2 w-2 rounded-full bg-purple-600'></div>
            <div className='h-2 w-2 rounded-full bg-purple-400'></div>
            <div className='h-2 w-2 rounded-full bg-purple-300'></div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className='flex gap-2'>
          <button
            onClick={scrollPrev}
            className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50'
          >
            <i className='fi fi-rr-angle-left text-gray-600'></i>
          </button>
          <button
            onClick={scrollNext}
            className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50'
          >
            <i className='fi fi-rr-angle-right text-gray-600'></i>
          </button>
        </div>
      </div>

      {/* Products Carousel */}
      <div className='embla overflow-hidden' ref={emblaRef}>
        <div className='embla__container flex gap-4'>
          {products.map((product) => {
            const minPrice = Math.min(...product.variants.map((v) => v.salePrice))
            const originalPrice = product.variants.find((v) => v.originalPrice)?.originalPrice
            const discountPercent = getDiscountPercentage(originalPrice, minPrice)
            const isOnSale = discountPercent > 0
            const isNew = product.isNew || false

            return (
              <div key={product._id} className='embla__slide w-80 flex-none sm:w-72'>
                <div className='group overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-lg'>
                  {/* Product Image */}
                  <div className='relative aspect-square overflow-hidden bg-gray-100'>
                    <img
                      src={product.images?.[0] || '/placeholder-product.jpg'}
                      alt={product.name}
                      className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                    />

                    {/* Badges */}
                    <div className='absolute top-3 left-3 flex flex-col gap-2'>
                      {isNew && (
                        <span className='rounded bg-purple-600 px-2 py-1 text-xs font-semibold text-white'>
                          New
                        </span>
                      )}
                      {isOnSale && (
                        <span className='rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white'>
                          Sale!
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className='absolute top-3 right-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                      <button
                        onClick={() => handleAddToWishlist(product)}
                        className='flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-colors duration-200 hover:bg-gray-50'
                      >
                        <i className='fi fi-rr-heart text-gray-600 hover:text-red-500'></i>
                      </button>
                      <button
                        onClick={() => handleQuickView(product)}
                        className='flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-colors duration-200 hover:bg-gray-50'
                      >
                        <i className='fi fi-rr-search text-gray-600'></i>
                      </button>
                      <button className='flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-colors duration-200 hover:bg-gray-50'>
                        <i className='fi fi-rr-arrows-repeat text-gray-600'></i>
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <div className='absolute right-4 bottom-4 left-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className='flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-purple-700'
                      >
                        <i className='fi fi-rr-shopping-cart text-sm'></i>
                        Add To Cart
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className='p-4'>
                    {/* Rating */}
                    <div className='mb-2 flex items-center gap-2'>
                      <div className='flex'>{renderStars(product.rating || 4)}</div>
                      <span className='text-sm text-gray-500'>
                        ({product.reviewCount || 2} Reviews)
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className='mb-2 line-clamp-2 cursor-pointer font-semibold text-gray-900 transition-colors duration-200 hover:text-purple-600'>
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className='flex items-center gap-2'>
                      <span className='text-lg font-bold text-purple-600'>
                        {/* {formatCurrency(minPrice)} */}
                      </span>
                      {originalPrice && originalPrice > minPrice && (
                        <span className='text-sm text-gray-500 line-through'>
                          {/* {formatCurrency(originalPrice)} */}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CSS for Embla */}
      <style jsx>{`
        .embla {
          overflow: hidden;
        }
        .embla__container {
          display: flex;
        }
        .embla__slide {
          flex: 0 0 auto;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
