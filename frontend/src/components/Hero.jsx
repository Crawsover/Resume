import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import './Hero.css';

const Hero = ({ data }) => {
  const { tag, name, nameAccent, title, stats } = data;

  return (
    <div className="hero-section">
      <div className="hero-grid" />
      <div className="hero-glow" />
      <div className="hero-content">
        <div className="hero-tag">{tag}</div>
        <h1 className="hero-name">
          {name}
          <em>{nameAccent}</em>
        </h1>
        <p className="hero-title">{title}</p>
        <div className="hero-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat">
              <span className="stat-num">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-scroll">
        SCROLL
        <ChevronDown className="scroll-icon" size={16} />
      </div>
    </div>
  );
};

export default Hero;
