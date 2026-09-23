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
    <div id="testimonials" className="bg-primary-950 py-16 sm:py-30">
        <h1 className="text-xl font-bold  text-center my-5 text-accent-400">Testimonial</h1>
        <h1 className="text-center mb-8 text-3xl sm:text-4xl font-semibold tracking-tight text-white">Clients We Help</h1>
      <div className="w-11/12 sm:w-3/4 m-auto">


        <div className="">
            <Slider {...settings}>
          {data.map((d) => (
            <div key={d.name} className="bg-white dark:bg-stone-900 min-h-[450px] text-stone-900 dark:text-stone-100 rounded-2xl">
              <div className="rounded-t-2xl h-56 bg-linear-to-br from-primary-500 via-primary-700 to-primary-900 flex justify-center items-center">
                {" "}
                <img src={d.img} alt="" className="h-44 w-44 rounded-full object-cover ring-4 ring-accent-400" />
              </div>
              <div className="flex flex-col justify-center items-center text-center gap-4 p-4">
                {" "}
                <p className="text-xl font-semibold">{d.name}</p>
                <p className="text-stone-600 dark:text-stone-300">{d.review}</p>
                <button className="bg-accent-500 hover:bg-accent-400 text-primary-950 font-semibold text-lg py-2 px-4 rounded-lg transition-colors">Read More</button>
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
