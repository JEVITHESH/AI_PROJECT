import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const geminiService = {
  async sendMessage(message: string, history: any[] = [], context: string = "") {
    if (!API_KEY) {
      throw new Error("Gemini API key is missing. Please configure it in the AI Studio Secrets panel.");
    }

    const ai = new GoogleGenAI(API_KEY);
    const model = ai.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `You are an AI assistant for Jevithesh S's portfolio. You must use the following technical context to answer user questions about him. If the answer isn't in the context, be honest but professional. 
          
          PORTFOLIO CONTEXT:
          ${context}
          
          Always maintain a professional, friendly, and helpful tone.`
    });
    
    const contents = history.map(h => ({
      role: h.role === 'model' ? 'model' : 'user' as "model" | "user",
      parts: h.parts || [{ text: h.text }]
    }));

    const result = await model.generateContent({
      contents: [
        ...contents,
        { role: 'user', parts: [{ text: message }] }
      ]
    });

    const response = await result.response;
    return response.text() || "I'm sorry, I couldn't generate a response.";
  }
};
