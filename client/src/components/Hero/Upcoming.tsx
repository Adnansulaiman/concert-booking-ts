import React, { useEffect, useState } from 'react'
import UpcomingImage from '../../assets/images/upcoming1.jpg'
import ConcertItem from '../Concert/ConcertItem'
import axios from 'axios';

const Upcoming = () => {
  const [upcomingData,setUpcomingData] = useState(null);
  useEffect(()=>{
    const fetchUpcomingData = async()=>{
      try{
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/upcoming/`,
          
        );
        // console.log(response.data.upcomings);
        setUpcomingData(response.data.upcomings)
      }catch(error){
        console.log(error)
      }
    }
    fetchUpcomingData()
  },[])
  return (
    <div className='flex flex-col  text-white w-scree bg-black px-8 py-10 '>
      <div className="flex items-center justify-between border-b mb-8">
        <h1 className='text-2xl font-bold  pb-2  uppercase'>Upcoming Events</h1>
        <p className='text-lg'>View all</p>
      </div>
        
        {/* <ConcertItem /> */}
        {upcomingData && (
          <div className="flex justify-between ">
        {upcomingData?.slice(0,4)?.map((item) => (
          <div className='flex flex-col gap-2'>
          <div key={item?._id} className="flex flex-col w-80  h-96  bg-cover bg-center hover:scale-105 " style={{backgroundImage:`url(${item?.image})`}} >
            {/* <img src={UpcomingImage} alt="" className='w-60 bg-center bg-cover filter'   /> */}
            <div className="flex p-4 ">
              <h1 className='text-2xl uppercase font-bold'>{item?.title}</h1>
              </div> 
            
            
            
        </div>
        <p className='text-center text-xl uppercase text-slate-300'>Coming Soon...</p>
        </div>
        )
        )}
        </div>
        )}
        
        
    </div>
  )
}

export default Upcoming