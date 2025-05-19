import { images } from '../assets'
import i18next from 'i18next'

// Hàm trợ giúp để lấy bản dịch
const t = (key) => {
  try {
    return i18next.t(key)
  } catch (error) {
    console.warn(`Translation key not found: ${key}`)
    return key
  }
}
export const getStoreInfo = () => [
  {
    text: t('mockdata.storeInfo.address'),
    url: '/contact',
    icon: 'fi fi-rr-marker'
  },
  {
    text: t('mockdata.storeInfo.hotline'),
    url: 'tel:19001919',
    icon: 'fi fi-rr-chat-bubble-call'
  },
  {
    text: t('mockdata.storeInfo.openingHours'),
    icon: 'fi fi-rr-clock-five',
    url: ''
  }
]

export const getSocials = () => [
  {
    text: 'Facebook',
    url: 'https://www.facebook.com/',
    icon: 'fi fi-brands-facebook'
  },
  {
    text: 'TikTok',
    url: 'https://www.tiktok.com/',
    icon: 'fi fi-brands-tik-tok'
  },
  {
    text: 'YouTube',
    url: 'https://www.youtube.com/',
    icon: 'fi fi-brands-youtube'
  }
]

export const getProducts = () => [
  {
    url: '/product/1',
    name: t('mockdata.products.product1'),
    normalPrice: 92000,
    discountPrice: 59000,
    image: images.product_1
  },
  {
    url: '/product/2',
    name: t('mockdata.products.product2'),
    normalPrice: 292000,
    discountPrice: 239000,
    image: images.product_2
  },
  {
    url: '/product/3',
    name: t('mockdata.products.product3'),
    normalPrice: 108000,
    discountPrice: 72000,
    image: images.product_3
  },
  {
    url: '/product/4',
    name: t('mockdata.products.product4'),
    normalPrice: 82000,
    discountPrice: 67000,
    image: images.product_4
  }
]

export const getSearchData = () => ({
  text: t('mockdata.search.promotion'),
  icon: 'fi fi-rr-search',
  keywords: [
    t('mockdata.search.keywords.catgrass'),
    t('mockdata.search.keywords.catfood'),
    t('mockdata.search.keywords.cleaning'),
    t('mockdata.search.keywords.catlitter'),
    t('mockdata.search.keywords.dogcollar'),
    t('mockdata.search.keywords.cattag'),
    t('mockdata.search.keywords.petchain')
  ],
  products: getProducts()
})
export const getCategories = () => [
  {
    icon: 'fi fi-rr-fish',
    text: t('mockdata.categories.food'),
    url: '/category/cat-food'
  },
  {
    icon: 'fi fi-rr-sleeping-cat',
    text: t('mockdata.categories.beds'),
    url: '/category/dog-food'
  },
  {
    icon: 'fi fi-rr-cat-head',
    text: t('mockdata.categories.cleaning'),
    url: '/category/cleaning'
  },
  {
    icon: 'fi fi-rr-cat-space',
    text: t('mockdata.categories.accessories'),
    url: '/category/toys'
  }
]

export const getHelps = () => [
  {
    text: t('mockdata.helps.support'),
    url: 'tel: 19008198'
  },
  {
    text: t('mockdata.helps.terms'),
    url: '/terms'
  },
  {
    text: t('mockdata.helps.policy'),
    url: '/policy'
  },
  {
    text: t('mockdata.helps.career'),
    url: '/career'
  }
]

export const getServices = () => [
  {
    icon: 'fi fi-rr-dorm-room',
    text: t('mockdata.services.hotel'),
    url: '/services/hotel'
  },
  {
    icon: 'fi fi-rr-cat-dog',
    text: t('mockdata.services.spa'),
    url: '/services/spa'
  },
  {
    icon: 'fi fi-rr-doctor',
    text: t('mockdata.services.medical'),
    url: '/services/medical'
  },
  {
    icon: 'fi fi-rr-venus-mars',
    text: t('mockdata.services.sterilization'),
    url: '/services/sterilization'
  },
  {
    icon: 'fi fi-rr-paw-heart',
    text: t('mockdata.services.homeCare'),
    url: '/services/home-care'
  }
]

export const getPosts = () => [
  {
    title: t('mockdata.posts.post1.title'),
    url: '/post_1',
    image: images.post_1,
    time: t('mockdata.posts.post1.time'),
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione ...'
  },
  {
    title: t('mockdata.posts.post2.title'),
    url: '/post_2',
    image: images.post_2,
    time: t('mockdata.posts.post2.time'),
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione ...'
  }
]

export const getNotifications = () => [
  {
    id: 'notif-1',
    url: '/',
    title: t('mockdata.notifications.delivered'),
    time: t('mockdata.notifications.date.march28'),
    content:
      'lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione',
    type: 'delivered',
    icon: 'fi fi-rr-box-circle-check',
    image: '',
    alt: '',
    isRead: false
  },
  {
    id: 'notif-2',
    url: '/',
    title: t('mockdata.notifications.appointment'),
    time: t('mockdata.notifications.date.march27'),
    content:
      'lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione',
    type: 'warning',
    icon: 'fi fi-rr-calendar',
    image: '',
    alt: '',
    isRead: false
  },
  {
    id: 'notif-3',
    url: '/',
    title: t('mockdata.notifications.promotion'),
    time: t('mockdata.notifications.date.march26'),
    content:
      'lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione',
    type: 'promotion',
    icon: 'fi fi-rr-ticket',
    image: '',
    alt: '',
    isRead: false
  }
]

export const getUserMenu = () => [
  {
    title: t('mockdata.userMenu.account'),
    items: [
      {
        url: '/account/profile',
        text: t('mockdata.userMenu.accountInfo'),
        icon: 'fi fi-rr-user'
      },
      {
        url: '/account/pets',
        text: t('mockdata.userMenu.myPets'),
        icon: 'fi fi-rr-paw'
      }
    ]
  },
  {
    title: t('mockdata.userMenu.shopping'),
    items: [
      {
        url: '/account/orders',
        text: t('mockdata.userMenu.myOrders'),
        icon: 'fi fi-rr-shopping-bag'
      },
      {
        url: '/account/favorites',
        text: t('mockdata.userMenu.favoriteProducts'),
        icon: 'fi fi-rr-heart'
      },
      {
        url: '/account/address',
        text: t('mockdata.userMenu.shippingAddress'),
        icon: 'fi fi-rr-marker'
      }
    ]
  },
  {
    title: '',
    items: [
      {
        url: '/',
        text: t('mockdata.userMenu.logout'),
        icon: 'fi fi-rr-sign-out-alt'
      }
    ]
  }
]

export const getProfileMenuItems = () => [
  {
    id: 'profile',
    label: t('mockdata.profileMenu.personalInfo'),
    icon: 'fi fi-rr-user'
  },
  {
    id: 'address',
    label: t('mockdata.profileMenu.address'),
    icon: 'fi fi-rr-marker'
  },
  {
    id: 'payment',
    label: t('mockdata.profileMenu.payment'),
    icon: 'fi fi-rr-credit-card'
  },
  {
    id: 'pets',
    label: t('mockdata.profileMenu.pets'),
    icon: 'fi fi-rr-paw',
    count: 2
  },
  {
    id: 'notifications',
    label: t('mockdata.profileMenu.notifications'),
    icon: 'fi fi-rr-bell',
    count: 4
  },
  {
    id: 'membership',
    label: t('mockdata.profileMenu.membership'),
    icon: 'fi fi-rr-gift-box-benefits'
  },
  {
    id: 'orders',
    label: t('mockdata.profileMenu.orders'),
    icon: 'fi fi-rr-shopping-bag'
  },
  {
    id: 'cart',
    label: t('mockdata.profileMenu.cart'),
    icon: 'fi fi-rr-shopping-cart'
  },
  {
    id: 'favorites',
    label: t('mockdata.profileMenu.favorites'),
    icon: 'fi fi-rr-heart'
  }
]

// Xuất các biến để tương thích với code hiện tại
export const storeInfo = getStoreInfo()
export const socials = getSocials()
export const products = getProducts()
export const searchData = getSearchData()
export const categories = getCategories()
export const helps = getHelps()
export const services = getServices()
export const posts = getPosts()
export const notifications = getNotifications()
export const userMenu = getUserMenu()
export const profileMenuItems = getProfileMenuItems()
