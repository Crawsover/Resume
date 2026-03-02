import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-copy">
        © 2026 Jeremy Crawford · Dallas, TX · CrawfordUXlab@gmail.com
      </div>
      <div className="footer-links">
        <a href="https://jcrawfordesigns.com" target="_blank" rel="noopener noreferrer">
          PORTFOLIO
        </a>
        <a href="https://www.linkedin.com/in/jcrawforduxlab/" target="_blank" rel="noopener noreferrer">
          LINKEDIN
        </a>
        <a href="mailto:CrawfordUXlab@gmail.com">
          EMAIL
        </a>
      </div>
    </footer>
  );
};

export default Footer;
