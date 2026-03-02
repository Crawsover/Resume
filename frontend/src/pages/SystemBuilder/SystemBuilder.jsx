import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from './CustomNodes';
import useSystemBuilderStore from '../../store/systemBuilderStore';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import CustomCursor from '../../components/CustomCursor';
import './SystemBuilder.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SystemBuilder = () => {
  const navigate = useNavigate();
  const {
    nodes,
    edges,
    currentStage,
    scoring,
    setNodes,
    setEdges,
    nextStage,
    prevStage,
    loadTemplate,
    getWorkflowData,
    setDraftToken
  } = useSystemBuilderStore();

  const [templates, setTemplates] = useState([]);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch templates on mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch(`${API}/system-builder/templates`);
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  // Auto-save draft every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveDraft();
    }, 2000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges, scoring, currentStage]);

  const saveDraft = async () => {
    try {
      const workflowData = getWorkflowData();
      const response = await fetch(`${API}/system-builder/drafts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workflowData)
      });
      const data = await response.json();
      setDraftToken(data.token);
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  const handleTemplateSelect = (template) => {
    loadTemplate(template);
    trackEvent('template_selected', { template_id: template.id });
    nextStage();
  };

  const handleStageComplete = () => {
    trackEvent('stage_completed', { stage: currentStage });
    
    if (currentStage === 4) {
      setShowLeadModal(true);
    } else {
      nextStage();
    }
  };

  const trackEvent = async (eventType, eventData) => {
    try {
      await fetch(`${API}/system-builder/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_type: eventType, event_data: eventData })
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  const renderStage = () => {
    switch (currentStage) {
      case 1:
        return <Stage1Reveal templates={templates} onSelectTemplate={handleTemplateSelect} />;
      case 2:
        return <Stage2Prioritize scoring={scoring} />;
      case 3:
        return <Stage3Assign nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />;
      case 4:
        return <Stage4Activate />;
      default:
        return null;
    }
  };

  return (
    <div className="system-builder-page">
      <CustomCursor />
      
      {/* Navigation */}
      <nav className="sb-nav">
        <div className="sb-logo">
          SYS<span>BUILDER</span>
        </div>
        <div className="stage-progress">
          {[1, 2, 3, 4].map((stage) => (
            <div
              key={stage}
              className={`stage-dot ${
                currentStage === stage ? 'active' : currentStage > stage ? 'completed' : ''
              }`}
            />
          ))}
        </div>
        <button className="btn-outline" onClick={() => navigate('/')}>
          Exit
        </button>
      </nav>

      {/* Main Content */}
      <div className="sb-container">
        {renderStage()}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '32px', justifyContent: 'space-between' }}>
          {currentStage > 1 && (
            <button className="btn-outline" onClick={prevStage}>
              <ArrowLeft size={16} style={{ marginRight: '8px' }} />
              Back
            </button>
          )}
          <button
            className="btn-primary"
            onClick={handleStageComplete}
            style={{ marginLeft: 'auto' }}
            disabled={loading}
          >
            {currentStage === 4 ? 'Activate' : 'Continue'}
            {currentStage !== 4 && <ArrowRight size={16} style={{ marginLeft: '8px' }} />}
          </button>
        </div>
      </div>

      {/* Lead Capture Modal */}
      {showLeadModal && <LeadCaptureModal onClose={() => setShowLeadModal(false)} />}
    </div>
  );
};

// Stage 1: Reveal - Template Selection
const Stage1Reveal = ({ templates, onSelectTemplate }) => {
  return (
    <div>
      <div className="stage-header">
        <div className="stage-number">STAGE 01 / REVEAL</div>
        <h1 className="stage-title">Choose Your Starting Point</h1>
        <p className="stage-subtitle">
          Select a pre-built template or start from scratch to reveal anonymous visitors
        </p>
      </div>

      <div className="templates-grid">
        {templates.map((template) => (
          <div
            key={template.id}
            className="template-card cursor-hover"
            onClick={() => onSelectTemplate(template)}
          >
            <div className="template-category">{template.category}</div>
            <div className="template-name">{template.name}</div>
            <div className="template-desc">{template.description}</div>
          </div>
        ))}
        
        <div className="template-card cursor-hover" onClick={() => onSelectTemplate({ nodes: [], edges: [], default_scoring: {} })}>
          <div className="template-category">CUSTOM</div>
          <div className="template-name">Start from Scratch</div>
          <div className="template-desc">Build your own workflow from the ground up</div>
        </div>
      </div>
    </div>
  );
};

// Stage 2: Prioritize - Scoring Configuration
const Stage2Prioritize = ({ scoring }) => {
  const { updateScoring, updateThreshold } = useSystemBuilderStore();

  return (
    <div>
      <div className="stage-header">
        <div className="stage-number">STAGE 02 / PRIORITIZE</div>
        <h1 className="stage-title">Configure Intent Scoring</h1>
        <p className="stage-subtitle">
          Set point values for different actions to identify your hottest leads
        </p>
      </div>

      <div className="sb-grid">
        <div className="glass-card">
          <h3 className="panel-title">Action Scores</h3>
          <div className="scoring-grid">
            <div className="scoring-item">
              <span className="scoring-label">Company Visits Site</span>
              <input
                type="number"
                className="scoring-input"
                value={scoring.company_visits}
                onChange={(e) => updateScoring('company_visits', parseInt(e.target.value))}
              />
            </div>
            <div className="scoring-item">
              <span className="scoring-label">Views Pricing Page</span>
              <input
                type="number"
                className="scoring-input"
                value={scoring.pricing_page}
                onChange={(e) => updateScoring('pricing_page', parseInt(e.target.value))}
              />
            </div>
            <div className="scoring-item">
              <span className="scoring-label">Views Install Page</span>
              <input
                type="number"
                className="scoring-input"
                value={scoring.install_page}
                onChange={(e) => updateScoring('install_page', parseInt(e.target.value))}
              />
            </div>
            <div className="scoring-item">
              <span className="scoring-label">Downloads File</span>
              <input
                type="number"
                className="scoring-input"
                value={scoring.downloads_file}
                onChange={(e) => updateScoring('downloads_file', parseInt(e.target.value))}
              />
            </div>
            <div className="scoring-item">
              <span className="scoring-label">Returns Within 72h</span>
              <input
                type="number"
                className="scoring-input"
                value={scoring.returns_72h}
                onChange={(e) => updateScoring('returns_72h', parseInt(e.target.value))}
              />
            </div>
          </div>

          <h3 className="panel-title" style={{ marginTop: '32px' }}>Lead Thresholds</h3>
          <div className="scoring-grid">
            <div className="scoring-item">
              <span className="scoring-label">Warm Lead (🔥)</span>
              <input
                type="number"
                className="scoring-input"
                value={scoring.thresholds.warm}
                onChange={(e) => updateThreshold('warm', parseInt(e.target.value))}
              />
            </div>
            <div className="scoring-item">
              <span className="scoring-label">Hot Lead (🔥🔥)</span>
              <input
                type="number"
                className="scoring-input"
                value={scoring.thresholds.hot}
                onChange={(e) => updateThreshold('hot', parseInt(e.target.value))}
              />
            </div>
            <div className="scoring-item">
              <span className="scoring-label">Priority (🔥🔥🔥)</span>
              <input
                type="number"
                className="scoring-input"
                value={scoring.thresholds.priority}
                onChange={(e) => updateThreshold('priority', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        <DiscoveryPanel />
      </div>
    </div>
  );
};

// Stage 3: Assign - Workflow Canvas
const Stage3Assign = ({ nodes, edges, setNodes, setEdges }) => {
  return (
    <div>
      <div className="stage-header">
        <div className="stage-number">STAGE 03 / ASSIGN</div>
        <h1 className="stage-title">Build Your Workflow</h1>
        <p className="stage-subtitle">
          Connect triggers, rules, and actions to automate your sales process
        </p>
      </div>

      <div className="sb-grid">
        <div className="workflow-canvas">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={(changes) => setNodes(changes)}
            onEdgesChange={(changes) => setEdges(changes)}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background color="#ffffff15" gap={16} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>

        <DiscoveryPanel />
      </div>
    </div>
  );
};

// Stage 4: Activate - Final Review
const Stage4Activate = () => {
  const { nodes, scoring } = useSystemBuilderStore();

  return (
    <div>
      <div className="stage-header">
        <div className="stage-number">STAGE 04 / ACTIVATE</div>
        <h1 className="stage-title">Ready to Launch</h1>
        <p className="stage-subtitle">
          Review your configuration and activate your visitor intelligence system
        </p>
      </div>

      <div className="glass-card">
        <h3 className="panel-title">
          <Check size={18} />
          Workflow Summary
        </h3>
        <div className="insight-item">
          <strong>{nodes.length}</strong> nodes configured
        </div>
        <div className="insight-item">
          Intent scoring: <strong>{scoring.thresholds.hot}</strong> points for hot leads
        </div>
        <div className="insight-item">
          Estimated setup time: <strong>15 minutes</strong>
        </div>
      </div>
    </div>
  );
};

// Discovery Panel Component
const DiscoveryPanel = () => {
  const { nodes } = useSystemBuilderStore();

  return (
    <div className="discovery-panel">
      <h3 className="panel-title">What You'll Reveal</h3>
      {nodes.length > 0 ? (
        <>
          <div className="insight-item">✓ Company name & size</div>
          <div className="insight-item">✓ Visitor intent score</div>
          <div className="insight-item">✓ Pages visited & time spent</div>
          <div className="insight-item">✓ Return visit patterns</div>
        </>
      ) : (
        <div className="warning-item">Add triggers to start revealing visitor data</div>
      )}
    </div>
  );
};

// Lead Capture Modal Component
const LeadCaptureModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { draftToken } = useSystemBuilderStore();
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    first_name: '',
    last_name: '',
    phone: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API}/system-builder/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          workflow_token: draftToken
        })
      });
      
      const data = await response.json();
      navigate(`/system-builder/success?plan=${data.plan_token}`);
    } catch (error) {
      console.error('Error submitting lead:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="stage-title" style={{ fontSize: '32px', marginBottom: '20px' }}>
          Almost There!
        </h2>
        <p className="stage-subtitle" style={{ marginBottom: '24px' }}>
          Enter your details to activate your workflow
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="email"
              className="form-input"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Company *</label>
            <input
              type="text"
              className="form-input"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone (Optional)</label>
            <input
              type="tel"
              className="form-input"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            Activate Workflow
          </button>
        </form>
      </div>
    </div>
  );
};

export default SystemBuilder;
