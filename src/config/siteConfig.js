import i18n from 'i18next'

const tHeader = (key) => i18n.t(`header:${key}`)

export const getStoreInfo = () => [
  { text: tHeader('storeInfo.address'), url: '/contact', icon: 'fi fi-rr-marker' },
  { text: tHeader('storeInfo.hotline'), url: 'tel:19001919', icon: 'fi fi-rr-chat-bubble-call' },
  { text: tHeader('storeInfo.openingHours'), url: '', icon: 'fi fi-rr-clock-five' }
]

export const getSocials = () => [
  { text: 'Facebook', url: 'https://www.facebook.com/', icon: 'fi fi-brands-facebook' },
  { text: 'TikTok', url: 'https://www.tiktok.com/', icon: 'fi fi-brands-tik-tok' },
  { text: 'YouTube', url: 'https://www.youtube.com/', icon: 'fi fi-brands-youtube' }
]

export const getHelps = () => [
  { text: tHeader('helps.support'), url: 'tel:19008198' },
  { text: tHeader('helps.terms'), url: '/terms' },
  { text: tHeader('helps.policy'), url: '/policy' },
  { text: tHeader('helps.career'), url: '/career' }
]
