import Button from '~/components/common/Button'
import FloatingLabel from '~/components/utils/FloatingLabel'

const About = () => {
  return (
    <div className='l-container'>
      <button className='cursor-pointer'>TESTING</button>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit explicabo provident
        recusandae pariatur laborum. Cupiditate veniam eum error nam. Incidunt magni hic facere
        nihil porro repellendus corrupti aliquid dolore sapiente.
      </p>
      <div className='mt-20 mb-20 flex items-center gap-4'>
        <Button variant='outlined' size='xs' color='info' className=''>
          Outline XS
        </Button>
        <Button variant='outlined' size='sm' color='success' iconLeft='fi fi-rr-home'>
          Outline SM
        </Button>
        <Button variant='outlined' size='md' color='warning' className=''>
          Outline MD
        </Button>
        <Button variant='outlined' size='lg' color='danger' className=''>
          Outline LG
        </Button>
      </div>

      <div className='mt-20 mb-20 flex items-center gap-4'>
        <Button variant='filled' size='xs' color='info'>
          Outline XS
        </Button>
        <Button variant='filled' size='sm' color='success' iconRight='fi fi-rr-home'>
          Outline SM
        </Button>
        <Button variant='filled' size='md' color='warning' className=''>
          Outline MD
        </Button>
        <Button variant='filled' size='lg' color='danger' className=''>
          Outline LG
        </Button>
      </div>
    </div>
  )
}

export default About
