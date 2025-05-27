import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function ProductDescription({ product, reviews = [] }) {
  const { t } = useTranslation('product')
  const [activeTab, setActiveTab] = useState('description')

  const tabs = [
    { id: 'description', label: t('description') },
    { id: 'reviews', label: t('review') }
  ]

  return (
    <div className='w-full p-4'>
      {/* Tab Navigation */}
      <div className='flex border-b border-gray-200'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={
              `cursor-pointer border-b-2 px-6 py-4 capitalize transition-colors duration-200 ` +
              (activeTab === tab.id
                ? 'border-primary text-primary bg-blue-50 font-bold'
                : 'border-transparent text-gray-600 hover:border-gray-300')
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className='py-6'>
        {activeTab === 'description' && (
          <div className='prose max-w-none'>
            <div className='space-y-4 leading-relaxed'>
              {product.description ? (
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
              ) : (
                <p>Trống trải</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className='space-y-6'>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className='border-b border-gray-200 pb-6 last:border-b-0'>
                  <div className='mb-3 flex items-start justify-between'>
                    <div>
                      <h4 className='font-semibold text-gray-900'>{review.customerName}</h4>
                      <div className='mt-1 flex items-center gap-2'>
                        <div className='flex'>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <i
                              key={star}
                              className={`fi ${
                                star <= review.rating
                                  ? 'fi-sr-star text-yellow-400'
                                  : 'fi-rr-star text-gray-300'
                              } text-sm`}
                            ></i>
                          ))}
                        </div>
                        <span className='text-sm text-gray-500'>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className='leading-relaxed text-gray-700'>{review.comment}</p>
                  {review.images && review.images.length > 0 && (
                    <div className='mt-3 flex gap-2'>
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className='h-16 w-16 rounded-lg border border-gray-200 object-cover'
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className='py-8 text-center'>
                <i className='fi fi-rr-comment-alt mb-4 text-4xl text-gray-300'></i>
                <p className='text-gray-500'>Chưa có đánh giá nào cho sản phẩm này.</p>
                <button className='mt-4 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700'>
                  Viết đánh giá đầu tiên
                </button>
              </div>
            )}

            {/* Add Review Form */}
            {reviews.length > 0 && (
              <div className='mt-8 rounded-lg bg-gray-50 p-6'>
                <h3 className='mb-4 text-lg font-semibold'>Viết đánh giá của bạn</h3>
                <form className='space-y-4'>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Đánh giá của bạn
                    </label>
                    <div className='flex gap-1'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type='button'
                          className='text-xl text-gray-300 transition-colors hover:text-yellow-400'
                        >
                          <i className='fi fi-rr-star'></i>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>Nhận xét</label>
                    <textarea
                      rows={4}
                      className='w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
                      placeholder='Chia sẻ trải nghiệm của bạn về sản phẩm này...'
                    />
                  </div>
                  <div className='flex gap-3'>
                    <input
                      type='text'
                      placeholder='Tên của bạn'
                      className='flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    />
                    <input
                      type='email'
                      placeholder='Email của bạn'
                      className='flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    />
                  </div>
                  <button
                    type='submit'
                    className='rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700'
                  >
                    Gửi đánh giá
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
