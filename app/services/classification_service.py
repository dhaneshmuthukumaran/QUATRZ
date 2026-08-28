from app.classifier.keyword_classifier import classify_text
from app.classifier.severity_rules import (
    escalate_severity_if_needed,
    severity_to_priority_score,
    severity_to_priority
)


def run_classification(incident):

    (
        category,
        base_severity,
        confidence,
        matched_keywords
    ) = classify_text(
        incident.description
    )

    severity = escalate_severity_if_needed(
        base_severity,
        incident.category_hint,
        len(matched_keywords)
    )

    priority_score = severity_to_priority_score(
        severity
    )

    priority = severity_to_priority(
        severity
    )

    return {
        "incident_id": incident.incident_id,
        "category": category,
        "severity": severity,
        "priority_score": priority_score,
        "priority": priority,
        "confidence": confidence,
        "matched_keywords": matched_keywords
    }