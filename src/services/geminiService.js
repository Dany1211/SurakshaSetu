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
 * @param {string} data.zone Name of the endangered active zone (e.g. Andheri West)
 * @param {string} data.riskLevel Severe, High, Medium, etc.
 * @param {string} data.shelterName Name of nearest shelter to route to
 * @param {string} data.shelterDistance Approximate string distance/time
 * @returns {Promise<Object>} An action plan object to populate the UI
 */
export const generateActionPlan = async ({ zone, riskLevel, shelterName, shelterDistance }) => {
    try {
        const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
You are an Emergency Response AI for the "Suraksha Setu" local disaster management dashboard in Mumbai.
Generate an emergency action plan for a disaster response team and citizens.

CURRENT SITUATION:
- Affected Zone: ${zone}
- Threat Level: ${riskLevel}
- Designated Shelter: ${shelterName}
- Distance/Time to Shelter: ${shelterDistance}

Return ONLY a valid, minified JSON object with the following exact keys for the UI to consume:
{
  "title": "A short, urgent title for the response plan (e.g. 'Critical Evacuation: Andheri West')",
  "severity": "Must be exactly HIGH, MEDIUM, or LOW based on the threat level",
  "priorityOrder": "1-sentence summary of who evacuates first",
  "shelters": "Name of the designated shelter for this zone",
  "resources": "Number of buses/ambulances needed (make a realistic guess based on severity)",
  "estimatedTime": "Estimated response or evacuation time",
  "routes": "Identify realistic major roads in Mumbai to avoid waterlogging from the zone to the shelter",
  "medicalTeams": "Deployment instructions for medical units",
  "foodSupply": "Amount of MREs/food packets needed based on severity",
  "communication": "How to alert the public (e.g. SMS, Sirens)"
}

Do not include markdown blocks like \`\`\`json. Return pure JSON.
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawText = response.text();
        // Clean up markdown payload if the model wraps it (sometimes rules are ignored)
        const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

        const plan = JSON.parse(cleanedText);
        // Ensure id is present for React keys
        plan.id = `gen_${Date.now()}`;

        return plan;

    } catch (error) {
        console.error("Gemini Plan Generation Error:", error);
        throw new Error("Failed to generate action plan. Please fallback to manual planning.");
    }
};

