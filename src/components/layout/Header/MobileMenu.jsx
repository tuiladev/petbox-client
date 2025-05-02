import React, { useEffect, useState } from 'react'
import { Button, DropdownContent } from '../../common'
import { storeInfo } from '../../../data/mockdata'
import Logo from '~/components/common/Logo'
import { MenuItem } from './MenuList'
import { UserCard } from './UserTools'
import { MainMenuContent } from './MainMenu'
import { useAuth } from '../../../redux/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const MobileMenu = ({ dropdownState, className = '' }) => {
  const { isAuthenticated, user, logoutUser } = useAuth()
  const [hasInteracted, setHasInteracted] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (dropdownState.isOpen !== undefined && !hasInteracted) {
      setHasInteracted(true)
    }
  }, [dropdownState.isOpen, hasInteracted])

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    logoutUser()
    dropdownState.setIsOpen(false)
    navigate('/') // Điều hướng về trang chủ sau khi đăng xuất
  }

  // Hàm điều hướng đến trang đăng nhập
  const handleNavigateToLogin = () => {
    dropdownState.setIsOpen(false)
    navigate('/auth')
  }

  return (
    <DropdownContent
      contentProps={dropdownState.getContentProps()}
      isOpen={dropdownState.isOpen}
      hoverEffect={`${
        !dropdownState.isOpen
          ? 'pointer-events-none translate-x-full opacity-0'
          : 'translate-x-0 opacity-100'
      }`}
      className={`fixed top-0 right-0 z-9999 h-[100dvh] w-4/5 overflow-y-scroll bg-white pb-8 shadow-sm transition-all duration-300 ${className}`}
    >
      {/* UserCard */}
      {isAuthenticated ? (
        <UserCard user={user} />
      ) : (
        <div className='flex items-center justify-between px-6 py-6'>
          <Logo />
          {/* Toggle Button */}
          <div
            className='cursor-pointer'
            onClick={() => {
              dropdownState.setIsOpen(false)
            }}
          >
            <i
              className={`fi fi-br-cross-small text-primary inline-block text-4xl transition-all delay-200 duration-300 ${
                !hasInteracted
                  ? ''
                  : dropdownState.isOpen
                    ? 'rotate-90'
                    : 'rotate-[270deg]'
              }`}
            ></i>
          </div>
        </div>
      )}

      <MainMenuContent type='mobile'>
        {/* Liên Hệ */}
        <div>
          <p className='title-lg text-primary border-primary ml-8 inline-block border-b-3 py-3 capitalize'>
            Liên Hệ
          </p>
          <ul>
            {storeInfo.map((item, index) => (
              <MenuItem
                key={index}
                category={item}
                className='text-primary border-none pl-8!'
              />
            ))}
          </ul>
        </div>

        {/* Đăng nhập hoặc Đăng xuất Button */}
        <div className='text-center'>
          {isAuthenticated ? (
            <Button
              variant='logout'
              children={
                <>
                  <span className='mr-2 capitalize'>Đăng xuất</span>
                  <i className='fi fi-rr-sign-out-alt ml-2 inline-block translate-y-0.5 text-lg'></i>
                </>
              }
              className='w-1/2'
              onClick={handleLogout}
            />
          ) : (
            <Button
              variant='primary'
              children={
                <>
                  <span className='mr-2 capitalize'>Đăng nhập</span>
                  <i className='fi fi-rr-sign-in ml-2 inline-block translate-y-0.5 text-lg'></i>
                </>
              }
              className='w-1/2'
              onClick={handleNavigateToLogin}
            />
          )}
        </div>
      </MainMenuContent>
    </DropdownContent>
  )
}
export default MobileMenu
