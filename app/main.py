import os
import tempfile
from datetime import datetime, timezone

from fastapi import (
    FastAPI,
    UploadFile,
    File,
    HTTPException
)

from fastapi.middleware.cors import CORSMiddleware


from app.models.schemas import (
    IncidentInput,
    ClassificationResult,

    EscalationCheckInput,
    EscalationResult,

    ClusterCheckInput,
    ClusterResult,

    ResponderMatchInput,
    ResponderMatchResult
)


from app.services.classification_service import (
    run_classification
)

from app.services.speech_service import (
    transcribe_audio,
    translate_to_english
)

from app.services.video_service import (
    analyze_video
)

from app.escalation.escalation_engine import (
    check_escalation
)

from app.clustering.incident_clustering import (
    detect_cluster
)

from app.responder.responder_matcher import (
    find_best_responder
)


# ============================================================
# APP
# ============================================================

app = FastAPI(
    title="Campus Safety - AI Logic Service",
    description=(
        "M3 AI module for speech transcription, "
        "translation, emergency classification, "
        "escalation, clustering and responder matching."
    ),
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_methods=["*"],

    allow_headers=["*"]
)


# ============================================================
# HEALTH
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "ok",
        "service": "ai-logic"
    }


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():

    return {
        "service": "Campus Safety AI Logic Service",
        "status": "running",

        "modules": [
            "speech-to-text",
            "Tamil-English translation",
            "emergency classification",
            "severity detection",
            "priority detection",
            "escalation",
            "incident clustering",
            "responder matching",
            "video analysis"
        ]
    }


# ============================================================
# CLASSIFICATION
# ============================================================

@app.post(
    "/classify",
    response_model=ClassificationResult
)
def classify_incident(
    incident: IncidentInput
):

    return run_classification(
        incident
    )


# ============================================================
# SPEECH TRANSCRIPTION
# ============================================================

@app.post("/transcribe")
async def transcribe(
    file: UploadFile = File(...)
):

    if not file.filename:

        raise HTTPException(
            status_code=400,
            detail="No file provided"
        )


    allowed_extensions = {
        ".wav",
        ".mp3",
        ".m4a",
        ".mp4",
        ".webm",
        ".ogg",
        ".flac",
        ".aac"
    }


    extension = os.path.splitext(
        file.filename
    )[1].lower()


    if extension not in allowed_extensions:

        raise HTTPException(
            status_code=400,
            detail=(
                "Unsupported file type. "
                "Use WAV, MP3, M4A, MP4, "
                "WEBM, OGG, FLAC or AAC."
            )
        )


    temp_path = None


    try:

        # ----------------------------------------------------
        # Save uploaded audio
        # ----------------------------------------------------

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=extension
        ) as temp_file:

            temp_path = temp_file.name

            content = await file.read()

            if not content:

                raise HTTPException(
                    status_code=400,
                    detail="Uploaded file is empty"
                )

            temp_file.write(content)


        # ----------------------------------------------------
        # Original transcription
        # ----------------------------------------------------

        (
            original_text,
            detected_language,
            language_probability
        ) = transcribe_audio(
            temp_path
        )


        if not original_text:

            raise HTTPException(
                status_code=400,
                detail=(
                    "No speech could be detected "
                    "in the audio."
                )
            )


        # ----------------------------------------------------
        # Translate to English
        # ----------------------------------------------------

        if detected_language == "en":

            english_text = original_text

        else:

            english_text = translate_to_english(
                temp_path
            )


        # ----------------------------------------------------
        # Emergency classification
        # ----------------------------------------------------

        classification = run_classification(
            IncidentInput(
                incident_id="VOICE-INPUT",

                description=english_text,

                category_hint=None,

                latitude=0.0,

                longitude=0.0,

                timestamp=datetime.now(
                    timezone.utc
                ),

                is_anonymous=True
            )
        )


        # ----------------------------------------------------
        # Final response
        # ----------------------------------------------------

        return {

            "success": True,

            "filename": file.filename,

            "detected_language":
                detected_language,

            "language_probability":
                language_probability,

            "original_transcript":
                original_text,

            "english_translation":
                english_text,

            "analysis": {

                "category":
                    classification["category"],

                "severity":
                    classification["severity"],

                "priority_score":
                    classification["priority_score"],

                "priority":
                    classification["priority"],

                "confidence":
                    classification["confidence"],

                "matched_keywords":
                    classification["matched_keywords"]
            }
        }


    except HTTPException:

        raise


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Audio processing failed: {str(e)}"
        )


    finally:

        if (
            temp_path
            and os.path.exists(temp_path)
        ):

            try:

                os.remove(
                    temp_path
                )

            except Exception:

                pass


# ============================================================
# VIDEO ANALYSIS
# ============================================================

@app.post("/analyze-video")
async def analyze_video_endpoint(
    file: UploadFile = File(...)
):

    if not file.filename:

        raise HTTPException(
            status_code=400,
            detail="No video file provided"
        )


    extension = os.path.splitext(
        file.filename
    )[1].lower()


    allowed_extensions = {
        ".mp4",
        ".avi",
        ".mov",
        ".mkv",
        ".webm"
    }


    if extension not in allowed_extensions:

        raise HTTPException(
            status_code=400,
            detail=(
                "Unsupported video format."
            )
        )


    temp_path = None


    try:

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=extension
        ) as temp_file:

            temp_path = temp_file.name

            content = await file.read()

            temp_file.write(content)


        result = analyze_video(
            temp_path
        )


        return {
            "success": True,
            "filename": file.filename,
            "analysis": result
        }


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Video processing failed: {str(e)}"
        )


    finally:

        if (
            temp_path
            and os.path.exists(temp_path)
        ):

            try:

                os.remove(
                    temp_path
                )

            except Exception:

                pass


# ============================================================
# ESCALATION
# ============================================================

@app.post(
    "/escalation/check",
    response_model=EscalationResult
)
def escalation_check(
    payload: EscalationCheckInput
):

    (
        should_escalate,
        reason
    ) = check_escalation(
        payload.status,
        payload.created_at,
        payload.severity
    )


    return EscalationResult(

        incident_id=
            payload.incident_id,

        should_escalate=
            should_escalate,

        reason=
            reason
    )


# ============================================================
# CLUSTER
# ============================================================

@app.post(
    "/cluster/check",
    response_model=ClusterResult
)
def cluster_check(
    payload: ClusterCheckInput
):

    (
        detected,
        related_ids,
        message
    ) = detect_cluster(
        payload.new_incident,
        payload.recent_incidents
    )


    return ClusterResult(

        cluster_detected=
            detected,

        related_incident_ids=
            related_ids,

        message=
            message
    )


# ============================================================
# RESPONDER MATCH
# ============================================================

@app.post(
    "/responder/match",
    response_model=ResponderMatchResult
)
def responder_match(
    payload: ResponderMatchInput
):

    responders_as_dicts = [

        r.model_dump()

        for r in payload.responders

    ]


    best = find_best_responder(

        payload.category,

        payload.latitude,

        payload.longitude,

        responders_as_dicts
    )


    if best is None:

        return ResponderMatchResult(

            matched=False,

            message=
                "No available responders found"
        )


    return ResponderMatchResult(

        matched=True,

        responder_id=
            best["responder_id"],

        name=
            best["name"],

        team_type=
            best["team_type"],

        distance_meters=
            best["distance_meters"]
    )