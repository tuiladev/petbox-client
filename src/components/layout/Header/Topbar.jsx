import React from 'react'
import { storeInfo, socials } from '../../../data/mockdata.js'
import IconLink from '../../common/IconLink.jsx'

const Topbar = ({ className = '', showOnMobile = false, data = storeInfo }) => {
  return (
    <div
      className={`bg-primary ${showOnMobile ? 'block' : 'hidden sm:block'} ${className}`}
    >
      <div className='l-container flex flex-wrap items-center justify-center gap-y-4 py-2 text-gray-300 md:justify-between'>
        {/* Left Side */}
        <div className='flex items-center gap-x-4'>
          {/* Address */}
          <IconLink
            icon={data[0].icon}
            text={data[0].text}
            url={data[0].url}
            internal={data[0].url.startsWith('/')}
            iconClassName='text-white translate-y-0.5'
            textClassName='hidden sm:inline'
          />

          {/* Separate */}
          <span className='text-gray-400' aria-hidden='true'>
            /
          </span>

          {/* Contact */}
          <IconLink
            icon={data[1].icon}
            text={data[1].text}
            url={data[1].url}
            iconClassName='text-white translate-y-0.5'
            textClassName='hidden sm:inline'
          />
        </div>

        {/* Right Side */}
        <div className='flex items-center gap-x-4 text-white'>
          {/* Business Hour */}
          <IconLink
            icon={data[2].icon}
            text={data[2].text}
            iconClassName='translate-y-0.5'
            textClassName='hidden sm:inline'
          />

          {/* Separate */}
          <span className='text-gray-400' aria-hidden='true'>
            /
          </span>

          {/* Social Media */}
          <div className='flex items-center gap-x-3'>
            {socials.map((social, index) => (
              <IconLink
                key={index}
                icon={social.icon}
                url={social.url}
                external={true}
                iconClassName='text-white translate-y-0.5'
                textClassName='sr-only'
                text={social.text}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
