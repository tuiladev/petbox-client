import { memo } from 'react'
import { DropdownContent } from '~/components/common/Dropdown'
import IconLink from '~/components/common/IconLink'
import { categories, services, posts } from '~/data/mockdata'
import MenuList from './MenuList'

const MainMenu = ({ dropdownState, className = '' }) => {
  return (
    <DropdownContent
      isOpen={dropdownState.isOpen}
      contentProps={dropdownState.getContentProps()}
      className={`top-full left-1/2 w-full origin-top -translate-x-1/2 p-8 md:max-lg:w-4/5 lg:w-[90%] ${className}`}
    >
      <MainMenuContent>
        {/* Blogs */}
        <div className='col-span-1 lg:col-span-2'>
          <p className='title-xl text-primary mb-6 capitalize'>
            Tin mới cập nhật
          </p>
          <ul className='mb-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </ul>
          <IconLink
            url='#'
            text='Xem tất cả'
            icon='fi fi-rr-arrow-right'
            className='text-primary justify-end text-right'
            iconClassName='ml-2 translate-y-0.5'
            hoverEffect='hover:text-secondary'
          />
        </div>
      </MainMenuContent>
    </DropdownContent>
  )
}

export const MainMenuContent = ({ className = '', type = '', children }) => {
  return (
    <div
      className={`grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-8 lg:grid-cols-4 ${className}`}
    >
      {/* Navigations */}
      <div className='col-span-1 flex flex-col gap-y-8 lg:col-span-2'>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          <MenuList title='Sản Phẩm' items={categories} isMobile={type} />
          <MenuList title='Dịch Vụ' items={services} isMobile={type} />
        </div>

        {/* Call to action */}
        <div className='bg-primary m-6 mt-0 flex flex-col items-center justify-between gap-y-4 rounded-sm p-4 text-white md:m-0 md:flex-row'>
          <p className='font-secondary text-xl font-bold'>
            Ưu đãi 10% khi đặt trước
          </p>
          <i className='fi fi-rr-arrow-alt-right hidden text-2xl md:block'></i>
          <IconLink
            url='#'
            text='Đặt Lịch'
            icon='fi fi-rr-calendar-check'
            className='text-primary w-full rounded-sm bg-white p-2 text-lg font-semibold [will-change:transform] [backface-visibility:hidden] [transform-style:preserve-3d] md:w-auto md:px-4 md:py-2'
            iconClassName='ml-2'
            hoverEffect='hover:scale-105 hover:shadow-2xl'
            transitionEffect='transition-all duration-300 ease-in-out'
          />
        </div>
      </div>
      {children}
    </div>
  )
}

const PostCard = memo(({ post }) => {
  return (
    <li>
      <a href={post.url} className='group flex flex-col gap-y-2'>
        <div className='aspect-video w-full overflow-hidden rounded-sm'>
          <img
            src={post.image}
            alt={post.title}
            className='w-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
        </div>
        <p className='text-sm'>{post.time}</p>
        <p className='title-md group-hover:text-secondary line-clamp-2 text-gray-700'>
          {post.title}
        </p>
        <p className='line-clamp-3 text-sm'>{post.desc}</p>
      </a>
    </li>
  )
})

export default MainMenu
