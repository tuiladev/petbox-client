import { useTranslation } from 'react-i18next'

const UserInput = ({ label, type = 'text', disabled = false, register, error }) => {
  const { t } = useTranslation('validation')
  return (
    <div className='flex items-center gap-4'>
      <label className='w-full max-w-[25%] text-gray-600'>{label}</label>
      <div className='grid-cols-[auto, 1fr] grid w-full'>
        <input
          type={type}
          disabled={disabled}
          className={`col-start-1 rounded-md border border-gray-300 px-3 py-2 outline-none ${disabled ? 'border-transparent' : 'col-span-2'}`}
          {...register}
        />
        {error && <p className='col-span-2 mt-1 text-sm text-red-500'>{t(error)}</p>}
      </div>
    </div>
  )
}

export default UserInput
