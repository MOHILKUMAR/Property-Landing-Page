import React from "react";

const GetInTouch = () => {
  return (
    <div className="bg-accent-400 text-primary-950 dark:bg-accent-500 py-16 sm:py-20 px-6 md:px-16 lg:px-40 flex flex-col md:flex-row justify-center gap-8 md:gap-20 items-center text-center md:text-left">
      <div>
        <h1 className="text-3xl sm:text-4xl mb-4 font-semibold tracking-tight">Find Best Place For</h1>
        <h1 className="text-3xl sm:text-4xl mb-4 font-semibold tracking-tight">Living</h1>
        <p className="text-lg sm:text-xl mt-5">Find Best Place For Living</p>
      </div>

      <a
        href="#contact"
        className="bg-primary-950 text-lg sm:text-xl font-semibold text-white shadow-2xl p-5 sm:p-6 rounded-2xl cursor-pointer transition duration-500 ease-in-out hover:scale-105 hover:bg-primary-800"
      >
        GET IN TOUCH
      </a>
    </div>
  );
};

export default GetInTouch;
