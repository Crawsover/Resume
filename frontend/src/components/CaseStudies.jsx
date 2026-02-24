import React, { useRef } from 'react';
import { useInView, useParallax } from '../hooks/useParallax';
import './CaseStudies.css';

const CaseStudies = ({ data }) => {
  const ref = useRef();
  const isInView = useInView(ref);
  const scrollY = useParallax();

  return (
    <section id="work" className="case-studies-section" ref={ref}>
      <div className={`section-content ${isInView ? 'visible' : ''}`}>
        <div className="section-label">// PROOF OF WORK</div>
        <h2 className="section-title">CASE STUDIES</h2>
        <p className="section-sub">Real companies. Real numbers. Real impact.</p>

        <div className="cases">
          {data.map((caseStudy, index) => (
            <div
              key={caseStudy.id}
              className="case cursor-hover"
              style={{
                transform: isInView ? `translateY(${scrollY * 0.02 * (index + 1)}px)` : 'none'
              }}
            >
              <div className="case-accent" />
              <div className="case-eyebrow">{caseStudy.eyebrow}</div>
              <div className="case-title">{caseStudy.title}</div>
              <div className="case-desc">{caseStudy.desc}</div>
              <div className="case-metrics">
                {caseStudy.metrics.map((metric, idx) => (
                  <div key={idx} className="metric">
                    <span className="metric-num">{metric.number}</span>
                    <span className="metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>
              <div className="case-skills">
                {caseStudy.skills.map((skill, idx) => (
                  <span key={idx} className="case-skill">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
