import React from 'react'
import CtaButton from "./CtaButton"

const Navbar = () => {
  return (
    <div className='flex justify-around items-center py-2 absolute shadow-2xl bg-gray-700 opacity-75 z-1 w-full'>
        <div className=' mr-20'>
            <h1 className='text-2xl font-bold font-mono text-red-700'><span className='text-2xl text-green-600'>MS</span>r</h1>
             <h3 className='font-mono text-white ' >Real Estates</h3>
        </div>
       
        <div>
          <ul className='flex space-x-8 font-bold font-mono text-lg text-white cursor-pointer'>
           <li className='px-2 hover:text-green-500 '>HOME</li>
           <li className='px-2 hover:text-green-500 ' >ABOUT</li>
           <li className='px-2 hover:text-green-500 ' >PROPERTIES</li>
           <li className='px-2 hover:text-green-500 ' >AGENTS</li>
           <li className='px-2 hover:text-green-500 ' >BLOG</li>
           <li className='px-2 hover:text-green-500 ' >CONTACTS</li>
          </ul>            
        </div>

        <div>
            <CtaButton value = {"Contact-Us"} />
        </div>

    </div>
  )
}

export default Navbar