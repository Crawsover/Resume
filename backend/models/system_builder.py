from pydantic import BaseModel, EmailStr, Field
from typing import List, Dict, Optional, Any
from datetime import datetime
import uuid

# Template Models
class WorkflowTemplate(BaseModel):
    id: str
    name: str
    description: str
    category: str
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]
    default_scoring: Dict[str, Any]  # Changed from Dict[str, int]

# Draft Models
class WorkflowDraft(BaseModel):
    token: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nodes: List[Dict[str, Any]] = []
    edges: List[Dict[str, Any]] = []
    scoring: Dict[str, Any] = {}
    stage: int = 1
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class DraftCreate(BaseModel):
    nodes: List[Dict[str, Any]] = []
    edges: List[Dict[str, Any]] = []
    scoring: Dict[str, Any] = {}
    stage: int = 1

class DraftUpdate(BaseModel):
    nodes: Optional[List[Dict[str, Any]]] = None
    edges: Optional[List[Dict[str, Any]]] = None
    scoring: Optional[Dict[str, Any]] = None
    stage: Optional[int] = None

# Lead Models
class LeadCapture(BaseModel):
    email: EmailStr
    company: str
    first_name: str
    last_name: str
    phone: Optional[str] = None
    workflow_token: str
    plan_token: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)

class LeadCaptureCreate(BaseModel):
    email: EmailStr
    company: str
    first_name: str
    last_name: str
    phone: Optional[str] = None
    workflow_token: str

# Event Tracking
class EventTrack(BaseModel):
    event_type: str
    event_data: Dict[str, Any] = {}
    timestamp: datetime = Field(default_factory=datetime.utcnow)

# Integration Status
class IntegrationStatus(BaseModel):
    slack: bool
    hubspot: bool
    clearbit: bool
    resend: bool
