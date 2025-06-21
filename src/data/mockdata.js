import i18n from 'i18next'
import { images } from '~/assets'

const t = (key) => i18n.t(`mockdata:${key}`)

/**
 * Sản phẩm
 */
export const getProducts = () => [
  {
    url: '/shop/product/thuc-an-cho-meo-con-royal-canin-kitten',
    name: t('products.product1'),
    normalPrice: 92000,
    discountPrice: 59000,
    image: images.product_1
  },
  {
    url: '/product/1',
    name: t('products.product1'),
    normalPrice: 92000,
    discountPrice: 59000,
    image: images.product_1
  },
  {
    url: '/product/2',
    name: t('products.product2'),
    normalPrice: 292000,
    discountPrice: 239000,
    image: images.product_2
  },
  {
    url: '/product/3',
    name: t('products.product3'),
    normalPrice: 108000,
    discountPrice: 72000,
    image: images.product_3
  },
  {
    url: '/product/4',
    name: t('products.product4'),
    normalPrice: 82000,
    discountPrice: 67000,
    image: images.product_4
  }
]

/**
 * Bài viết
 */
export const getPosts = () => [
  {
    title: t('posts.post1.title'),
    url: '/post_1',
    image: images.post_1,
    time: t('posts.post1.time'),
    desc: 'Lorem ipsum dolor sit amet...'
  },
  {
    title: t('posts.post2.title'),
    url: '/post_2',
    image: images.post_2,
    time: t('posts.post2.time'),
    desc: 'Lorem ipsum dolor sit amet...'
  }
]

/**
 * Thông báo
 */
export const getNotifications = () => [
  {
    id: 'notif-1',
    url: '/',
    title: t('notifications.delivered'),
    time: t('notifications.date.march28'),
    content: 'Lorem ipsum...',
    type: 'delivered',
    icon: 'fi fi-rr-box-circle-check',
    isRead: false
  },
  {
    id: 'notif-2',
    url: '/',
    title: t('notifications.appointment'),
    time: t('notifications.date.march27'),
    content: 'Lorem ipsum...',
    type: 'warning',
    icon: 'fi fi-rr-calendar',
    isRead: false
  },
  {
    id: 'notif-3',
    url: '/',
    title: t('notifications.promotion'),
    time: t('notifications.date.march26'),
    content: 'Lorem ipsum...',
    type: 'promotion',
    icon: 'fi fi-rr-ticket',
    isRead: false
  }
]

/**
 * Search Data
 */
export const getSearchData = () => ({
  text: t('search.promotion'),
  icon: 'fi fi-rr-search',
  keywords: [
    t('search.keywords.catgrass'),
    t('search.keywords.catfood'),
    t('search.keywords.cleaning'),
    t('search.keywords.catlitter'),
    t('search.keywords.dogcollar'),
    t('search.keywords.cattag'),
    t('search.keywords.petchain')
  ],
  products: getProducts()
})

// mockData/relatedProducts.js

export const relatedProductsMockData = [
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'Dog Harness-Neoprene Comfort Liner-Orange And Black',
    slug: 'dog-harness-neoprene-comfort-liner-orange-black',
    description:
      'Comfortable neoprene dog harness with adjustable straps for medium to large dogs. Perfect for daily walks and training.',
    categoryId: '507f1f77bcf86cd799439020',
    category: {
      _id: '507f1f77bcf86cd799439020',
      name: 'Dog Accessories'
    },
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop'
    ],
    variants: [
      {
        _id: '507f1f77bcf86cd799439012',
        productId: '507f1f77bcf86cd799439011',
        variantTypeId: '507f1f77bcf86cd799439030',
        variantType: {
          _id: '507f1f77bcf86cd799439030',
          name: 'Small'
        },
        salePrice: 12.0,
        originalPrice: 25.0,
        stock: 15,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z'
      },
      {
        _id: '507f1f77bcf86cd799439013',
        productId: '507f1f77bcf86cd799439011',
        variantTypeId: '507f1f77bcf86cd799439031',
        variantType: {
          _id: '507f1f77bcf86cd799439031',
          name: 'Medium'
        },
        salePrice: 15.0,
        originalPrice: 28.0,
        stock: 10,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z'
      }
    ],
    rating: 4,
    reviewCount: 2,
    isNew: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    _id: '507f1f77bcf86cd799439014',
    name: 'Arm & Hammer Super Deodorizing Dog Shampoo, Pet Wash',
    slug: 'arm-hammer-super-deodorizing-dog-shampoo-pet-wash',
    description:
      'Advanced deodorizing formula with baking soda to neutralize odors and leave your pet smelling fresh.',
    categoryId: '507f1f77bcf86cd799439021',
    category: {
      _id: '507f1f77bcf86cd799439021',
      name: 'Pet Grooming'
    },
    images: [
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop'
    ],
    variants: [
      {
        _id: '507f1f77bcf86cd799439015',
        productId: '507f1f77bcf86cd799439014',
        variantTypeId: '507f1f77bcf86cd799439032',
        variantType: {
          _id: '507f1f77bcf86cd799439032',
          name: '500ml'
        },
        salePrice: 20.0,
        originalPrice: 30.0,
        stock: 25,
        createdAt: '2024-01-10T08:15:00Z',
        updatedAt: '2024-01-10T08:15:00Z'
      }
    ],
    rating: 4,
    reviewCount: 2,
    isNew: false,
    createdAt: '2024-01-10T08:15:00Z',
    updatedAt: '2024-01-10T08:15:00Z'
  },
  {
    _id: '507f1f77bcf86cd799439016',
    name: 'Milk-Bone Brushing Chews Daily Dental Dog Treats',
    slug: 'milk-bone-brushing-chews-daily-dental-dog-treats',
    description:
      'Daily dental treats that help clean teeth and freshen breath. Made with natural ingredients for optimal oral health.',
    categoryId: '507f1f77bcf86cd799439022',
    category: {
      _id: '507f1f77bcf86cd799439022',
      name: 'Dog Treats'
    },
    images: [
      'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop'
    ],
    variants: [
      {
        _id: '507f1f77bcf86cd799439017',
        productId: '507f1f77bcf86cd799439016',
        variantTypeId: '507f1f77bcf86cd799439033',
        variantType: {
          _id: '507f1f77bcf86cd799439033',
          name: 'Small Dogs'
        },
        salePrice: 36.0,
        originalPrice: 56.0,
        stock: 30,
        createdAt: '2024-01-12T14:20:00Z',
        updatedAt: '2024-01-12T14:20:00Z'
      },
      {
        _id: '507f1f77bcf86cd799439018',
        productId: '507f1f77bcf86cd799439016',
        variantTypeId: '507f1f77bcf86cd799439034',
        variantType: {
          _id: '507f1f77bcf86cd799439034',
          name: 'Large Dogs'
        },
        salePrice: 42.0,
        originalPrice: 65.0,
        stock: 20,
        createdAt: '2024-01-12T14:20:00Z',
        updatedAt: '2024-01-12T14:20:00Z'
      }
    ],
    rating: 4,
    reviewCount: 2,
    isNew: false,
    createdAt: '2024-01-12T14:20:00Z',
    updatedAt: '2024-01-12T14:20:00Z'
  },
  {
    _id: '507f1f77bcf86cd799439019',
    name: 'Two Door Top Load Plastic Kennel & Pet Carrier, Blue 19"',
    slug: 'two-door-top-load-plastic-kennel-pet-carrier-blue-19',
    description:
      'Durable plastic pet carrier with dual door access. Perfect for travel and vet visits. Secure and comfortable for small to medium pets.',
    categoryId: '507f1f77bcf86cd799439023',
    category: {
      _id: '507f1f77bcf86cd799439023',
      name: 'Pet Carriers'
    },
    images: [
      'https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop'
    ],
    variants: [
      {
        _id: '507f1f77bcf86cd799439020',
        productId: '507f1f77bcf86cd799439019',
        variantTypeId: '507f1f77bcf86cd799439035',
        variantType: {
          _id: '507f1f77bcf86cd799439035',
          name: '19 inch'
        },
        salePrice: 18.0,
        originalPrice: 33.0,
        stock: 12,
        createdAt: '2024-01-08T16:45:00Z',
        updatedAt: '2024-01-08T16:45:00Z'
      },
      {
        _id: '507f1f77bcf86cd799439021',
        productId: '507f1f77bcf86cd799439019',
        variantTypeId: '507f1f77bcf86cd799439036',
        variantType: {
          _id: '507f1f77bcf86cd799439036',
          name: '24 inch'
        },
        salePrice: 25.0,
        originalPrice: 42.0,
        stock: 8,
        createdAt: '2024-01-08T16:45:00Z',
        updatedAt: '2024-01-08T16:45:00Z'
      }
    ],
    rating: 4,
    reviewCount: 2,
    isNew: false,
    createdAt: '2024-01-08T16:45:00Z',
    updatedAt: '2024-01-08T16:45:00Z'
  },
  {
    _id: '507f1f77bcf86cd799439022',
    name: 'The Kitten House With Mat Sleeping Bed House',
    slug: 'kitten-house-mat-sleeping-bed-house',
    description:
      'Cozy sleeping house for kittens and small cats. Includes soft mat and provides warmth and security for peaceful sleep.',
    categoryId: '507f1f77bcf86cd799439024',
    category: {
      _id: '507f1f77bcf86cd799439024',
      name: 'Cat Beds'
    },
    images: [
      'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop'
    ],
    variants: [
      {
        _id: '507f1f77bcf86cd799439023',
        productId: '507f1f77bcf86cd799439022',
        variantTypeId: '507f1f77bcf86cd799439037',
        variantType: {
          _id: '507f1f77bcf86cd799439037',
          name: 'Small'
        },
        salePrice: 19.0,
        originalPrice: 28.0,
        stock: 18,
        createdAt: '2024-01-05T12:00:00Z',
        updatedAt: '2024-01-05T12:00:00Z'
      }
    ],
    rating: 4,
    reviewCount: 2,
    isNew: true,
    createdAt: '2024-01-05T12:00:00Z',
    updatedAt: '2024-01-05T12:00:00Z'
  },
  {
    _id: '507f1f77bcf86cd799439024',
    name: 'Premium Cat Scratching Post Tower with Sisal Rope',
    slug: 'premium-cat-scratching-post-tower-sisal-rope',
    description:
      'Multi-level scratching post with natural sisal rope. Perfect for maintaining healthy claws and providing entertainment.',
    categoryId: '507f1f77bcf86cd799439025',
    category: {
      _id: '507f1f77bcf86cd799439025',
      name: 'Cat Furniture'
    },
    images: [
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=400&fit=crop'
    ],
    variants: [
      {
        _id: '507f1f77bcf86cd799439025',
        productId: '507f1f77bcf86cd799439024',
        variantTypeId: '507f1f77bcf86cd799439038',
        variantType: {
          _id: '507f1f77bcf86cd799439038',
          name: 'Medium (60cm)'
        },
        salePrice: 45.0,
        originalPrice: 65.0,
        stock: 15,
        createdAt: '2024-01-03T09:30:00Z',
        updatedAt: '2024-01-03T09:30:00Z'
      },
      {
        _id: '507f1f77bcf86cd799439026',
        productId: '507f1f77bcf86cd799439024',
        variantTypeId: '507f1f77bcf86cd799439039',
        variantType: {
          _id: '507f1f77bcf86cd799439039',
          name: 'Large (90cm)'
        },
        salePrice: 65.0,
        originalPrice: 85.0,
        stock: 10,
        createdAt: '2024-01-03T09:30:00Z',
        updatedAt: '2024-01-03T09:30:00Z'
      }
    ],
    rating: 5,
    reviewCount: 8,
    isNew: false,
    createdAt: '2024-01-03T09:30:00Z',
    updatedAt: '2024-01-03T09:30:00Z'
  }
]

// Sử dụng trong component:
// import { relatedProductsMockData } from '~/mockData/relatedProducts'
// <RelatedProducts products={relatedProductsMockData} />
