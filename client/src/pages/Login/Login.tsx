import React, { useState,useEffect } from "react";
import Image from "../../assets/images/login1.jpg";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import SuccessAlert from "../../components/Alert/SuccessAlert";
import ButtonLoader from "../../components/ButtonLoader";

const Login = () => {
    const {login} = useAuth()
    const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
    const [loading,setLoading] = useState(false);
  const {
    values: formData,
    resetForm,
    handleChange,
  } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);
    try {
        // console.log(formData)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/auth/login`,
        formData
      );
      setSuccessMessage(response?.data?.message);
      login(response.data.token)
      // Reset form after successful registration
      resetForm();
      setTimeout(()=>{
          navigate('/')
      },1000)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error?.response?.data?.message || "An error occurred during login"
        );
      }
      console.error("Logout error:", error);
    } finally{
        setLoading(false);
    }
  };
  // ✅ Auto-hide success message after 1 second
    useEffect(() => {
      if (successMessage) {
        const timer = setTimeout(() => {
          setSuccessMessage("");
        }, 1000); // 1 second
  
        return () => clearTimeout(timer); // Cleanup timer on unmount
      }
    }, [successMessage]);
  
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
        <form onSubmit={handleSubmit} className="px-10 md:px-20 flex flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="" className="text-slate-300">
              Email
            </label>
            <input
              type="email"
              className="bg-transparent outline-none border-b py-2"
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-slate-300">
              Password
            </label>
            <input
              type="password"
              className="bg-transparent outline-none border-b py-2"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <p className="hover:underline">Forget password?</p>
          </div>
          {errorMessage && (
            <div className="flex">
              <p className="text-red-500">{errorMessage}</p>
            </div>
          )}
          <Button type='submit' className="mt-10 text-sm font-normal bg-transparent border rounded-full px-12 py-6 hover:bg-white hover:text-black">
           {loading ? <ButtonLoader /> : 'LOGIN'} 
          </Button>
          <div className="flex justify-center ">
            <p>
              Don't have an account?{" "}
              <Link to="/register">
                <span className="border-b hover:text-yellow-300">Sign up</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
      {successMessage && <SuccessAlert message={successMessage} />}
    </div>
  );
};

export default Login;
