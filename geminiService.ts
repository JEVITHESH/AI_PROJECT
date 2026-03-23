
import { PredictionResult, HazardLevel } from "./types";

const GROQ_API_KEY = (import.meta as any).env?.VITE_GROQ_API_KEY || "YOUR_API_KEY_HERE";
const MODEL_ID = "llama-3.3-70b-versatile";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You are a chemical safety AI. Analyze the mixture of chemicals provided.
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
}`;

/**
 * Default fallback result shown when the AI service is unreachable.
 */
const getFallbackResult = (chemicals: string[]): PredictionResult => ({
  safetyScore: 50,
  hazardLevel: HazardLevel.CAUTION,
  primaryReaction: `Analysis of: ${chemicals.join(" + ")}`,
  hazards: ["Unable to perform real-time AI analysis"],
  warnings: [
    "This is an estimated result — the AI service could not be reached.",
    "Always consult official safety data sheets (SDS) before handling chemicals."
  ],
  alternatives: [],
  explanation:
    "The AI inference service is temporarily unavailable. This is a cautionary placeholder. " +
    "Please try again in a moment, or consult professional chemical safety resources.",
  confidence: 0.0,
});

export const predictReactivity = async (chemicals: string[]): Promise<PredictionResult> => {
  const userPrompt = `Chemicals: ${chemicals.join(", ")}`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL_ID,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.1,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Groq API error:", response.status, errBody);
      // Return fallback instead of throwing
      return getFallbackResult(chemicals);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error("Empty response from Groq API");
      return getFallbackResult(chemicals);
    }

    // Parse the JSON response
    try {
      const result = JSON.parse(content);
      return result as PredictionResult;
    } catch {
      // Try cleaning markdown fences
      let cleaned = content.trim();
      if (cleaned.startsWith("```json")) cleaned = cleaned.slice(7);
      if (cleaned.startsWith("```")) cleaned = cleaned.slice(3);
      if (cleaned.endsWith("```")) cleaned = cleaned.slice(0, -3);

      const result = JSON.parse(cleaned.trim());
      return result as PredictionResult;
    }
  } catch (error) {
    console.error("Failed to fetch prediction:", error);
    // Return a graceful fallback instead of crashing
    return getFallbackResult(chemicals);
  }
};
