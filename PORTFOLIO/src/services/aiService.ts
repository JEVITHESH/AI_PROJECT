import Groq from "groq-sdk";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const aiService = {
  async sendMessage(message: string, history: any[] = [], context: string = "") {
    if (!API_KEY) {
      throw new Error("GROQ API key is missing. Please configure it in your environment variables as GROQ_API_KEY.");
    }

    const groq = new Groq({ 
      apiKey: API_KEY,
      dangerouslyAllowBrowser: true 
    });
    
    const messages = history.map(h => ({
      role: (h.role === 'model' || h.role === 'assistant' ? 'assistant' : 'user') as "assistant" | "user",
      content: h.parts ? h.parts[0].text : (h.text || h.content || "")
    }));

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system" as const,
          content: `You are an AI assistant for Jevithesh S's portfolio. You must use the following technical context to answer user questions about him. If the answer isn't in the context, be honest but professional. 
          
          PORTFOLIO CONTEXT:
          ${context}
          
          Always maintain a professional, friendly, and helpful tone.`
        },
        ...messages,
        { role: 'user' as const, content: message }
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    return response.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
  }
};
