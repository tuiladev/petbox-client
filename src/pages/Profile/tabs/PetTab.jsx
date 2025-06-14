/* eslint-disable react/no-children-prop */
import TabHeading from './TabHeading'
import Button from '~/components/common/Button'

const PetTab = ({ user }) => {
  // Sử dụng thú cưng từ user nếu có, nếu không thì dùng dữ liệu mẫu
  const pets = user?.pets || [
    {
      id: 1,
      name: 'Bé Mập',
      species: 'mèo ta',
      color: 'Màu lông: cam trắng',
      avatar:
        'https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ]

  return (
    <div className='space-y-8'>
      <TabHeading title='Danh sách thú cưng' />
      {pets.length > 0 ? (
        <div className='grid grid-cols-3'>
          {pets.map((pet) => (
            <div
              key={pet.id}
              className='flex cursor-pointer items-center rounded-lg border border-gray-200 p-4 transition-all duration-300 hover:shadow-md'
            >
              <img
                src={pet.avatar || '/api/placeholder/100/100'}
                alt={pet.name}
                className='mr-4 h-18 w-18 rounded-full object-cover'
              />
              <div>
                <h3 className='title-lg mb-2 text-sky-600'>{pet.name}</h3>
                <p className='text-sm text-gray-600'>Giống: {pet.species}</p>
                <p className='text-sm text-gray-600'>{pet.color}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-500'>Bạn chưa có thú cưng nào</p>
      )}
      <Button children={<span>+ Thêm thú cưng</span>} variant='filled' size='md' type='button' />
    </div>
  )
}
export default PetTab
