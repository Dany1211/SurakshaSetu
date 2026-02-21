import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LayoutDashboard, Activity, Map, Users, AlertTriangle, X, Radio, Flame, CloudRain, AlertCircle, CheckCircle2, Phone } from 'lucide-react';
import Logo from './Logo';
import { AnimatePresence, motion } from 'framer-motion';

// ---- Emergency Broadcast Modal ----
const EmergencyBroadcastModal = ({ onClose }) => {
    const [message, setMessage] = useState(
        `🚨 EMERGENCY ALERT — SURAKSHA SETU

This is an emergency broadcast from the Mumbai Disaster Command Center.

⚠️ SEVERE FLOOD WARNING
Heavy rainfall and rising river levels have been reported in the following areas:
• Kurla West, Andheri West, Sion

🏠 IMMEDIATE ACTIONS REQUIRED:
1. Move to higher ground immediately
2. Do NOT attempt to cross flooded roads
3. Proceed to your nearest designated shelter
4. Keep emergency contacts ready

📍 NEAREST SHELTERS:
• Town Hall Community Center — Kurla
• Primary School #3 — Andheri
• District Sports Complex — Sion

📞 EMERGENCY HELPLINE: 1800-XXX-XXXX
📞 NDRF HELPLINE: 011-24363260

Stay safe. Stay alert. Follow official instructions only.
— Suraksha Setu Command Center`
    );
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [confirmStep, setConfirmStep] = useState(false);

    const handleSend = () => {
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setSent(true);
            setTimeout(() => onClose(), 2500);
        }, 2000);
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
        }}>
            {/* Backdrop */}
            <div style={{
                position: 'absolute', inset: 0, background: 'rgba(127,29,29,0.3)', backdropFilter: 'blur(6px)',
            }} onClick={onClose} />

            {/* Modal */}
            <div style={{
                position: 'relative', background: 'white', borderRadius: '16px', width: '100%', maxWidth: '560px',
                border: '1px solid #fecaca', overflow: 'hidden', maxHeight: '90vh', display: 'flex', flexDirection: 'column',
                boxShadow: '0 20px 60px -12px rgba(220,38,38,0.2)', fontFamily: 'Outfit, sans-serif',
            }}>
                {/* Red warning bar */}
                <div style={{
                    background: 'linear-gradient(135deg, #dc2626, #b91c1c)', padding: '14px 20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Radio style={{ width: '16px', height: '16px', color: 'white' }} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'white', margin: 0 }}>
                                Emergency Broadcast
                            </h3>
                            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', margin: 0, fontWeight: 500 }}>
                                Mass SMS alert to all registered residents
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        padding: '6px', background: 'rgba(255,255,255,0.15)', border: 'none',
                        cursor: 'pointer', borderRadius: '8px', color: 'white',
                    }}>
                        <X style={{ width: '16px', height: '16px' }} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
                    {/* Estimated reach */}
                    <div style={{
                        display: 'flex', gap: '10px', marginBottom: '14px',
                    }}>
                        <div style={{
                            flex: 1, padding: '10px 12px', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fecaca',
                        }}>
                            <p style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', margin: '0 0 2px' }}>Estimated Reach</p>
                            <p style={{ fontSize: '16px', fontWeight: 800, color: '#dc2626', margin: 0 }}>2,34,500</p>
                            <p style={{ fontSize: '9px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>registered residents</p>
                        </div>
                        <div style={{
                            flex: 1, padding: '10px 12px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #f1f5f9',
                        }}>
                            <p style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', margin: '0 0 2px' }}>Delivery Time</p>
                            <p style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>~3 min</p>
                            <p style={{ fontSize: '9px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>via SMS gateway</p>
                        </div>
                    </div>

                    {/* Message */}
                    <div style={{ marginBottom: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                Broadcast Message
                            </span>
                            <span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600 }}>
                                Editable
                            </span>
                        </div>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{
                                width: '100%', minHeight: '200px', padding: '14px',
                                fontFamily: "'Outfit', sans-serif", fontSize: '12px', lineHeight: '1.7',
                                color: '#1e293b', background: '#fef2f2', border: '1.5px solid #fecaca',
                                borderRadius: '10px', resize: 'vertical', outline: 'none',
                            }}
                            onFocus={(e) => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.08)'; }}
                            onBlur={(e) => { e.target.style.borderColor = '#fecaca'; e.target.style.boxShadow = 'none'; }}
                        />
                        <p style={{ fontSize: '9px', color: '#94a3b8', marginTop: '4px' }}>{message.length} characters</p>
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '14px 20px', borderTop: '1px solid #f1f5f9', background: '#fafafa',
                    flexShrink: 0,
                }}>
                    {sent ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px' }}>
                            <CheckCircle2 style={{ width: '18px', height: '18px', color: '#22c55e' }} />
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#16a34a' }}>
                                Broadcast sent to 2,34,500 residents!
                            </span>
                        </div>
                    ) : !confirmStep ? (
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button
                                onClick={onClose}
                                style={{
                                    padding: '8px 16px', fontSize: '11px', fontWeight: 700,
                                    color: '#475569', background: 'white', border: '1px solid #e2e8f0',
                                    borderRadius: '8px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setConfirmStep(true)}
                                style={{
                                    padding: '8px 20px', fontSize: '11px', fontWeight: 700,
                                    color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    fontFamily: 'Outfit, sans-serif',
                                    background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                                    boxShadow: '0 2px 8px rgba(220,38,38,0.3)',
                                }}
                            >
                                <Radio style={{ width: '13px', height: '13px' }} />
                                Send Broadcast
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px',
                                background: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca', marginBottom: '10px',
                            }}>
                                <AlertCircle style={{ width: '16px', height: '16px', color: '#dc2626', flexShrink: 0 }} />
                                <p style={{ fontSize: '11px', color: '#7f1d1d', margin: 0, fontWeight: 600 }}>
                                    This will send an SMS to <strong>2,34,500 residents</strong>. Are you sure?
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => setConfirmStep(false)}
                                    style={{
                                        padding: '8px 16px', fontSize: '11px', fontWeight: 700,
                                        color: '#475569', background: 'white', border: '1px solid #e2e8f0',
                                        borderRadius: '8px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
                                    }}
                                >
                                    Go Back
                                </button>
                                <button
                                    onClick={handleSend}
                                    disabled={sending}
                                    style={{
                                        padding: '8px 20px', fontSize: '11px', fontWeight: 700,
                                        color: 'white', borderRadius: '8px', border: 'none',
                                        cursor: sending ? 'wait' : 'pointer',
                                        display: 'flex', alignItems: 'center', gap: '6px',
                                        fontFamily: 'Outfit, sans-serif',
                                        background: sending ? '#94a3b8' : '#dc2626',
                                        boxShadow: sending ? 'none' : '0 2px 8px rgba(220,38,38,0.3)',
                                    }}
                                >
                                    {sending ? (
                                        <>Sending...</>
                                    ) : (
                                        <><AlertTriangle style={{ width: '13px', height: '13px' }} /> Confirm & Send NOW</>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ---- Sidebar ----
const Sidebar = ({ isOpen, onClose, activePage, onPageChange }) => {
    const { t } = useLanguage();
    const [showBroadcast, setShowBroadcast] = useState(false);

    const mainItems = [
        { id: 'dashboard', label: 'menu.dashboard', icon: LayoutDashboard },
        { id: 'risk_monitoring', label: 'menu.risk_monitoring', icon: Activity },
        { id: 'evacuation_planning', label: 'menu.evacuation_planning', icon: Map },
        { id: 'resource_allocation', label: 'menu.resource_allocation', icon: Users },
        { id: 'alerts', label: 'menu.alerts', icon: AlertTriangle },
        { id: 'sos', label: 'SOS', icon: AlertCircle, urgent: true },
    ];

    const infoItems = [
        { id: 'cyclones', label: 'menu.cyclones', icon: CloudRain },
        { id: 'wildfires', label: 'menu.wildfires', icon: Flame },
    ];

    const handleClick = (id) => {
        onPageChange(id);
        if (window.innerWidth < 768) onClose();
    };

    const renderItem = (item) => {
        const isSOS = item.id === 'sos';
        return (
            <li key={item.id}>
                <motion.button
                    onClick={() => handleClick(item.id)}
                    animate={isSOS ? {
                        backgroundColor: activePage === 'sos' ? '#fef2f2' : ['transparent', '#fee2e2', 'transparent'],
                        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                    } : {}}
                    style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '11px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
                        cursor: 'pointer', border: 'none', fontFamily: 'Outfit, sans-serif',
                        textAlign: 'left', transition: 'all 0.15s ease',
                        background: activePage === item.id ? (isSOS ? '#fef2f2' : '#eff6ff') : 'transparent',
                        color: activePage === item.id ? (isSOS ? '#dc2626' : '#2563eb') : (isSOS ? '#dc2626' : '#64748b'),
                    }}
                >
                    <item.icon style={{
                        width: '20px', height: '20px', strokeWidth: 2,
                        color: activePage === item.id ? (isSOS ? '#dc2626' : '#2563eb') : (isSOS ? '#dc2626' : '#94a3b8'),
                    }} />
                    <span>{isSOS ? 'SOS' : t(item.label)}</span>
                    {isSOS && <span style={{ marginLeft: 'auto', background: '#dc2626', color: 'white', fontSize: '10px', padding: '1px 6px', borderRadius: '999px', fontWeight: 800 }}>LIVE</span>}
                    {activePage === item.id && !isSOS && (
                        <div style={{ marginLeft: 'auto', width: '3px', height: '18px', background: '#2563eb', borderRadius: '999px' }} />
                    )}
                </motion.button>
            </li>
        );
    };

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm md:hidden"
                        style={{ zIndex: 998 }}
                    />
                )}
            </AnimatePresence>

            <aside style={{
                width: '260px', background: 'white', borderRight: '1px solid #f1f5f9',
                display: 'flex', flexDirection: 'column',
                flexShrink: 0, transition: 'transform 0.3s ease',
            }} className={`
                fixed md:relative top-0 md:top-auto left-0 z-[999] md:z-auto
                h-screen md:h-full
                ${isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Top section */}
                <div style={{ padding: '16px 12px', flex: 1, overflow: 'hidden' }}>
                    {/* Mobile header */}
                    <div className="flex items-center justify-between mb-5 md:hidden px-2">
                        <Logo size="small" />
                        <button onClick={onClose} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                            <X style={{ width: '18px', height: '18px' }} />
                        </button>
                    </div>

                    {/* Main Operations */}
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 14px', marginBottom: '8px' }}>
                        Operations
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {mainItems.map(renderItem)}
                    </ul>

                    {/* Divider */}
                    <div style={{ height: '1px', background: '#f1f5f9', margin: '14px 12px' }} />

                    {/* Info-Only Hazards */}
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 14px', marginBottom: '8px' }}>
                        Hazard Info
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {infoItems.map(renderItem)}
                    </ul>
                </div>

                {/* Emergency Broadcast — Bottom pinned */}
                <div style={{ padding: '12px', borderTop: '1px solid #f1f5f9' }}>
                    <button
                        onClick={() => setShowBroadcast(true)}
                        style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            padding: '12px 18px', borderRadius: '999px', border: 'none', cursor: 'pointer',
                            background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                            color: 'white', fontSize: '13px', fontWeight: 700, fontFamily: 'Outfit, sans-serif',
                            textTransform: 'uppercase', letterSpacing: '0.06em',
                            boxShadow: '0 4px 14px -2px rgba(220, 38, 38, 0.4)',
                        }}
                    >
                        <Radio style={{ width: '14px', height: '14px' }} />
                        Emergency Broadcast
                    </button>
                    <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', marginTop: '6px', fontWeight: 500 }}>
                        Sends mass SMS to all residents
                    </p>
                </div>
            </aside>

            {/* Emergency Broadcast Modal */}
            {showBroadcast && (
                <EmergencyBroadcastModal onClose={() => setShowBroadcast(false)} />
            )}
        </>
    );
};

export default Sidebar;
