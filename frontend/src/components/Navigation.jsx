import React, { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">
        JC<span>.</span>
      </div>
      <div className="nav-links">
        <button onClick={() => scrollToSection('skills')}>SKILLS</button>
        <button onClick={() => scrollToSection('work')}>CASE STUDIES</button>
        <button onClick={() => scrollToSection('tools')}>TOOLS</button>
        <button onClick={() => scrollToSection('roles')}>ROLE FIT</button>
      </div>
      <button className="nav-cta" onClick={() => scrollToSection('cta')}>
        HIRE ME
      </button>
    </nav>
  );
};

export default Navigation;
