import React from "react";
import logo_call from "../assets/phone-fill.svg";
import logo_location from "../assets/map-pin-2-fill.svg";
import logo_contact_Us from "../assets/contacts-book-2-fill.svg";

const Banner = () => {
  return (
    <div className="bg-[#06112a] text-white flex justify-around w-full p-4">
      <div className="flex flex-row items-center">
        <div>
          {" "}
          <img src={logo_call} alt="logo_call" className="h-6 w-6 mr-3"  />{" "}
        </div>
        <div>
          <p>
            <span className="text-green-600">Free Call </span>+91-8077108275
          </p>
          <p className="text-gray-600">Call Us Now 24/7 Customer Support</p>
        </div>
      </div>

      <div className="flex flex-row items-center">
        <div>
          <img src={logo_location} alt="logo_location" className="h-6 w-6 mr-3" />
        </div>
        <div>
          <p>
            <span className="text-green-600">Our </span>
              Location
          </p>
          <p className="text-gray-600">Suite 721 New York NY 10016</p>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div>
          <img src={logo_contact_Us} alt="logo_contacts" className="h-6 w-6 mr-3" />
        </div>
        <div>
          <p>
            <span className="text-green-600">Connect</span> with us
          </p>
          <p className="text-gray-600">Facebook Twitter Dribbble</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
