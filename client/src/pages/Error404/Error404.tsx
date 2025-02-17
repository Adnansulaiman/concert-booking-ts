import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const Error404 = () => {
  return (
    <div className="bg-black font-sans text-white w-full h-screen flex flex-col gap-3  justify-center items-center">
      <h1 className="text-8xl md:text-9xl font-black">Oops!</h1>
      <h3 className="uppercase text-xl md:text-2xl mt-5 md:mt-10 font-bold">
        404 - page not found
      </h3>
      <p className="text-sm md:text-lg max-w-sm  md:max-w-xl text-center">
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </p>
      <Link to='/'><button className="text-lg bg-white text-black px-10 py-3 font-bold rounded-full mt-5 flex items-center gap-3"><BsArrowLeft className="text-black text-2xl" /> Go to Homepage</button></Link>
    </div>
  );
};

export default Error404;
