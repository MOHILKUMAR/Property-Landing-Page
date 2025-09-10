import React from "react";
import { HOME_IMG_URL } from "../utils/constants";
import Navbar from "./Navbar";
import CtaButton from "./CtaButton";

const Home = () => {
  return (
    <div className="relative w-full">
      <Navbar />
      <div className="absolute z-1 mt-60  flex flex-col items-center w-full text-white" >
        <h1 className="text-6xl my-10 font-bold font-mono">Your Property Is Our Priority</h1>
        <p className="text-xl text-center font-mono w-[50%] my-10 mb-20">
          A small river named Duden flows by their place and supplies it with
          the necessary regelialia. It is a paradisematic country, in which
          roasted parts of sentences fly into your mouth.
        </p>
        <CtaButton value={" LERAN MORE "} />
      </div>
      <img src={HOME_IMG_URL} className="w-full" alt="" />
    </div>
  );
};

export default Home;
