from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from models.system_builder import (
    WorkflowTemplate, WorkflowDraft, DraftCreate, DraftUpdate,
    LeadCapture, LeadCaptureCreate, EventTrack, IntegrationStatus
)
import os
from datetime import datetime

router = APIRouter(prefix="/system-builder", tags=["system-builder"])

# In-memory storage (replace with MongoDB in production)
drafts_storage: Dict[str, WorkflowDraft] = {}
leads_storage: List[LeadCapture] = []
events_storage: List[EventTrack] = []

# Feature flags
RESEND_ENABLED = bool(os.getenv('RESEND_API_KEY'))
HUBSPOT_ENABLED = bool(os.getenv('HUBSPOT_API_KEY'))
CLEARBIT_ENABLED = bool(os.getenv('CLEARBIT_API_KEY'))
SLACK_ENABLED = bool(os.getenv('SLACK_WEBHOOK_URL'))

# Default scoring configuration
DEFAULT_SCORING = {
    "company_visits": 10,
    "pricing_page": 25,
    "install_page": 30,
    "downloads_file": 35,
    "returns_72h": 40,
    "thresholds": {
        "warm": 50,
        "hot": 80,
        "priority": 100
    }
}

# Workflow templates
TEMPLATES = [
    {
        "id": "high-intent-alert",
        "name": "High Intent Alert",
        "description": "Get Slack alerts when high-intent visitors land on key pages",
        "category": "Alerts",
        "nodes": [
            {"id": "trigger-1", "type": "trigger", "position": {"x": 100, "y": 100}, "data": {"label": "Pricing Page Visit"}},
            {"id": "rule-1", "type": "rule", "position": {"x": 300, "y": 100}, "data": {"label": "Intent Score > 80"}},
            {"id": "action-1", "type": "action", "position": {"x": 500, "y": 100}, "data": {"label": "Slack Alert"}}
        ],
        "edges": [
            {"id": "e1", "source": "trigger-1", "target": "rule-1"},
            {"id": "e2", "source": "rule-1", "target": "action-1"}
        ],
        "default_scoring": DEFAULT_SCORING
    },
    {
        "id": "lead-enrichment",
        "name": "Auto Lead Enrichment",
        "description": "Enrich and sync qualified leads to HubSpot automatically",
        "category": "CRM Sync",
        "nodes": [
            {"id": "trigger-1", "type": "trigger", "position": {"x": 100, "y": 100}, "data": {"label": "Company Identified"}},
            {"id": "rule-1", "type": "rule", "position": {"x": 300, "y": 100}, "data": {"label": "Priority Score"}},
            {"id": "action-1", "type": "action", "position": {"x": 500, "y": 100}, "data": {"label": "HubSpot Sync"}}
        ],
        "edges": [
            {"id": "e1", "source": "trigger-1", "target": "rule-1"},
            {"id": "e2", "source": "rule-1", "target": "action-1"}
        ],
        "default_scoring": DEFAULT_SCORING
    },
    {
        "id": "round-robin",
        "name": "Sales Round Robin",
        "description": "Distribute hot leads to sales team based on territory and capacity",
        "category": "Distribution",
        "nodes": [
            {"id": "trigger-1", "type": "trigger", "position": {"x": 100, "y": 100}, "data": {"label": "Returns Within 72h"}},
            {"id": "rule-1", "type": "rule", "position": {"x": 300, "y": 100}, "data": {"label": "Hot Lead Filter"}},
            {"id": "action-1", "type": "action", "position": {"x": 500, "y": 100}, "data": {"label": "Round Robin Assign"}}
        ],
        "edges": [
            {"id": "e1", "source": "trigger-1", "target": "rule-1"},
            {"id": "e2", "source": "rule-1", "target": "action-1"}
        ],
        "default_scoring": DEFAULT_SCORING
    }
]

@router.get("/templates", response_model=List[WorkflowTemplate])
async def get_templates():
    """Get all workflow templates with default scoring"""
    return TEMPLATES

@router.post("/drafts", response_model=WorkflowDraft)
async def create_draft(draft: DraftCreate):
    """Create a new workflow draft"""
    new_draft = WorkflowDraft(**draft.dict())
    drafts_storage[new_draft.token] = new_draft
    return new_draft

@router.put("/drafts/{token}", response_model=WorkflowDraft)
async def update_draft(token: str, update: DraftUpdate):
    """Update an existing draft"""
    if token not in drafts_storage:
        raise HTTPException(status_code=404, detail="Draft not found")
    
    draft = drafts_storage[token]
    update_data = update.dict(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(draft, key, value)
    
    draft.updated_at = datetime.utcnow()
    return draft

@router.get("/drafts/{token}", response_model=WorkflowDraft)
async def get_draft(token: str):
    """Retrieve a draft by token"""
    if token not in drafts_storage:
        raise HTTPException(status_code=404, detail="Draft not found")
    return drafts_storage[token]

@router.post("/leads", response_model=LeadCapture)
async def submit_lead(lead_data: LeadCaptureCreate):
    """Submit lead capture form"""
    lead = LeadCapture(**lead_data.dict())
    leads_storage.append(lead)
    
    # TODO: Send email via Resend if enabled
    # TODO: Sync to HubSpot if enabled
    
    return lead

@router.get("/plan/{plan_token}")
async def get_setup_plan(plan_token: str):
    """Get setup plan details for success page"""
    # Find the lead by plan_token
    lead = next((l for l in leads_storage if l.plan_token == plan_token), None)
    if not lead:
        raise HTTPException(status_code=404, detail="Plan not found")
    
    # Get the workflow draft
    draft = drafts_storage.get(lead.workflow_token)
    if not draft:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    return {
        "plan_token": plan_token,
        "lead": lead.dict(),
        "workflow": draft.dict(),
        "estimated_time": "15 minutes",
        "integrations_needed": ["Slack", "HubSpot"] if draft.nodes else []
    }

@router.post("/events")
async def track_event(event: EventTrack):
    """Track user events for analytics"""
    events_storage.append(event)
    return {"status": "tracked"}

@router.get("/integrations/status", response_model=IntegrationStatus)
async def get_integration_status():
    """Check which integrations are enabled"""
    return IntegrationStatus(
        slack=SLACK_ENABLED,
        hubspot=HUBSPOT_ENABLED,
        clearbit=CLEARBIT_ENABLED,
        resend=RESEND_ENABLED
    )
