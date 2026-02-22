import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    AlertTriangle, MapPin, Phone, UserCheck,
    Bell, ShieldAlert, CloudRain, Clock,
    ChevronRight, CheckCircle2, MessageSquare
} from 'lucide-react';
import { fetchCurrentWeather, fetchForecast, generateAlerts } from '../utils/weatherService';
import { useFirebaseSync } from '../hooks/useFirebaseSync';
import { updateSOSStatus } from '../services/firebaseService';

const Alerts = ({ initialTab = 'sos' }) => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState(initialTab); // 'sos' or 'weather'
    const { sosTickets } = useFirebaseSync();
    const sosAlerts = [...sosTickets].filter(a => a.status !== 'Resolved').sort((a, b) => {
        if (a.status === 'Pending' && b.status !== 'Pending') return -1;
        if (a.status !== 'Pending' && b.status === 'Pending') return 1;
        return 0;
    });

    const [weatherAlerts, setWeatherAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    useEffect(() => {
        const loadWeather = async () => {
            const [w, f] = await Promise.all([fetchCurrentWeather(), fetchForecast()]);
            if (w && f) {
                setWeatherAlerts(generateAlerts(w, f));
            }
            setLoading(false);
        };
        loadWeather();
    }, []);

    const handleAssign = (id) => {
        updateSOSStatus(id, 'Assigned');
    };

    const handleResolve = (id) => {
        updateSOSStatus(id, 'Resolved');
    };

    const urgentCount = sosAlerts.filter(a => a.urgent && a.status === 'Pending').length;

    return (
        <div style={{
            padding: '24px', maxWidth: '1400px', margin: '0 auto',
            fontFamily: 'Outfit, sans-serif',
        }}>
            {/* Header */}
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Bell style={{ width: '28px', height: '28px', color: '#2563eb' }} />
                        Alerts & Notifications
                    </h1>
                    <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0, marginTop: '8px', fontWeight: 500 }}>
                        Real-time SOS distress calls and weather-driven risk alerts
                    </p>
                </div>

                <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
                    <button
                        onClick={() => setActiveTab('sos')}
                        style={{
                            padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                            fontSize: '14px', fontWeight: 700, fontFamily: 'Outfit, sans-serif',
                            background: activeTab === 'sos' ? 'white' : 'transparent',
                            color: activeTab === 'sos' ? '#2563eb' : '#64748b',
                            boxShadow: activeTab === 'sos' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                            transition: 'all 0.15s ease',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        SOS Distress
                        {urgentCount > 0 && (
                            <span style={{
                                background: '#dc2626', color: 'white', fontSize: '10px',
                                padding: '1px 6px', borderRadius: '999px',
                                animation: 'pulse 2s infinite'
                            }}>{urgentCount}</span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('weather')}
                        style={{
                            padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                            fontSize: '14px', fontWeight: 700, fontFamily: 'Outfit, sans-serif',
                            background: activeTab === 'weather' ? 'white' : 'transparent',
                            color: activeTab === 'weather' ? '#2563eb' : '#64748b',
                            boxShadow: activeTab === 'weather' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                            transition: 'all 0.15s ease',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        Weather Alerts
                        {weatherAlerts.length > 0 && (
                            <span style={{
                                background: '#f59e0b', color: 'white', fontSize: '10px',
                                padding: '1px 6px', borderRadius: '999px'
                            }}>{weatherAlerts.length}</span>
                        )}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ display: 'grid', gridTemplateColumns: activeTab === 'sos' ? '1fr 340px' : '1fr', gap: '24px' }}>

                {activeTab === 'sos' ? (
                    <>
                        {/* SOS Feed */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {sosAlerts.length > 0 ? sosAlerts.map(alert => (
                                <div key={alert.id} style={{
                                    background: 'white', borderRadius: '16px', border: `1px solid ${alert.urgent ? '#fecaca' : '#f1f5f9'}`,
                                    padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                                    display: 'flex', gap: '20px'
                                }}>
                                    <div style={{
                                        width: '56px', height: '56px', borderRadius: '14px',
                                        background: alert.urgent ? '#fef2f2' : '#f8fafc',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <AlertTriangle style={{ width: '28px', height: '28px', color: alert.urgent ? '#dc2626' : '#94a3b8' }} />
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                                                    {alert.caller || `User ${alert.id.slice(0, 5)}`}
                                                </h3>
                                                <span style={{
                                                    fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px',
                                                    background: '#ebf5ff', color: '#2563eb', border: '1px solid #dbeafe',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    {alert.role || 'Personnel'}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <Clock style={{ width: '14px', height: '14px' }} /> {alert.time || 'New'}
                                                </span>
                                                {alert.urgent && (
                                                    <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '6px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', textTransform: 'uppercase' }}>URGENT</span>
                                                )}
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <MapPin style={{ width: '15px', height: '15px', color: '#64748b' }} />
                                                <span style={{ fontSize: '14px', color: '#334155', fontWeight: 600 }}>
                                                    {alert.location || (alert.lat ? `${alert.lat.toFixed(4)}, ${alert.lng.toFixed(4)}` : 'Location Unavailable')}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <Phone style={{ width: '15px', height: '15px', color: '#64748b' }} />
                                                <span style={{ fontSize: '14px', color: '#334155', fontWeight: 600 }}>
                                                    {alert.phone || 'No Contact Available'}
                                                </span>
                                            </div>
                                        </div>

                                        <p style={{ fontSize: '16px', color: '#475569', margin: '0 0 20px', fontWeight: 500, lineHeight: 1.5, background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                                            "{alert.issue || 'Emergency SOS Triggered'}"
                                        </p>

                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            {alert.status === 'Assigned' ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                                                    <UserCheck style={{ width: '16px', height: '16px', color: '#16a34a' }} />
                                                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#16a34a' }}>Rescuer Dispatched</span>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleAssign(alert.id)}
                                                    style={{
                                                        padding: '10px 24px', borderRadius: '8px', background: '#2563eb', color: 'white',
                                                        border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 700, fontFamily: 'Outfit, sans-serif'
                                                    }}
                                                >
                                                    Dispatch Rescue Team
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleResolve(alert.id)}
                                                style={{
                                                    padding: '10px 20px', borderRadius: '8px', background: 'white', color: '#64748b',
                                                    border: '1px solid #e2e8f0', cursor: 'pointer', fontSize: '14px', fontWeight: 700, fontFamily: 'Outfit, sans-serif'
                                                }}
                                            >
                                                Mark as Resolved
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px', border: '1px dashed #e2e8f0' }}>
                                    <CheckCircle2 style={{ width: '48px', height: '48px', color: '#22c55e', margin: '0 auto 16px' }} />
                                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>All Clear</h3>
                                    <p style={{ fontSize: '15px', color: '#94a3b8' }}>No active distress calls at the moment.</p>
                                </div>
                            )}
                        </div>

                        {/* SOS Stats Sidebar */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <ShieldAlert style={{ width: '18px', height: '18px', color: '#dc2626' }} /> SOS Overview
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Active Calls</span>
                                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{sosAlerts.length}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Urgent Cases</span>
                                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#dc2626' }}>{urgentCount}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Assigned</span>
                                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#16a34a' }}>{sosAlerts.filter(a => a.status === 'Assigned').length}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                    <MessageSquare style={{ width: '18px', height: '18px', color: '#2563eb' }} />
                                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>Rescuer Comms</h3>
                                </div>
                                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                                    Dispatchers are requested to maintain radio contact with all teams during ward-level deployments.
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    /* Weather Alerts Feed */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '40px' }}>Loading weather alerts...</div>
                        ) : weatherAlerts.length > 0 ? weatherAlerts.map(alert => (
                            <div key={alert.id} style={{
                                padding: '20px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '16px',
                                background: alert.bg, border: `1px solid ${alert.border}`,
                            }}>
                                <div style={{
                                    width: '12px', height: '12px', borderRadius: '50%', background: alert.color,
                                    boxShadow: `0 0 8px ${alert.color}40`, flexShrink: 0,
                                }} />
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: alert.color, margin: '0 0 4px' }}>{alert.title}</h3>
                                    <p style={{ fontSize: '15px', color: '#4b5563', margin: 0, fontWeight: 500 }}>{alert.summary}</p>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600, margin: 0 }}>{alert.time}</p>
                                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>WEATHER API</span>
                                </div>
                            </div>
                        )) : (
                            <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px', border: '1px dashed #e2e8f0' }}>
                                <CloudRain style={{ width: '48px', height: '48px', color: '#94a3b8', margin: '0 auto 16px' }} />
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>No Weather Warnings</h3>
                                <p style={{ fontSize: '15px', color: '#94a3b8' }}>Conditions are currently within safe limits.</p>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Alerts;
