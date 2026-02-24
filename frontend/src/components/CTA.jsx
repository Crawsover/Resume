import React, { useRef } from 'react';
import { useInView } from '../hooks/useParallax';
import './CTA.css';

const CTA = () => {
  const ref = useRef();
  const isInView = useInView(ref);

  return (
    <section id="cta" className="cta-section" ref={ref}>
      <div className="cta-glow" />
      <div className={`cta-content ${isInView ? 'visible' : ''}`}>
        <div className="section-label">// LET'S BUILD SOMETHING</div>
        <h2 className="cta-title">
          READY TO<em>MOVE?</em>
        </h2>
        <p className="cta-sub">
          $3.7M in documented revenue across legal, EdTech, and ecommerce. I don't just design experiences — I build the systems that make them generate money.
        </p>
        <div className="cta-btns">
          <button
            className="btn-primary"
            onClick={() => window.open('mailto:CrawfordUXlab@gmail.com')}
          >
            GET IN TOUCH
          </button>
          <button
            className="btn-outline"
            onClick={() => window.open('https://www.linkedin.com/in/jeremy-crawford', '_blank')}
          >
            VIEW LINKEDIN
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
