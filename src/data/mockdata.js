import i18n from 'i18next'
import { images } from '~/assets'

// Sử dụng namespace 'mockdata' để load đúng file mockdata.json
const t = (key) => i18n.t(`mockdata:${key}`)

// ONLY export functions, không export biến tĩnh
export const getStoreInfo = () => [
  { text: t('storeInfo.address'), url: '/contact', icon: 'fi fi-rr-marker' },
  { text: t('storeInfo.hotline'), url: 'tel:19001919', icon: 'fi fi-rr-chat-bubble-call' },
  { text: t('storeInfo.openingHours'), url: '', icon: 'fi fi-rr-clock-five' }
]

export const getSocials = () => [
  { text: 'Facebook', url: 'https://www.facebook.com/', icon: 'fi fi-brands-facebook' },
  { text: 'TikTok', url: 'https://www.tiktok.com/', icon: 'fi fi-brands-tik-tok' },
  { text: 'YouTube', url: 'https://www.youtube.com/', icon: 'fi fi-brands-youtube' }
]

export const getProducts = () => [
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

export const getCategories = () => [
  { icon: 'fi fi-rr-fish', text: t('categories.food'), url: '/category/cat-food' },
  { icon: 'fi fi-rr-sleeping-cat', text: t('categories.beds'), url: '/category/dog-food' },
  { icon: 'fi fi-rr-cat-head', text: t('categories.cleaning'), url: '/category/cleaning' },
  { icon: 'fi fi-rr-cat-space', text: t('categories.accessories'), url: '/category/toys' }
]

export const getHelps = () => [
  { text: t('helps.support'), url: 'tel:19008198' },
  { text: t('helps.terms'), url: '/terms' },
  { text: t('helps.policy'), url: '/policy' },
  { text: t('helps.career'), url: '/career' }
]

export const getServices = () => [
  { icon: 'fi fi-rr-dorm-room', text: t('services.hotel'), url: '/services/hotel' },
  { icon: 'fi fi-rr-cat-dog', text: t('services.spa'), url: '/services/spa' },
  { icon: 'fi fi-rr-doctor', text: t('services.medical'), url: '/services/medical' },
  {
    icon: 'fi fi-rr-venus-mars',
    text: t('services.sterilization'),
    url: '/services/sterilization'
  },
  { icon: 'fi fi-rr-paw-heart', text: t('services.homeCare'), url: '/services/home-care' }
]

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

export const getUserMenu = () => [
  {
    title: t('userMenu.account'),
    items: [
      { url: '/account/profile', text: t('userMenu.accountInfo'), icon: 'fi fi-rr-user' },
      { url: '/account/pets', text: t('userMenu.myPets'), icon: 'fi fi-rr-paw' }
    ]
  },
  {
    title: t('userMenu.shopping'),
    items: [
      { url: '/account/orders', text: t('userMenu.myOrders'), icon: 'fi fi-rr-shopping-bag' },
      { url: '/account/favorites', text: t('userMenu.favoriteProducts'), icon: 'fi fi-rr-heart' },
      { url: '/account/address', text: t('userMenu.shippingAddress'), icon: 'fi fi-rr-marker' }
    ]
  },
  {
    title: '',
    items: [{ url: '/', text: t('userMenu.logout'), icon: 'fi fi-rr-sign-out-alt' }]
  }
]

export const getProfileMenu = () => [
  { id: 'profile', label: t('profileMenu.personalInfo'), icon: 'fi fi-rr-user' },
  { id: 'address', label: t('profileMenu.address'), icon: 'fi fi-rr-marker' },
  { id: 'payment', label: t('profileMenu.payment'), icon: 'fi fi-rr-credit-card' },
  { id: 'pets', label: t('profileMenu.pets'), icon: 'fi fi-rr-paw', count: 2 },
  { id: 'notifications', label: t('profileMenu.notifications'), icon: 'fi fi-rr-bell', count: 4 },
  { id: 'membership', label: t('profileMenu.membership'), icon: 'fi fi-rr-gift-box-benefits' },
  { id: 'orders', label: t('profileMenu.orders'), icon: 'fi fi-rr-shopping-bag' },
  { id: 'cart', label: t('profileMenu.cart'), icon: 'fi fi-rr-shopping-cart' },
  { id: 'favorites', label: t('profileMenu.favorites'), icon: 'fi fi-rr-heart' }
]
