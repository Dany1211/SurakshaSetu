import { useState } from 'react';
import { AlertTriangle, MapPin, Phone, UserCheck, X, ChevronRight } from 'lucide-react';

const mockSOS = [
    { id: 1, caller: 'Ramesh Patil', location: 'Kurla West, Near Station', issue: 'Family stranded on 2nd floor', time: '2 min ago', urgent: true },
    { id: 2, caller: 'Anjali Deshmukh', location: 'Sion Circle, Main Road', issue: 'Elderly person needs medical help', time: '8 min ago', urgent: true },
    { id: 3, caller: 'Municipal Ward Office', location: 'Andheri Subway', issue: 'Water level rising rapidly', time: '15 min ago', urgent: false },
];

const SOSPanel = () => {
    const [showList, setShowList] = useState(false);
    const [alerts, setAlerts] = useState(mockSOS);

    const urgentCount = alerts.filter(a => a.urgent).length;

    const handleAssign = (id) => {
        setAlerts(prev => prev.map(a => a.id === id ? { ...a, assigned: true } : a));
    };

    return (
        <div className="border-b border-slate-100">
            {/* Compact SOS header */}
            <button
                onClick={() => setShowList(!showList)}
                style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px', background: urgentCount > 0 ? '#fef2f2' : '#f8fafc',
                    border: 'none', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '28px', height: '28px', borderRadius: '8px',
                        background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <AlertTriangle style={{ width: '14px', height: '14px', color: '#dc2626' }} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b', margin: 0 }}>
                            🚨 SOS Alerts: <span style={{ color: '#dc2626' }}>{urgentCount} ongoing</span>
                        </p>
                        <p style={{ fontSize: '9px', color: '#94a3b8', margin: 0, fontWeight: 600 }}>Tap to view</p>
                    </div>
                </div>
                <ChevronRight style={{
                    width: '14px', height: '14px', color: '#94a3b8',
                    transform: showList ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                }} />
            </button>

            {/* SOS List (expandable) */}
            {showList && (
                <div style={{ padding: '0 12px 12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {alerts.map((alert) => (
                            <div
                                key={alert.id}
                                style={{
                                    padding: '10px 12px', borderRadius: '10px',
                                    border: alert.assigned ? '1px solid #d1fae5' : '1px solid #fecaca',
                                    background: alert.assigned ? '#f0fdf4' : 'white',
                                    fontFamily: 'Outfit, sans-serif',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '4px' }}>
                                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{alert.caller}</p>
                                    <span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600 }}>{alert.time}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px' }}>
                                    <MapPin style={{ width: '10px', height: '10px', color: '#94a3b8' }} />
                                    <p style={{ fontSize: '10px', color: '#64748b', margin: 0, fontWeight: 500 }}>{alert.location}</p>
                                </div>
                                <p style={{ fontSize: '10px', color: '#475569', margin: '0 0 6px 0', fontWeight: 500 }}>
                                    {alert.issue}
                                </p>
                                {alert.assigned ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <UserCheck style={{ width: '11px', height: '11px', color: '#16a34a' }} />
                                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase' }}>Rescuer Assigned</span>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleAssign(alert.id)}
                                        style={{
                                            padding: '4px 10px', borderRadius: '6px', fontSize: '9px',
                                            fontWeight: 700, color: 'white', background: '#2563eb',
                                            border: 'none', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
                                            textTransform: 'uppercase', letterSpacing: '0.04em',
                                        }}
                                    >
                                        Assign Rescuer
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SOSPanel;
