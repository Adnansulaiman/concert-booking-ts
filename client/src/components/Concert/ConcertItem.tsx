import React from 'react'
import UpcomingImage from '../../assets/images/upcoming1.jpg';
import moment from "moment-timezone";

const ConcertItem = ({data}) => {
  const formatDateToIST = (dateString:string) => {
          return moment(dateString).tz("Asia/Kolkata").format("DD MMM YYYY");
        };
  return (
    <div className="flex gap-10 justify-center">
        
          <div key={data?._id} className="flex flex-col w-80  bg-cover bg-center hover:scale-105 " >
            <img src={data?.image} alt={data?.title} className='w-80 bg-center bg-cover filter'   />
            <div className="flex px-2 py-2 ">
              <h1 className='text-2xl uppercase font-bold'>{data?.title}</h1></div> 
            
            <div className="flex justify-between px-2 pb-2 border-b">
                <p>{data?.venue?.city}</p>
                <p>{formatDateToIST(data?.date)}</p>
            </div>
            
        </div>
        
        
        </div>
  )
}

export default ConcertItem