// Gemini API Configuration
export const GEMINI_CONFIG = {
  MODEL: 'gemini-1.5-flash',
  MAX_TOKENS: 4096,
  TEMPERATURE: 0.7
};

// Environment-based configuration (for production)
export const getGeminiConfig = () => {
  // API key must be provided via environment variable
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY environment variable is required. Please add it to your .env file.');
  }
  
  return {
    API_KEY: apiKey,
    MODEL: GEMINI_CONFIG.MODEL,
    MAX_TOKENS: GEMINI_CONFIG.MAX_TOKENS,
    TEMPERATURE: GEMINI_CONFIG.TEMPERATURE
  };
};