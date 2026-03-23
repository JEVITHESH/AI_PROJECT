
import os
import uvicorn
import json
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq

# -----------------------------------------------------------------------------
# Configuration
# -----------------------------------------------------------------------------
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "YOUR_API_KEY_HERE")
MODEL_ID = "llama-3.3-70b-versatile"

# Initialize Groq client
client = Groq(api_key=GROQ_API_KEY)

# Initialize FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------------------------------------------------
# API Schemas
# -----------------------------------------------------------------------------
class ChemicalRequest(BaseModel):
    chemicals: List[str]

class PredictionResult(BaseModel):
    safetyScore: float
    hazardLevel: str
    primaryReaction: str
    hazards: List[str]
    warnings: List[str]
    alternatives: List[str]
    explanation: str
    confidence: float

# -----------------------------------------------------------------------------
# Inference Logic
# -----------------------------------------------------------------------------
@app.post("/predict", response_model=PredictionResult)
async def predict(request: ChemicalRequest): 
    chemicals_str = ", ".join(request.chemicals)
    
    # System prompt to enforce JSON output
    system_prompt = """You are a chemical safety AI. Analyze the mixture of chemicals provided.
    Return the result strictly as a valid JSON object with the following keys:
    - safetyScore (number, 0-100)
    - hazardLevel (string: "SAFE", "CAUTION", "DANGER", "LETHAL")
    - primaryReaction (string, summary of reaction)
    - hazards (list of strings, e.g. ["Toxic Fumes", "Heat"])
    - warnings (list of strings)
    - alternatives (list of strings)
    - explanation (string)
    - confidence (number, 0.0-1.0)
    
    Ensure the JSON is valid and do not output any markdown formatting or extra text. Just the JSON object.
    Example:
    {
        "safetyScore": 95,
        "hazardLevel": "SAFE",
        "primaryReaction": "No significant reaction",
        "hazards": [],
        "warnings": ["Standard lab safety"],
        "alternatives": [],
        "explanation": "These chemicals are stable together.",
        "confidence": 0.98
    }
    """
    
    user_prompt = f"Chemicals: {chemicals_str}"

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": user_prompt,
                }
            ],
            model=MODEL_ID,
            temperature=0.1,  # Low temp for deterministic logic
            stream=False,
            response_format={"type": "json_object"} 
        )

        response_content = chat_completion.choices[0].message.content
        
        # Parse JSON
        try:
            result_data = json.loads(response_content)
            return result_data
        except json.JSONDecodeError:
            # Fallback cleanup
            cleaned_output = response_content.strip()
            if cleaned_output.startswith("```json"):
                cleaned_output = cleaned_output[7:]
            if cleaned_output.endswith("```"):
                cleaned_output = cleaned_output[:-3]
            
            return json.loads(cleaned_output.strip())

    except Exception as e:
        print(f"Error calling Groq API: {e}")
        raise HTTPException(status_code=500, detail=f"Groq API Error: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
