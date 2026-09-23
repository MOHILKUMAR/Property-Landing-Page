import React from "react";

const stats = [
  { value: "50", label: "Years of Experienced" },
  { value: "210K+", label: "Total Properties" },
  { value: "450", label: "Qualified Realtor" },
  { value: "100", label: "Total Branches" },
];

const About = () => {
  return (
    <div id="about" className="flex flex-col lg:flex-row gap-10 px-6 md:px-16 xl:px-40 bg-stone-100 dark:bg-stone-900 py-16 sm:py-24 lg:py-40">
      <div className="w-full lg:w-2/5 h-80 sm:h-[28rem] lg:h-auto shrink-0">
        <img
          src="https://totalenv.blob.core.windows.net/te-cms/Images/Mobile/1F365.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xl font-bold text-accent-700 dark:text-accent-400 mb-4"> About us</p>
        <h1 className="text-3xl sm:text-4xl mb-6 sm:mb-10 font-semibold tracking-tight text-primary-950 dark:text-white">Oakberry A Real Estate Company</h1>
        <p className="lg:w-[80%] text-stone-500 dark:text-stone-400 mb-10 text-lg sm:text-xl">
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts. Separated they
          live in Bookmarksgrove right at the coast of the Semantics, a large
          language ocean.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 sm:mb-20 text-stone-600 dark:text-stone-300">
          {stats.map((stat) => (
            <div key={stat.label}>
              <h1 className="text-3xl font-bold text-primary-700 dark:text-accent-400">{stat.value}</h1>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
         <div className="w-full h-64 sm:h-100">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfonizJ5Rg8RTelmSy1K7eZUSQHcDG054peQ&s" className="w-full h-full object-cover" alt=""
          />
         </div>
      </div>
    </div>
  );
};

export default About;
