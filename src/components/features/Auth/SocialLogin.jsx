import React from 'react'

const SocialLogin = ({ isRegistered }) => {
  const socials = [
    {
      src: 'https://img.icons8.com/color/48/google-logo.png',
      alt: 'google-logo',
      text: 'Google'
    },
    {
      src: 'https://img.icons8.com/fluency/48/facebook-new.png',
      alt: 'facebook-new',
      text: 'Facebook'
    },
    {
      src: 'https://img.icons8.com/ios-glyphs/30/mac-os.png',
      alt: 'mac-os',
      text: 'Apple'
    }
  ]

  return (
    <div className='flex w-full items-center justify-center gap-4'>
      {socials.map((item, index) => {
        return (
          <button
            type='button'
            key={index}
            className={`group flex ${isRegistered ? '' : 'flex-1'} cursor-pointer items-center justify-center rounded-full p-3 outline-1 outline-gray-300 transition-all duration-300 ease-in-out hover:bg-sky-50 hover:outline-sky-500`}
          >
            <img width='24' height='24' src={item.src} alt={item.alt} />
            <span
              className={`${isRegistered ? 'hidden' : 'pl-2 group-hover:text-sky-600'}`}
            >
              {item.text}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default SocialLogin
