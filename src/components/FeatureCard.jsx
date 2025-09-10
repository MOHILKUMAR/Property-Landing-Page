import React from "react";
import { CARD_IMG_URL } from "../utils/constants";
import CtaButton from "./CtaButton";

const FeatureCard = () => {
  return (
    <div className=" overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition hover:bg-gray-200">
      <div className="relative overflow-hidden group ">
        <img
          src={CARD_IMG_URL}
          alt=""
          width={250}
          className="h-56 rounded-2xl w-full transform transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute bottom-3 left-3 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
          $300,000
        </span>
      </div>

      <div className="py-4 p-2 flex">
        <img
          className="w-10 h-10 rounded-full"
          src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"
          alt=""
        />
        <p className="mr-4 p-2 text-gray-500">JHON DOE</p>
        <p className="p-2 text-gray-600 flex flex-row">2 weeks ago</p>
      </div>

      <h1 className=" text-xl p-2 ">Sunny Loft Property</h1>

      <div className="my-2 flex justify-between pb-10 p-2">
        <div className="flex justify-center items-center">
          <img
            src="data:image/png;base64,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"
            alt=""
            className="w-4 h-4 m-1 "
          />
          <p className="text-gray-500">New York</p>
        </div>
        <button className="cursor-pointer bg-red-500 text-white p-1">
          Rent
        </button>
      </div>
    </div>
  );
};

export default FeatureCard;
