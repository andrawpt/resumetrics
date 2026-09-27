import json
from typing import Any, Dict
import ollama
from app.config import DEFAULT_MODEL_NAME, LLM_SETTINGS
from app.prompts import SYSTEM_PROMPT, USER_PROMPT

def analyze_resume_text(resume_text: str, model_name: str = DEFAULT_MODEL_NAME) -> Dict[str, Any]:
    cleaned_text = resume_text.strip()
    if not cleaned_text:
        raise ValueError("Resume text cannot be empty.")

    formatted_prompt = USER_PROMPT.format(resume_text=cleaned_text)

    try:
        response = ollama.chat(
            model=model_name,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": formatted_prompt},
            ],
            format="json",
            options=LLM_SETTINGS,
        )

        content = response["message"]["content"]
        return json.loads(content)

    except json.JSONDecodeError as err:
        raise ValueError(f"AI model failed to generate valid JSON format: {err}") from err
    except Exception as err:
        raise RuntimeError(f"Failed to communicate with Ollama: {err}") from err
