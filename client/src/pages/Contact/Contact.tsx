import React from "react";
import BannerImage from "../../assets/images/hero-banner9.jpg";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "../../components/ui/button";

const Contact = () => {
  return (
    <div className="flex flex-col">
      <div
        className="flex flex-col w-full text-white justify-center  px-8 h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${BannerImage})` }}
      >
        <h1 className="text-5xl md:text-7xl font-bold uppercase">Get in Touch</h1>
        <p className="text-lg md:text-2xl text-slate-200">
          Have a question, need support, or want to share feedback?{" "}
        </p>
      </div>
      <div className="flex md:flex-row flex-col bg-black py-10 px-10 text-white">
        <div className="flex flex-col  md:w-1/2 gap-10 py-10  ">
          <div className="flex flex-col max-w-2xl gap-4">
            <h1 className="text-5xl md:text-7xl font-light ">
              We are always ready to help you and answer your questions
            </h1>
            <p className=" text-base md:text-lg font-light">
              We’re here to assist you! Reach out to us using the form below or
              through any of the contact methods listed. We’ll get back to you
              as soon as possible
            </p>
          </div>
          <div className="flex ">
            <div className="flex flex-col w-full md:w-1/2 gap-2 ">
              <h1 className="text-xl ">Call Center</h1>
              <div className="flex flex-col">
                <p className="text-sm">+1 (123) 456-7890</p>
              </div>
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-2">
              <h1 className="text-xl ">Our Location</h1>
              <div className="flex flex-col">
                <p className="text-sm">123 Concert Lane,</p>
                <p className="text-sm">Music City, USA</p>
              </div>
            </div>
          </div>
          <div className="flex ">
            <div className="flex flex-col w-full md:w-1/2 gap-2 ">
              <h1 className="text-xl ">Email</h1>
              <div className="flex flex-col">
                <p className="text-sm"> support@oif.com</p>
              </div>
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-">
              <h1 className="text-xl ">Social Network</h1>
              <div className="flex gap-3">
                <FaFacebookF className="text-3xl hover:bg-white rounded-full hover:text-black p-2" />
                <FaInstagram className="text-3xl hover:bg-white rounded-full hover:text-black p-2" />
                <FaXTwitter className="text-3xl hover:bg-white rounded-full hover:text-black p-2" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-[#0b0b0b] w-full md:w-1/2 py-8 px-10">
          <div className="flex flex-col ">
            <h1 className="text-3xl font-bold ">Get in Touch</h1>
            <p className="teext-base md:text-xl font-light ">
              Have a question, need support, or want to share feedback?
            </p>
          </div>
          <form className="pt-10 flex flex-col gap-6">
            <div className="flex flex-col">
              <label htmlFor="" className="text-slate-300">
                Full name
              </label>
              <input
                type="text"
                className="bg-transparent border-b py-1 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-slate-300">
                Email
              </label>
              <input
                type="email"
                className="bg-transparent border-b py-1 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-slate-300">
                Subject
              </label>
              <input
                type="text"
                className="bg-transparent border-b py-1 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-slate-300">
                Message
              </label>
              <textarea
                name=""
                id=""
                rows={3}
                className="bg-transparent border-b py-1 outline-none"
              ></textarea>
            </div>
            <Button className="mt-5 text-sm font-normal bg-transparent border rounded-full px-12 py-6 hover:bg-white hover:text-black">
              SEND MESSAGE
            </Button>
          </form>
        </div>
      </div>
      <div className="flex px-8 py-10 bg-black">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34794.91567426489!2d-74.2034819161666!3d40.810411784712656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25523a11fc58b%3A0x431181ab387b6e80!2sAvalon%20Bloomfield%20Station!5e0!3m2!1sen!2sin!4v1738320550948!5m2!1sen!2sin"
        //   width="600"
        //   height="450"
            className="w-full h-52 md:h-96 "
          style={{border:'0'}}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
