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
    <div className="bg-stone-100 dark:bg-stone-900 px-4">
      <div className="text-center pt-16 sm:pt-20">
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-primary-950 dark:text-white">Explore Our Categories & Places</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto py-12 sm:py-20">
        {categories.map((category) => (
          <div
            key={category.label}
            className="group aspect-square rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 dark:bg-stone-800 dark:ring-stone-700 flex items-center justify-center flex-col gap-2 hover:bg-accent-400 hover:ring-accent-400 dark:hover:bg-accent-500 dark:hover:ring-accent-500 transition-colors"
          >
            <img src={category.icon} alt="" className="w-10 h-10 dark:invert dark:group-hover:invert-0" />
            <p className="font-medium tracking-wide text-stone-900 dark:text-white dark:group-hover:text-stone-950">{category.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 pb-16 sm:pb-20 max-w-5xl mx-auto">
        {propertiesArray.map((data, index) => (
          <div key={index}className="flex flex-col items-center text-center" >
            {" "}
            <h1 className="text-xl sm:text-2xl font-light mb-2 text-primary-950 dark:text-white">{data.city}</h1>
            <p className="px-3 py-1.5 mb-8 sm:mb-10 text-sm sm:text-base font-medium rounded-full bg-white ring-1 ring-stone-200 text-primary-800 dark:bg-stone-800 dark:ring-stone-700 dark:text-stone-200 hover:bg-primary-700 hover:text-white hover:ring-primary-700 dark:hover:bg-primary-600 dark:hover:ring-primary-600 transition-colors">{data.property} Properties</p>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
