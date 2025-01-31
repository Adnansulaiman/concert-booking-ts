import React from 'react'
import UpcomingImage from '../../assets/images/upcoming1.jpg'

const Upcoming = () => {
  return (
    <div className='flex flex-col  text-white w-scree bg-black px-8 py-10 '>
      <div className="flex items-center justify-between border-b mb-8">
        <h1 className='text-2xl font-bold  pb-2  uppercase'>Upcoming Events</h1>
        <p className='text-lg'>View all</p>
      </div>
        <div className="flex gap-10 justify-center">
        {[1,2,3,4,5].map((_,i) => (
          <div key={i} className="flex flex-col w-60  bg-cover bg-center hover:scale-105 " >
            <img src={UpcomingImage} alt="" className='w-60 bg-center bg-cover filter'   />
            <div className="flex px-2 py-2 ">
              <h1 className='text-2xl uppercase font-bold'>Event name</h1></div> 
            
            <div className="flex justify-between px-2 pb-2 border-b">
                <p>New York</p>
                <p>17 Feb</p>
            </div>
            
        </div>
        )
        )}
        
        </div>
        
    </div>
  )
}

export default Upcoming