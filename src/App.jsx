import React from "react";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Categories from "./components/Categories";
import FeaturedProperties from "./components/FeaturedProperties";
import About from "./components/About";
import GetInTouch from "./components/GetInTouch";
import Testinomial from "./components/Testinomial";
import OurProperty from "./components/OurProperty";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import SubFooter from "./components/SubFooter";

const App = () => {
  return (
    <div className="bg-white text-gray-900 dark:bg-slate-950 dark:text-slate-100 overflow-x-clip">
      <Banner />
      <Navbar />
      <Home />
      <Categories />
      <Testinomial />
      <FeaturedProperties />
      <GetInTouch />
      <OurProperty />
       <About />
      <ContactForm />
      <Footer/>
      <SubFooter />
    </div>
  );
};

export default App;
