import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import Image from "../../assets/images/hero-banner8.jpg";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import axios from "axios";
import SuccessAlert from "../../components/Alert/SuccessAlert";
import { useAuth } from "../../context/AuthContext";
import ButtonLoader from "../../components/ButtonLoader";

const Register = () => {
    const {login} = useAuth()
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
  const {
    values: formData,
    resetForm,
    handleChange,
  } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role:'user'
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('')
    // console.log("Data is :", formData);
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Password is not match");
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/auth/register`,
        formData
      );

      login(response.data.token,response.data.role)
      
      // Show success message
      setSuccessMessage(response.data.message);
      console.log("User registered:", response.data);

      // Reset form after successful registration
      resetForm();
      setTimeout(()=>{
          navigate('/')
      },1000)
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error?.response?.data?.message || "An error occurred during signup"
        );
      }
      console.error("Signup error:", error);
    } finally {
        setLoading(false)
    }
    // resetForm()
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
        <form
          onSubmit={handleSubmit}
          className=" px-10 md:px-20 flex flex-col gap-5"
        >
          <div className="flex flex-col">
            <label htmlFor="" className="text-slate-300">
              Full name
            </label>
            <input
              type="text"
              className="bg-transparent outline-none border-b py-2"
              value={formData.name}
              name="name"
              onChange={handleChange}
            />
          </div>
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
          <div className="flex flex-col">
            <label htmlFor="" className="text-slate-300">
              Confirm password
            </label>
            <input
              type="password"
              className="bg-transparent outline-none border-b py-2"
              value={formData.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
          </div>
          {errorMessage && (
            <div className="flex">
              <p className="text-red-500">{errorMessage}</p>
            </div>
          )}

          <Button
            type="submit"
            className="mt-10 text-sm font-normal bg-transparent border rounded-full px-12 py-6 hover:bg-white hover:text-black"
          >
            {loading ? <ButtonLoader /> : 'REGISTER'} 
          </Button>
          <div className="flex justify-center ">
            <p>
              Already have an account?{" "}
              <Link to="/login">
                <span className="border-b hover:text-yellow-300">Log In</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
      {successMessage && <SuccessAlert message={successMessage} />}
    </div>
  );
};

export default Register;
