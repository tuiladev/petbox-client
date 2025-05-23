import { useNavigate } from 'react-router'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectRegistrationData,
  updateRegistrationData,
  registerUserAPI,
  resetRegistration,
  loginUserAPI
} from '~/redux/user/userSlice'
import { useTranslation } from 'react-i18next'
import Button from '~/components/common/Button'
import FloatingInput from '~/components/utils/FloatingInput'
import DatePickerInput from '~/components/utils/DatePickerInput'
import { normalizePhoneNumber } from '~/utils/formatters'
import { format } from 'date-fns'

function parseDate(str) {
  if (!str) return null
  const [d, m, y] = str.split('auth:/')
  return new Date(+y, +m - 1, +d)
}

const getInitialFormValues = (formData) => ({
  fullName: formData.fullName || '',
  birthDate: formData.birthDate ? parseDate(formData.birthDate) : null,
  gender: formData.gender || ''
})

const UserForm = () => {
  const { t } = useTranslation(['auth', 'formLabel', 'validationMessage'])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formData = useSelector(selectRegistrationData)
  const initialValues = getInitialFormValues(formData)

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: initialValues,
    mode: 'onBlur'
  })

  const genderValue = watch('gender', '')

  const onSubmit = async (data) => {
    const registerData = {
      ...data,
      password: formData.password
    }
    try {
      await dispatch(registerUserAPI(registerData)).unwrap()
      await dispatch(
        loginUserAPI({
          phoneNumber: normalizePhoneNumber(formData.phoneNumber),
          password: formData.password
        })
      ).unwrap()
      dispatch(resetRegistration())
      navigate('/')
    } catch (err) {
      dispatch(resetRegistration())
      navigate('/register')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className='space-y-5'>
        {/* Full Name */}
        <FloatingInput
          type='text'
          name='fullName'
          label={t('formLabel:fullName')}
          variant='outlined'
          autoFocus
          error={errors.fullName?.message}
          {...register('fullName', { required: t('validationMessage:required') })}
        />

        {/* Birth Date */}
        <Controller
          name='birthDate'
          control={control}
          rules={{
            required: t('validationMessage:required'),
            validate: (date) =>
              (date instanceof Date && !isNaN(date)) || t('auth:Ngày sinh không hợp lệ!')
          }}
          render={({ field: { value, onChange } }) => (
            <DatePickerInput
              name='birthDate'
              value={value}
              onChange={onChange}
              error={errors.birthDate?.message}
              placeholder={t('formLabel:birthDate')}
            />
          )}
        />

        {/* Gender */}
        <div className='relative'>
          <select
            id='gender'
            className={`peer block w-full appearance-none rounded-full border-1 border-gray-300 px-6 py-4 pr-10 focus:ring-0 focus:outline-none ${
              errors.gender ? 'border-red-500' : ''
            } ${!genderValue ? 'text-gray-500' : 'text-base-content'}`}
            {...register('gender', { required: t('formLabel:required') })}
            defaultValue=''
          >
            <option value='' disabled>
              {t('formLabel:selectGender')}
            </option>
            <option value='male'>{t('formLabel:male')}</option>
            <option value='female'>{t('formLabel:female')}</option>
            <option value='other'>{t('formLabel:other')}</option>
          </select>
          {errors.gender && <p className='mt-1 text-sm text-red-500'>{errors.gender.message}</p>}
        </div>
      </div>

      <div className='mt-8 flex flex-col gap-3'>
        <Button
          type='submit'
          className='interceptor-loading text-primary w-full rounded-full bg-cyan-600!'
          disabled={isSubmitting}
        >
          {isSubmitting ? t('auth:register.processing') : t('auth:register.completeButton')}
        </Button>
        <div className='mt-3 text-center'>
          <button
            type='button'
            onClick={() => navigate('/register/set-password')}
            className='cursor-pointer text-cyan-600 hover:text-cyan-700'
          >
            {t('formLabel:back')}
          </button>
        </div>
      </div>
    </form>
  )
}
export default UserForm
