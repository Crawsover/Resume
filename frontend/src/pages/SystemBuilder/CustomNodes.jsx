import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Target, Settings, Zap } from 'lucide-react';

// Trigger Node (Green)
export const TriggerNode = memo(({ data, selected }) => {
  return (
    <div className={`trigger-node ${selected ? 'selected' : ''}`}>
      <div className="node-header">
        <Target size={16} />
        <span className="node-type">TRIGGER</span>
      </div>
      <div className="node-label">{data.label}</div>
      <Handle type="source" position={Position.Right} className="node-handle" />
    </div>
  );
});

// Rule Node (Blue)
export const RuleNode = memo(({ data, selected }) => {
  return (
    <div className={`rule-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Left} className="node-handle" />
      <div className="node-header">
        <Settings size={16} />
        <span className="node-type">RULE</span>
      </div>
      <div className="node-label">{data.label}</div>
      <Handle type="source" position={Position.Right} className="node-handle" />
    </div>
  );
});

// Action Node (Purple)
export const ActionNode = memo(({ data, selected }) => {
  return (
    <div className={`action-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Left} className="node-handle" />
      <div className="node-header">
        <Zap size={16} />
        <span className="node-type">ACTION</span>
      </div>
      <div className="node-label">{data.label}</div>
    </div>
  );
});

TriggerNode.displayName = 'TriggerNode';
RuleNode.displayName = 'RuleNode';
ActionNode.displayName = 'ActionNode';

export const nodeTypes = {
  trigger: TriggerNode,
  rule: RuleNode,
  action: ActionNode
};
