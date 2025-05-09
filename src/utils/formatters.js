/**
 * Format số tiền theo định dạng tiền tệ Việt Nam (VND)
 * @param {number} amount - Số tiền cần định dạng
 * @returns {string} - Chuỗi đã được định dạng theo tiền tệ VND (vd: 100.000 ₫)
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

/**
 * Chuyển đổi đối tượng ngày tháng thành chuỗi theo định dạng ngày/tháng/năm của Việt Nam
 * @param {Date|string|number} date - Đối tượng Date hoặc timestamp hoặc chuỗi ngày tháng cần định dạng
 * @returns {string} - Chuỗi ngày tháng đã được định dạng (vd: 06/05/2025)
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

/**
 * Định dạng số điện thoại hiển thị cho người dùng
 * Input: 0337336487 hoặc 84337336487 hoặc 337336487
 * Output: "(+84) 337 336 487"
 */
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return ''
  let cleaned = ('' + phoneNumber).replace(/\D/g, '')
  if (cleaned.startsWith('0')) {
    cleaned = '84' + cleaned.substring(1)
  } else if (cleaned.length === 9 && /^[3|5|7|8|9]/.test(cleaned)) {
    cleaned = '84' + cleaned
  }
  if (cleaned.length < 10) return phoneNumber
  return `(+${cleaned.substring(0, 2)}) ${cleaned.substring(2, 5)} ${cleaned.substring(5, 8)} ${cleaned.substring(8)}`
}

/**
 * Chuẩn hóa số điện thoại để gửi lên server
 * Input: "(+84) 337 336 487" hoặc "0337336487"
 * Output: "84337336487"
 */
export const normalizePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return ''
  let cleaned = ('' + phoneNumber).replace(/\D/g, '')
  if (cleaned.startsWith('0')) {
    cleaned = '84' + cleaned.substring(1)
  } else if (cleaned.length === 9 && /^[3|5|7|8|9]/.test(cleaned)) {
    cleaned = '84' + cleaned
  }
  return cleaned
}

/**
 * Xử lý trạng thái loading cho các phần tử có class 'interceptor-loading'
 * Vô hiệu hóa tương tác với các phần tử trong quá trình gọi API
 * @param {boolean} calling - Trạng thái đang gọi API (true) hoặc đã hoàn thành (false)
 * @returns {void}
 */
export const interceptorLoadingElements = (calling) => {
  // Take the element has className 'interceptor-loading'
  const elements = document.querySelectorAll('.interceptor-loading')
  for (let i = 0; i < elements.length; i++) {
    if (calling) {
      elements[i].style.opactity = '0.5'
      elements[i].style.pointerEvents = 'none'
    } else {
      elements[i].style.opactity = 'initial'
      elements[i].style.pointerEvents = 'initial'
    }
  }
}

/**
 * Ẩn thông tin email hoặc số điện thoại nhạy cảm
 * Đối với email: Giữ lại 2 ký tự đầu và 1 ký tự cuối của phần username
 * Đối với số điện thoại: Giữ lại 3 số đầu và 2 số cuối
 * @param {string} input - Email hoặc số điện thoại cần ẩn
 * @returns {string} - Chuỗi đã được ẩn thông tin nhạy cảm
 * @example
 * // Email: "example@gmail.com" -> "ex****e@gmail.com"
 * // Số điện thoại: "0912 345 678" -> "091******78"
 */
export const maskSensitiveInfo = (input) => {
  if (!input || typeof input !== 'string') {
    return input
  }
  const isEmail = input.includes('@')

  if (isEmail) {
    const [username, domain] = input.split('@')
    // Hide username of email, remain: 2 first and 1 last char
    const maskedUsername = maskString(username, 2, 1)
    return `${maskedUsername}@${domain}`
  } else {
    // Hide phone number, remain: 3 first and 2 last char
    return maskString(input, 3, 2)
  }
}

/**
 * Hàm hỗ trợ ẩn một phần của chuỗi bằng dấu *
 * @param {string} str - Chuỗi cần ẩn một phần
 * @param {number} startChars - Số ký tự giữ lại ở đầu chuỗi
 * @param {number} endChars - Số ký tự giữ lại ở cuối chuỗi
 * @returns {string} - Chuỗi đã được ẩn với dấu * ở phần giữa
 * @example
 * // maskString("abcdefgh", 2, 2) -> "ab****gh"
 */
export const maskString = (str, startChars, endChars) => {
  if (str.length <= startChars + endChars) {
    return str
  }

  const start = str.substring(0, startChars)
  const end = str.substring(str.length - endChars)
  const masked = '*'.repeat(str.length - startChars - endChars)

  return `${start}${masked}${end}`
}
