import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { getProducts } from '~/data/mockdata'
import useDropdown from '~/hooks/useDropdown'
import Dropdown from '~/components/common/Dropdown'

const Cartview = ({ className = '' }) => {
  const products = getProducts()
  const { t } = useTranslation('product')
  const MAX_ITEM_VIEW = 4
  const dropdownState = useDropdown({ openMode: 'hover' })

  return (
    <Dropdown className={className}>
      <Dropdown.Trigger triggerProps={dropdownState.getTriggerProps()}>
        <Link to='/cart-view' className='relative translate-y-1'>
          <i className='text-primary fi fi-rr-shopping-cart text-2xl transition-transform duration-300 hover:scale-110'></i>
          {products.length > 0 && (
            <span className='bg-secondary absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white'>
              {products.length}
            </span>
          )}
        </Link>
      </Dropdown.Trigger>

      <Dropdown.Content
        size='sm'
        position='right'
        className='hidden p-0! md:block'
        contentProps={dropdownState.getContentProps()}
        isOpen={dropdownState.isOpen}
      >
        <p className='title-lg text-primary border-b border-gray-200 p-4 capitalize'>
          {t('cart.name')}
        </p>

        {/* Products List */}
        {products.length > 0 ? (
          products
            .slice(-MAX_ITEM_VIEW)
            .map((product, index) => <CartItem key={index} product={product} />)
        ) : (
          <div className='p-4 text-center text-gray-500 capitalize'>{t('cart.empty')}</div>
        )}

        {/* View Cart Button */}
        <div className='flex items-center justify-between border-t border-gray-200 p-4 text-right'>
          <span>
            + {products.length - MAX_ITEM_VIEW} {t('product')}
          </span>
          <a
            href='#'
            className='bg-primary group inline-block rounded-sm px-4 py-3 text-center font-semibold text-white capitalize'
          >
            {t('cart.view')}
            <i className='fi fi-rr-arrow-right ml-1 inline-block translate-y-1 transition-transform duration-300 group-hover:translate-x-1'></i>
          </a>
        </div>
      </Dropdown.Content>
    </Dropdown>
  )
}

export default Cartview

const CartItem = ({ product }) => {
  return (
    <a
      href={product.url}
      className='hover:bg-secondary/10 flex w-full items-center gap-3 px-4 py-3 transition-colors duration-200'
    >
      <img
        src={product.image}
        alt={product.name}
        className='aspect-square h-16 w-16 rounded-sm object-cover'
      />
      <div className='flex grow flex-col'>
        <p className='title-base mb-2 line-clamp-2 font-medium! text-zinc-700'>{product.name}</p>
        <p className='title-base text-right text-zinc-700'>
          {product.discountPrice.toLocaleString()}đ
        </p>
      </div>
    </a>
  )
}
