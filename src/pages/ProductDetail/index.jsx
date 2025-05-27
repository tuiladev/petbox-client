import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Breadcrumb from '~/components/common/Breadcrumb'
import ProductInfo from './ProductInfo'

// Mock loader: giả sử kết quả từ productDetailLoader dựa trên cấu trúc MongoDB
export async function productDetailLoader({ params }) {
  return {
    _id: params.productId,
    name: `Thức Ăn Mèo Me-O Túi Zip 1KG - Đủ Vị`,
    slug: `sample-product-${params.productId}`,
    description: `Tất cả các chú mèo sẽ cảm thấy vui thích ngay lần đầu tiên thưởng thức thức ăn Me_O. <br/> Sản phẩm được nâng cao nghệ thuật cân bằng chất dinh dưỡng đến một mức độ cung cấp mới đầy đủ dưỡng chất trong thực phẩm có đầy đủ mùi vị. <br />
Với Me_O chú mèo của bạn sẽ có một cuộc sống khỏe mạnh và lâu dài. <br />
<strong> _ Nông Trại Thú Cưng _ </strong>
Thức Ăn & Phụ Kiện & Đồ Chơi Chó _ Mèo _ Hamster
<br />
<ol>
    <li>🛒 Shopee Bình Thạnh: shopee.vn/nongtraithucungbt</li>
    <li>🛒 Shopee Q7: shopee.vn/nongtraithucung.com</li>
    <li>🛒📍 Bình Thạnh</li>
    <li>📍 Quận 7: ☎️ </li>
</ol>`,
    category: { _id: 'cat1', name: 'Pet Food' },
    variants: [
      {
        _id: 'v1',
        variantType: { _id: 'vt1', name: 'Cá ngừ' },
        salePrice: 62730,
        stock: 15,
        barcodes: []
      },
      {
        _id: 'v2',
        variantType: { _id: 'vt2', name: 'Cá thu' },
        salePrice: 67000,
        stock: 2,
        barcodes: []
      },
      {
        _id: 'v3',
        variantType: { _id: 'vt3', name: 'Hải sản' },
        salePrice: 88000,
        stock: 0,
        barcodes: []
      }
    ],
    images: [
      'https://down-vn.img.susercontent.com/file/sg-11134201-22110-sj0sl5943qjvf4.webp',
      'https://down-vn.img.susercontent.com/file/sg-11134201-22110-a7y3vz943qjvf6.webp',
      'https://down-vn.img.susercontent.com/file/sg-11134201-22110-eud3bz943qjvb6.webp',
      'https://down-vn.img.susercontent.com/file/sg-11134201-22110-k26zvz943qjv9c.webp'
    ],
    reviews: [
      {
        _id: 'r1',
        userId: 'u1',
        authorName: 'Alice',
        rating: 5,
        content: 'Sản phẩm tuyệt vời!',
        createdAt: '2025-05-20T10:00:00Z'
      },
      {
        _id: 'r2',
        userId: 'u2',
        authorName: 'Bob',
        rating: 4,
        content: 'Rất ổn.',
        createdAt: '2025-05-21T14:30:00Z'
      }
    ],
    relatedProducts: [
      { _id: 'p2', name: 'Related Product 1', slug: 'related-product-1' },
      { _id: 'p3', name: 'Related Product 2', slug: 'related-product-2' }
    ],
    createdAt: '2025-05-01T00:00:00Z',
    updatedAt: '2025-05-25T12:00:00Z'
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
