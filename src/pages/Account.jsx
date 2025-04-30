import { useParams } from 'react-router'

export const Profile = () => {
  return <div>Profile Page</div>
}
export const Address = () => {
  return <div>Adress Page</div>
}
export const Payments = () => {
  return <div>Payments Page</div>
}
export const Pets = () => {
  return <div>Pets Page</div>
}

const Account = () => {
  // Take param from route
  // useParams() returns an object with the params from the route
  const { tabName } = useParams()
  // Decide which component to render based on param
  switch (tabName) {
    case 'profile':
      return <Profile />
    case 'address':
      return <Address />
    case 'payments':
      return <Payments />
    case 'pets':
      return <Pets />
    default:
      return <div>Account</div>
  }
}

export default Account
