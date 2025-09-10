import React from 'react'
import FeatureCard from './FeatureCard'

const FeaturedProperties = () => {
  return (
    <div className='py-20'>
     <div className='text-center flex flex-col space-y-8 mb-25'>
        <p className='font-bold text-green-500'>OUR PROPERTIES</p>
        <h1 className='text-4xl font-medium'>Featured Properties</h1>
     </div>
       <div className='flex space-x-14 justify-center items-center mb-20'>
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
       </div>
    </div>
  )
}

export default FeaturedProperties