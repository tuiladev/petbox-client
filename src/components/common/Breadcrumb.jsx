import React from 'react'
import { useTranslation } from 'react-i18next'
import useBreadcrumbs from '~/hooks/useBreadcrumbs'

const Breadcrumb = ({ maxItems = 3 }) => {
  const { t } = useTranslation('header')
  const items = useBreadcrumbs()
  let displayItems = items

  if (items.length > maxItems) {
    const first = items[0]
    const restCount = maxItems - 2
    const lastItems = items.slice(items.length - restCount)
    displayItems = [first, { label: '...', href: null }, ...lastItems]
  }

  return (
    <nav className='py-4'>
      <ol className='flex items-center'>
        {displayItems.map((item, idx) => {
          const isLast = idx === displayItems.length - 1
          const text =
            typeof item.label === 'string' && item.label.includes('.') ? t(item.label) : item.label

          return (
            <li key={idx} className='flex items-center'>
              {idx > 0 && (
                <i className='fi fi-rr-angle-small-right mx-1 inline-block translate-y-0.5' />
              )}
              {isLast || !item.href ? (
                <span>{text}</span>
              ) : (
                <a href={item.href} className='text-primary cursor-pointer transition'>
                  {text}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
