// Libaries
import React from 'react'
import { useLoaderData, redirect } from 'react-router-dom'

// Components
import Breadcrumb from '~/components/common/Breadcrumb'
import ProductInfo from './ProductInfo'

// Apis
import { getProductInfoAPI } from '~/redux/product/productService'

export async function productLoader({ params }) {
  const { slug } = params
  try {
    const data = await getProductInfoAPI(slug)
    console.log('Product nè: ', data)
    return data
  } catch (err) {
    return redirect('/not-found')
  }
}

const ProductDetail = () => {
  const product = useLoaderData()

  return (
    <div className='l-container p-4'>
      <Breadcrumb />
      <ProductInfo product={product} />
    </div>
  )
}

export default ProductDetail
