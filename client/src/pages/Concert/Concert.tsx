import React, { useEffect, useState } from 'react'
import ConcertBanner from "../../assets/images/concert-banner2.jpg"
import { IoSearch } from "react-icons/io5";
import ConcertItem from '../../components/Concert/ConcertItem';
import axios from 'axios';


const Concert = () => {
    
    const [concertData,setConcertData] = useState(null);
    useEffect(()=>{
        const fetchConcertData = async() =>{
            try{
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/concert/all`)
                console.log(response.data.concerts);
                setConcertData(response.data.concerts)
            }catch(error){
                console.error(error)
            }
        }
        fetchConcertData()
    },[])
  return (
    <div className='bg-black text-white flex flex-col'>
        <div className="flex flex-col bg-cover bg-center w-full h-96 px-8" style={{backgroundImage:`url(${ConcertBanner})`}}>
            <h1 className='text-7xl font-black uppercase mt-28 max-w-xl '>Feel the Music, Live the Moment.</h1>
            <div className="flex justify-end mt-10 relative">
                <input type="text" placeholder='Search with name,place or date.' className='text-lg w-1/2 bg-transparent border-white  text-white outline-none border-2  px-5 py-3 rounded-full placeholder:text-white'  />
                <IoSearch className='text-black bg-white absolute text-5xl top-1 right-1 border-2 border-white rounded-full p-3' />
            </div>
        </div>
        <div className="flex flex-col py-10 px-8">
            <div className="flex w-full bg-white h-16"></div>
            <div className="w-full flex px- justify-ceter py-10 gap-14 flex-wrap">
            {concertData ? (
                concertData?.map((concert)=>(
                    <ConcertItem data={concert} />
                ))
            ):(
                <p>No concerts found!</p>
            )}
            </div>
        </div>
    </div>
  )
}

export default Concert