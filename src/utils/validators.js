export const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/
export const OBJECT_ID_RULE_MESSAGE = 'Your string fails to match the Object Id pattern!'
export const FEILD_REQUIRED_RULE_MESSAGE = '* Bắt buộc'
export const EMAIL_RULE = /^\S+@\S+\.\S+$/
export const EMAIL_RULE_MESSAGE = 'Email không hợp lệ! (example@thepetsbox.com)'
export const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,256}$/
export const PASSWORD_RULE_MESSAGE = 'Tối thiểu 8 ký tự, có ít nhất 1 chữ số'
export const PHONE_RULE = /^((\+84|84|0)([3|5|7|8|9])([0-9]{8}))$/
export const PHONE_RULE_MESSAGE = 'Số điện thoại không hợp lệ! (0337336487)'
