import React from 'react'
import Banner from './components/Banner'
import Home from './components/Home'
import Categories from './components/Categories'
import FeaturedProperties from './components/FeaturedProperties'

const App = () => {
  return (
    <div >
      <Banner/>
      <Home />
      <Categories />
      <FeaturedProperties />
    </div>
  )
}

export default App