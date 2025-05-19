import { Link } from 'react-router-dom'

const IconLink = ({
  // Props cơ bản
  icon,
  text,
  url,

  // Props cho React Router
  to,
  internal = false,

  // Props tùy chỉnh styling
  className = '',
  iconClassName = '',
  textClassName = '',
  gap = 'gap-x-2',

  // Props cho hiệu ứng
  hoverEffect = 'hover:text-white',
  transitionEffect = 'transition-colors duration-200',

  // Props cho behavior
  external = false,
  onClick,

  // Children prop để mở rộng thêm
  children,

  // Tham số còn lại để truyền các thuộc tính HTML khác
  ...rest
}) => {
  // Xác định các thuộc tính cho external link
  const externalProps = external
    ? {
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    : {}

  const content = (
    <>
      {icon && (
        <i className={`${icon} ${iconClassName}`} aria-hidden='true'></i>
      )}
      {text && <span className={textClassName}>{text}</span>}
      {children}
    </>
  )

  const linkClasses = `flex items-center ${gap} ${hoverEffect} ${transitionEffect} ${className} cursor-pointer`

  // Nếu là internal link (sử dụng React Router)
  if (internal && (to || url)) {
    return (
      <Link to={to || url} className={linkClasses} onClick={onClick} {...rest}>
        {content}
      </Link>
    )
  }

  // Nếu có URL (external link hoặc URL không cần React Router), render thẻ a
  if (url) {
    return (
      <a
        href={url}
        className={linkClasses}
        onClick={onClick}
        {...externalProps}
        {...rest}
      >
        {content}
      </a>
    )
  }

  // Nếu không có URL nhưng có onClick, render button
  if (onClick) {
    return (
      <button type='button' onClick={onClick} className={linkClasses} {...rest}>
        {content}
      </button>
    )
  }

  // Trường hợp còn lại, render div
  return (
    <div className={`flex items-center ${gap} ${className}`} {...rest}>
      {content}
    </div>
  )
}

export default IconLink
