import React from 'react';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='footer'>
      <p className='footer__author'>© {year} Yedidya Averjel</p>
    </footer>
  );
}

export default Footer;
