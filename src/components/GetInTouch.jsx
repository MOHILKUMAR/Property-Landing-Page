import React from "react";

const GetInTouch = () => {
  return (
    <div className="bg-[#5a9b21] py-20 px-40 flex justify-center space-x-20   items-center">
      <div>
        <h1 className="text-4xl mb-4">Find Best Place For</h1>
        <h1 className="text-4xl mb-4">Leaving</h1>
        <p className="text-xl mt-5">Find Best Place For Leaving</p>
      </div>

      <div
        className="bg-black text-xl text-white shadow-2xl p-6 rounded-2xl cursor-pointer transition-transform duration-500 ease-in-out  hover:scale-105 hover:bg-gray-600"
      >
        <button>GET IN TOUCH</button>
      </div>
    </div>
  );
};

export default GetInTouch;
