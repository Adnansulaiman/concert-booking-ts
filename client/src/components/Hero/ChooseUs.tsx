import React from "react";
import { RiSecurePaymentFill } from "react-icons/ri";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaTicket } from "react-icons/fa6";

const ChooseUs = () => {
  return (
    <div className="py-5 pb-16 bg-black text-white font-oswald flex flex-col px-8 ">
      <h1 className="text-center text-xl  md:text-2xl font-bold uppercase pb-10">
        Why Choose Us
      </h1>
      <div className="flex justify-evenly w-full text-lg ">
        <div className="flex flex-col items-center gap-2 md:gap-5 ">
          <RiSecurePaymentFill className="text-2xl md:text-5xl" />
          <h1 className="text-xs md:text-base">Safe and secure bookings.</h1>
        </div>
        <div className="flex flex-col items-center gap-2 md:gap-5">
          <RiDiscountPercentFill className="text-2xl md:text-5xl" />
          <h1 className='text-xs md:text-base'>Exclusive early bird discounts.</h1>
        </div>
        <div className="flex flex-col items-center gap-2 md:gap-5">
          <FaTicket className="text-2xl md:text-5xl" />
          <h1 className='text-xs md:text-base'>Seamless mobile ticketing.</h1>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
