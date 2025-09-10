import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#06112a] flex justify-around py-40 text-white p-20 ">
      <div className="grid grid-cols-5 gap-2">
        <div className="">
          <h1 className="text-3xl font-bold hover:text-green-500">MSr</h1>
          <p>Real Estate Agency</p>
          <p className="mt-10 hover:text-green-500 ">
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia.
          </p>
          <div></div>
        </div>
        <div className="pl-20">
          <h1 className="text-xl font-bold hover:text-green-500">Offers</h1>

          <p className="mt-2 hover:text-green-500 ">Properties</p>
          <p className="mt-2 hover:text-green-500 ">Agents</p>
          <p className="mt-2 hover:text-green-500 ">Locations</p>
          <p className="mt-2 hover:text-green-500 ">Clients Support</p>
        </div>
        <div className="pl-20">
          <h1 className="text-xl font-bold hover:text-green-500">Company</h1>
          <p className="mt-2 hover:text-green-500 ">Home</p>
          <p className="mt-2 hover:text-green-500 ">About</p>
          <p className="mt-2 hover:text-green-500 ">Blog</p>
          <p className="mt-2 hover:text-green-500 ">Contact Us</p>
        </div>
        <div className="pl-20">
          <h1 className="text-xl font-bold hover:text-green-500">
            Quick Links
          </h1>
          <p className="mt-2 hover:text-green-500 ">Terms & Conditions</p>
          <p className="mt-2 hover:text-green-500 ">User's Guide</p>
          <p className="mt-2 hover:text-green-500 ">Support Center</p>
          <p className="mt-2 hover:text-green-500 ">Press Info</p>
        </div>
        <div className="pl-20">
          <h1 className="text-xl font-bold hover:text-green-500">
            Have a Questions?
          </h1>
          <p className="mt-2 hover:text-green-500 ">
            {" "}
            203 Fake St. Mountain View, San Francisco, California, USA
          </p>
          <p className="mt-2 hover:text-green-500 "> +2 392 3929 210</p>
          <p className="mt-2 hover:text-green-500 "> info@yourdomain.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
