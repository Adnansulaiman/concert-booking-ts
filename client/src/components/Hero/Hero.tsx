import React from 'react'
import HeroBanner from '../../assets/images/hero-banner1.jpg'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <div className='flex  w-screen font-oswald h-screen pt-20 px-8 bg-center text-white  bg-cover'style={{backgroundImage:`url(${HeroBanner})`}}>
      <div className="flex md:flex-row flex-col gap-5 md:gap-0 items-center justify-center  md:items-end md:justify-between pb-40 md:pb-20 w-full p/x-10">
        <div className="flex flex-col gap-2 text-center md:text-justify  md:gap-0 ">
        <h1 className='text-4xl md:text-4xl  font-semibold uppercase'>Discover Your Next Concert Adventure!</h1>
        <p className='text-xs md:text-base uppercase text-slate-300 font-light'>Find the Hottest Gigs and Secure Your Seats Today</p>
        </div>
      
      <Button className='text-sm font-normal bg-transparent border rounded-full px-12 py-5 hover:bg-white hover:text-black' >BROWSE EVENTS</Button>
      </div>
    </div>
  )
}

export default Hero