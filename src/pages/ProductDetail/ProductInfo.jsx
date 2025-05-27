import ImageCarousel from '~/components/common/ImageCarousel'
import ProductDetailTop from './ProductDetailTop'
import ProductDescription from './ProductDescription'
import RelatedProducts from './RelatedProducts'
import { relatedProductsMockData } from '~/data/mockdata'

export default function ProductInfo({ product }) {
  return (
    <>
      <div className='mt-4 grid grid-cols-1 p-4 md:grid-cols-5 md:gap-12'>
        <ImageCarousel
          images={product.images}
          className='w-full md:col-span-2'
          options={{ watchDrag: false }}
          productName={product.name}
        />

        {/* Product Details */}
        <ProductDetailTop product={product} />
      </div>
      <ProductDescription product={product} />
      <RelatedProducts products={relatedProductsMockData} />
    </>
  )
}
