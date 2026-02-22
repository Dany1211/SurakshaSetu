import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API using the Vite environment variable
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
    console.warn("VITE_GEMINI_API_KEY is missing in your .env file!");
}
const ai = new GoogleGenerativeAI(apiKey);

/**
 * Generates an evacuation action plan using Gemini Flash.
 *
 * @param {Object} data Context about the disaster scenario
 * @param {string} adminPrompt Custom instructions from the admin
 * @param {string} targetLanguage The language to generate the response in (en, hi, mr)
 * @returns {Promise<Object>} An action plan object to populate the UI
 */
export const generateActionPlan = async (data = {}, adminPrompt = '', targetLanguage = 'en') => {
    try {
        const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

        const langMap = {
            'en': 'English',
            'hi': 'Hindi (देवानागरी लिपि)',
            'mr': 'Marathi (मराठी)'
        };
        const outputLanguage = langMap[targetLanguage] || 'English';

        const prompt = `
You are the Chief AI Intelligence Officer for the "Suraksha Setu" Disaster Command Center in Mumbai, advising the Governor directly.
Your task is to generate a highly strategic, high-level Executive Evacuation Briefing.
You MUST write all textual content in the following language: ${outputLanguage}. This is an absolute requirement.

DO NOT include any markdown formatting like \`\`\`json or \`\`\` in your response. Return ONLY raw valid JSON.

GOVERNOR'S DIRECTIVES (CRITICAL - MUST OBEY):
"${adminPrompt ? adminPrompt : 'No specific constraints provided. Analyze standard operating procedures.'}"

SYSTEM CONTEXT:
- Affected Zone: ${data.zone || 'Multiple Wards in Mumbai'}
- Risk Level: ${data.riskLevel || 'SEVERE'}

Based on the directives and context, extrapolate realistic bottlenecks and generate a highly specific Executive Intelligence Report matching this EXACT JSON structure:

{
  "title": "A strong, brief title for the operation (e.g. Operation Safe Haven: Andheri West - in ${outputLanguage})",
  "executiveSummary": "A 2-sentence highly professional assessment of the immediate threat and required overarching strategy, written for a Governor.",
  "criticalBottlenecks": "Identify 1 or 2 specific things that will fail or block the evacuation based on the context (e.g. 'SV Road bridge capacity exceeded by 200%').",
  "phase1": "What MUST happen in the next 0-2 hours (bullet points or short paragraph).",
  "phase2": "What MUST happen in the next 2-12 hours (bullet points or short paragraph).",
  "resourceAnalysis": {
     "busesRequired": 50,
     "boatsRequired": 10,
     "ambulancesRequired": 15
  },
  "broadcastDraft": "Draft a short, urgent SMS broadcast warning to be sent to the affected residents. MUST BE IN ${outputLanguage}."
}

Ensure the response is extremely professional, strictly adheres to the requested JSON schema, directly solves the problem described in the Governor's directives, and is written entirely in ${outputLanguage}.
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawText = response.text();

        // Clean up markdown payload if the model wraps it
        const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

        const plan = JSON.parse(cleanedText);
        plan.id = `gen_${Date.now()}`;

        return plan;

    } catch (error) {
        console.error("Gemini Plan Generation Error:", error);
        throw new Error("Failed to generate strategic briefing. Please review inputs.");
    }
};
