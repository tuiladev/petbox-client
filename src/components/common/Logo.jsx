import React from 'react'
import { Link } from 'react-router-dom'
import { images } from '~/assets'

const Logo = ({ type = 'light', className = '' }) => {
  return (
    <div className={`"inline-block w-full max-w-3xs ${className}`}>
      <Link to='/'>
        <img src={type === 'light' ? images.logo_light : images.logo_dark} alt='Logo' className='w-full' />
      </Link>
    </div>
  )
}

export default Logo
