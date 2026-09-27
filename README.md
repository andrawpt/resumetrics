# Resume AI Strategist & ATS Reality Check

A full-stack application for automated resume text extraction, reality-checked career classification, ATS score evaluation, skill gap detection, and actionable improvement recommendations powered by FastAPI and local LLMs (Ollama Qwen 2.5).

---

## Project Structure & File Map

```text
.
├── .gitignore                                 # Global Git ignore definitions
├── README.md                                  # Complete project documentation
├── backend/                                   # FastAPI Backend Service
│   ├── requirements.txt                       # Backend Python dependencies
│   └── app/
│       ├── __init__.py                        # Package root
│       ├── main.py                            # FastAPI entry point, routing, middleware & error handling
│       ├── config.py                          # Environment settings, constants, and LLM parameters
│       ├── schemas.py                         # Pydantic data models for request/response validation
│       ├── prompts.py                         # System and user prompt templates for LLM
│       └── services/
│           ├── __init__.py                    # Services package root
│           ├── document_extractor.py          # PDF, DOCX, and TXT parsing and text sanitization
│           ├── resume_analyzer.py             # Ollama LLM execution & structured JSON parsing
│           ├── extractor.py                   # Re-export alias for document_extractor
│           └── analyzer.py                    # Re-export alias for resume_analyzer
│
└── frontend/                                  # React + Vite + TypeScript Frontend
    ├── index.html                             # Single Page Application HTML entry point
    ├── vite.config.ts                         # Vite configuration and proxy setup
    ├── package.json                           # Dependencies and scripts
    └── src/
        ├── main.tsx                           # React DOM root entry
        ├── App.tsx                            # Root application component and state orchestration
        ├── index.css                          # Global Tailwind CSS and animation keyframes
        ├── App.css                            # Component-level styles
        ├── types/
        │   └── resume.ts                      # TypeScript interfaces for API contracts
        ├── services/
        │   └── api.ts                         # HTTP client for backend communication & mock fallback
        └── components/
            ├── Navbar.tsx                     # Top navigation and system status indicator
            ├── FileUpload.tsx                 # Drag-and-drop file upload & format validation
            ├── LoadingState.tsx               # Animated multi-step progress indicator
            ├── AnalysisDashboard.tsx          # Structured report display & summary copying
            ├── FanCards.tsx                   # Interactive floating feature preview cards
            ├── FaqSection.tsx                 # Interactive accordion Q&A section
            ├── ScrollReveal.tsx               # IntersectionObserver viewport animation wrapper
            ├── ScrollStack.tsx                # Smooth-scrolling card stack layout (Lenis)
            └── ScrollStack.css                # Animation and float styles for scroll stack
```

---

## Error Diagnosis Guide

When encountering an error, refer to this mapping to quickly locate the responsible file:

| Issue / Error Symptom | Responsible File | Action |
|---|---|---|
| Unsupported format / Corrupted document / OCR failure | `backend/app/services/document_extractor.py` | Check file parsers for PDF (`pypdf`), DOCX (`docx`), or text cleaning rules |
| Ollama connection error / AI model JSON parsing error | `backend/app/services/resume_analyzer.py` | Verify Ollama service status, model availability, or prompt output formatting |
| Invalid payload / Schema mismatch / 422 Unprocessable Entity | `backend/app/schemas.py` | Check Pydantic model definitions against LLM output schema |
| CORS issue / 400 Bad Request / 500 Server Exception | `backend/app/main.py` | Check FastAPI endpoint exception handling and CORS origins |
| Backend configuration / Port / Model settings | `backend/app/config.py` | Update environment variables or default settings |
| Frontend network request failed / Endpoint timeout | `frontend/src/services/api.ts` | Verify API proxy `/api/analyze` or direct fallback URL |
| TypeScript interface discrepancy | `frontend/src/types/resume.ts` | Synchronize TypeScript interfaces with backend schemas |
| File size limit / Dropzone validation warning | `frontend/src/components/FileUpload.tsx` | Adjust file validation parameters (extensions, size limit) |
| Multi-step progress animation stuck | `frontend/src/components/LoadingState.tsx` | Inspect loading interval and callback triggers |
| Analysis report rendering or layout issues | `frontend/src/components/AnalysisDashboard.tsx` | Check data binding and null handling |
| Smooth scroll / card stack positioning glitch | `frontend/src/components/ScrollStack.tsx` | Inspect viewport calculations and Lenis instance lifecycle |

---

## Getting Started

### 1. Backend Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` and automatically proxy API calls to the backend on `http://127.0.0.1:8000`.
