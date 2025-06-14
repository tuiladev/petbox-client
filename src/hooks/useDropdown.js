import { useEffect, useRef, useState } from 'react'

const useDropdown = ({ openMode = 'click', hoverDelay = 200 }) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef(null)
  const contentRef = useRef(null)
  const timeoutRef = useRef(null)
  const touchStartXRef = useRef(0)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        contentRef.current &&
        !contentRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }

    const handlePopState = () => {
      if (isOpen) {
        setIsOpen(false)
        history.pushState(null, document.title, window.location.href)
      }
    }

    const handleTouchStart = (e) => {
      touchStartXRef.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX
      const diff = touchStartXRef.current - touchEndX

      if (diff < -50 && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)

    if (isOpen) {
      history.pushState(null, document.title, window.location.href)
      window.addEventListener('popstate', handlePopState)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('popstate', handlePopState)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isOpen])

  const handleToggle = () => {
    if (openMode === 'click' || openMode === 'both') {
      setIsOpen((prev) => !prev)
    }
  }

  const handleMouseEnter = () => {
    if (openMode === 'hover' || openMode === 'both') {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      setIsOpen(true)
    }
  }

  const handleMouseLeave = () => {
    if (openMode === 'hover' || openMode === 'both') {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false)
      }, hoverDelay)
    }
  }

  const getTriggerProps = () => {
    return {
      ref: triggerRef,
      ...(openMode === 'click' || openMode === 'both' ? { onClick: handleToggle } : {}),
      ...(openMode === 'hover' || openMode === 'both'
        ? {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave
          }
        : {})
    }
  }

  const getContentProps = () => {
    return {
      ref: contentRef,
      onClick: (e) => e.stopPropagation(),
      ...(openMode === 'hover' || openMode === 'both'
        ? {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave
          }
        : {})
    }
  }

  return {
    isOpen,
    setIsOpen,
    triggerRef,
    contentRef,
    getTriggerProps,
    getContentProps
  }
}

export default useDropdown
