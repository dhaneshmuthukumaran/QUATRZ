from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class IncidentInput(BaseModel):

    incident_id: str
    description: str

    category_hint: Optional[str] = None

    latitude: float
    longitude: float

    timestamp: Optional[datetime] = None

    is_anonymous: bool = False


class ClassificationResult(BaseModel):

    incident_id: str
    category: str
    severity: str

    priority_score: int
    priority: str

    confidence: float

    matched_keywords: List[str] = []


class EscalationCheckInput(BaseModel):

    incident_id: str
    status: str

    created_at: datetime
    severity: str


class EscalationResult(BaseModel):

    incident_id: str
    should_escalate: bool

    reason: Optional[str] = None


class ExistingIncident(BaseModel):

    incident_id: str

    latitude: float
    longitude: float

    timestamp: datetime

    category: str


class ClusterCheckInput(BaseModel):

    new_incident: ExistingIncident

    recent_incidents: List[ExistingIncident]


class ClusterResult(BaseModel):

    cluster_detected: bool

    related_incident_ids: List[str] = []

    message: Optional[str] = None


class Responder(BaseModel):

    responder_id: str
    name: str

    team_type: str

    status: str

    latitude: float
    longitude: float


class ResponderMatchInput(BaseModel):

    category: str

    latitude: float
    longitude: float

    responders: List[Responder]


class ResponderMatchResult(BaseModel):

    matched: bool

    responder_id: Optional[str] = None
    name: Optional[str] = None

    team_type: Optional[str] = None

    distance_meters: Optional[float] = None

    message: Optional[str] = None