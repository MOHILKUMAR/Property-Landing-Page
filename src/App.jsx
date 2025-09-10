import React from 'react'
import Banner from './components/Banner'
import Home from './components/Home'
import Categories from './components/Categories'
import FeaturedProperties from './components/FeaturedProperties'
import About from './components/About'
import GetInTouch from './components/GetInTouch'
import Testinomial from './components/Testinomial'

const App = () => {
  return (
    <div >
      <Banner/>
      <Home />
      <Categories />
      <FeaturedProperties />
      <About />
      <GetInTouch />
      <Testinomial />
    </div>
  )
}

export default App