import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useSlidesToShow from "../hooks/useSlidesToShow";

const Testinomial = () => {
  const slidesToShow = useSlidesToShow();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: slidesToShow > 1,
  };

  return (
    <div id="testimonials" className="bg-[#06112a] py-16 sm:py-30">
        <h1 className="text-xl font-bold  text-center my-5 text-green-500">Testimonial</h1>
        <h1 className="text-center mb-8 text-3xl sm:text-4xl text-white">Clients We Help</h1>
      <div className="w-11/12 sm:w-3/4 m-auto">


        <div className="">
            <Slider {...settings}>
          {data.map((d) => (
            <div key={d.name} className="bg-white dark:bg-slate-800 min-h-[450px] text-black dark:text-slate-100 rounded-xl ">
              <div className="rounded-t-xl h-56 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 flex justify-center items-center">
                {" "}
                <img src={d.img} alt="" className="h-44 w-44 rounded-full object-cover" />
              </div>
              <div className="flex flex-col justify-center items-center text-center gap-4 p-4">
                {" "}
                <p className="text-xl font-semibold">{d.name}</p>
                <p>{d.review}</p>
                <button className="bg-indigo-500 text-white text-lg p-2 rounded-lg">Read More</button>
              </div>

            </div>
          ))}

          </Slider>
        </div>
      </div>
    </div>
  );
};

const data = [
  {
    name: `John Morgan`,
    img: `/students/Ellie_Anderson.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
  {
    name: `Ellie Anderson`,
    img: `/students/Ellie_Anderson.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
  {
    name: `Nia Adebayo`,
    img: `/students/Ellie_Anderson.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
  {
    name: `Rigo Louie`,
    img: `/students/Ellie_Anderson.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
  {
    name: `Mia Williams`,
    img: `/students/Ellie_Anderson.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
];

export default Testinomial;
