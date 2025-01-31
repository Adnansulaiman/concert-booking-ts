import React from "react";
import BannerImage1 from "../../assets/images/hero-banner4.jpg";
import BannerImage2 from "../../assets/images/hero-banner2.jpg";
import BannerImage3 from "../../assets/images/hero-banner6.jpg";
import ChooseUs from "../../components/Hero/ChooseUs";
import { Button } from "../../components/ui/button";

const About = () => {
  return (
    <div className="flex flex-col">
      <div
        className="flex flex-col justify-between w-full h-[80vh] bg-cover bg-center text-white px-8 pb-10 pt-32"
        style={{ backgroundImage: `url(${BannerImage1})` }}
      >
        <div className="flex flex-col">
          <h1 className="text-5xl md:text-7xl font-bold">ABOUT OIF.</h1>
          <p className="text-base md:text-lg uppercase text-slate-300">
            Your Gateway to Unforgettable Concert Experiences
          </p>
        </div>
        <div className="flex justify-end">
          <p className="text-lg font-light max-w-xl">
            At OIF, we believe that live music has the power to bring people
            together and create lifelong memories. Our platform is designed to
            make it easy for you to discover, book, and enjoy the best concerts
            and events in your area.
          </p>
        </div>
      </div>
      <div className="flex gap-5 md:gap-10 justify-center items-center py-10  bg-black text-white">
        <div className="flex flex-col ">
          <h1 className="text-3xl md:text-5xl font-bold ">MISSION</h1>
          <h1 className="text-3xl md:text-5xl font-bold ">&VISION</h1>
        </div>
        <p className="text-sm md:text-lg font-light max-w-72 md:max-w-lg">
          Our mission is to connect music lovers with unforgettable live
          experiences. We envision a world where everyone has access to the
          magic of live music, no matter where they are.
        </p>
      </div>
      <div
        className="text-black text-center gap-5 flex flex-col  pt-10 px-5 md:justify-center md:items-center w-full h-96 bg-center bg-cover"
        style={{ backgroundImage: `url(${BannerImage2})` }}
      >
        <h1 className="text-4xl font-bold">OUR STORY</h1>
        <p className="text-base md:text-lg font-normal max-w-2xl">
          Founded in 2025, OIF was born out of a shared passion for live music.
          As concert-goers ourselves, we understand the challenges of finding
          and booking tickets. That’s why we created a platform that simplifies
          the process and puts the power of live events at your fingertips.
        </p>
      </div>
      <ChooseUs />
      <div
        className="flex flex-col justify-between w-full h-96 bg-center bg-cover px-8 py-10 text-white"
        style={{ backgroundImage: `url(${BannerImage3})` }}
      >
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold uppercase ">
            Ready to experience the magic of live music?
          </h1>
          <p className="text-lg uppercase text-slate-300 ">
            Browse our upcoming events and book your tickets now!
          </p>
        </div>
        <div className="flex justify-end md:px-20">
          <Button className="text-sm font-normal bg-transparent border rounded-full px-12 py-5 hover:bg-white hover:text-black">
            EXPLORE NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
