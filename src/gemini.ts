import { GoogleGenerativeAI, Part } from "@google/generative-ai";

// Access your API key as an environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const genAI = new GoogleGenerativeAI(API_KEY);

export const getGeminiResponse = async (prompt: string, history: string) => {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "You are Milo, a friendly AI assistant. Keep your responses short, concise and engaging." }] as Part[],
      },
      {
        role: "model",
        parts: [{ text: "Understood! I'm Milo, a friendly and concise AI assistant. How can I help you today?" }] as Part[],
      },
    ],
  });

  const result = await chat.sendMessage([{ text: history + "\nUser: " + prompt }] as Part[]);
  const response = await result.response;
  const text = response.text();
  return text;
};

