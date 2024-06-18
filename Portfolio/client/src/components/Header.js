import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggler from '../components/ThemeToggler.js';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const closeMenu = () => {
    setMenuOpen(false);
  }

  return (
    <>
      <nav className='w-full h-auto max-w-[1536px] bg-indigo-200 dark:bg-black dark:text-white md:flex md:items-center md:justify-between px-4 md:flex-wraps space-x-4 space-y-4 md:space-x-0 md:space-y-0 py-4 md:py-0 fixed z-50 roboto-regular'>
        <div className='text-indigo-700 md:text-2xl text-lg font-bold dark:text-white'>
          <NavLink to="/" onClick={closeMenu}>DM Portfolio</NavLink>
        </div>

        {/* Hamburger Icon or Close Icon */}
        <div className="text-2xl font-bold cursor-pointer md:hidden absolute top-1 right-4" onClick={toggleMenu}>
          {menuOpen ? <AiOutlineClose className='text-2xl' size={25}/> : <GiHamburgerMenu className='text-2xl' size={25}/>}
        </div>
       
        <div id='nav-menu' className={`${menuOpen ? 'block' : 'hidden'} md:flex md:items-center gap-7 flex-wrap pb-2 md:pb-0 relative`}>
          <ul className='md:flex font-semibold gap-7 space-y-4 md:space-y-0 lg:mt-0 text-lg flex-wrap mb-4 md:mb-0'>
            <li className='hover:text-indigo-700 cursor-pointer dark:hover:text-red-500'>
              <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            </li>
            <li className='hover:text-indigo-700 cursor-pointer dark:hover:text-red-500'>
              <NavLink to="/about" onClick={closeMenu}>About</NavLink>
            </li>
            <li className='hover:text-indigo-700 cursor-pointer dark:hover:text-red-500'>
              <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
            </li>
          </ul>

          <hr className="md:hidden border-t-2 border-gray-500 rounded-full" />

          <div className='my-2 flex items-center justify-between' tabIndex="0">
            <div className='md:hidden font-semibold text-lg mb-3 hover:text-indigo-700 cursor-default dark:hover:text-red-500'>Theme Switcher</div>
              <ThemeToggler />
          </div>
          <NavLink to="/contact" className='px-2 py-2 bg-indigo-700 dark:bg-white dark:text-black text-white rounded-lg my-2 capitalize cursor-pointer hover:bg-indigo-900 dark:hover:bg-red-500 dark:hover:text-white font-semibold text-center' onClick={closeMenu}>
            Hire Me
          </NavLink> 
        </div>
      </nav>
    </>
  )
}

export default Header;
