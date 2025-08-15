import { GoogleGenerativeAI } from '@google/generative-ai';
import { getGeminiConfig } from '../../config/geminiConfig.js';

class GeminiAPIService {
  constructor() {
    // Initialize the Gemini API with your API key
    this.genAI = null;
    this.model = null;
    this.isInitialized = false;
    
    // Set default config
    this.config = {
      MODEL: 'gemini-1.5-flash',
      MAX_TOKENS: 4096,
      TEMPERATURE: 0.7
    };
    
    // Try to get API key from environment variable
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (apiKey) {
      console.log('Found API key in environment, initializing Gemini API...');
      this.setAPIKey(apiKey);
    } else {
      console.warn('No Gemini API key found in environment variables');
    }
  }

  // Set the API key and initialize the service
  setAPIKey(apiKey = null) {
    let keyToUse = apiKey;
    
    if (!keyToUse) {
      // Try to get from config first
      keyToUse = this.config.API_KEY;
      
      // If not in config, try environment variable directly
      if (!keyToUse) {
        keyToUse = import.meta.env.VITE_GEMINI_API_KEY;
      }
    }
    
    if (!keyToUse) {
      console.warn('No API key available, will use fallback APIs');
      this.isInitialized = false;
      return false;
    }
    
    try {
      console.log('Initializing Gemini API with key:', keyToUse.substring(0, 10) + '...');
      this.genAI = new GoogleGenerativeAI(keyToUse);
      this.model = this.genAI.getGenerativeModel({ 
        model: this.config.MODEL,
        generationConfig: {
          temperature: this.config.TEMPERATURE,
          maxOutputTokens: this.config.MAX_TOKENS,
        }
      });
      this.isInitialized = true;
      console.log('✅ Gemini API initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize Gemini API:', error);
      this.isInitialized = false;
      return false;
    }
  }

  // Check if the service is initialized
  isReady() {
    return this.isInitialized && this.model !== null;
  }

  // Generate health advice using Gemini
  async getHealthAdvice(userQuery, healthData = null) {
    console.log('getHealthAdvice called with query:', userQuery);
    console.log('API service ready status:', this.isReady());
    
    if (!this.isReady()) {
      console.error('Gemini API is not ready. isInitialized:', this.isInitialized, 'model:', this.model);
      throw new Error('Gemini API is not initialized. Please set the API key first.');
    }

    try {
      console.log('Creating health prompt...');
      // Create a comprehensive prompt for health advice
      const prompt = this.createHealthPrompt(userQuery, healthData);
      console.log('Prompt created, calling Gemini API...');
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log('Gemini API response received, length:', text.length);
      
      return this.formatHealthResponse(text);
    } catch (error) {
      console.error('Error getting health advice from Gemini:', error);
      throw error;
    }
  }

  // Analyze medical reports using Gemini
  async analyzeMedicalReport(fileContent, fileName) {
    if (!this.isReady()) {
      throw new Error('Gemini API is not initialized. Please set the API key first.');
    }

    try {
      const prompt = this.createMedicalReportPrompt(fileContent, fileName);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.formatMedicalReportResponse(text);
    } catch (error) {
      console.error('Error analyzing medical report with Gemini:', error);
      throw error;
    }
  }

  // Analyze prescriptions using Gemini
  async analyzePrescription(fileContent, fileName) {
    if (!this.isReady()) {
      throw new Error('Gemini API is not initialized. Please set the API key first.');
    }

    try {
      const prompt = this.createPrescriptionPrompt(fileContent, fileName);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.formatPrescriptionResponse(text);
    } catch (error) {
      console.error('Error analyzing prescription with Gemini:', error);
      throw error;
    }
  }

  // Create health advice prompt
  createHealthPrompt(userQuery, healthData) {
    let prompt = `You are Medikami, a professional AI health assistant. 

**User Query:** ${userQuery}

**RESPONSE GUIDELINES:**

**1. Common Text Patterns (respond naturally):**
- "thanks", "thank you", "thx" → "You're welcome! 😊 I'm here to help!"
- "hello", "hi", "hey" → "Hello! 👋 I'm Medikami, your AI health assistant. How can I help?"
- "how are you" → "I'm doing great, thank you! 😊 How can I assist you with your health today?"
- "bye", "goodbye" → "Take care! 👋 Feel free to come back anytime for health advice!"

**2. Unrelated Questions (suggest health focus):**
- If user asks about weather, politics, sports, etc. → "I'm focused on health and wellness! 💪 Would you like to ask me about any health concerns, diet advice, or wellness tips?"
- If user asks about personal problems → "I'm here to help with health-related questions! 🏥 For personal advice, consider talking to a counselor or trusted friend."

**3. Serious Medical Emergencies (provide guidance):**
- If user mentions severe symptoms → "This sounds serious! 🚨 Please call emergency services (911) or visit the nearest hospital immediately. I can't provide emergency medical care."
- If user mentions self-harm → "I'm concerned about your safety. 🆘 Please call a crisis hotline or seek immediate professional help. You're not alone."

**4. Medical Queries (provide comprehensive health guidance):**

For health-related questions, provide a natural, comprehensive response that includes:

**What to cover (in a conversational flow):**
- **Symptoms:** Mention relevant symptoms they might experience
- **Medications:** Suggest appropriate OTC and prescription options (with brand names when helpful)
- **Diet:** Recommend beneficial foods and foods to avoid
- **Exercise:** Suggest helpful physical activities if applicable

**Response Style:**
- Write in a natural, conversational tone
- Flow smoothly between topics rather than rigid sections
- Include all important information (symptoms, medicines, diet, exercise)
- Be specific with recommendations
- Keep it practical and actionable

**Example flow:**
"Based on your question about [condition], here's what you should know...

**Common symptoms** include [list symptoms]. 

**For relief**, you can try [OTC medications with brand names]. If symptoms persist, doctors often prescribe [prescription options].

**Diet-wise**, focus on [beneficial foods] and avoid [problematic foods].

**Exercise** can help - try [specific activities]."

**Response Requirements:**
- For medical queries: Include symptoms, medicines, diet, and exercise in a natural flow
- For general conversation: Respond naturally and warmly
- For unrelated topics: Gently redirect to health focus
- For emergencies: Provide appropriate guidance and resources
- Include specific brand names for medications when appropriate
- Provide relevant symptoms based on the query
- Suggest appropriate diet and exercise recommendations
- Keep it conversational yet comprehensive
- Maximum 500 words total`;

    // Add health data context if available
    if (healthData && healthData.conditions && healthData.conditions.length > 0) {
      prompt += `\n\n**User's Health Context:** The user has the following health conditions: ${healthData.conditions.join(', ')}. Please consider these when providing advice.`;
    }

    return prompt;
  }

  // Create medical report analysis prompt
  createMedicalReportPrompt(fileContent, fileName) {
    return `You are Medikami, analyzing a medical report. Provide CONCISE insights.

**Report:** ${fileName}
**Content:** ${fileContent}

**Requirements:**
- Keep response SHORT (max 200 words)
- Focus on KEY findings only
- Use clear headings with emojis
- Provide 2-3 main recommendations maximum
- Include brief safety note

**Format:**
**🔬 Key Findings** (2-3 bullet points)
**💊 Main Recommendations** (2-3 bullet points)
**⚠️ Safety Note** (1 sentence)

**Important:** Be direct, avoid overwhelming details, focus on actionable advice.`;
  }

  // Create prescription analysis prompt
  createPrescriptionPrompt(fileContent, fileName) {
    return `You are Medikami, analyzing a prescription. Provide CONCISE guidance.

**Prescription:** ${fileName}
**Content:** ${fileContent}

**Requirements:**
- Keep response SHORT (max 200 words)
- Focus on KEY medication info only
- Use clear headings with emojis
- Provide 2-3 main points maximum
- Include brief safety note

**Format:**
**💊 Medications** (list main medications)
**🍽️ Key Interactions** (2-3 bullet points)
**⚠️ Safety Note** (1 sentence)

**Important:** Be direct, focus on essential information.`;
  }

  // Format health response
  formatHealthResponse(text) {
    // Clean up the response and ensure proper formatting
    let formattedText = text.trim();
    
    // Clean up any formatting artifacts
    formattedText = formattedText.replace(/^\d+\.\s*/gm, '');
    formattedText = formattedText.replace(/^\*\s*/gm, '');
    
    // Ensure proper bullet points for lists
    formattedText = formattedText.replace(/(\n\s*-\s*)/g, '\n• ');
    
    // Add safety disclaimer if not present
    if (!formattedText.toLowerCase().includes('medical guidance') && !formattedText.toLowerCase().includes('consult a doctor')) {
      formattedText += `\n\n⚠️ **Important:** This advice is general and not a substitute for professional diagnosis. Please consult a healthcare provider for personal medical advice.`;
    }
    
    return formattedText;
  }

  // Format medical report response
  formatMedicalReportResponse(text) {
    let formattedText = text.trim();
    
    // Ensure proper heading
    if (!formattedText.startsWith('🔬')) {
      formattedText = `🔬 **Medical Report Analysis Complete**\n\n${formattedText}`;
    }
    
    // Add safety disclaimer if not present
    if (!formattedText.toLowerCase().includes('consult') && !formattedText.toLowerCase().includes('doctor')) {
      formattedText += `\n\n**⚠️ Important Note:** This analysis is based on your medical report. Always consult healthcare professionals for personalized advice.`;
    }
    
    return formattedText;
  }

  // Format prescription response
  formatPrescriptionResponse(text) {
    let formattedText = text.trim();
    
    // Ensure proper heading
    if (!formattedText.startsWith('💊')) {
      formattedText = `💊 **Prescription Analysis Complete**\n\n${formattedText}`;
    }
    
    // Add safety disclaimer if not present
    if (!formattedText.toLowerCase().includes('consult') && !formattedText.toLowerCase().includes('doctor')) {
      formattedText += `\n\n**⚠️ Important Note:** Always follow your doctor's specific instructions. This analysis is for informational purposes only.`;
    }
    
    return formattedText;
  }

  // Test the API connection
  async testConnection() {
    if (!this.isReady()) {
      throw new Error('Gemini API is not initialized');
    }

    try {
      const result = await this.model.generateContent('Hello, this is a test message.');
      const response = await result.response;
      return response.text().length > 0;
    } catch (error) {
      console.error('Gemini API connection test failed:', error);
      return false;
    }
  }
}

// Create a singleton instance
const geminiAPIService = new GeminiAPIService();

export default geminiAPIService; 