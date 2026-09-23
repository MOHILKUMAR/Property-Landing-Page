import React from "react";

const GetInTouch = () => {
  return (
    <div className="bg-[#5a9b21] dark:bg-[#3d6b16] dark:text-white py-16 sm:py-20 px-6 md:px-16 lg:px-40 flex flex-col md:flex-row justify-center gap-8 md:gap-20 items-center text-center md:text-left">
      <div>
        <h1 className="text-3xl sm:text-4xl mb-4">Find Best Place For</h1>
        <h1 className="text-3xl sm:text-4xl mb-4">Living</h1>
        <p className="text-lg sm:text-xl mt-5">Find Best Place For Living</p>
      </div>

      <a
        href="#contact"
        className="bg-black text-lg sm:text-xl text-white shadow-2xl p-5 sm:p-6 rounded-2xl cursor-pointer transition-transform duration-500 ease-in-out  hover:scale-105 hover:bg-gray-600"
      >
        GET IN TOUCH
      </a>
    </div>
  );
};

export default GetInTouch;
