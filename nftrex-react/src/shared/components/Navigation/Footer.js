import React from 'react';
import './Footer.css';

import builtOnHedera from './Icons/boh.svg'

const Footer = () => {
  return (
    <div className='outer-border1'>
    <footer className='footer'>
      <div className='footer-links'>
        <a href="https://medium.com/@charlesmhanlon/list/hash-lotto-be0a657296f8" target="_blank" rel="noreferrer" className='footer-link'>About</a>
        <a href="https://medium.com/@charlesmhanlon/list/hash-lotto-be0a657296f8" target="_blank" rel="noreferrer" className='footer-link'>Contact</a>
        <a href="/privacy" className='footer-link'>Privacy Policy</a>
      </div>
      <h5 className='footer-logo'>© 2024 NFT-Rex by Titor Labs</h5>
      <a href="https://hedera.com/" target="_blank" rel="noreferrer"><img src={builtOnHedera} alt="Built on Hedera" className="footer-image" /></a>
    </footer>
    </div>
  );
};

export default Footer;