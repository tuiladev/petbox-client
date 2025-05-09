const FormContainer = ({ width = 'max-w-[22rem]', children }) => {
  return (
    <div
      className={`animate-zoomIn z-10 w-full opacity-100 transition-all duration-500 ${width}`}
    >
      {children}
    </div>
  )
}
export default FormContainer
