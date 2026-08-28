from datetime import datetime, timezone
from app.config import settings


def check_escalation(
    status: str,
    created_at: datetime,
    severity: str
) -> tuple[bool, str | None]:

    if status != "reported":
        return False, None

    now = datetime.now(timezone.utc)

    if created_at.tzinfo is None:
        created_at = created_at.replace(
            tzinfo=timezone.utc
        )

    elapsed_minutes = (
        now - created_at
    ).total_seconds() / 60

    threshold = settings.ESCALATION_MINUTES

    if severity == "critical":

        threshold = max(
            1,
            settings.ESCALATION_MINUTES // 2
        )

    if elapsed_minutes >= threshold:

        return (
            True,
            f"No acknowledgement within "
            f"{threshold} minutes "
            f"(severity={severity})"
        )

    return False, None