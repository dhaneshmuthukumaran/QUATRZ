from faster_whisper import WhisperModel


MODEL_SIZE = "small"


model = WhisperModel(
    MODEL_SIZE,
    device="cpu",
    compute_type="int8"
)


def transcribe_audio(file_path: str):

    segments, info = model.transcribe(
        file_path,
        task="transcribe",
        beam_size=5,
        vad_filter=True
    )

    original_segments = []

    for segment in segments:
        original_segments.append(
            segment.text.strip()
        )

    original_text = " ".join(
        original_segments
    ).strip()

    detected_language = info.language

    language_probability = round(
        info.language_probability,
        3
    )

    return (
        original_text,
        detected_language,
        language_probability
    )


def translate_to_english(file_path: str):

    segments, info = model.transcribe(
        file_path,
        task="translate",
        beam_size=5,
        vad_filter=True
    )

    translated_segments = []

    for segment in segments:
        translated_segments.append(
            segment.text.strip()
        )

    translated_text = " ".join(
        translated_segments
    ).strip()

    return translated_text