from datetime import timezone

from app.utils.geo_utils import (
    haversine_distance_m
)

from app.config import settings


def detect_cluster(
    new_incident,
    recent_incidents
):

    now = new_incident.timestamp

    if now.tzinfo is None:

        now = now.replace(
            tzinfo=timezone.utc
        )

    nearby_ids = []

    for existing in recent_incidents:

        ts = existing.timestamp

        if ts.tzinfo is None:

            ts = ts.replace(
                tzinfo=timezone.utc
            )

        minutes_apart = abs(
            (now - ts).total_seconds()
        ) / 60

        if (
            minutes_apart
            > settings.CLUSTER_TIME_WINDOW_MINUTES
        ):
            continue

        distance = haversine_distance_m(
            new_incident.latitude,
            new_incident.longitude,
            existing.latitude,
            existing.longitude
        )

        if (
            distance
            <= settings.CLUSTER_RADIUS_METERS
        ):

            nearby_ids.append(
                existing.incident_id
            )

    total_reports = len(
        nearby_ids
    ) + 1

    if (
        total_reports
        >= settings.CLUSTER_MIN_REPORTS
    ):

        return (
            True,
            nearby_ids,
            f"{total_reports} reports within "
            f"{settings.CLUSTER_RADIUS_METERS}m "
            f"in "
            f"{settings.CLUSTER_TIME_WINDOW_MINUTES} min"
        )

    return False, nearby_ids, None