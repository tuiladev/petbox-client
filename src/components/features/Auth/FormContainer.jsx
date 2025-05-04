const FormContainer = ({ width = 'max-w-[22rem]', children }) => {
  return (
    <div
      className={`animate-zoomIn absolute top-1/2 left-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 opacity-100 transition-all duration-500 ${width}`}
    >
      {children}
    </div>
  )
}
export default FormContainer
