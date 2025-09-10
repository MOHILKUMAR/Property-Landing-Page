import React from "react";

const About = () => {
  return (
    <div className="flex px-40 space-x-4   bg-neutral-100 py-40">
      <div className="h-197 w-150">
        <img
          src="https://totalenv.blob.core.windows.net/te-cms/Images/Mobile/1F365.jpg"
          alt=""
          className="w-full h-full"
        />
      </div>
      <div className="ml-4">
        <p className="text-xl font-bold text-green-500 mb-4"> About us</p>
        <h1 className="text-4xl mb-10">Oakberry A Real Estate Company</h1>
        <p className=" w-[80%] text-gray-400 mb-10 text-xl">
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts. Separated they
          live in Bookmarksgrove right at the coast of the Semantics, a large
          language ocean.
        </p>
        <div className="flex justify-between  mb-20 ">
          <div> <h1 className="text-2xl">50</h1>
          <p>Years of Experienced</p></div>
           <div><h1 className="text-2xl">210K+</h1>
          <p>Total Properties</p></div>
           <div><h1 className="text-2xl">450</h1>
          <p>Qualified Realtor</p></div>
          <div> <h1 className="text-2xl">100</h1>
          <p>Total Branches</p></div>
       

        </div >
         <div className="w-210 h-100">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfonizJ5Rg8RTelmSy1K7eZUSQHcDG054peQ&s" className="w-full h-full" alt=""
          />
         </div>
      </div>
    </div>
  );
};

export default About;
