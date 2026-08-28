import json
import os
from typing import Tuple, List


KEYWORDS_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "data",
    "keywords.json"
)


with open(KEYWORDS_PATH, "r", encoding="utf-8") as f:
    CATEGORY_MAP = json.load(f)


def classify_text(
    description: str
) -> Tuple[str, str, float, List[str]]:

    text = description.lower()

    best_category = "other"
    best_severity = "low"
    best_score = 0

    matched: List[str] = []

    for category, data in CATEGORY_MAP.items():

        hits = [
            kw
            for kw in data["keywords"]
            if kw.lower() in text
        ]

        if len(hits) > best_score:

            best_score = len(hits)
            best_category = category
            best_severity = data["base_severity"]
            matched = hits

    confidence = (
        min(0.5 + best_score * 0.15, 0.95)
        if best_score > 0
        else 0.3
    )

    return (
        best_category,
        best_severity,
        confidence,
        matched
    )