/**
 * Format the phone number entered by the user into a readable format: '(+84) xxx xxx xxx'
 * Case handler: 84xxx, 0xxx
 * @param {phoneNumber} the phone number entered by the user
 * @return format string
 * if the phone number is invalid -> return without change
 */
export const formatPhoneNumber = (phone) => {
  // Remove all non-digits
  let cleaned = phone.replace(/\D/g, '')

  // Remove prefix: 84xxx, 0xxxx
  if (cleaned.startsWith('84')) {
    cleaned = cleaned.slice(2)
  }
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.slice(1)
  }

  // Make sure it valid phone number
  if (cleaned.length == 9)
    return `(+84) ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)}`

  return phone
}

/**
 * Set style for component have api call to prevent spam
 * @param {*} calling
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

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
/**
 * Format a valid date to string type 'DD/MM/YYYY'
 * @param {*} date
 * @returns a date in string format 'DD/MM/YYYY'
 */
export const formatDate = (date) => dayjs(date).format('DD/MM/YYYY')

/**
 * Check if a string is a valid date => convert to Date object
 * @param {*} str - A string present a 'Date' in format 'DD/MM/YYYY'
 * @returns - If valid format 'DD/MM/YYYY' and is a valid date -> A date object
 */
export const parseDate = (str) =>
  dayjs(str, 'DD/MM/YYYY', true).isValid() ? dayjs(str, 'DD/MM/YYYY').toDate() : null

/**
 * Format Date on typing
 * @param {*} str - A string form user typing
 * @returns - A format string 'DD/MM/YYYY'
 */
export const maskDateInput = (str) => {
  let digits = str.replace(/\D/g, '').slice(0, 8)
  if (digits.length > 4) return digits.replace(/^(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3')
  if (digits.length > 2) return digits.replace(/^(\d{2})(\d{1,2})/, '$1/$2')
  return digits
}

/**Add commentMore actions
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
