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
