import React from 'react'
import Image from "../../assets/images/upcoming1.jpg";


const SingleConcert = () => {
  return (
    <div className='flex w-full h-screen bg-black text-white'>
        <div className="flex" style={{backgroundImage:`url(${Image})`}}></div>
    </div>
  )
}

export default SingleConcert