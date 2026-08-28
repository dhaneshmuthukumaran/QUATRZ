SEVERITY_ORDER = {
    "low": 1,
    "medium": 2,
    "high": 3,
    "critical": 4
}

SEVERITY_TO_SCORE = {
    "low": 25,
    "medium": 50,
    "high": 75,
    "critical": 100
}


def escalate_severity_if_needed(
    base_severity: str,
    category_hint: str = None,
    matched_keyword_count: int = 0
) -> str:

    severity = base_severity

    high_risk_hints = {
        "fire",
        "medical",
        "assault"
    }

    if (
        category_hint
        and category_hint.lower() in high_risk_hints
    ):

        if SEVERITY_ORDER.get(
            severity,
            1
        ) < SEVERITY_ORDER["high"]:

            severity = "high"

    if matched_keyword_count >= 3:

        levels = [
            "low",
            "medium",
            "high",
            "critical"
        ]

        idx = min(
            levels.index(severity) + 1,
            len(levels) - 1
        )

        severity = levels[idx]

    return severity


def severity_to_priority_score(
    severity: str
) -> int:

    return SEVERITY_TO_SCORE.get(
        severity,
        25
    )


SEVERITY_TO_PRIORITY = {
    "critical": "P1",
    "high": "P2",
    "medium": "P3",
    "low": "P4"
}


def severity_to_priority(
    severity: str
) -> str:

    return SEVERITY_TO_PRIORITY.get(
        severity,
        "P4"
    )