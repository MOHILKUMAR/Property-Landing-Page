import React from "react";
import home from "../assets/home.svg";
import land from "../assets/land.svg";
import building from "../assets/building.svg";
import govt from "../assets/govt.svg";
import { propertiesArray } from "../utils/mockData";

const categories = [
  { label: "HOME", icon: home },
  { label: "LAND", icon: land },
  { label: "BUILDING", icon: building },
  { label: "COMMUNITY", icon: govt },
];

const Categories = () => {
  return (
    <div className="bg-neutral-100 dark:bg-slate-900 px-4">
      <div className="text-center pt-16 sm:pt-20">
        <h1 className="text-2xl sm:text-4xl font-mono dark:text-white">Explore Our Categories & Places</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto py-12 sm:py-20">
        {categories.map((category) => (
          <div
            key={category.label}
            className="aspect-square rounded-lg bg-gray-200 dark:bg-slate-800 flex items-center justify-center flex-col gap-2 hover:bg-green-400 dark:hover:bg-green-600 transition-colors"
          >
            <img src={category.icon} alt="" className="w-10 h-10 dark:invert" />
            <p className="text-black dark:text-white font-mono">{category.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 pb-16 sm:pb-20 max-w-5xl mx-auto">
        {propertiesArray.map((data, index) => (
          <div key={index}className="flex flex-col items-center text-center" >
            {" "}
            <h1 className="text-xl sm:text-2xl font-extralight font-sans mb-2 dark:text-white">{data.city}</h1>
            <p className="px-3 py-1.5 mb-8 sm:mb-10 text-sm sm:text-base font-medium rounded-lg bg-gray-200 dark:bg-slate-800 dark:text-slate-200 hover:bg-green-400 dark:hover:bg-green-600 hover:text-white ">{data.property} Properties</p>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
