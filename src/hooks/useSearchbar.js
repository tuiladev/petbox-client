import { useState, useCallback, useEffect } from 'react'
import useDropdown from './useDropdown'

const useSearchbar = (historyLimit = 6) => {
  const dropdownState = useDropdown({ openMode: 'click' })
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // A. SEARCH HISTORY
  // 1. Load history from local storage
  const [searchHistory, setSearchHistory] = useState(() => {
    const savedHistory = localStorage.getItem('searchHistory')
    return savedHistory ? JSON.parse(savedHistory) : []
  })

  // 2. Add to history
  const saveToHistory = useCallback(
    (query) => {
      if (!query.trim()) return
      setSearchHistory((prevHistory) => {
        const filteredHistory = prevHistory.filter((item) => item !== query)
        return [query, ...filteredHistory].slice(0, historyLimit)
      })
    },
    [historyLimit]
  )
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
    console.log(searchHistory)
  }, [searchHistory])

  // 3. Remove an item from history
  const removeHistoryItem = useCallback((query, e) => {
    e.stopPropagation()
    setSearchHistory((prev) => prev.filter((item) => item !== query))
  }, [])

  // 4. Xóa toàn bộ lịch sử
  const clearSearchHistory = useCallback(() => {
    setSearchHistory([])
  }, [])

  // B. PERFORM SEARCH
  // 1. Hàm xử lý submit form tìm kiếm
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      if (!searchQuery.trim()) return
      try {
        setIsLoading(true)
        saveToHistory(searchQuery)
        // Thuc hien logic tim kiem
        console.log(`Tìm kiếm: ${searchQuery}`)
        setIsLoading(false)
        dropdownState.setIsOpen(false)
      } catch {
        setIsLoading(false)
        console.log('Lỗi khi tìm kiếm:')
      }
    },
    [searchQuery, saveToHistory, dropdownState]
  )

  // 2. Search Logic
  const performSearch = useCallback(
    (query) => {
      setSearchQuery(query)
      dropdownState.setIsOpen(false)
      saveToHistory(query)
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        console.log(`Đang tìm kiếm ${query} ....`)
      }, 500)
    },
    [dropdownState, saveToHistory]
  )

  return {
    dropdownState,
    searchQuery,
    setSearchQuery,
    saveToHistory,
    removeHistoryItem,
    clearSearchHistory,
    searchHistory,
    performSearch,
    handleSubmit,
    isLoading
  }
}
export default useSearchbar
