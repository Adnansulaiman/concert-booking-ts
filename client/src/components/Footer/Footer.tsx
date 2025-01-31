import React from "react";

const Footer = () => {
  return (
    <div className="md:justify-center md:items-center py-10 flex flex-col px-8  w-full  bg-black text-white">
      <div className="flex flex-col gap-5 md:items-center border-b w-full  ">
        <h1 className="text-4xl font-bold">OIF.</h1>
        <ul className="flex gap-5 md:gap-20 pb-5">
          <li className="md:text-base text-sm font-semibold hover:text-yellow-300">HOME</li>
          <li className="md:text-base text-sm font-semibold hover:text-yellow-300">CONCERT</li>
          <li className="md:text-base text-sm font-semibold hover:text-yellow-300">ABOUT US </li>
          <li className="md:text-base text-sm font-semibold hover:text-yellow-300">CONTACT </li>
          <li className="md:text-base text-sm font-semibold hover:text-yellow-300">FAQ </li>
        </ul>
      </div>
      <div className="flex justify-between md:px-10 w-full items-center pt-5">
        <div className="flex  gap-1">
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-transparent text-white rounded-full border outline-none px-2 md:px-5 md:w-72 py-2"
          />
          <button className="border rounded-full md:px-10 py-2 md:text-base text-xs px-3 bg-white text-black font-semibold">
            Subscribe
          </button>
        </div>
        <div className="flex">
          <p className="text-xs flex">
            &copy; {new Date().getFullYear()} OIF.All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
