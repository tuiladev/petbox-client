import { memo, useState, useEffect } from 'react'
import { getSearchData } from '~/data/mockdata'
import useSearchbar from '~/hooks/useSearchbar'
import Dropdown from '~/components/common/Dropdown'
import { useTranslation } from 'react-i18next'

const Searchbar = ({ className = '' }) => {
  const { t } = useTranslation('header')
  const searchData = getSearchData()
  const [suggestions, setSuggestions] = useState([])
  const { text, icon, keywords, products } = searchData
  const {
    dropdownState,
    searchQuery,
    setSearchQuery,
    removeHistoryItem,
    clearSearchHistory,
    searchHistory,
    performSearch,
    handleSubmit,
    isLoading
  } = useSearchbar()

  const displayedKeywords = keywords.slice(0, 6)
  const displayedHistory = searchHistory.slice(0, 6)

  // Mô phỏng tìm kiếm gợi ý từ khóa
  useEffect(() => {
    if (searchQuery.trim()) {
      // Tìm các từ khóa khớp với searchQuery
      const matchedKeywords = keywords.filter((keyword) =>
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSuggestions(matchedKeywords)
    } else {
      // setSuggestions([])
    }
  }, [searchQuery, keywords])

  return (
    <Dropdown className={`${className}`}>
      <Dropdown.Trigger
        className='w-full md:max-lg:w-3xs lg:max-xl:w-xs xl:w-sm'
        triggerProps={dropdownState.getTriggerProps()}
      >
        <form
          className={
            'group hover:border-primary focus-within:border-primary relative flex w-full items-center rounded-full border border-gray-300 p-1 font-medium transition duration-300'
          }
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            placeholder={text}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              dropdownState.setIsOpen(true)
            }}
            className='text-primary grow self-stretch p-2 text-base outline-none lg:pr-2 lg:pl-4'
            aria-label='Nhập từ khóa tìm kiếm'
          />
          <button
            type='submit'
            className='bg-primary hover:bg-secondary focus:bg-secondary flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-lg text-white transition duration-300 ease-in-out focus:outline-none lg:h-11 lg:w-11'
            aria-label='Tìm kiếm'
            disabled={isLoading}
          >
            {isLoading ? (
              <span className='animate-spin'>
                <i className='fi fi-rr-spinner'></i>
              </span>
            ) : (
              <i className={icon}></i>
            )}
          </button>
        </form>
      </Dropdown.Trigger>
      <Dropdown.Content
        size='md'
        position='center'
        contentProps={dropdownState.getContentProps()}
        isOpen={dropdownState.isOpen}
        className='max-md:w-screen'
      >
        {searchQuery.trim() ? (
          <div className='mb-4'>
            <div className='text-primary mb-3 flex items-center gap-x-2'>
              <p className='title-lg'>{t('searchBar.suggest')}</p>
              <i className='fi fi-rr-search translate-y-0.5 text-xl'></i>
            </div>
            {suggestions.length > 0 ? (
              <div className='flex flex-wrap gap-3'>
                {suggestions.map((keyword, index) => (
                  <KeywordButton
                    key={`suggestion-${index}`}
                    keyword={keyword}
                    onKeywordClick={performSearch}
                    highlight={searchQuery}
                  />
                ))}
              </div>
            ) : (
              <p className='text-sm text-gray-500'>{t('searchBar.notFound')}</p>
            )}
          </div>
        ) : (
          <>
            {displayedHistory.length > 0 && (
              <SearchHistorySection
                searchHistory={displayedHistory}
                onSelectHistory={performSearch}
                onRemoveHistory={removeHistoryItem}
                onClearHistory={clearSearchHistory}
              />
            )}
            <HotSearchSection keywords={displayedKeywords} onKeywordClick={performSearch} />
            <SuggestedProductsSection products={products} />
          </>
        )}
      </Dropdown.Content>
    </Dropdown>
  )
}

export default Searchbar

const SearchHistorySection = ({
  searchHistory,
  onSelectHistory,
  onRemoveHistory,
  onClearHistory
}) => {
  const { t } = useTranslation('header')
  return (
    <div className='mb-8'>
      <div className='text-primary mb-3 flex items-center justify-between'>
        <div className='flex items-center gap-x-2'>
          <p className='title-lg'>{t('searchBar.history')}</p>
          <i className='fi fi-rr-time-past translate-y-0.5 text-xl'></i>
        </div>

        <button
          type='button'
          className='text-sm text-gray-500 transition duration-200 hover:text-red-500'
          onClick={onClearHistory}
          aria-label='Xóa lịch sử tìm kiếm'
        >
          {t('searchBar.clearAll')}
        </button>
      </div>

      {/* Sử dụng flex-wrap để hiển thị nhiều dòng nếu cần */}
      <div className='flex flex-wrap gap-3'>
        {searchHistory.map((keyword, index) => (
          <div
            key={`history-${index}`}
            className='group flex cursor-pointer items-center gap-x-2 rounded-sm bg-gray-100 px-3 py-2 text-sm tracking-wider text-gray-800 hover:bg-gray-200 hover:transition hover:duration-300 hover:ease-in-out'
            onClick={() => onSelectHistory(keyword)}
          >
            <i className='fi fi-rr-time-past text-sm text-gray-500'></i>
            {keyword}
            <button
              className='ml-1 text-gray-500 opacity-0 transition duration-200 group-hover:opacity-100 hover:text-red-500'
              onClick={(e) => onRemoveHistory(keyword, e)}
              aria-label={`Xóa từ khóa ${keyword} khỏi lịch sử`}
            >
              <i className='fi fi-br-cross-small text-xs'></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const KeywordButton = ({ keyword, onKeywordClick, highlight = '' }) => {
  const renderHighlightedKeyword = () => {
    if (!highlight) return keyword

    const lowerKeyword = keyword.toLowerCase()
    const lowerHighlight = highlight.toLowerCase()
    const index = lowerKeyword.indexOf(lowerHighlight)

    if (index === -1) return keyword

    const before = keyword.substring(0, index)
    const matched = keyword.substring(index, index + highlight.length)
    const after = keyword.substring(index + highlight.length)

    return (
      <>
        {before}
        <span className='font-bold'>{matched}</span>
        {after}
      </>
    )
  }

  return (
    <button
      className='hover:text-primary cursor-pointer rounded-sm bg-blue-50 px-4 py-2.5 text-sm tracking-wider text-gray-800 transition duration-200 hover:bg-blue-100'
      onClick={() => onKeywordClick(keyword)}
      type='button'
      aria-label={`Tìm kiếm từ khóa ${keyword}`}
    >
      {renderHighlightedKeyword()}
    </button>
  )
}

const HotSearchSection = ({ keywords, onKeywordClick }) => {
  const { t } = useTranslation('header')
  return (
    <div className='mb-8'>
      <div className='text-primary mb-3 flex items-center gap-x-2'>
        <p className='title-lg'>{t('searchBar.hot')}</p>
        <i className='fi fi-rr-arrow-trend-up translate-y-0.5 text-2xl'></i>
      </div>

      <div className='flex flex-wrap gap-3'>
        {keywords.map((keyword, index) => (
          <KeywordButton key={`hot-${index}`} keyword={keyword} onKeywordClick={onKeywordClick} />
        ))}
      </div>
    </div>
  )
}

const Product = ({ product }) => {
  const { t } = useTranslation('header')
  return (
    <a
      href={product.url}
      className='hover:bg-secondary/10 flex w-1/3 flex-col gap-2 rounded-sm p-2 md:w-full md:flex-row'
      aria-label={`Xem sản phẩm ${product.name}`}
    >
      <img
        src={product.image}
        alt={product.name}
        className='aspect-square w-full self-center rounded-sm object-cover md:w-1/3 md:max-w-2/6'
        loading='lazy'
      />
      <div className='flex grow flex-col justify-between'>
        <p className='title-base text-primary mb-2 line-clamp-3 font-medium! md:line-clamp-2'>
          {product.name}
        </p>
        <div className='flex items-center justify-end gap-x-2'>
          <p className='text-primary/60 title-sm hidden line-through md:block'>
            {product.normalPrice.toLocaleString()}đ
          </p>
          <p className='text-secondary title-lg'>{product.discountPrice.toLocaleString()}đ</p>
        </div>
      </div>
    </a>
  )
}

const SuggestedProductsSection = ({ products }) => {
  const limitedProducts = products.slice(0, 4)
  const { t } = useTranslation('header')
  return (
    <div>
      <div className='text-primary mb-3 flex justify-between'>
        <p className='title-lg'>{t('searchBar.newArrival')}</p>
        <a href='#' className='hover:text-secondary transition duration-300 ease-in-out'>
          {t('searchBar.viewAll')}
          <i className='fi fi-rr-arrow-circle-right ml-2 inline-block translate-y-0.5'></i>
        </a>
      </div>

      {/* Desktop: hiển thị dạng lưới 2 cột, tối đa 4 sản phẩm */}
      <div className='hidden md:grid md:grid-cols-2 md:gap-3'>
        {limitedProducts.map((product, index) => (
          <Product key={`desktop-${index}`} product={product} />
        ))}
      </div>

      {/* Mobile: hiển thị dạng hàng ngang có thể scroll, tối đa 3 sản phẩm */}
      <div className='flex gap-3 overflow-x-auto pb-2 md:hidden'>
        {products.slice(0, 3).map((product, index) => (
          <Product key={`mobile-${index}`} product={product} />
        ))}
      </div>
    </div>
  )
}
