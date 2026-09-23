import React, { useState } from 'react'
import CtaButton from "./CtaButton"
import ThemeToggle from "./ThemeToggle"

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "PROPERTIES", href: "#properties" },
  { label: "AGENTS", href: "#" },
  { label: "BLOG", href: "#" },
  { label: "CONTACTS", href: "#contact" },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className='sticky top-0 z-50 w-full bg-gray-700/90 dark:bg-[#06112a]/90 backdrop-blur shadow-2xl'>
      <div className='flex justify-between lg:justify-around items-center py-2 px-4 sm:px-6'>
        <a href="#home" className='lg:mr-20'>
            <h1 className='text-2xl font-bold font-mono text-red-700'><span className='text-2xl text-green-600'>MS</span>r</h1>
             <h3 className='font-mono text-white ' >Real Estates</h3>
        </a>

        <ul className='hidden lg:flex space-x-4 xl:space-x-8 font-bold font-mono text-lg text-white'>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className='px-2 hover:text-green-500'>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className='flex items-center gap-1 lg:gap-3'>
          <ThemeToggle />
          <div className='hidden lg:block'>
            <CtaButton value = {"Contact-Us"} href="#contact" />
          </div>
          <button
            type='button'
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls='mobile-menu'
            className='lg:hidden p-2 rounded-lg text-white hover:bg-white/10 cursor-pointer'
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id='mobile-menu' className='lg:hidden border-t border-white/10 px-4 sm:px-6 pb-4'>
          <ul className='flex flex-col font-bold font-mono text-lg text-white'>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={closeMenu} className='block py-3 hover:text-green-500'>{link.label}</a>
              </li>
            ))}
          </ul>
          <div className='pt-2'>
            <CtaButton value = {"Contact-Us"} href="#contact" onClick={closeMenu} />
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
