const Dropdown = ({ className = '', children }) => {
  return <div className={`relative self-stretch ${className}`}>{children}</div>
}

export const DropdownTrigger = ({
  className = '',
  children,
  triggerProps = {}
}) => {
  return (
    <div
      className={`relative flex h-full cursor-pointer items-center after:absolute after:top-full after:h-4 after:w-full ${className}`}
      {...triggerProps}
    >
      {children}
    </div>
  )
}

export const DropdownContent = ({
  isOpen = false,
  contentProps = {},
  size = '',
  position = '',
  className = '',
  hoverEffect = '',
  children
}) => {
  const effectClass =
    hoverEffect ||
    `${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-2 scale-90 opacity-0'}`

  const getSize = () => {
    switch (size) {
      case 'xs':
        return 'w-full md:w-xs'
      case 'sm':
        return 'w-full md:w-[22rem] p-4'
      case 'md':
        return 'w-full md:w-[38rem] p-6'
      case 'lg':
        return 'w-full md:w-6xl p-8'
      default:
        return ''
    }
  }

  const getPosition = () => {
    const defaultTop = 'top-[calc(100%+1.5rem)]'
    switch (position) {
      case 'center':
        return `${defaultTop} left-1/2 -translate-x-1/2`
      case 'right':
        return `${defaultTop} right-0`
      case 'left':
        return `${defaultTop} left-0`
      default:
        return ''
    }
  }

  return (
    <div
      {...contentProps}
      className={`absolute ${getSize()} ${getPosition()} origin-top rounded-sm bg-white shadow-lg transition-all duration-300 ${className} ${effectClass}`}
    >
      {children}
    </div>
  )
}

Dropdown.Trigger = DropdownTrigger
Dropdown.Content = DropdownContent
export default Dropdown
