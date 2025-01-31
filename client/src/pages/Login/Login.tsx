import React from "react";
import Image from "../../assets/images/login1.jpg";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex bg-black text-white">
      <div
        className="hidden md:flex flex-col justify-end w-1/2 bg-cover h-screen bg-center px-8 py-32"
        style={{ backgroundImage: `url(${Image})` }}
        
      >
        <h1 className="text-6xl uppercase font-bold">Never Miss a Beat—</h1>
        <h1 className="text-6xl uppercase font-bold">Book Your Tickets Now!</h1>
      </div>
      <div className="flex flex-col py-32 gap-10 w-full md:w-1/2 h-screen justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold uppercase">Welcome back!</h1>
          <p className="text-base font-light text-slate-300">
            Welcome back, Please enter your details
          </p>
        </div>
        <form className="px-10 md:px-20 flex flex-col gap-5">
            <div className="flex flex-col">
                <label htmlFor="" className="text-slate-300">Email</label>
                <input type="email"  className="bg-transparent outline-none border-b py-2" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="" className="text-slate-300">Password</label>
                <input type="password"  className="bg-transparent outline-none border-b py-2" />
            </div>
            <div className="flex justify-end">
                <p className="hover:underline">Forget password?</p>
            </div>
            <Button className="mt-10 text-sm font-normal bg-transparent border rounded-full px-12 py-6 hover:bg-white hover:text-black">
              LOGIN
            </Button>
            <div className="flex justify-center ">
                <p>Don't have an account? <Link to='/register'><span className="border-b hover:text-yellow-300">Sign up</span></Link></p>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
