export const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/
export const EMAIL_RULE = /^\S+@\S+\.\S+$/
export const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,256}$/
export const PHONE_RULE = /^((\+84|84|0)([3|5|7|8|9])([0-9]{8}))$/
export const NAME_RULE = /^[\p{L} ]+$/u
