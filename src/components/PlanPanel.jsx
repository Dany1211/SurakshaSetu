import React, { useState } from 'react';
import { Target, RefreshCw, Sparkles, Languages } from 'lucide-react';
import { generateActionPlan } from '../services/geminiService';
import { useLanguage } from '../context/LanguageContext';
import { archiveActionPlan } from '../services/firebaseService';

const PlanPanel = ({ onPlanChange }) => {
    const { t, language } = useLanguage();
    const [adminPrompt, setAdminPrompt] = useState('');
    const [targetLanguage, setTargetLanguage] = useState(language || 'en');
    const [isGenerating, setIsGenerating] = useState(false);

    // Load last plan from local storage on mount
    React.useEffect(() => {
        const savedPlan = localStorage.getItem('last_suraksha_plan');
        if (savedPlan) {
            try {
                const parsed = JSON.parse(savedPlan);
                if (onPlanChange) onPlanChange(parsed);
            } catch (e) {
                console.error("Error parsing saved plan", e);
            }
        }
    }, []);

    const handleGenerateAIPlan = async () => {
        setIsGenerating(true);
        try {
            // Include admin instructions in the generation request
            const newAiPlan = await generateActionPlan(
                { zone: 'Mumbai Region', riskLevel: 'CRITICAL' },
                adminPrompt,
                targetLanguage
            );

            // Shape the API response to fit our UI
            const processedPlan = {
                id: newAiPlan.id || `plan-${Date.now()}`,
                title: newAiPlan.title || 'Executive Disaster Briefing',
                executiveSummary: newAiPlan.executiveSummary || 'Awaiting summary...',
                criticalBottlenecks: newAiPlan.criticalBottlenecks || 'Awaiting bottleneck analysis...',
                phase1: newAiPlan.phase1 || 'Awaiting phase 1 strategy...',
                phase2: newAiPlan.phase2 || 'Awaiting phase 2 strategy...',
                resourceAnalysis: newAiPlan.resourceAnalysis || { busesRequired: 0, boatsRequired: 0, ambulancesRequired: 0 },
                broadcastDraft: newAiPlan.broadcastDraft || 'Emergency alert draft pending...',
            };

            // Save to LocalStorage to avoid wasting API credits on refresh
            localStorage.setItem('last_suraksha_plan', JSON.stringify(processedPlan));

            // Archive to Firebase immediately for coordination history
            try {
                await archiveActionPlan(processedPlan);
            } catch (archiveError) {
                console.warn("Could not archive plan to Firebase, but it is saved locally.", archiveError);
            }

            if (onPlanChange) onPlanChange(processedPlan);
        } catch (error) {
            console.error(error);
            alert("Error generating strategic briefing. Please review inputs or check API credentials.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleClearPlan = () => {
        localStorage.removeItem('last_suraksha_plan');
        if (onPlanChange) onPlanChange(null);
    };

    return (
        <div style={{
            background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 10px 15px -3px rgba(0, 0, 0, 0.04)',
            fontFamily: 'Outfit, sans-serif',
            display: 'flex', flexDirection: 'column',
        }}>

            {/* ---- COMMAND CONSOLE MAIN HEADER ---- */}
            <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', background: 'linear-gradient(to bottom, #f8fafc, #ffffff)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div style={{ padding: '8px', background: '#eff6ff', borderRadius: '10px', border: '1px solid #dbeafe' }}>
                        <Target style={{ width: '20px', height: '20px', color: '#2563eb' }} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Strategic Directive</h2>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0', fontWeight: 500 }}>Optional constraints for AI analysis.</p>
                    </div>
                </div>

                <textarea
                    value={adminPrompt}
                    onChange={(e) => setAdminPrompt(e.target.value)}
                    placeholder="e.g., 'Prioritize evacuation of all municipal hospitals first. Assume Eastern Express Highway is completely flooded.'"
                    style={{
                        width: '100%', minHeight: '130px', padding: '16px',
                        background: 'white', border: '2px solid #e2e8f0', borderRadius: '12px',
                        fontSize: '15px', color: '#0f172a', fontFamily: 'Outfit, sans-serif', resize: 'vertical',
                        outline: 'none', transition: 'all 0.2s ease', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.01)'
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.01)'; }}
                />

                <div style={{ marginTop: '20px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Languages style={{ width: '16px', height: '16px', color: '#64748b' }} />
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Output Lang</span>
                    </div>
                    <select
                        value={targetLanguage}
                        onChange={(e) => setTargetLanguage(e.target.value)}
                        style={{
                            padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1',
                            background: 'white', fontSize: '14px', fontWeight: 600, color: '#0f172a',
                            outline: 'none', cursor: 'pointer', fontFamily: 'Outfit, sans-serif'
                        }}
                    >
                        <option value="en">English (EN)</option>
                        <option value="hi">Hindi (HI)</option>
                        <option value="mr">Marathi (MR)</option>
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
                    <button
                        onClick={handleGenerateAIPlan}
                        disabled={isGenerating}
                        style={{
                            width: '100%',
                            background: isGenerating ? '#94a3b8' : '#0f172a',
                            color: 'white', padding: '16px 24px', borderRadius: '12px', border: 'none',
                            fontSize: '15px', fontWeight: 800, cursor: isGenerating ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                            boxShadow: isGenerating ? 'none' : '0 10px 15px -3px rgba(15, 23, 42, 0.2)',
                            transition: 'all 0.2s ease', letterSpacing: '0.02em', textTransform: 'uppercase'
                        }}
                    >
                        {isGenerating ? <RefreshCw style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} /> : <Sparkles style={{ width: '18px', height: '18px', color: '#fbbf24' }} />}
                        {isGenerating ? 'Analyzing Intelligence...' : 'Generate Strategic Briefing'}
                    </button>

                    {localStorage.getItem('last_suraksha_plan') && !isGenerating && (
                        <button
                            onClick={handleClearPlan}
                            style={{
                                width: '100%', background: 'transparent',
                                color: '#94a3b8', padding: '10px', borderRadius: '8px', border: '1px dashed #e2e8f0',
                                fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            CLEAR CURRENT DIRECTIVE
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlanPanel;
