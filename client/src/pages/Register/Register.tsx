import React from 'react'
import { Button } from '../../components/ui/button'
import Image from '../../assets/images/hero-banner8.jpg'
import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <div className="flex bg-black text-white">
      <div
        className="hidden md:flex flex-col justify-end w-1/2 bg-cover h-screen bg-center px-8 py-32"
        style={{ backgroundImage: `url(${Image})` }}
        
      >
        <h1 className="text-6xl uppercase font-bold">Feel the Music, </h1>
        <h1 className="text-6xl uppercase font-bold">Live the Moment.</h1>
      </div>
      <div className="flex  flex-col pt-14 gap-10 w-full md:w-1/2 h-screen justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold uppercase">Create an account</h1>
          <p className="text-base font-light text-slate-300">
            Get start with us, Please enter your details
          </p>
        </div>
        <form className=" px-10 md:px-20 flex flex-col gap-5">
            <div className="flex flex-col">
                <label htmlFor="" className="text-slate-300">Full name</label>
                <input type="text"  className="bg-transparent outline-none border-b py-2" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="" className="text-slate-300">Email</label>
                <input type="email"  className="bg-transparent outline-none border-b py-2" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="" className="text-slate-300">Password</label>
                <input type="password"  className="bg-transparent outline-none border-b py-2" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="" className="text-slate-300">Confirm password</label>
                <input type="password"  className="bg-transparent outline-none border-b py-2" />
            </div>
            
            <Button className="mt-10 text-sm font-normal bg-transparent border rounded-full px-12 py-6 hover:bg-white hover:text-black">
              REGISTER
            </Button>
            <div className="flex justify-center ">
                <p>Already have an account? <Link to='/login'><span className="border-b hover:text-yellow-300">Log In</span></Link></p>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Register