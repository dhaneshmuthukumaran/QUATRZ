import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    ESCALATION_MINUTES: int = int(
        os.getenv("ESCALATION_MINUTES", "10")
    )

    CLUSTER_TIME_WINDOW_MINUTES: int = int(
        os.getenv("CLUSTER_TIME_WINDOW_MINUTES", "15")
    )

    CLUSTER_RADIUS_METERS: float = float(
        os.getenv("CLUSTER_RADIUS_METERS", "100")
    )

    CLUSTER_MIN_REPORTS: int = int(
        os.getenv("CLUSTER_MIN_REPORTS", "3")
    )


settings = Settings()