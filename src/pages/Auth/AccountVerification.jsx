import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router'
import { toast } from 'react-toastify'
import PageLoadingSpinner from '~/components/utils/PageLoadingSpinner'
import { verifyUserAPI } from '~/redux/user/userService'

const AccountVerification = () => {
  let [searchParams] = useSearchParams()
  const { email, token } = Object.fromEntries([...searchParams])
  const [verifed, setVerified] = useState(false)

  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => setVerified(true))
    }
  }, [email, token])

  if (!email || !token) {
    return <Navigate to='/404' />
  }

  if (!verifed) {
    return <PageLoadingSpinner caption='Đang xác thực tài khoản ...' />
  }

  return (
    toast.success('Xác thực tài khoản thành công!'),
    (<Navigate to={`/login?verifiedEmail=${email}`} />)
  )
}

export default AccountVerification
