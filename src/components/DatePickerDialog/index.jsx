// Libaries
import { useState, useEffect } from 'react'
import * as Popover from '@radix-ui/react-popover'
import Calendar from 'react-calendar'
import { useTranslation } from 'react-i18next'

// Custom style
import './style.css'

export default function DatePickerDialog({ selectedDate, onSelect, trigger, locale }) {
  // Translation
  const { i18n, t } = useTranslation('common')
  const lang = locale || (i18n.language === 'vi' ? 'vi' : 'en-US')

  // Calendar and popover state
  const [open, setOpen] = useState(false)
  const [view, setView] = useState('month')

  // Disabel auto focus on prev button calendar by default
  useEffect(() => {
    if (open) {
      setTimeout(() => document.activeElement?.blur(), 0)
    }
  }, [open])

  // Update Floating feild value
  const handleDateSelect = (date) => {
    onSelect(date)
    setOpen(false)
  }

  const renderCalendar = () => (
    <Calendar
      locale={lang}
      value={selectedDate}
      onChange={handleDateSelect}
      view={view}
      onActiveStartDateChange={({ view: nextView }) => {
        if (nextView !== 'century') setView(nextView)
      }}
      prev2Label={null}
      next2Label={null}
      prevLabel={<i className='fi fi-rr-angle-left' />}
      nextLabel={<i className='fi fi-rr-angle-right' />}
      navigationLabel={({ date, view }) => {
        if (view === 'year') return <span>{date.getFullYear()}</span>
        if (view === 'decade') {
          const start = date.getFullYear()
          return (
            <span>
              {start} – {start + 9}
            </span>
          )
        }
        return (
          <span>
            {t('date.month')} {date.getMonth() + 1} - {date.getFullYear()}
          </span>
        )
      }}
    />
  )

  if (!trigger) {
    console.error('DatePickerDialog: trigger prop is required')
    return null
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align='center'
          sideOffset={5}
          className='focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade z-[9999] w-72 overflow-hidden rounded-2xl bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity]'
        >
          {renderCalendar()}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
