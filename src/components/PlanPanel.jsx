import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    Sparkles, MapPin, Clock, Edit3, Check, ChevronDown, ChevronUp,
    AlertTriangle, Bus, Anchor, ClipboardList, Send, X,
    Shield, Siren, Flame, HeartPulse, Radio, Users, CheckCircle2
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

const PlanField = ({ label, value, icon: Icon, isEditing, onChange, fieldKey }) => (
    <div className="flex items-start gap-4 py-3 border-b border-slate-100 last:border-0">
        <div className="flex items-center gap-2.5 shrink-0 min-w-[120px] pt-0.5">
            <Icon className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-tight">{label}</span>
        </div>
        {isEditing ? (
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(fieldKey, e.target.value)}
                className="text-sm font-medium text-slate-900 bg-suraksha-50 border border-suraksha-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-suraksha-400 flex-1"
            />
        ) : (
            <span className="text-sm font-semibold text-slate-800 flex-1">{value}</span>
        )}
    </div>
);

// ---- Send Plan Modal ----
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

const SendPlanModal = ({ plan, onClose }) => {
    const [selected, setSelected] = useState([]);
    const [sent, setSent] = useState(false);
    const [message, setMessage] = useState(() => generateDispatchMessage(plan));

    const toggleRecipient = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
        );
    };

    const handleSend = () => {
        setSent(true);
        setTimeout(() => {
            onClose();
            setSent(false);
        }, 2500);
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
                    <div>
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <Send className="w-4 h-4 text-suraksha-600" />
                            Dispatch Plan
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Review the message, select recipients, then dispatch
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Editable Dispatch Message */}
                    <div className="p-5 border-b border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                            <p style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                ✦ AI-Generated Dispatch Message
                            </p>
                            <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>
                                Editable — make last-minute changes below
                            </span>
                        </div>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{
                                width: '100%', minHeight: '280px', padding: '16px',
                                fontFamily: "'Outfit', sans-serif", fontSize: '13px', lineHeight: '1.7',
                                color: '#1e293b', background: '#f8fafc', border: '1.5px solid #e2e8f0',
                                borderRadius: '12px', resize: 'vertical', outline: 'none',
                            }}
                            onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'; }}
                            onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                        />
                        <div className="flex items-center justify-between mt-2">
                            <p style={{ fontSize: '10px', color: '#94a3b8' }}>
                                {message.length} characters
                            </p>
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

                    {/* Recipients */}
                    <div className="p-5">
                        <p style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                            Select Recipients
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {recipientGroups.map((group) => {
                                const isActive = selected.includes(group.id);
                                return (
                                    <button
                                        key={group.id}
                                        onClick={() => toggleRecipient(group.id)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '10px',
                                            padding: '10px 12px', borderRadius: '12px', textAlign: 'left',
                                            cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
                                            background: isActive ? '#eff6ff' : 'white',
                                            border: isActive ? '2px solid #2563eb' : '2px solid #f1f5f9',
                                            boxShadow: isActive ? '0 2px 8px rgba(37,99,235,0.1)' : 'none',
                                        }}
                                    >
                                        <div className={`p-1.5 rounded-lg border ${group.color}`}>
                                            <group.icon className="w-3.5 h-3.5" />
                                        </div>
                                        <span style={{ fontSize: '11px', fontWeight: 700, color: isActive ? '#1d4ed8' : '#475569' }}>
                                            {group.label}
                                        </span>
                                        {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 ml-auto shrink-0" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-slate-100 flex items-center justify-between shrink-0" style={{ background: '#f8fafc' }}>
                    <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                        {selected.length} team{selected.length !== 1 ? 's' : ''} selected
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            style={{
                                padding: '8px 16px', fontSize: '12px', fontWeight: 700,
                                color: '#475569', background: 'white', border: '1px solid #e2e8f0',
                                borderRadius: '8px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={selected.length === 0 || sent}
                            style={{
                                padding: '8px 20px', fontSize: '12px', fontWeight: 700,
                                color: 'white', borderRadius: '8px', border: 'none',
                                cursor: selected.length === 0 ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', gap: '8px',
                                fontFamily: 'Outfit, sans-serif',
                                background: sent ? '#22c55e' : selected.length === 0 ? '#cbd5e1' : '#2563eb',
                                boxShadow: selected.length > 0 && !sent ? '0 2px 8px rgba(37,99,235,0.3)' : 'none',
                            }}
                        >
                            {sent ? (
                                <><CheckCircle2 className="w-3.5 h-3.5" /> Dispatched!</>
                            ) : (
                                <><Send className="w-3.5 h-3.5" /> Dispatch Now</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ---- Main Plan Panel ----
const PlanPanel = () => {
    const { t } = useLanguage();
    const [selectedPlan, setSelectedPlan] = useState('flood_heavy');
    const [isEditing, setIsEditing] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [showSendModal, setShowSendModal] = useState(false);
    const [plans, setPlans] = useState(preGeneratedPlans);

    const currentPlan = plans[selectedPlan];

    const handleFieldChange = (fieldKey, value) => {
        setPlans((prev) => ({
            ...prev,
            [selectedPlan]: { ...prev[selectedPlan], [fieldKey]: value },
        }));
    };

    const severityStyles = {
        HIGH: { badge: 'bg-red-50 text-red-600 border-red-200', accent: 'border-l-red-500' },
        MEDIUM: { badge: 'bg-amber-50 text-amber-600 border-amber-200', accent: 'border-l-amber-500' },
        LOW: { badge: 'bg-emerald-50 text-emerald-600 border-emerald-200', accent: 'border-l-emerald-500' },
    };

    const mainFields = [
        { key: 'priorityOrder', label: 'Priority', icon: AlertTriangle },
        { key: 'shelters', label: 'Shelters', icon: MapPin },
        { key: 'resources', label: 'Resources', icon: Bus },
        { key: 'estimatedTime', label: 'Est. Time', icon: Clock },
    ];

    const extraFields = [
        { key: 'routes', label: 'Routes', icon: MapPin },
        { key: 'medicalTeams', label: 'Medical', icon: HeartPulse },
        { key: 'foodSupply', label: 'Food', icon: Anchor },
        { key: 'communication', label: 'Comms', icon: Radio },
    ];

    return (
        <>
            <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full border-l-4 ${severityStyles[currentPlan.severity].accent}`}>
                {/* Header */}
                <div className="p-5 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-suraksha-50 rounded-xl border border-suraksha-100">
                            <Sparkles className="w-5 h-5 text-suraksha-600" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-slate-900 tracking-tight">AI Evacuation Plan</h2>
                            <p className="text-[10px] text-slate-400 mt-0.5">Pre-generated · Admin Editable</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700,
                                fontFamily: 'Outfit, sans-serif', cursor: 'pointer', border: 'none',
                                background: isEditing ? '#2563eb' : '#f1f5f9',
                                color: isEditing ? 'white' : '#475569',
                                boxShadow: isEditing ? '0 2px 6px rgba(37,99,235,0.25)' : 'none',
                            }}
                        >
                            {isEditing ? <Check className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                            {isEditing ? 'Save Plan' : 'Edit Plan'}
                        </button>
                        <button
                            onClick={() => setShowSendModal(true)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700,
                                fontFamily: 'Outfit, sans-serif', cursor: 'pointer', border: 'none',
                                background: '#2563eb', color: 'white',
                                boxShadow: '0 2px 6px rgba(37,99,235,0.25)',
                            }}
                        >
                            <Send className="w-3.5 h-3.5" />
                            Send Plan
                        </button>
                    </div>
                </div>

                {/* Plan Selector Tabs */}
                <div className="px-5 flex gap-2 mb-1">
                    {Object.values(plans).map((plan) => (
                        <button
                            key={plan.id}
                            onClick={() => { setSelectedPlan(plan.id); setIsEditing(false); }}
                            className={`py-2 px-3 rounded-lg text-[10px] font-bold uppercase tracking-tight transition-all border ${selectedPlan === plan.id
                                ? 'bg-suraksha-50 text-suraksha-700 border-suraksha-200 shadow-sm'
                                : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50 hover:text-slate-600'
                                }`}
                        >
                            {plan.severity === 'HIGH' ? '🔴' : plan.severity === 'MEDIUM' ? '🟡' : '🟢'} {plan.title}
                        </button>
                    ))}
                </div>

                {/* Plan Title + Severity Badge */}
                <div className="px-5 pt-3 flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">{currentPlan.title}</h3>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase ${severityStyles[currentPlan.severity].badge}`}>
                        {currentPlan.severity} SEVERITY
                    </span>
                </div>

                {/* Plan Fields */}
                <div className="px-5 py-2 flex-1">
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
                    {expanded && extraFields.map((field) => (
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

                {/* Expand + Footer */}
                <div className="px-5 pb-4">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-slate-400 hover:text-suraksha-600 transition-colors py-2 border border-dashed border-slate-200 rounded-lg hover:border-suraksha-300"
                    >
                        {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        {expanded ? 'Show Less' : 'Show All Details (Routes, Medical, Food, Comms)'}
                    </button>
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
