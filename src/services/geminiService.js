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
You are a Disaster Operations Planning Officer for the Suraksha Setu Command Center.

You are generating a STRICTLY OPERATIONAL evacuation and response plan based ONLY on the data provided below.
You are NOT allowed to invent infrastructure statistics, water depths, or numeric metrics that are not explicitly provided.
If data is missing, state reasonable operational assumptions instead of fabricating numbers.

All text MUST be written entirely in ${outputLanguage}.
Return ONLY raw valid JSON (no markdown formatting).

====================================
REAL-TIME SYSTEM INPUT DATA
====================================

City: Mumbai
Affected Zone: ${data.zone || 'Ward H/E - Andheri East'}
Current Risk Level: ${data.riskLevel || 'RED'}
Rainfall (Last 6 Hours): ${data.rainLast6h || '180 mm'}
Rainfall (Forecast Next 6 Hours): ${data.forecast6h || '120 mm'}
High Tide Timing: ${data.highTide || 'Within 2 hours'}
Available Rescue Teams: ${data.rescueTeams || 8}
Available Boats: ${data.boats || 12}
Available Buses: ${data.buses || 40}
Available Ambulances: ${data.ambulances || 18}
Active Shelters: ${data.shelters || 5}
Estimated Population in Zone: ${data.population || 125000}

Governor’s Directives:
"${adminPrompt || 'Prioritize elderly evacuation and hospital access continuity.'}"

====================================
OPERATIONAL CONSTRAINTS
====================================

- Assume severe waterlogging in low-lying zones.
- Assume drainage stress due to high tide.
- Assume mobile network congestion.
- Do NOT fabricate exact water depth numbers unless provided.
- Use realistic Mumbai geography (e.g., SV Road, WEH, JVLR, Milan Subway, Andheri Station).
- Keep recommendations operationally executable.

====================================
REQUIRED OUTPUT STRUCTURE
====================================

{
  "title": "Concise operation name including ward name",
  "riskAssessment": "3-4 sentence realistic assessment based ONLY on rainfall, tide timing, and population density.",
  "immediatePriorities_0_2_hours": [
     "Specific road closures",
     "Specific deployment orders",
     "Specific traffic diversion routes",
     "Hospital protection measures"
  ],
  "stabilizationPlan_2_12_hours": [
     "Shelter activation strategy",
     "Resource redistribution",
     "Medical triage placement",
     "Crowd management"
  ],
  "resourceDeployment": {
     "teamsAssigned": number,
     "boatsAssigned": number,
     "busesAssigned": number,
     "ambulancesAssigned": number,
     "remainingReserve": {
        "teams": number,
        "boats": number,
        "buses": number,
        "ambulances": number
     }
  },
  "citizenBroadcast": "Short, precise SMS advisory naming specific roads and shelter directions.",
  "assumptions": "Clearly list any assumptions made due to missing data."
}

The response must:
- Use only provided resources.
- Not exceed available resource counts.
- Be logically consistent.
- Be operationally realistic.
- Avoid fictional precision.
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
