import React from "react";
import Image from "../../assets/images/upcoming1.jpg";
const Category = () => {
  return (
    <div className="flex flex-col  text-white w-scree bg-black px-8 py-10 ">
      <div className="flex items-center justify-between border-b mb-8">
        <h1 className="text-2xl font-bold  pb-2  uppercase">Category</h1>
        {/* <p className="text-lg">View all</p> */}
      </div>
      <div className="flex px- gap-2 md:gap-10 justify-center">
        <div
          className="flex bg-cover bg-center w-96 h-96 hover:scale-105 "
          style={{ backgroundImage: `url(${Image})` }}
        >
          <h1 className="text-xl md:text-3xl uppercase font-medium text-center w-full py-4">
            Music
          </h1>
        </div>
        <div
          className="flex bg-cover bg-center w-96 h-96  hover:scale-105  "
          style={{ backgroundImage: `url(${Image})` }}
        >
          <h1 className="text-xl md:text-3xl uppercase font-semibold text-center w-full py-4">
            Dance
          </h1>
        </div>
        <div
          className="flex  bg-cover  bg-center w-96 h-96  hover:scale-105 "
          style={{ backgroundImage: `url(${Image})` }}
        >
          <h1 className="text-xl md:text-3xl uppercase font-semibold text-center w-full py-4">
            Festival
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Category;
