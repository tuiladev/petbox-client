// Format tiền tệ VND
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

// Format ngày tháng theo định dạng Việt Nam
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

// Format số điện thoại
export const formatPhoneNumber = (phoneNumber) => {
  // Giả sử định dạng là 10 số, ví dụ: 0912 345 678
  if (!phoneNumber) return ''
  const cleaned = phoneNumber.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/)
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`
  }
  return phoneNumber
}
