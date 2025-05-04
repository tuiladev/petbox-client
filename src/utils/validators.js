export const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/
export const OBJECT_ID_RULE_MESSAGE =
  'Your string fails to match the Object Id pattern!'
export const FEILD_REQUIRED_RULE_MESSAGE = 'Không được để trống!'
export const EMAIL_RULE = /^\S+@\S+\.\S+$/
export const EMAIL_RULE_MESSAGE = 'Email không hợp lệ! (example@gmail.com)'
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/
export const PASSWORD_RULE_MESSAGE =
  'Password must include at least 1 letter, a number, and at least 8 characters'
export const PHONE_RULE = /^((\+84|84|0)([3|5|7|8|9])([0-9]{8}))$/
export const PHONE_RULE_MESSAGE = 'Phone number is invalid. (0987654321)'
