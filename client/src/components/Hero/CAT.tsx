import React from 'react'
import CATImage from '../../assets/images/hero-banner4.jpg'
import { Button } from '../ui/button'

const CAT = () => {
  return (
    <div className='bg-cover bg-center flex flex-col justify-center items-center gap-5 w-full h-96 font-oswald text-white uppercase' style={{backgroundImage:`url(${CATImage})`}}>
        <h1 className='text-5xl font-bold '>Don’t Miss Out!</h1>
      <Button className='text-sm font-normal bg-transparent border rounded-full px-12 py-5 hover:bg-white hover:text-black uppercase' >Find Events Near You</Button>

    </div>
  )
}

export default CAT