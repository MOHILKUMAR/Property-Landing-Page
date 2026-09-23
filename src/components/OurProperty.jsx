import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useSlidesToShow from "../hooks/useSlidesToShow";

const OurProperty = () => {
 const slidesToShow = useSlidesToShow();
 var settings = {
    dots: false,
    infinite: true,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    arrows: slidesToShow > 1,
  };

  return (
    <div className="pt-16 sm:pt-20 w-full flex justify-center items-center flex-col bg-primary-900">
        <h1 className="text-center text-xl font-bold text-accent-400" >Our Property</h1>
        <p className="text-center w-11/12 sm:w-3/4 mt-6 sm:mt-10 text-primary-100 font-light text-lg sm:text-2xl">Discover modern, luxurious, and affordable properties tailored to your lifestyle. From cozy apartments to spacious villas, we bring you the best choices in prime locations.</p>

 <div className="w-11/12 sm:w-3/4 mb-20 sm:mb-40 mt-12 sm:mt-20">
    <Slider {...settings}>
     {datas.map((data) => (
        <div
          key={data.id}
          className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700 cursor-pointer bg-white text-stone-900 dark:bg-stone-800 dark:text-stone-100 transition-colors"
        >
          <div className="w-full">
            <img src={data.image} alt="" className="h-50 w-full object-cover rounded" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold">{data.title}</p>
            <p className="text-stone-500 dark:text-stone-400">{data.location}</p>
            <p className="font-bold text-primary-700 dark:text-accent-400">{data.price}</p>
          </div>
        </div>
      ))}
</Slider>

 </div>
     
    </div>
  );
};

const datas = [
  {
    id: 1,
    title: "Modern Family House",
    location: "New York, USA",
    price: "$500,000",
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Luxury Villa",
    location: "Los Angeles, USA",
    price: "$1,200,000",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Cozy Cottage",
    location: "Chicago, USA",
    price: "$350,000",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Beachfront House",
    location: "Miami, USA",
    price: "$900,000",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
  },
];

export default OurProperty;
