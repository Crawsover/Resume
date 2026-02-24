import React from 'react';
import { useScrollProgress } from '../hooks/useParallax';

const ScrollProgress = () => {
  const progress = useScrollProgress();

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        background: '#FFD400',
        width: `${progress}%`,
        zIndex: 9998,
        transition: 'width 0.1s'
      }}
    />
  );
};

export default ScrollProgress;
