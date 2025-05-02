// Kiểm tra email hợp lệ
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Kiểm tra số điện thoại Việt Nam hợp lệ
export const isValidPhoneNumber = (phone) => {
  const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  return regex.test(phone);
};

// Kiểm tra mật khẩu mạnh
export const isStrongPassword = (password) => {
  // Ít nhất 8 ký tự, có chữ hoa, chữ thường, số
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(password);
};