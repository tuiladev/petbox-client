import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'

// Khởi tạo i18next với HTTP backend để load file JSON
i18n
  // Lazy load file dịch từ public/translation
  .use(Backend)
  // Kết nối i18next với React
  .use(initReactI18next)
  .init({
    // Ngôn ngữ fallback khi không tìm thấy ngôn ngữ hiện tại
    fallbackLng: 'vi',
    // Danh sách các ngôn ngữ hỗ trợ
    supportedLngs: ['en', 'vi'],
    // Các namespace (file dịch) sẽ được load
    ns: [
      'auth',
      'banner',
      'common',
      'footer',
      'formLabel',
      'mockdata',
      'validation',
      'header',
      'product',
      'error'
    ],
    // Namespace mặc định khi gọi t('key') không chỉ định namespace
    defaultNS: 'common',

    // Cấu hình backend load file dịch
    backend: {
      loadPath: '/translations/{{lng}}/{{ns}}.json'
    },

    // Cấu hình interpolation (chèn biến vào chuỗi)
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
