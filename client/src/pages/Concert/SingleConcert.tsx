import React from "react";
import Image from "../../assets/images/upcoming1.jpg";
import { useParams } from "react-router-dom";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { LuPlus,LuMinus } from "react-icons/lu";
import { FiBookmark } from "react-icons/fi";

const SingleConcert = () => {
  const { id } = useParams();

  return (
    <div className="flex w-full h-screen bg-black text-white">
      <div
        className="relative flex w-1/2 h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${Image})` }}
      >
        {/* Gradient Blur Effect (Right to Left) */}
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/10 to-transparent"></div>
      </div>
      <div className="flex flex-col w-1/2 h-screen mt-28 px-10">
        <div className="flex flex-col w-full gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl font-bold">Event Name</h1>
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <IoCalendarNumberOutline />
                <p>17 Feb 2055 | 7.00 </p>
              </div>
              <div className="flex gap-2 items-center">
                <GoPerson />
                <p>The Weeknd</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <h3 className="text-xl font-bold">About the event</h3>
            <p className="text-base text-slate-200">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
              sed laudantium totam ut molestiae animi commodi quia rem adipisci,
              velit tempore explicabo ex ab ipsam quidem fugit alias, dolorum
              iusto?
            </p>
          </div>
          <div className="flex flex-col gap mt-5">
            <h3 className="text-xl font-bold">Venue</h3>
            <div className="flex flex-col">
              <p className="font-light">Manison</p>
              <p className="font-light">Manison</p>
              <p className="font-light">Manison</p>
              <p className="font-light">Manison</p>
            </div>
          </div>
          
          
        </div>
        <div className="flex my-10 items-center gap-52 ">
            <div className="flex items-center gap-8 border rounded-full py-1 ">
                <LuMinus className="border  bg-white text-black rounded-full text-4xl ml-1 p-1" />
                <p className="text-lg font-bold">1</p>
                <LuPlus className="border  bg-white text-black rounded-full text-4xl mr-1 p-1" />
            </div>
            <div className="flex">
                <p className="text-3xl font-bold">$ 399</p>
            </div>
        </div>
        <div className="flex w-full gap-10">
            <button className="border py-3 text-lg w-1/2 font-semibold rounded-full flex justify-center items-center gap-1"><FiBookmark className="text-2xl" />Save</button>
            <button className="border py-3 text-lg w-1/2 font-semibold rounded-full text-black bg-white">Book now</button>
            
            
          </div>
      </div>
    </div>
  );
};

export default SingleConcert;
