import React, { useRef, useEffect, useState } from 'react';
import { useInView } from '../hooks/useParallax';
import './Roles.css';

const Roles = ({ data }) => {
  const ref = useRef();
  const isInView = useInView(ref);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !animated) {
      setAnimated(true);
    }
  }, [isInView, animated]);

  return (
    <section id="roles" className="roles-section" ref={ref}>
      <div className={`section-content ${isInView ? 'visible' : ''}`}>
        <div className="section-label">// TARGET ROLES</div>
        <h2 className="section-title">WHERE I WIN</h2>
        <p className="section-sub">
          Ranked by fit score based on documented skills, revenue proof, and market demand.
        </p>

        <div className="roles-grid">
          {data.map((role, index) => (
            <div key={index} className="role-card cursor-hover">
              <div className="role-rank">RANK {role.rank}</div>
              <div className="role-title">{role.title}</div>
              <div className="role-salary">{role.salary}</div>
              <div className="win-bar-wrap">
                <div
                  className="win-bar"
                  style={{
                    width: animated ? `${role.fitScore}%` : '0%'
                  }}
                />
              </div>
              <div className="win-pct">{role.fitScore}% FIT SCORE</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roles;
