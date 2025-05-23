import { useState, useRef, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { format } from 'date-fns'

export default function DatePickerInput({
  value,
  onChange,
  error,
  name,
  placeholder = 'Ngày sinh'
}) {
  const [showCalendar, setShowCalendar] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowCalendar(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='relative w-full' ref={ref}>
      <input
        id={name}
        name={name}
        type='text'
        readOnly
        value={value ? format(value, 'dd/MM/yyyy') : ''}
        placeholder={placeholder}
        className={`w-full cursor-pointer rounded-full border-1 border-gray-300 bg-white px-6 py-4 text-base font-semibold focus:border-cyan-600 focus:ring-0 focus:outline-none ${
          error ? 'border-red-500' : ''
        }`}
        onClick={() => setShowCalendar((prev) => !prev)}
      />

      {showCalendar && (
        <div className='absolute left-0 z-50 mt-2'>
          <Calendar
            onChange={(date) => {
              onChange(date)
              setShowCalendar(false)
            }}
            value={value}
            minDate={new Date(1950, 0, 1)}
            maxDate={new Date()}
            locale='vi-VN'
            firstDayOfWeek={1}
            className='rounded-2xl shadow-lg'
          />
        </div>
      )}

      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
  )
}
