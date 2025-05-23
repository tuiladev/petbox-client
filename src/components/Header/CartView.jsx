import { Link } from 'react-router-dom'
import { getProducts } from '~/data/mockdata'
import useDropdown from '~/hooks/useDropdown'
import Dropdown from '~/components/common/Dropdown'

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
        <p className='title-md mb-2 line-clamp-2 font-medium! text-zinc-700'>{product.name}</p>
        <p className='title-md text-right text-zinc-700'>
          {product.discountPrice.toLocaleString()}đ
        </p>
      </div>
    </a>
  )
}

const Cartview = ({ className = '' }) => {
  const products = getProducts()
  const dropdownState = useDropdown({ openMode: 'click' })

  return (
    <Dropdown className={className}>
      <Dropdown.Trigger triggerProps={dropdownState.getTriggerProps()}>
        <Link to='/cart' className='relative translate-y-1'>
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
        <p className='title-xl text-primary border-b border-gray-200 p-4'>Giỏ hàng</p>

        {/* Products List */}
        {products.length > 0 ? (
          products.map((product, index) => <CartItem key={index} product={product} />)
        ) : (
          <div className='p-4 text-center text-gray-500'>Giỏ hàng trống</div>
        )}

        {/* View Cart Button */}
        <div className='border-t border-gray-200 p-4 text-right'>
          <a
            href='#'
            className='bg-primary group inline-block rounded-sm px-4 py-3 text-center font-semibold text-white'
          >
            Xem giỏ hàng
            <i className='fi fi-rr-arrow-right ml-1 inline-block translate-y-1 transition-transform duration-300 group-hover:translate-x-1'></i>
          </a>
        </div>
      </Dropdown.Content>
    </Dropdown>
  )
}

export default Cartview
