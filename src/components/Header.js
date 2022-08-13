import React from "react";
import logo from '../images/logo.svg';

function Header() {
  return (
    <header className='header'>
      <img className='logo' src={logo} alt='logo: Around The U.S.' />
    </header>
  );
}

export default Header;
  