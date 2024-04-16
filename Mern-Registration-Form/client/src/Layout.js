import React from 'react';
// Import Header & Footer.
import Header from './Components/Header/Header.js';
import Footer from './Components/Footer/Footer.js';
// Import Outlate.
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
        <Outlet/>
      <Footer />
    </>
  )
}

export default Layout;