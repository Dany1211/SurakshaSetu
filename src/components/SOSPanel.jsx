import { useState } from 'react';
import { AlertTriangle, MapPin, Phone, UserCheck, X, ChevronRight } from 'lucide-react';
import { useFirebaseSync } from '../hooks/useFirebaseSync';
import { updateSOSStatus } from '../services/firebaseService';

const SOSPanel = () => {
    const [showList, setShowList] = useState(false);
    const { sosTickets } = useFirebaseSync();

    // Sort so unassigned/pending are at top
    const alerts = [...sosTickets].sort((a, b) => {
        if (a.status === 'Pending' && b.status !== 'Pending') return -1;
        if (a.status !== 'Pending' && b.status === 'Pending') return 1;
        return 0;
    });

    const urgentCount = alerts.filter(a => a.urgent && a.status === 'Pending').length;

    const handleAssign = (id) => {
        updateSOSStatus(id, 'Assigned');
    };

    return (
        <div className="border-b border-slate-100">
            {/* Compact SOS header */}
            <button
                onClick={() => setShowList(!showList)}
                style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 16px', background: urgentCount > 0 ? '#fef2f2' : '#f8fafc',
                    border: 'none', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '34px', height: '34px', borderRadius: '8px',
                        background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <AlertTriangle style={{ width: '18px', height: '18px', color: '#dc2626' }} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <p style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: 0 }}>
                            🚨 SOS Alerts: <span style={{ color: '#dc2626' }}>{urgentCount} ongoing</span>
                        </p>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, fontWeight: 600 }}>Tap to view</p>
                    </div>
                </div>
                <ChevronRight style={{
                    width: '18px', height: '18px', color: '#94a3b8',
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
                                    padding: '14px 16px', borderRadius: '10px',
                                    border: alert.status === 'Assigned' ? '1px solid #d1fae5' : '1px solid #fecaca',
                                    background: alert.status === 'Assigned' ? '#f0fdf4' : 'white',
                                    fontFamily: 'Outfit, sans-serif',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '5px' }}>
                                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{alert.caller}</p>
                                    <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{alert.time || 'Just now'}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
                                    <MapPin style={{ width: '14px', height: '14px', color: '#94a3b8' }} />
                                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, fontWeight: 500 }}>{alert.location}</p>
                                </div>
                                <p style={{ fontSize: '14px', color: '#475569', margin: '0 0 8px 0', fontWeight: 500 }}>
                                    {alert.issue}
                                </p>
                                {alert.status === 'Assigned' ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <UserCheck style={{ width: '14px', height: '14px', color: '#16a34a' }} />
                                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase' }}>Rescuer Assigned</span>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleAssign(alert.id)}
                                        style={{
                                            padding: '6px 14px', borderRadius: '6px', fontSize: '12px',
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
