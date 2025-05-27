import i18n from 'i18next'

const tHeaderMenu = (key) => i18n.t(`header:${key}`)

export const getUserMenu = () => [
  {
    title: tHeaderMenu('userMenu.account'),
    items: [
      { url: '/account/profile', text: tHeaderMenu('userMenu.accountInfo'), icon: 'fi fi-rr-user' },
      { url: '/account/pets', text: tHeaderMenu('userMenu.myPets'), icon: 'fi fi-rr-paw' }
    ]
  },
  {
    title: tHeaderMenu('userMenu.shopping'),
    items: [
      {
        url: '/account/orders',
        text: tHeaderMenu('userMenu.myOrders'),
        icon: 'fi fi-rr-shopping-bag'
      },
      {
        url: '/account/favorites',
        text: tHeaderMenu('userMenu.favoriteProducts'),
        icon: 'fi fi-rr-heart'
      },
      {
        url: '/account/address',
        text: tHeaderMenu('userMenu.shippingAddress'),
        icon: 'fi fi-rr-marker'
      }
    ]
  },
  {
    title: '',
    items: [{ url: '/', text: tHeaderMenu('userMenu.logout'), icon: 'fi fi-rr-sign-out-alt' }]
  }
]

export const getProfileMenu = () => [
  { id: 'profile', label: tHeaderMenu('profileMenu.personalInfo'), icon: 'fi fi-rr-user' },
  { id: 'address', label: tHeaderMenu('profileMenu.address'), icon: 'fi fi-rr-marker' },
  { id: 'payment', label: tHeaderMenu('profileMenu.payment'), icon: 'fi fi-rr-credit-card' },
  { id: 'pets', label: tHeaderMenu('profileMenu.pets'), icon: 'fi fi-rr-paw', count: 2 },
  {
    id: 'notifications',
    label: tHeaderMenu('profileMenu.notifications'),
    icon: 'fi fi-rr-bell',
    count: 4
  },
  {
    id: 'membership',
    label: tHeaderMenu('profileMenu.membership'),
    icon: 'fi fi-rr-gift-box-benefits'
  },
  { id: 'orders', label: tHeaderMenu('profileMenu.orders'), icon: 'fi fi-rr-shopping-bag' },
  { id: 'cart', label: tHeaderMenu('profileMenu.cart'), icon: 'fi fi-rr-shopping-cart' },
  { id: 'favorites', label: tHeaderMenu('profileMenu.favorites'), icon: 'fi fi-rr-heart' }
]
