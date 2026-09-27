from pathlib import Path
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.config import MAX_FILE_SIZE_MB, ALLOWED_EXTENSIONS
from app.schemas import HealthCheckResponse, ResumeAnalysisResponse
from app.services.document_extractor import extract_document_text
from app.services.resume_analyzer import analyze_resume_text

app = FastAPI(
    title="Resume Analyzer API",
    description="API for resume extraction and career consultation using Ollama Qwen 2.5",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", response_model=HealthCheckResponse)
def read_root():
    return {"status": "success", "message": "Backend Resume Analyzer active!"}

@app.post("/api/analyze", response_model=ResumeAnalysisResponse)
async def process_resume(file: UploadFile = File(...)):
    filename = file.filename or ""
    file_ext = Path(filename).suffix.lower()

    if file_ext not in ALLOWED_EXTENSIONS:
        allowed_list = ", ".join(ext.upper().replace(".", "") for ext in sorted(ALLOWED_EXTENSIONS))
        raise HTTPException(
            status_code=400,
            detail=f"File format '{file_ext}' is not supported. Please upload format: {allowed_list}."
        )

    file_bytes = await file.read()
    max_bytes = MAX_FILE_SIZE_MB * 1024 * 1024

    if len(file_bytes) > max_bytes:
        raise HTTPException(
            status_code=400,
            detail=f"File size exceeds maximum limit of {MAX_FILE_SIZE_MB} MB."
        )

    try:
        extracted_text = extract_document_text(file_bytes, filename)

        if not extracted_text or len(extracted_text.strip()) < 50:
            raise HTTPException(
                status_code=400,
                detail="Resume text is too short or unreadable. Ensure the document is not an image scan."
            )

        analysis_result = analyze_resume_text(extracted_text)

        return {
            "status": "success",
            "filename": filename,
            "data": analysis_result
        }

    except HTTPException:
        raise
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error occurred: {str(e)}")