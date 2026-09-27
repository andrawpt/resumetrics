import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
APP_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "samples"

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
DEFAULT_MODEL_NAME = os.getenv("LLM_MODEL", "qwen2.5:3b")

LLM_SETTINGS = {
    "temperature": 0.2,
    "top_p": 0.9,
}

ALLOWED_EXTENSIONS = {".pdf", ".docx", ".txt"}
MAX_FILE_SIZE_MB = 10