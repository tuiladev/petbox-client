import React from 'react'

const StepBar = ({ steps, currentStep }) => {
  return (
    <div className='absolute top-10 mx-auto mt-16 md:mt-0 w-4/5 md:w-3/5'>
      {/* Thanh tiến trình nền */}
      <div className='absolute top-2.5 md:top-4 right-12 left-12 h-1 bg-gray-200'></div>

      {/* Thanh tiến trình hoạt động */}
      <div
        className='absolute top-2.5 md:top-4 left-12 h-1 bg-cyan-600 transition-all duration-400'
        style={{
          width: `calc(${(currentStep - 1) * 50}% - 12 * 4px * ${currentStep - 1})`
        }}
      ></div>

      {/* Các chấm bước */}
      <div className='relative z-10 flex justify-between'>
        {steps.map((step) => (
          <div
            key={step.step}
            className='flex w-full max-w-24 flex-col items-center'
          >
            <div
              className={`flex w-6 h-6 md:h-8 md:w-8 items-center justify-center rounded-full ${
                currentStep >= step.step
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.step}
            </div>
            <div
              className={`mt-2 text-center text-sm ${
                currentStep >= step.step
                  ? 'font-medium text-cyan-600'
                  : 'text-gray-500'
              }`}
            >
              {step.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepBar
