import React from 'react'
import FeatureCard from './FeatureCard'

const FeaturedProperties = () => {
  return (
    <div id='properties' className='py-16 sm:py-20 px-4 dark:bg-slate-950'>
     <div className='text-center flex flex-col space-y-4 sm:space-y-8 mb-12 sm:mb-25'>
        <p className='font-bold text-green-500'>OUR PROPERTIES</p>
        <h1 className='text-3xl sm:text-4xl font-medium dark:text-white'>Featured Properties</h1>
     </div>
       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 max-w-7xl mx-auto mb-10 sm:mb-20'>
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
       </div>
    </div>
  )
}

export default FeaturedProperties
