import React from "react";
import { HOME_IMG_URL } from "../utils/constants";
import CtaButton from "./CtaButton";

const Home = () => {
  return (
    <section id="home" className="relative w-full min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
      <img src={HOME_IMG_URL} className="absolute inset-0 w-full h-full object-cover" alt="" />
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      <div className="relative z-1 flex flex-col items-center w-full px-4 py-16 text-white" >
        <h1 className="text-3xl sm:text-5xl lg:text-6xl text-center my-6 sm:my-10 font-bold font-mono">Your Property Is Our Priority</h1>
        <p className="text-base sm:text-xl text-center font-mono max-w-2xl my-4 sm:my-10 mb-10 sm:mb-20">
          A small river named Duden flows by their place and supplies it with
          the necessary regelialia. It is a paradisematic country, in which
          roasted parts of sentences fly into your mouth.
        </p>
        <CtaButton value={" LEARN MORE "} href="#about" />
      </div>
    </section>
  );
};

export default Home;
