// import { useState, useEffect } from 'react';
// import { useLanguage } from '../context/LanguageContext';
// import {
//     Wind, Activity, ArrowUpRight, ShieldAlert,
//     Navigation, Thermometer, CloudRain, Clock,
//     AlertTriangle, Droplets, MapPin, CheckCircle2
// } from 'lucide-react';

// const CycloneMonitoring = () => {
//     const { t } = useLanguage();
//     const [lastUpdated, setLastUpdated] = useState('--');

//     useEffect(() => {
//         setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST');
//     }, []);

//     const cycloneStats = [
//         { label: 'Wind Speed', value: '185 km/h', sub: 'Category 3', color: '#dc2626', icon: Wind, bg: '#fef2f2' },
//         { label: 'Pressure', value: '965 hPa', sub: 'Falling', color: '#2563eb', icon: Activity, bg: '#eff6ff' },
//         { label: 'Movement', value: 'NNW @ 15 km/h', sub: 'Heading to Coast', color: '#7c3aed', icon: Navigation, bg: '#f5f3ff' },
//         { label: 'Wave Height', value: '4.5 Meters', sub: 'Severe Surge', color: '#0891b2', icon: CloudRain, bg: '#ecfeff' },
//     ];

//     const alerts = [
//         { id: 1, type: 'RED', title: 'Mandatory Evacuation', zone: 'Sector A-D (Coastal)', time: '10m ago' },
//         { id: 2, type: 'ORANGE', title: 'Port Warning Level 4', zone: 'Bandra/Worli Port', time: '25m ago' },
//         { id: 3, type: 'YELLOW', title: 'Power Grid Shutdown', zone: 'Kurla West Region', time: '40m ago' },
//     ];

//     return (
//         <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'Outfit, sans-serif' }}>
//             {/* Page Header */}
//             <div style={{ marginBottom: '26px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <div>
//                     <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
//                         <Wind style={{ width: '32px', height: '32px', color: '#2563eb' }} />
//                         Cyclone Monitoring: <span style={{ color: '#dc2626' }}>"TAUKTAE"</span>
//                     </h1>
//                     <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0, marginTop: '8px', fontWeight: 500 }}>
//                         Real-time tracking, landfall prediction & coordinate deployment
//                     </p>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'white', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
//                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
//                     <span style={{ fontSize: '13px', fontWeight: 700, color: '#16a34a' }}>LIVE TRACKING</span>
//                 </div>
//             </div>

//             {/* Stats Grid */}
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
//                 {cycloneStats.map((stat, i) => (
//                     <div key={i} style={{ padding: '20px', borderRadius: '16px', background: 'white', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
//                         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
//                             <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                 <stat.icon style={{ width: '20px', height: '20px', color: stat.color }} />
//                             </div>
//                             <span style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>IMD-Source</span>
//                         </div>
//                         <p style={{ fontSize: '30px', fontWeight: 800, color: '#0f172a', margin: 0 }}>{stat.value}</p>
//                         <p style={{ fontSize: '14px', fontWeight: 700, color: '#64748b', margin: '4px 0 0' }}>{stat.label}</p>
//                         <p style={{ fontSize: '13px', color: stat.color, margin: '2px 0 0', fontWeight: 600 }}>{stat.sub}</p>
//                     </div>
//                 ))}
//             </div>

//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px' }}>
//                 {/* Visual Tracking Area */}
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//                     <div style={{
//                         height: '450px', background: 'white', border: '1px solid #f1f5f9', borderRadius: '20px',
//                         overflow: 'hidden', position: 'relative', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
//                     }}>
//                         <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, background: 'rgba(255,255,255,0.9)', padding: '12px 18px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
//                             <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Projected Path</h3>
//                             <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Landfall expected: ~4h 30m</p>
//                         </div>

//                         {/* Placeholder for Map visualization */}
//                         <div style={{ width: '100%', height: '100%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
//                             <div style={{
//                                 width: '120px', height: '120px', borderRadius: '50%',
//                                 border: '4px dashed #0369a1', animation: 'spin 10s linear infinite',
//                                 display: 'flex', alignItems: 'center', justifyContent: 'center'
//                             }}>
//                                 <Wind style={{ width: '40px', height: '40px', color: '#0369a1' }} />
//                             </div>
//                             <div style={{ position: 'absolute', width: '300px', height: '4px', background: 'linear-gradient(90deg, transparent, #0369a1, transparent)', transform: 'rotate(-45deg)', opacity: 0.3 }} />
//                             <p style={{ position: 'absolute', bottom: '20px', color: '#0369a1', fontSize: '14px', fontWeight: 700 }}>LIVE DOPPLER RADAR FEED (SIMULATED)</p>
//                         </div>
//                     </div>

//                     <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
//                         <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
//                             <ShieldAlert style={{ width: '20px', height: '20px', color: '#dc2626' }} /> Preparedness Protocol
//                         </h3>
//                         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
//                             {[
//                                 'Secure all glass windows & loose outdoor objects',
//                                 'Mandatory power cut in Category-A risk zones',
//                                 'Pre-position 450 NDRF personnel at Colaba Port',
//                                 'Emergency transport standby for coastal slums',
//                                 'Activate sea-link closure protocols immediately',
//                                 'Verify fuel reserves for hospital generators'
//                             ].map((item, i) => (
//                                 <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
//                                     <CheckCircle2 style={{ width: '16px', height: '16px', color: '#22c55e', flexShrink: 0 }} />
//                                     <span style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>{item}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Sidebar: Announcements & Risk Zones */}
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//                     <div style={{ background: '#fef2f2', padding: '20px', borderRadius: '16px', border: '1px solid #fecaca' }}>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
//                             <AlertTriangle style={{ width: '18px', height: '18px', color: '#dc2626' }} />
//                             <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#991b1b' }}>Critical Alerts</h3>
//                         </div>
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//                             {alerts.map(alert => (
//                                 <div key={alert.id} style={{ padding: '12px', background: 'white', borderRadius: '10px', border: '1px solid #fecaca' }}>
//                                     <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>{alert.title}</p>
//                                     <p style={{ fontSize: '12px', color: '#64748b', margin: 0, fontWeight: 500 }}>{alert.zone} • {alert.time}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
//                         <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Impacted Wards (Predicted)</h3>
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                             {[
//                                 { name: 'Colaba Waterfront', risk: '95%', color: '#dc2626' },
//                                 { name: 'Worli Village', risk: '88%', color: '#dc2626' },
//                                 { name: 'Bandra Reclamation', risk: '72%', color: '#ea580c' },
//                                 { name: 'Juhu Beach Area', risk: '65%', color: '#ea580c' },
//                                 { name: 'Versova Creek', risk: '45%', color: '#d97706' },
//                             ].map((w, i) => (
//                                 <div key={i}>
//                                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
//                                         <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{w.name}</span>
//                                         <span style={{ fontSize: '13px', fontWeight: 700, color: w.color }}>{w.risk}</span>
//                                     </div>
//                                     <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
//                                         <div style={{ width: w.risk, height: '100%', background: w.color, borderRadius: '99px' }} />
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', padding: '20px', borderRadius: '16px', color: 'white' }}>
//                         <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 10px' }}>IMD Official Outlook</h3>
//                         <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
//                             Cyclone "TAUKTAE" has intensified into a Very Severe Cyclonic Storm. Expected to brush Mumbai coast at 22:00 IST. High tide of 4.2m will coincide with peak intensity. Extreme caution advised.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CycloneMonitoring;

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    Wind, Activity, ShieldAlert, Navigation,
    AlertTriangle, CheckCircle2,
    Eye, Map as MapIcon, Zap, Waves,
    ArrowUpRight, Clock
} from 'lucide-react';

const CycloneMonitoring = () => {
    const { t } = useLanguage();
    const [lastUpdated, setLastUpdated] = useState('--');

    // ✅ Live time update every minute
    useEffect(() => {
        const updateTime = () => {
            setLastUpdated(
                new Date().toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit'
                }) + ' IST'
            );
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    const cycloneStats = [
        { label: 'Wind Speed', value: '185', unit: 'km/h', sub: 'Category 3', color: '#dc2626', icon: Wind, bg: '#fef2f2' },
        { label: 'Pressure', value: '965', unit: 'hPa', sub: 'Falling Fast', color: '#2563eb', icon: Activity, bg: '#eff6ff' },
        { label: 'Movement', value: 'NNW', unit: '@ 15 km/h', sub: 'Coastal Bound', color: '#7c3aed', icon: Navigation, bg: '#f5f3ff' },
        { label: 'Wave Height', value: '4.5', unit: 'Meters', sub: 'Severe Surge', color: '#0891b2', icon: Waves, bg: '#ecfeff' },
    ];

    const alerts = [
        { id: 1, type: 'RED', title: 'Mandatory Evacuation', zone: 'Sector A-D (Coastal)', time: '10m ago' },
        { id: 2, type: 'ORANGE', title: 'Port Warning Level 4', zone: 'Bandra/Worli Port', time: '25m ago' },
        { id: 3, type: 'YELLOW', title: 'Power Grid Shutdown', zone: 'Kurla West Region', time: '40m ago' },
    ];

    const isMobile = window.innerWidth < 1024;

    return (
        <div style={{
            padding: '30px',
            maxWidth: '1440px',
            margin: '0 auto',
            fontFamily: "'Outfit', sans-serif",
            backgroundColor: '#f8fafc',
            minHeight: '100vh'
        }}>

            {/* Header */}
            <header style={{
                marginBottom: '32px',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-start' : 'flex-end',
                justifyContent: 'space-between',
                gap: '20px'
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ padding: '8px', background: '#eff6ff', borderRadius: '10px' }}>
                            <Wind size={28} color="#2563eb" />
                        </div>
                        <h1 style={{ fontSize: '28px', fontWeight: 900, margin: 0 }}>
                            Cyclone Tracker: <span style={{ color: '#dc2626' }}>"TAUKTAE"</span>
                        </h1>
                    </div>
                    <p style={{ color: '#64748b', margin: 0 }}>
                        Real-time Doppler metrics, landfall trajectory & preparedness protocols.
                    </p>
                </div>

                <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        background: '#fff',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                    }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#22c55e',
                            animation: 'pulse 2s infinite'
                        }} />
                        <span style={{ fontWeight: 700 }}>LIVE TRACKING</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>
                        Sync: {lastUpdated}
                    </div>
                </div>
            </header>

            {/* Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                {cycloneStats.map((stat, i) => (
                    <div key={i} style={{
                        padding: '24px',
                        borderRadius: '20px',
                        background: '#fff',
                        border: '1px solid #f1f5f9',
                        boxShadow: '0 8px 15px rgba(0,0,0,0.04)'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '15px'
                        }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: stat.bg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <stat.icon size={22} color={stat.color} />
                            </div>
                            <span style={{
                                fontSize: '11px',
                                fontWeight: 800,
                                color: '#94a3b8'
                            }}>IMD</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                            <span style={{ fontSize: '32px', fontWeight: 900 }}>{stat.value}</span>
                            <span style={{ color: '#64748b' }}>{stat.unit}</span>
                        </div>

                        <div style={{ fontWeight: 600, marginTop: '4px' }}>{stat.label}</div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
                            <ArrowUpRight size={14} color={stat.color} />
                            <span style={{ color: stat.color, fontWeight: 600 }}>{stat.sub}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Section */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 360px',
                gap: '30px'
            }}>

                {/* Radar */}
                <div style={{
                    height: '400px',
                    background: '#0f172a',
                    borderRadius: '24px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            width: '140px',
                            height: '140px',
                            borderRadius: '50%',
                            border: '3px solid #2563eb',
                            animation: 'spin 10s linear infinite',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            willChange: 'transform'
                        }}>
                            <Wind size={32} color="#2563eb" />
                        </div>
                    </div>
                </div>

                {/* Alerts */}
                <div style={{
                    background: '#fff',
                    padding: '20px',
                    borderRadius: '20px',
                    border: '1px solid #f1f5f9'
                }}>
                    <h3 style={{ marginBottom: '16px' }}>Critical Alerts</h3>

                    {alerts.map(alert => (
                        <div key={alert.id} style={{
                            padding: '14px',
                            marginBottom: '12px',
                            borderRadius: '12px',
                            background: '#f8fafc',
                            borderLeft: `4px solid ${
                                alert.type === 'RED'
                                    ? '#dc2626'
                                    : alert.type === 'ORANGE'
                                    ? '#ea580c'
                                    : '#eab308'
                            }`
                        }}>
                            <div style={{ fontWeight: 700 }}>{alert.title}</div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '12px',
                                color: '#64748b',
                                marginTop: '4px'
                            }}>
                                <span>{alert.zone}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Clock size={12} />
                                    {alert.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default CycloneMonitoring;