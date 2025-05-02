// Lưu trữ dữ liệu trong localStorage với cơ chế hết hạn
export const setItemWithExpiry = (key, value, ttl) => {
  const now = new Date()
  const item = {
    value: value,
    expiry: now.getTime() + ttl
  }
  localStorage.setItem(key, JSON.stringify(item))
}

// Lấy dữ liệu từ localStorage và kiểm tra hạn
export const getItemWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr)
  const now = new Date()

  // So sánh thời gian hiện tại với thời gian hết hạn
  if (now.getTime() > item.expiry) {
    // Nếu đã hết hạn, xóa khỏi storage
    localStorage.removeItem(key)
    return null
  }
  return item.value
}
