import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    Sparkles, MapPin, Clock, Edit3, Check,
    AlertTriangle, Bus, Send, X,
    Shield, Siren, Flame, HeartPulse, Radio, Users, CheckCircle2, ChevronDown
} from 'lucide-react';

// Pre-generated AI plans for different disaster scenarios
const preGeneratedPlans = {
    flood_heavy: {
        id: 'flood_heavy',
        title: 'Heavy Flood Response',
        severity: 'HIGH',
        priorityOrder: 'Kurla → Andheri West → Sion',
        shelters: 'Town Hall Community Center, Primary School #3, District Sports Complex',
        resources: '18 Buses, 8 Boats, 6 Ambulances',
        estimatedTime: '45 mins',
        routes: 'Western Express Highway (primary), SV Road (secondary)',
        medicalTeams: '4 teams deployed at shelters',
        foodSupply: '2000 meal packs staged at Town Hall',
        communication: 'SMS alerts + PA system in affected wards',
    },
    flood_moderate: {
        id: 'flood_moderate',
        title: 'Moderate Flood Response',
        severity: 'MEDIUM',
        priorityOrder: 'Dadar → Bandra East → Malad',
        shelters: 'Municipal School #7, Bandra Community Hall',
        resources: '10 Buses, 4 Boats, 3 Ambulances',
        estimatedTime: '30 mins',
        routes: 'Eastern Express Highway (primary), LBS Marg (backup)',
        medicalTeams: '2 teams on standby',
        foodSupply: '800 meal packs at Community Hall',
        communication: 'SMS alerts to registered residents',
    },
    flood_light: {
        id: 'flood_light',
        title: 'Light Flood Advisory',
        severity: 'LOW',
        priorityOrder: 'Borivali → Colaba',
        shelters: 'Local school buildings (on-demand)',
        resources: '5 Buses, 2 Boats, 2 Ambulances',
        estimatedTime: '20 mins',
        routes: 'Standard municipal routes',
        medicalTeams: '1 team on standby at base',
        foodSupply: '400 meal packs reserved',
        communication: 'Advisory via app notifications',
    },
};

// Send modal recipients
const recipientGroups = [
    { id: 'rescue', label: 'Rescue Teams', icon: Shield, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { id: 'medical', label: 'Medical / Ambulance', icon: HeartPulse, color: 'text-red-600 bg-red-50 border-red-200' },
    { id: 'police', label: 'Police Force', icon: Siren, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { id: 'fire', label: 'Fire Brigade', icon: Flame, color: 'text-orange-600 bg-orange-50 border-orange-200' },
    { id: 'municipal', label: 'Municipal Authority', icon: Users, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { id: 'broadcast', label: 'Public Broadcast (SMS)', icon: Radio, color: 'text-violet-600 bg-violet-50 border-violet-200' },
];

// ---- Plan Field (inline row) ----
const PlanField = ({ label, value, icon: Icon, isEditing, onChange, fieldKey }) => (
    <div style={{
        display: 'flex', alignItems: 'flex-start', gap: '14px',
        padding: '10px 0', borderBottom: '1px solid #f8fafc',
        fontFamily: 'Outfit, sans-serif',
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '100px', paddingTop: '2px', flexShrink: 0 }}>
            <Icon style={{ width: '14px', height: '14px', color: '#94a3b8', strokeWidth: 1.8 }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{label}</span>
        </div>
        {isEditing ? (
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(fieldKey, e.target.value)}
                style={{
                    flex: 1, fontSize: '13px', fontWeight: 500, color: '#1e293b',
                    background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '8px',
                    padding: '4px 10px', outline: 'none', fontFamily: 'Outfit, sans-serif',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#2563eb'; }}
                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; }}
            />
        ) : (
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b', flex: 1 }}>{value}</span>
        )}
    </div>
);

// ---- Generate dispatch message ----
const generateDispatchMessage = (plan) => {
    return `🚨 EMERGENCY DISPATCH — ${plan.title.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Severity: ${plan.severity}
Generated: ${new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}

📋 EVACUATION PRIORITY
${plan.priorityOrder}

🏠 DESIGNATED SHELTERS
${plan.shelters}

🚌 RESOURCES DEPLOYED
${plan.resources}

⏱️ ESTIMATED RESPONSE TIME
${plan.estimatedTime}

🛣️ ROUTES
${plan.routes}

🏥 MEDICAL TEAMS
${plan.medicalTeams}

🍱 FOOD & SUPPLIES
${plan.foodSupply}

📡 COMMUNICATION
${plan.communication}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ This is an AI-generated plan.
Review and confirm before dispatch.
— Suraksha Setu Command Center`;
};

// ---- Send Plan Modal (Enhanced — Large & Prominent) ----
const SendPlanModal = ({ plan, onClose }) => {
    const [selected, setSelected] = useState([]);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [message, setMessage] = useState(() => generateDispatchMessage(plan));
    const [showFullMessage, setShowFullMessage] = useState(true);

    const toggleRecipient = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
        );
    };

    const selectAll = () => {
        if (selected.length === recipientGroups.length) {
            setSelected([]);
        } else {
            setSelected(recipientGroups.map(g => g.id));
        }
    };

    const handleSend = () => {
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setSent(true);
            setTimeout(() => { onClose(); setSent(false); }, 3000);
        }, 2000);
    };

    const severityColor = {
        HIGH: { bg: '#dc2626', gradient: 'linear-gradient(135deg, #dc2626, #b91c1c)', badge: '#fef2f2', text: '#dc2626', border: '#fecaca' },
        MEDIUM: { bg: '#d97706', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', badge: '#fffbeb', text: '#d97706', border: '#fde68a' },
        LOW: { bg: '#16a34a', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)', badge: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' },
    };
    const sev = severityColor[plan.severity] || severityColor.MEDIUM;

    const allPlanFields = [
        { label: 'Priority Order', value: plan.priorityOrder, icon: AlertTriangle },
        { label: 'Shelters', value: plan.shelters, icon: MapPin },
        { label: 'Resources', value: plan.resources, icon: Bus },
        { label: 'Est. Time', value: plan.estimatedTime, icon: Clock },
        { label: 'Routes', value: plan.routes, icon: MapPin },
        { label: 'Medical Teams', value: plan.medicalTeams, icon: Shield },
        { label: 'Food & Supplies', value: plan.foodSupply, icon: Bus },
        { label: 'Communication', value: plan.communication, icon: Send },
    ];

    // Success overlay
    if (sent) {
        return (
            <div style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)',
            }}>
                <div style={{
                    background: 'white', borderRadius: '24px', padding: '48px 60px',
                    textAlign: 'center', fontFamily: 'Outfit, sans-serif',
                    boxShadow: '0 32px 80px -16px rgba(0,0,0,0.25)',
                    animation: 'fadeInUp 0.3s ease',
                }}>
                    <div style={{
                        width: '72px', height: '72px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 20px',
                        boxShadow: '0 8px 24px rgba(34,197,94,0.3)',
                    }}>
                        <CheckCircle2 style={{ width: '36px', height: '36px', color: 'white' }} />
                    </div>
                    <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                        Plan Dispatched!
                    </h2>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: 0, fontWeight: 500 }}>
                        Sent to {selected.length} team{selected.length !== 1 ? 's' : ''} successfully
                    </p>
                    <div style={{
                        marginTop: '16px', padding: '8px 20px', borderRadius: '8px',
                        background: '#f0fdf4', border: '1px solid #bbf7d0',
                        fontSize: '12px', fontWeight: 600, color: '#16a34a',
                    }}>
                        {plan.title} — {plan.severity} severity
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
        }}>
            {/* Backdrop */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(6px)',
            }} onClick={onClose} />

            {/* Modal */}
            <div style={{
                position: 'relative', background: 'white', borderRadius: '20px',
                width: '100%', maxWidth: '850px',
                overflow: 'hidden', maxHeight: '92vh', display: 'flex', flexDirection: 'column',
                boxShadow: '0 32px 80px -16px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)',
                fontFamily: 'Outfit, sans-serif',
            }}>
                {/* ---- Severity Color Bar ---- */}
                <div style={{ height: '5px', background: sev.gradient, flexShrink: 0 }} />

                {/* ---- Header ---- */}
                <div style={{
                    padding: '20px 28px', borderBottom: '1px solid #f1f5f9',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                            width: '44px', height: '44px', borderRadius: '12px',
                            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
                        }}>
                            <Send style={{ width: '20px', height: '20px', color: 'white' }} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                                Dispatch Evacuation Plan
                            </h3>
                            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '2px 0 0', fontWeight: 500 }}>
                                Review, customize & send to response teams
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* Severity badge */}
                        <span style={{
                            padding: '6px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: 800,
                            textTransform: 'uppercase', letterSpacing: '0.05em',
                            background: sev.badge, color: sev.text, border: `1.5px solid ${sev.border}`,
                        }}>
                            {plan.severity === 'HIGH' ? '🔴' : plan.severity === 'MEDIUM' ? '🟡' : '🟢'} {plan.severity} SEVERITY
                        </span>
                        <button onClick={onClose} style={{
                            padding: '8px', background: '#f8fafc', border: '1px solid #e2e8f0',
                            borderRadius: '10px', cursor: 'pointer', color: '#94a3b8',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <X style={{ width: '18px', height: '18px' }} />
                        </button>
                    </div>
                </div>

                {/* ---- Body (two columns) ---- */}
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex' }} className="custom-scrollbar">
                    {/* LEFT: Plan Details */}
                    <div style={{ flex: 1, borderRight: '1px solid #f1f5f9', padding: '24px 28px', minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Sparkles style={{ width: '14px', height: '14px', color: '#2563eb' }} />
                                {plan.title}
                            </h4>
                            <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>
                                AI-generated • Editable
                            </span>
                        </div>

                        {/* All plan fields */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '20px' }}>
                            {allPlanFields.map((f) => (
                                <div key={f.label} style={{
                                    display: 'flex', alignItems: 'flex-start', gap: '12px',
                                    padding: '10px 0', borderBottom: '1px solid #f8fafc',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '120px', flexShrink: 0, paddingTop: '2px' }}>
                                        <f.icon style={{ width: '12px', height: '12px', color: '#94a3b8' }} />
                                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{f.label}</span>
                                    </div>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{f.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Full dispatch message */}
                        <button
                            onClick={() => setShowFullMessage(!showFullMessage)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '6px', width: '100%',
                                padding: '10px 14px', borderRadius: '10px', border: '1px dashed #e2e8f0',
                                background: '#f8fafc', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
                                fontSize: '11px', fontWeight: 700, color: '#64748b', textAlign: 'left',
                            }}
                        >
                            <ChevronDown style={{
                                width: '12px', height: '12px', transition: 'transform 0.2s',
                                transform: showFullMessage ? 'rotate(180deg)' : 'rotate(0deg)',
                            }} />
                            {showFullMessage ? 'Hide dispatch message' : 'View & edit dispatch message'}
                        </button>

                        {showFullMessage && (
                            <div style={{ marginTop: '12px' }}>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    style={{
                                        width: '100%', minHeight: '200px', padding: '16px',
                                        fontFamily: "'Outfit', sans-serif", fontSize: '12px', lineHeight: '1.7',
                                        color: '#1e293b', background: '#f8fafc', border: '1.5px solid #e2e8f0',
                                        borderRadius: '12px', resize: 'vertical', outline: 'none',
                                    }}
                                    onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.08)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                                    <span style={{ fontSize: '10px', color: '#94a3b8' }}>{message.length} characters</span>
                                    <button
                                        onClick={() => setMessage(generateDispatchMessage(plan))}
                                        style={{
                                            fontSize: '10px', fontWeight: 700, color: '#2563eb',
                                            background: 'none', border: 'none', cursor: 'pointer',
                                            fontFamily: 'Outfit, sans-serif', textDecoration: 'underline',
                                        }}
                                    >
                                        Reset to AI-generated
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Recipients */}
                    <div style={{ width: '320px', flexShrink: 0, padding: '24px 24px', background: '#fafbfc' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                                Select Recipients
                            </p>
                            <button
                                onClick={selectAll}
                                style={{
                                    fontSize: '10px', fontWeight: 700, color: '#2563eb',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    fontFamily: 'Outfit, sans-serif', textDecoration: 'underline',
                                }}
                            >
                                {selected.length === recipientGroups.length ? 'Deselect All' : 'Select All'}
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {recipientGroups.map((group) => {
                                const isActive = selected.includes(group.id);
                                return (
                                    <button
                                        key={group.id}
                                        onClick={() => toggleRecipient(group.id)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '12px',
                                            padding: '14px 16px', borderRadius: '12px', textAlign: 'left',
                                            cursor: 'pointer', fontFamily: 'Outfit, sans-serif', width: '100%',
                                            background: isActive ? '#eff6ff' : 'white',
                                            border: isActive ? '2px solid #2563eb' : '2px solid #f1f5f9',
                                            boxShadow: isActive ? '0 4px 12px rgba(37,99,235,0.1)' : '0 1px 2px rgba(0,0,0,0.03)',
                                            transition: 'all 0.15s ease',
                                            transform: isActive ? 'scale(1.01)' : 'scale(1)',
                                        }}
                                    >
                                        <div className={`p-2 rounded-xl border ${group.color}`}>
                                            <group.icon style={{ width: '18px', height: '18px' }} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <span style={{ fontSize: '12px', fontWeight: 700, color: isActive ? '#1d4ed8' : '#334155', display: 'block' }}>
                                                {group.label}
                                            </span>
                                            <span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 500 }}>
                                                {isActive ? '✓ Selected' : 'Click to select'}
                                            </span>
                                        </div>
                                        {isActive && <CheckCircle2 style={{ width: '18px', height: '18px', color: '#2563eb', flexShrink: 0 }} />}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Selection count */}
                        <div style={{
                            marginTop: '16px', padding: '10px 14px', borderRadius: '10px',
                            background: selected.length > 0 ? '#eff6ff' : '#f8fafc',
                            border: `1px solid ${selected.length > 0 ? '#bfdbfe' : '#e2e8f0'}`,
                            textAlign: 'center',
                        }}>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: selected.length > 0 ? '#2563eb' : '#94a3b8' }}>
                                {selected.length} of {recipientGroups.length} teams selected
                            </span>
                        </div>
                    </div>
                </div>

                {/* ---- Footer ---- */}
                <div style={{
                    padding: '18px 28px', borderTop: '1px solid #f1f5f9', background: '#f8fafc',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
                }}>
                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                        <span style={{ fontWeight: 700, color: '#0f172a' }}>{plan.title}</span> — {new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={onClose}
                            style={{
                                padding: '10px 22px', fontSize: '13px', fontWeight: 700,
                                color: '#475569', background: 'white', border: '1px solid #e2e8f0',
                                borderRadius: '10px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
                                transition: 'all 0.15s ease',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={selected.length === 0 || sending}
                            style={{
                                padding: '10px 28px', fontSize: '13px', fontWeight: 800,
                                color: 'white', borderRadius: '10px', border: 'none',
                                cursor: selected.length === 0 ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', gap: '8px',
                                fontFamily: 'Outfit, sans-serif',
                                background: sending ? '#94a3b8' : selected.length === 0 ? '#cbd5e1' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                                boxShadow: selected.length > 0 && !sending ? '0 4px 16px rgba(37,99,235,0.3)' : 'none',
                                transition: 'all 0.2s ease',
                                textTransform: 'uppercase', letterSpacing: '0.04em',
                            }}
                        >
                            {sending ? (
                                <>
                                    <div style={{
                                        width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)',
                                        borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                                    }} />
                                    Dispatching...
                                </>
                            ) : (
                                <><Send style={{ width: '15px', height: '15px' }} /> Dispatch Now</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ---- Main Plan Panel (Dashboard version — core fields only) ----
const PlanPanel = () => {
    const { t } = useLanguage();
    const [selectedPlan, setSelectedPlan] = useState('flood_heavy');
    const [isEditing, setIsEditing] = useState(false);
    const [showSendModal, setShowSendModal] = useState(false);
    const [plans, setPlans] = useState(preGeneratedPlans);

    const currentPlan = plans[selectedPlan];

    const handleFieldChange = (fieldKey, value) => {
        setPlans((prev) => ({
            ...prev,
            [selectedPlan]: { ...prev[selectedPlan], [fieldKey]: value },
        }));
    };

    const severityAccent = {
        HIGH: '#ef4444',
        MEDIUM: '#f59e0b',
        LOW: '#22c55e',
    };

    const severityBadge = {
        HIGH: { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
        MEDIUM: { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
        LOW: { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
    };

    const mainFields = [
        { key: 'priorityOrder', label: 'Priority', icon: AlertTriangle },
        { key: 'shelters', label: 'Shelters', icon: MapPin },
        { key: 'resources', label: 'Resources', icon: Bus },
        { key: 'estimatedTime', label: 'Est. Time', icon: Clock },
    ];

    return (
        <>
            <div style={{
                background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
                borderLeft: `4px solid ${severityAccent[currentPlan.severity]}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)', fontFamily: 'Outfit, sans-serif',
            }}>
                {/* Header */}
                <div style={{
                    padding: '16px 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: '10px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            padding: '8px', background: '#eff6ff', borderRadius: '10px', border: '1px solid #dbeafe',
                        }}>
                            <Sparkles style={{ width: '18px', height: '18px', color: '#2563eb' }} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0 }}>AI Evacuation Plan</h2>
                            <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>Pre-generated · Admin Editable</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '6px 14px', borderRadius: '999px', fontSize: '11px', fontWeight: 700,
                                fontFamily: 'Outfit, sans-serif', cursor: 'pointer', border: 'none',
                                background: isEditing ? '#2563eb' : '#f1f5f9',
                                color: isEditing ? 'white' : '#64748b',
                            }}
                        >
                            {isEditing ? <Check style={{ width: '13px', height: '13px' }} /> : <Edit3 style={{ width: '13px', height: '13px' }} />}
                            {isEditing ? 'Save' : 'Edit Plan'}
                        </button>
                        <button
                            onClick={() => setShowSendModal(true)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '6px 14px', borderRadius: '999px', fontSize: '11px', fontWeight: 700,
                                fontFamily: 'Outfit, sans-serif', cursor: 'pointer', border: 'none',
                                background: '#2563eb', color: 'white',
                                boxShadow: '0 2px 8px rgba(37,99,235,0.2)',
                            }}
                        >
                            <Send style={{ width: '13px', height: '13px' }} />
                            Send Plan
                        </button>
                    </div>
                </div>

                {/* Plan Selector Tabs */}
                <div style={{ padding: '0 20px', display: 'flex', gap: '6px', marginBottom: '4px' }}>
                    {Object.values(plans).map((plan) => {
                        const isActive = selectedPlan === plan.id;
                        return (
                            <button
                                key={plan.id}
                                onClick={() => { setSelectedPlan(plan.id); setIsEditing(false); }}
                                style={{
                                    padding: '6px 12px', borderRadius: '8px', fontSize: '10px', fontWeight: 700,
                                    textTransform: 'uppercase', letterSpacing: '0.02em', cursor: 'pointer',
                                    fontFamily: 'Outfit, sans-serif',
                                    background: isActive ? '#eff6ff' : 'white',
                                    color: isActive ? '#2563eb' : '#94a3b8',
                                    border: isActive ? '1px solid #bfdbfe' : '1px solid #f1f5f9',
                                }}
                            >
                                {plan.severity === 'HIGH' ? '🔴' : plan.severity === 'MEDIUM' ? '🟡' : '🟢'} {plan.title}
                            </button>
                        );
                    })}
                </div>

                {/* Title + Badge */}
                <div style={{ padding: '10px 20px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{currentPlan.title}</h3>
                    <span style={{
                        padding: '3px 10px', borderRadius: '6px', fontSize: '9px', fontWeight: 700,
                        textTransform: 'uppercase',
                        background: severityBadge[currentPlan.severity].bg,
                        color: severityBadge[currentPlan.severity].color,
                        border: `1px solid ${severityBadge[currentPlan.severity].border}`,
                    }}>
                        {currentPlan.severity} SEVERITY
                    </span>
                </div>

                {/* Core Fields — only 4 on dashboard */}
                <div style={{ padding: '4px 20px 16px' }}>
                    {mainFields.map((field) => (
                        <PlanField
                            key={field.key}
                            label={field.label}
                            value={currentPlan[field.key]}
                            icon={field.icon}
                            isEditing={isEditing}
                            onChange={handleFieldChange}
                            fieldKey={field.key}
                        />
                    ))}
                </div>
            </div>

            {/* Send Modal */}
            {showSendModal && (
                <SendPlanModal plan={currentPlan} onClose={() => setShowSendModal(false)} />
            )}
        </>
    );
};

export default PlanPanel;
