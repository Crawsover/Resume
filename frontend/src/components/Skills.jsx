import React, { useState, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { useInView } from '../hooks/useParallax';
import './Skills.css';

const Skills = ({ data }) => {
  const [openCluster, setOpenCluster] = useState(null);
  const ref = useRef();
  const isInView = useInView(ref);

  const toggleCluster = (id) => {
    setOpenCluster(openCluster === id ? null : id);
  };

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className={`section-content ${isInView ? 'visible' : ''}`}>
        <div className="section-label">// INFORMATION ARCHITECTURE</div>
        <h2 className="section-title">SKILL CLUSTERS</h2>
        <p className="section-sub">
          Every skill mapped to a real outcome. Click any cluster to see the use cases, tools, and proof behind it.
        </p>

        <div className="clusters">
          {data.map((cluster) => {
            const IconComponent = LucideIcons[cluster.icon];
            const isOpen = openCluster === cluster.id;

            return (
              <div
                key={cluster.id}
                className={`cluster ${isOpen ? 'open' : ''}`}
              >
                <div
                  className="cluster-header cursor-hover"
                  onClick={() => toggleCluster(cluster.id)}
                >
                  <div className="cluster-icon" style={{ background: 'rgba(184, 134, 11, 0.12)' }}>
                    {IconComponent && <IconComponent size={24} color="#B8860B" />}
                  </div>
                  <div className="cluster-meta">
                    <div className="cluster-name">{cluster.name}</div>
                    <div className="cluster-desc">{cluster.desc}</div>
                    <div className="cluster-tags">
                      {cluster.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`tag tag-${tag.type}`}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="cluster-proof">
                    {cluster.proof}
                    <span>{cluster.proofLabel}</span>
                  </div>
                  <div className="cluster-chevron">
                    <LucideIcons.ChevronDown size={18} />
                  </div>
                </div>

                <div className="cluster-body">
                  <div className="cluster-inner">
                    <div>
                      <div className="skill-list-title">CAPABILITIES</div>
                      <div className="skill-list">
                        {cluster.capabilities.map((capability, idx) => (
                          <div key={idx} className="skill-item">
                            {capability}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="use-cases">
                      {cluster.useCases.map((useCase, idx) => (
                        <div key={idx} className="use-case">
                          <div className="use-case-label">{useCase.label}</div>
                          <div className="use-case-title">{useCase.title}</div>
                          <div className="use-case-desc">{useCase.desc}</div>
                          <div className="use-case-result">{useCase.result}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
