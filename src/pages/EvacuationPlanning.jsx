import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PlanPanel from '../components/PlanPanel';
import {
    Sparkles, Briefcase, AlertOctagon, TextSearch,
    AlertTriangle, Clock, Zap, Activity, Truck, Radio, Send, PackageSearch, CheckCircle2
} from 'lucide-react';
import { broadcastActionPlan } from '../services/firebaseService';

// ===========================================================
//  Helper UI Components for the Intelligence Report
// ===========================================================
const SectionTitle = ({ icon: Icon, title, color = '#1e293b' }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', marginTop: '32px' }}>
        <Icon style={{ width: '20px', height: '20px', color: color, strokeWidth: 2.5 }} />
        <h4 style={{ fontSize: '18px', fontWeight: 800, color: color, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {title}
        </h4>
        <div style={{ flex: 1, height: '1px', background: '#f1f5f9', marginLeft: '16px' }} />
    </div>
);

const ParagraphText = ({ text }) => (
    <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.7, margin: '0 0 16px', fontWeight: 500 }}>
        {text}
    </p>
);

const DeficitCard = ({ label, required, current }) => {
    const deficit = required - current;
    const hasDeficit = deficit > 0;

    return (
        <div style={{
            flex: 1, padding: '20px', borderRadius: '12px',
            background: hasDeficit ? '#fef2f2' : '#f8fafc',
            border: `1px solid ${hasDeficit ? '#fecaca' : '#e2e8f0'}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
        }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: hasDeficit ? '#991b1b' : '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                {label}
            </span>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{required}</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8', paddingBottom: '4px' }}>Req.</span>
            </div>
            {hasDeficit ? (
                <div style={{ padding: '4px 10px', background: '#dc2626', color: 'white', borderRadius: '99px', fontSize: '12px', fontWeight: 800 }}>
                    SHORTFALL: {deficit}
                </div>
            ) : (
                <div style={{ padding: '4px 10px', background: '#16a34a', color: 'white', borderRadius: '99px', fontSize: '12px', fontWeight: 800 }}>
                    SUFFICIENT
                </div>
            )}
        </div>
    );
}

// ===========================================================
//  MAIN PAGE
// ===========================================================
const EvacuationPlanning = () => {
    const { t, language } = useLanguage();
    const [activePlan, setActivePlan] = useState(null);
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const [broadcastSuccess, setBroadcastSuccess] = useState(false);

    const handleBroadcast = async () => {
        if (!activePlan) return;
        setIsBroadcasting(true);
        setBroadcastSuccess(false);
        try {
            await broadcastActionPlan(activePlan);
            setBroadcastSuccess(true);
            setTimeout(() => setBroadcastSuccess(false), 3000);
        } catch (error) {
            console.error("Failed to broadcast plan", error);
            alert("Failed to broadcast. Check connection.");
        } finally {
            setIsBroadcasting(false);
        }
    };

    return (
        <div style={{
            padding: '20px', maxWidth: '1400px', margin: '0 auto',
            fontFamily: 'Outfit, sans-serif',
        }}>
            {/* Page Header */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Briefcase style={{ width: '28px', height: '28px', color: '#2563eb' }} />
                    Strategic Evacuation Planning
                </h1>
                <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0, marginTop: '8px', fontWeight: 500 }}>
                    Governor's Intelligence Sandbox: AI-generated bottlenecks, strategic phasing, and resource analysis.
                </p>
            </div>

            {/* ---- ROW: Strategic Executive Dashboard ---- */}
            <div style={{ display: 'flex', gap: '20px', minHeight: '600px' }}>

                {/* LEFT: Command Console (Inputs & Resources) */}
                <div style={{ flex: '0 0 380px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* The Action Generator */}
                    <PlanPanel onPlanChange={setActivePlan} />

                    {/* Quick Resource Overview / Deficit Visualizer */}
                    <div style={{
                        background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0',
                        padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
                    }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <PackageSearch style={{ width: '18px', height: '18px', color: '#64748b' }} />
                            Current Capacity
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #f1f5f9' }}>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>Transport Buses</span>
                                <span style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>142 <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>Active</span></span>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #f1f5f9' }}>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>NDRF Boats</span>
                                <span style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>34 <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>Active</span></span>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #f1f5f9' }}>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>Ambulances</span>
                                <span style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>85 <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>Active</span></span>
                            </div>
                            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '8px 0 0', textAlign: 'center', fontWeight: 500 }}>
                                AI automatically contrasts required vs current capacity in the report.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT: The Intelligence Report Document */}
                <div style={{
                    flex: 1, background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', padding: '50px',
                    position: 'relative', overflowY: 'auto', display: 'flex', flexDirection: 'column'
                }} className="custom-scrollbar">

                    {/* Standard Header overlaying the report */}
                    <div style={{ position: 'absolute', top: '24px', right: '32px', display: 'flex', gap: '12px' }}>
                        <div style={{ padding: '6px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', fontWeight: 700, color: '#475569', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            Confidential Briefing
                        </div>
                        <div style={{ padding: '6px 12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', fontSize: '12px', fontWeight: 800, color: '#dc2626', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <AlertOctagon style={{ width: '14px', height: '14px' }} /> Executive Eyes Only
                        </div>
                    </div>

                    {!activePlan ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                            <Briefcase style={{ width: '64px', height: '64px', color: '#cbd5e1', marginBottom: '24px' }} />
                            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#475569', margin: '0 0 8px' }}>Awaiting Directive</h3>
                            <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '300px', textAlign: 'center' }}>
                                Use the Command Console to specify constraints and generate a strategic execution report.
                            </p>
                        </div>
                    ) : (
                        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', animation: 'fadeInUp 0.5s ease-out' }}>

                            {/* Report Header */}
                            <div style={{ borderBottom: '2px solid #0f172a', paddingBottom: '24px', marginBottom: '32px' }}>
                                <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', margin: '0 0 16px', lineHeight: 1.2 }}>{activePlan.title}</h2>
                                <div style={{ display: 'flex', gap: '24px', color: '#64748b', fontSize: '14px', fontWeight: 600 }}>
                                    <span>DATE: {new Date().toLocaleDateString('en-IN').toUpperCase()}</span>
                                    <span>TIME: {new Date().toLocaleTimeString('en-IN').toUpperCase()}</span>
                                    <span>AUTHOR: SURAKSHA SETU AI</span>
                                </div>
                            </div>

                            <SectionTitle icon={TextSearch} title="Executive Summary" />
                            <ParagraphText text={activePlan.executiveSummary} />

                            <SectionTitle icon={AlertTriangle} title="Critical Bottlenecks" color="#dc2626" />
                            <div style={{ background: '#fef2f2', borderLeft: '4px solid #dc2626', padding: '20px', borderRadius: '0 8px 8px 0', marginBottom: '32px' }}>
                                <p style={{ fontSize: '16px', color: '#991b1b', margin: 0, fontWeight: 600, lineHeight: 1.6 }}>
                                    {activePlan.criticalBottlenecks}
                                </p>
                            </div>

                            <SectionTitle icon={Clock} title="Strategic Phasing" />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
                                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '6px' }}><Zap style={{ width: '16px', height: '16px', color: '#f59e0b' }} /> Phase 1 (0-2 Hrs)</h4>
                                    <p style={{ fontSize: '15px', color: '#334155', margin: 0, lineHeight: 1.6 }}>{activePlan.phase1}</p>
                                </div>
                                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
                                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '6px' }}><Activity style={{ width: '16px', height: '16px', color: '#3b82f6' }} /> Phase 2 (2-12 Hrs)</h4>
                                    <p style={{ fontSize: '15px', color: '#334155', margin: 0, lineHeight: 1.6 }}>{activePlan.phase2}</p>
                                </div>
                            </div>

                            <SectionTitle icon={Truck} title="Resource Deficit Analysis" />
                            <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
                                <DeficitCard label="Buses" required={activePlan.resourceAnalysis?.busesRequired || 0} current={142} />
                                <DeficitCard label="Boats" required={activePlan.resourceAnalysis?.boatsRequired || 0} current={34} />
                                <DeficitCard label="Ambulances" required={activePlan.resourceAnalysis?.ambulancesRequired || 0} current={85} />
                            </div>

                            <SectionTitle icon={Radio} title="Public Broadcast Directive" />
                            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '24px', position: 'relative' }}>
                                <p style={{ fontSize: '18px', color: '#1e3a8a', margin: 0, lineHeight: 1.6, fontWeight: 500, fontStyle: 'italic' }}>
                                    "{activePlan.broadcastDraft}"
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                    <button
                                        onClick={handleBroadcast}
                                        disabled={isBroadcasting || broadcastSuccess}
                                        style={{ background: broadcastSuccess ? '#16a34a' : '#2563eb', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 700, cursor: (isBroadcasting || broadcastSuccess) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(37,99,235,0.2)' }}
                                    >
                                        {broadcastSuccess ? (
                                            <><CheckCircle2 style={{ width: '16px', height: '16px' }} /> Broadcast Successful</>
                                        ) : isBroadcasting ? (
                                            <><Activity style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} /> Broadcasting...</>
                                        ) : (
                                            <><Send style={{ width: '16px', height: '16px' }} /> Broadcast to Mobile Units</>
                                        )}
                                    </button>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EvacuationPlanning;
