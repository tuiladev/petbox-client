import { useState } from 'react'
import { createAccountAPI } from '~/services/api'

const Home = () => {
  const [fullname, setFullname] = useState(null)

  const handlerSubmit = async () => {
    await createAccountAPI(fullname)
  }

  return (
    <>
      <div className='l-container h-screen flex flex-col items-center justify-center'>
        <h1 className='text-7xl font-bold font-secondary'>Comming Soon...</h1>
        {/* create a form with fullname field */}
        <form
          className='l-container flex flex-col items-center justify-center gap-4'
          action={handlerSubmit}
        >
          <input
            type='text'
            placeholder='Full Name'
            className='input'
            onChange={(e) => setFullname(e.target.value)}
          />
          <button className='btn'>Create Account</button>
        </form>
      </div>
    </>
  )
}

export default Home
