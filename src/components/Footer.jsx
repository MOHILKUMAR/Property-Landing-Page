import React from "react";

const Footer = () => {
  return (
    <div className="bg-primary-950 text-primary-100 px-6 py-16 sm:px-12 lg:px-20 lg:py-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 max-w-7xl mx-auto">
        <div className="">
          <h1 className="text-3xl font-bold hover:text-accent-400 transition-colors">MSr</h1>
          <p>Real Estate Agency</p>
          <p className="mt-6 lg:mt-10 hover:text-accent-400 transition-colors ">
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia.
          </p>
          <div></div>
        </div>
        <div className="lg:pl-8">
          <h1 className="text-xl font-bold hover:text-accent-400 transition-colors">Offers</h1>

          <p className="mt-2 hover:text-accent-400 transition-colors ">Properties</p>
          <p className="mt-2 hover:text-accent-400 transition-colors ">Agents</p>
          <p className="mt-2 hover:text-accent-400 transition-colors ">Locations</p>
          <p className="mt-2 hover:text-accent-400 transition-colors ">Clients Support</p>
        </div>
        <div className="lg:pl-8">
          <h1 className="text-xl font-bold hover:text-accent-400 transition-colors">Company</h1>
          <p className="mt-2 hover:text-accent-400 transition-colors ">Home</p>
          <p className="mt-2 hover:text-accent-400 transition-colors ">About</p>
          <p className="mt-2 hover:text-accent-400 transition-colors ">Blog</p>
          <p className="mt-2 hover:text-accent-400 transition-colors ">Contact Us</p>
        </div>
        <div className="lg:pl-8">
          <h1 className="text-xl font-bold hover:text-accent-400 transition-colors">
            Quick Links
          </h1>
          <p className="mt-2 hover:text-accent-400 transition-colors ">Terms & Conditions</p>
          <p className="mt-2 hover:text-accent-400 transition-colors ">User's Guide</p>
          <p className="mt-2 hover:text-accent-400 transition-colors ">Support Center</p>
          <p className="mt-2 hover:text-accent-400 transition-colors ">Press Info</p>
        </div>
        <div className="lg:pl-8">
          <h1 className="text-xl font-bold hover:text-accent-400 transition-colors">
            Have a Questions?
          </h1>
          <p className="mt-2 hover:text-accent-400 transition-colors ">
            {" "}
            203 Fake St. Mountain View, San Francisco, California, USA
          </p>
          <p className="mt-2 hover:text-accent-400 transition-colors "> +2 392 3929 210</p>
          <p className="mt-2 hover:text-accent-400 transition-colors break-words"> info@yourdomain.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
