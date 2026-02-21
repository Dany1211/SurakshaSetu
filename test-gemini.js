import { GoogleGenerativeAI } from '@google/generative-ai';

const key = 'AIzaSyAp4-J3Dft_l7Ke9TInug8N-4olNmo1oos';
const ai = new GoogleGenerativeAI(key);

async function testModel(modelName) {
    try {
        console.log(`Testing model: ${modelName}...`);
        const model = ai.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Say hi');
        console.log(`✅ Success with ${modelName}:`, (await result.response).text());
        return true;
    } catch (e) {
        console.log(`❌ Failed with ${modelName}:`, e.message);
        return false;
    }
}

async function run() {
    const models = [
        'gemini-2.5-flash',
        'gemini-2.0-flash',
        'gemini-1.5-flash'
    ];

    for (const m of models) {
        const success = await testModel(m);
        if (success) break;
    }
}

run();
