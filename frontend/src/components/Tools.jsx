import React, { useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { useInView } from '../hooks/useParallax';
import './Tools.css';

const Tools = ({ data }) => {
  const ref = useRef();
  const isInView = useInView(ref);

  return (
    <section id="tools" className="tools-section" ref={ref}>
      <div className={`section-content ${isInView ? 'visible' : ''}`}>
        <div className="section-label">// TECHNICAL STACK</div>
        <h2 className="section-title">TOOLS & PLATFORMS</h2>

        <div className="tools-grid">
          {data.map((tool, index) => {
            const IconComponent = LucideIcons[tool.icon];
            return (
              <div key={index} className="tool-card cursor-hover">
                <div className="tool-icon">
                  {IconComponent && <IconComponent size={22} />}
                </div>
                <div className="tool-name">{tool.name}</div>
                <div className="tool-cat">{tool.category}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tools;
