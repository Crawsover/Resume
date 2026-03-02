import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Check, ExternalLink, ArrowRight } from 'lucide-react';
import CustomCursor from '../../components/CustomCursor';
import '../SystemBuilder/SystemBuilder.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SystemBuilderSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planToken = searchParams.get('plan');
  
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (planToken) {
      fetchPlan();
    }
  }, [planToken]);

  const fetchPlan = async () => {
    try {
      const response = await fetch(`${API}/system-builder/plan/${planToken}`);
      const data = await response.json();
      setPlan(data);
    } catch (error) {
      console.error('Error fetching plan:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="system-builder-page">
        <CustomCursor />
        <div className="sb-container" style={{ textAlign: 'center', paddingTop: '200px' }}>
          <div className="stage-title">Loading your setup plan...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="system-builder-page">
      <CustomCursor />
      {/* Navigation */}
      <nav className="sb-nav">
        <div className="sb-logo">
          SYS<span>BUILDER</span>
        </div>
        <button className="btn-outline" onClick={() => navigate('/')}>
          Back to Portfolio
        </button>
      </nav>

      <div className="sb-container" style={{ maxWidth: '900px' }}>
        {/* Success Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(255, 212, 0, 0.1)',
            border: '2px solid rgba(255, 212, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <Check size={40} color="#FFD400" />
          </div>
          
          <h1 className="stage-title" style={{ marginBottom: '16px' }}>
            Workflow Activated!
          </h1>
          <p className="stage-subtitle">
            Your visitor intelligence system is ready. Follow these steps to complete your setup.
          </p>
        </div>

        {/* Setup Steps */}
        <div className="glass-card" style={{ marginBottom: '24px' }}>
          <h3 className="panel-title" style={{ marginBottom: '24px' }}>
            Setup Steps (Est. {plan?.estimated_time || '15 minutes'})
          </h3>

          <SetupStep
            number={1}
            title="Install Tracking Script"
            description="Add our JavaScript snippet to your website's <head> tag"
            action="View Documentation"
            actionLink="#"
          />

          <SetupStep
            number={2}
            title="Connect Integrations"
            description="Link Slack, HubSpot, and other tools to receive alerts"
            action="Configure Integrations"
            actionLink="#"
          />

          <SetupStep
            number={3}
            title="Test Your Workflow"
            description="Visit your site anonymously to verify tracking is working"
            action="Run Test"
            actionLink="#"
          />

          <SetupStep
            number={4}
            title="Invite Your Team"
            description="Add team members and set up notification preferences"
            action="Invite Team"
            actionLink="#"
            isLast
          />
        </div>

        {/* What's Next */}
        <div className="glass-card">
          <h3 className="panel-title" style={{ marginBottom: '16px' }}>
            What Happens Next?
          </h3>
          <div className="insight-item">
            📧 Setup instructions sent to <strong>{plan?.lead?.email || 'your email'}</strong>
          </div>
          <div className="insight-item">
            👤 Your account has been created for <strong>{plan?.lead?.company || 'your company'}</strong>
          </div>
          <div className="insight-item">
            📊 Dashboard will be available at <strong>dashboard.yoursite.com</strong>
          </div>
          <div className="insight-item">
            🎯 Start seeing visitor data within <strong>24 hours</strong>
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '32px', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={() => window.open('https://docs.yoursite.com', '_blank')}>
            View Documentation
            <ExternalLink size={16} style={{ marginLeft: '8px' }} />
          </button>
          <button className="btn-outline" onClick={() => navigate('/')}>
            Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

// Setup Step Component
const SetupStep = ({ number, title, description, action, actionLink, isLast }) => {
  return (
    <div style={{
      paddingBottom: isLast ? '0' : '24px',
      marginBottom: isLast ? '0' : '24px',
      borderBottom: isLast ? 'none' : '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'rgba(255, 212, 0, 0.1)',
          border: '1px solid rgba(255, 212, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '14px',
          fontWeight: '600',
          color: '#FFD400'
        }}>
          {number}
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#fff',
            marginBottom: '6px'
          }}>
            {title}
          </div>
          <div style={{
            fontSize: '13px',
            color: '#8892a0',
            marginBottom: '12px',
            lineHeight: '1.5'
          }}>
            {description}
          </div>
          <a
            href={actionLink}
            style={{
              fontSize: '12px',
              color: '#FFD400',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.05em'
            }}
          >
            {action}
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SystemBuilderSuccess;
