import React, { useState } from "react";
import home from "../assets/home.svg";
import land from "../assets/land.svg";
import building from "../assets/building.svg";
import govt from "../assets/govt.svg";
import { propertiesArray } from "../utils/mockData";

const Categories = () => {
  return (
    <div className="bg-neutral-100">
      <div className="text-center pt-20">
        <h1 className="text-4xl font-mono">Explore Our Categories & Places</h1>
      </div>
      <div className=" flex justify-center space-x-6 py-20 ">
        <div className="w-50 h-50 rounded-lg bg-gray-200 flex items-center justify-center flex-col hover:bg-green-400">
          <img src={home} alt="" className="w-10 h-10" />
          <p className="text-black font-mono">HOME</p>
        </div>
        <div className="w-50 h-50  hover:bg-green-400 rounded-lg bg-gray-200 flex items-center justify-center flex-col">
          <img src={land} alt="" className="w-10 h-10" />
          <p className="text-black font-mono">LAND</p>
        </div>
        <div className="w-50 h-50  hover:bg-green-400 rounded-lg bg-gray-200 flex items-center justify-center flex-col">
          <img src={building} alt="" className="w-10 h-10" />
          <p className="text-black font-mono">BUILDING</p>
        </div>
        <div className="w-50 h-50  hover:bg-green-400 rounded-lg bg-gray-200 flex items-center justify-center flex-col">
          <img src={govt} alt="" className="w-10 h-10" />
          <p className="text-black font-mono">COMMUNITY</p>
        </div>
      </div>
      <div className="grid grid-cols-3 pb-20  ">
        {propertiesArray.map((data, index) => (
          <div key={index}className="flex flex-col items-center text-center" >
            {" "}
            <h1 className="text-2xl font-extralight font-sans text-shadow-white mb-2 shadow-2xs">{data.city}</h1>
            <p className=" w-30 p-1.9 mb-10 font-medium rounded-lg bg-gray-200 hover:bg-green-400 hover:text-white ">{data.property} Properties</p>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
