from app.utils.geo_utils import (
    haversine_distance_m
)


CATEGORY_TO_TEAM = {
    "fire": "fire_safety",
    "medical": "medical",
    "assault": "security",
    "security": "security",
    "other": "security"
}


def find_best_responder(
    category,
    latitude,
    longitude,
    responders
):

    required_team = CATEGORY_TO_TEAM.get(
        category,
        "security"
    )

    available = [
        r
        for r in responders
        if r["status"] == "available"
    ]

    if not available:
        return None

    matching = [
        r
        for r in available
        if r["team_type"] == required_team
    ]

    candidates = (
        matching
        if matching
        else available
    )

    best = None

    for responder in candidates:

        distance = haversine_distance_m(
            latitude,
            longitude,
            responder["latitude"],
            responder["longitude"]
        )

        candidate = {
            **responder,
            "distance_meters": round(
                distance,
                2
            )
        }

        if (
            best is None
            or distance
            < best["distance_meters"]
        ):

            best = candidate

    return best