const FormContainer = ({ className = '', width = 'px-6 md:px-0 md:max-w-xs', children }) => {
  return (
    <div
      className={`animate-zoomIn z-10 w-full opacity-100 transition-all duration-500 ${width} ${className}`}
    >
      {children}
    </div>
  )
}
export default FormContainer
