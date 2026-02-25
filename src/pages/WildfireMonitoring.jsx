// import { useState, useEffect } from 'react';
// import { useLanguage } from '../context/LanguageContext';
// import {
//     Flame, Wind, Droplets, Wind as AirIcon,
//     Thermometer, ShieldAlert, AlertTriangle,
//     MapPin, Navigation, Info, Activity,
//     CloudRain
// } from 'lucide-react';

// const WildfireMonitoring = () => {
//     const { t } = useLanguage();
//     const [lastUpdated, setLastUpdated] = useState('--');

//     useEffect(() => {
//         setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST');
//     }, []);

//     const wildfireStats = [
//         { label: 'Active Hotspots', value: '14', sub: 'Aarey Forest Area', color: '#dc2626', icon: Flame, bg: '#fef2f2' },
//         { label: 'Air Quality (AQI)', value: '342', sub: 'Hazardous (Sanjay Gandhi NP)', color: '#9d174d', icon: AirIcon, bg: '#fdf2f8' },
//         { label: 'Fire Spread', value: '4.2 km/h', sub: 'NE Direction', color: '#ea580c', icon: Navigation, bg: '#fff7ed' },
//         { label: 'Relative Humidity', value: '12%', sub: 'Critically Dry', color: '#d97706', icon: Droplets, bg: '#fffbeb' },
//     ];

//     return (
//         <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'Outfit, sans-serif' }}>
//             {/* Page Header */}
//             <div style={{ marginBottom: '26px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <div>
//                     <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
//                         <Flame style={{ width: '32px', height: '32px', color: '#dc2626' }} />
//                         Wildfire & Forest Fire Monitoring
//                     </h1>
//                     <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0, marginTop: '8px', fontWeight: 500 }}>
//                         Satellite hotspot detection, air quality tracking & thermal monitoring
//                     </p>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'white', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
//                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 2s infinite' }} />
//                     <span style={{ fontSize: '13px', fontWeight: 700, color: '#dc2626' }}>ACTIVE MONITORING</span>
//                 </div>
//             </div>

//             {/* Stats Grid */}
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
//                 {wildfireStats.map((stat, i) => (
//                     <div key={i} style={{ padding: '20px', borderRadius: '16px', background: 'white', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
//                         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
//                             <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                 <stat.icon style={{ width: '20px', height: '20px', color: stat.color }} />
//                             </div>
//                             <span style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>NASA FIRMS</span>
//                         </div>
//                         <p style={{ fontSize: '30px', fontWeight: 800, color: '#0f172a', margin: 0 }}>{stat.value}</p>
//                         <p style={{ fontSize: '14px', fontWeight: 700, color: '#64748b', margin: '4px 0 0' }}>{stat.label}</p>
//                         <p style={{ fontSize: '13px', color: stat.color, margin: '2px 0 0', fontWeight: 600 }}>{stat.sub}</p>
//                     </div>
//                 ))}
//             </div>

//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
//                 {/* Visual Analysis Area */}
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//                     <div style={{
//                         height: '420px', background: 'white', border: '1px solid #f1f5f9', borderRadius: '20px',
//                         overflow: 'hidden', position: 'relative', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
//                     }}>
//                         {/* Thermal Map Placeholder */}
//                         <div style={{ width: '100%', height: '100%', background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
//                             <div style={{ width: '100%', height: '100%', opacity: 0.4, background: 'radial-gradient(circle at 40% 40%, #dc2626 0%, transparent 20%), radial-gradient(circle at 60% 50%, #ea580c 0%, transparent 25%), radial-gradient(circle at 45% 65%, #dc2626 0%, transparent 15%)' }} />
//                             <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '10px' }}>
//                                 <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 16px', borderRadius: '10px', color: 'white' }}>
//                                     <p style={{ fontSize: '12px', fontWeight: 600, opacity: 0.7, margin: 0 }}>Thermal Intensity</p>
//                                     <p style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>HIGH <span style={{ fontSize: '12px', color: '#dc2626' }}>●</span></p>
//                                 </div>
//                             </div>
//                             <p style={{ position: 'absolute', bottom: '20px', right: '20px', color: 'white', fontSize: '12px', fontWeight: 600, opacity: 0.5 }}>VIIRS I-Band 375m Satellite Imagery Feed</p>
//                         </div>
//                     </div>

//                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//                         <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
//                             <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                                 <AirIcon style={{ width: '18px', height: '18px', color: '#9d174d' }} /> AQI Health Advisory
//                             </h3>
//                             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                                 <div style={{ padding: '10px 14px', background: '#fdf2f8', borderRadius: '10px', border: '1px solid #fbcfe8' }}>
//                                     <p style={{ fontSize: '13px', color: '#9d174d', fontWeight: 700, margin: '0 0 2px' }}>Severe Hazard</p>
//                                     <p style={{ fontSize: '12px', color: '#be185d', fontWeight: 500, margin: 0 }}>Stay indoors. All residents of Aarey Colony must wear N95 masks if outdoors.</p>
//                                 </div>
//                                 <div style={{ display: 'flex', gap: '8px' }}>
//                                     <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 8px', borderRadius: '6px', background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' }}>No Outdoor Exercise</span>
//                                     <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 8px', borderRadius: '6px', background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' }}>High Particulate Matter</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
//                             <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                                 <Activity style={{ width: '18px', height: '18px', color: '#2563eb' }} /> Containment Status
//                             </h3>
//                             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                     <span style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>Total Containment</span>
//                                     <span style={{ fontSize: '14px', fontWeight: 800, color: '#2563eb' }}>35%</span>
//                                 </div>
//                                 <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
//                                     <div style={{ width: '35%', height: '100%', background: '#2563eb', borderRadius: '99px' }} />
//                                 </div>
//                                 <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500, margin: 0 }}>Estimated full containment: 18 hours</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Sidebar: Hotspots & Teams */}
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//                     <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
//                         <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Identified Hotspots</h3>
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//                             {[
//                                 { name: 'Sanjay Gandhi NP (North)', status: 'Vigorous', color: '#dc2626' },
//                                 { name: 'Aarey West Boundary', status: 'Moderate', color: '#ea580c' },
//                                 { name: 'Yeoor Hills Patch #3', status: 'Smoldering', color: '#d97706' },
//                                 { name: 'Tulsi Lake Perimeter', status: 'New Detection', color: '#dc2626' },
//                             ].map((spot, i) => (
//                                 <div key={i} style={{ padding: '12px', border: '1px solid #f1f5f9', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                                         <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: spot.color }} />
//                                         <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>{spot.name}</span>
//                                     </div>
//                                     <span style={{ fontSize: '11px', fontWeight: 700, color: spot.color, textTransform: 'uppercase' }}>{spot.status}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div style={{ background: '#0f172a', padding: '20px', borderRadius: '16px', color: 'white' }}>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
//                             <ShieldAlert style={{ width: '18px', height: '18px', color: '#ef4444' }} />
//                             <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Deployment Summary</h3>
//                         </div>
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
//                                 <span style={{ opacity: 0.7 }}>Fire Engines</span>
//                                 <span style={{ fontWeight: 700 }}>18 DEPLOYED</span>
//                             </div>
//                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
//                                 <span style={{ opacity: 0.7 }}>NDRF Fire Teams</span>
//                                 <span style={{ fontWeight: 700 }}>12 TEAMS</span>
//                             </div>
//                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
//                                 <span style={{ opacity: 0.7 }}>Aerial Water Tenders</span>
//                                 <span style={{ fontWeight: 700 }}>2 ACTIVE</span>
//                             </div>
//                         </div>
//                     </div>

//                     <div style={{ background: '#fffbeb', padding: '20px', borderRadius: '16px', border: '1px solid #fef3c7' }}>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
//                             <Info style={{ width: '16px', height: '16px', color: '#d97706' }} />
//                             <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#92400e', margin: 0 }}>Weather Impact</h3>
//                         </div>
//                         <p style={{ fontSize: '12px', color: '#92400e', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
//                             Low humidity (12%) and rising winds (18km/h) are creating critical fire conditions. Spontaneous reignition risk is assessed as <strong>VERY HIGH</strong> for next 6 hours.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default WildfireMonitoring;


import React, { useState, useEffect } from 'react';
import { 
    Flame, Wind, Droplets, ShieldAlert, AlertTriangle, 
    MapPin, Navigation, Info, Activity, ShieldCheck,
    Clock, Bell, Settings, ChevronRight, XCircle, Search
} from 'lucide-react';

const WildfireMonitoring = () => {
    const [lastUpdated, setLastUpdated] = useState('--');

    useEffect(() => {
        setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST');
    }, []);

    const wildfireStats = [
        { label: 'Active Hotspots', value: '14', sub: 'Aarey Forest', status: 'High Risk', icon: Flame, color: '#ef4444', bg: '#fef2f2' },
        { label: 'AQI Level', value: '342', sub: 'Hazardous', status: 'Warning', icon: Wind, color: '#ec4899', bg: '#fdf2f8' },
        { label: 'Fire Spread', value: '4.2', unit: 'km/h', sub: 'NE Direction', status: 'Active', icon: Navigation, color: '#f97316', bg: '#fff7ed' },
        { label: 'Humidity', value: '12%', sub: 'Critically Dry', status: 'Danger', icon: Droplets, color: '#eab308', bg: '#fffbeb' },
    ];

    const hotspots = [
        { name: 'Sanjay Gandhi NP (North)', status: 'Vigorous', risk: 'High', color: '#ef4444' },
        { name: 'Aarey West Boundary', status: 'Moderate', risk: 'Medium', color: '#f97316' },
        { name: 'Yeoor Hills Patch #3', status: 'Smoldering', risk: 'Low', color: '#eab308' },
    ];

    const equipment = [
        { name: 'Fire Engines', count: 18, status: 'DEPLOYED', color: '#ef4444', bg: '#fee2e2' },
        { name: 'NDRF Fire Teams', count: 12, status: 'ACTIVE', color: '#16a34a', bg: '#dcfce7' },
        { name: 'Aerial Tenders', count: 2, status: 'IN SERVICE', color: '#2563eb', bg: '#dbeafe' },
    ];

    return (
        <div style={{ 
            backgroundColor: '#f8fafc', 
            minHeight: '100vh', 
            color: '#1e293b', 
            fontFamily: 'Outfit, sans-serif',
            padding: '20px'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                
                {/* --- HEADER --- */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <div>
                        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Flame color="#ef4444" fill="#ef4444" size={30} />
                            Safety Dashboard
                        </h1>
                        <p style={{ color: '#64748b', fontSize: '15px', margin: '6px 0 0', fontWeight: 500 }}>
                            Real-time Satellite & Thermal Intelligence Feed
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ background: '#fff', padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                            <Bell size={22} color="#64748b" />
                        </div>
                        <div style={{ background: '#fff', padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                            <Settings size={22} color="#64748b" />
                        </div>
                    </div>
                </header>

                {/* --- CRITICAL ALERT BANNER (LIGHT) --- */}
                <div style={{ 
                    background: '#fff',
                    border: '2px solid #fee2e2',
                    borderRadius: '20px',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '25px',
                    boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.05)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                        <div style={{ background: '#ef4444', padding: '12px', borderRadius: '14px', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)' }}>
                            <Flame color="white" size={24} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '19px', fontWeight: 800, color: '#991b1b', margin: 0 }}>Severe Fire Warning</h2>
                            <p style={{ margin: '2px 0 0', fontSize: '14px', color: '#b91c1c', fontWeight: 600 }}>
                                Heat signature detected: Warehouse Zone 3 (Aarey Sector)
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                         <button style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>Call 112</button>
                         <button style={{ background: '#f8fafc', color: '#ef4444', border: '1px solid #fee2e2', padding: '10px 20px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>Evacuate</button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '25px' }}>
                    
                    {/* --- MAIN COLUMN --- */}
                    <section>
                        {/* STATS TILES */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '25px' }}>
                            {wildfireStats.map((stat, i) => (
                                <div key={i} style={{ backgroundColor: '#fff', borderRadius: '22px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <div style={{ background: stat.bg, padding: '10px', borderRadius: '12px' }}>
                                            <stat.icon color={stat.color} size={22} />
                                        </div>
                                        <span style={{ fontSize: '12px', fontWeight: 800, color: stat.color, background: stat.bg, padding: '5px 10px', borderRadius: '8px', border: `1px solid ${stat.color}22` }}>
                                            {stat.status}
                                        </span>
                                    </div>
                                    <h3 style={{ fontSize: '32px', color: '#0f172a', margin: 0, fontWeight: 800 }}>{stat.value}<span style={{fontSize: '15px', color: '#64748b', fontWeight: 500, marginLeft: '4px'}}>{stat.unit || ''}</span></h3>
                                    <p style={{ color: '#475569', fontSize: '15px', margin: '6px 0 0', fontWeight: 600 }}>{stat.label}</p>
                                    <p style={{ color: stat.color, fontSize: '13px', margin: '2px 0 0', fontWeight: 700 }}>{stat.sub}</p>
                                </div>
                            ))}
                        </div>

                        {/* MAP AREA (LIGHT) */}
                        <div style={{ backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                            <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Activity size={20} color="#2563eb" /> Live Analytics
                                </h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Updated {lastUpdated}</span>
                                </div>
                            </div>
                            <div style={{ height: '380px', position: 'relative', background: '#f1f5f9' }}>
                                <div style={{ 
                                    width: '100%', height: '100%', opacity: 0.8,
                                    background: 'radial-gradient(circle at 40% 45%, #fecaca 0%, transparent 35%), radial-gradient(circle at 65% 55%, #fed7aa 0%, transparent 40%)'
                                }} />
                                <div style={{ position: 'absolute', top: '20px', left: '20px', background: '#fff', padding: '12px 18px', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                    <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, margin: 0 }}>Active Sensor Feed</p>
                                    <p style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '2px 0 0' }}>Thermal Hotspots: Zone B</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- SIDEBAR (LIGHT) --- */}
                    <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        
                        {/* HOTSPOTS CARD */}
                        <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>Forest Status</h3>
                                <Navigation size={18} color="#94a3b8" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {hotspots.map((spot, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                                        <div style={{ background: spot.risk === 'High' ? '#fee2e2' : '#fef3c7', padding: '10px', borderRadius: '12px' }}>
                                            {spot.risk === 'High' ? <XCircle color="#ef4444" size={20} /> : <AlertTriangle color="#d97706" size={20} />}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#334155', margin: 0 }}>{spot.name}</p>
                                            <p style={{ fontSize: '12px', color: spot.color, margin: 0, fontWeight: 700, textTransform: 'uppercase' }}>{spot.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* EQUIPMENT STATUS */}
                        <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                            <h3 style={{ margin: '0 0 20px 0', fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>Unit Deployment</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                {equipment.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: i !== 2 ? '1px solid #f1f5f9' : 'none' }}>
                                        <div>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#334155', margin: 0 }}>{item.name}</p>
                                            <p style={{ fontSize: '12px', color: '#64748b', margin: 0, fontWeight: 500 }}>{item.count} Units active</p>
                                        </div>
                                        <span style={{ fontSize: '11px', fontWeight: 800, color: item.color, background: item.bg, padding: '6px 10px', borderRadius: '8px', border: `1px solid ${item.color}22` }}>
                                            {item.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FORECAST BOX */}
                        <div style={{ background: '#eff6ff', borderRadius: '24px', padding: '24px', border: '1px solid #dbeafe' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                <Wind size={20} color="#2563eb" />
                                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#1e40af' }}>Conditions Alert</h4>
                            </div>
                            <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#1e40af', margin: 0, fontWeight: 500 }}>
                                Increasing NE winds and low humidity forecast for the next 12 hours. Reignite risk: <b style={{fontWeight: 800}}>CRITICAL</b>.
                            </p>
                        </div>

                    </aside>
                </div>

                {/* --- BOTTOM NAVIGATION (LIGHT) --- */}
                <nav style={{ 
                    marginTop: '40px', 
                    backgroundColor: '#fff', 
                    borderRadius: '24px', 
                    padding: '16px 40px', 
                    display: 'flex', 
                    justifyContent: 'space-around',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: '#ef4444', cursor: 'pointer' }}>
                        <Activity size={24} />
                        <span style={{ fontSize: '11px', fontWeight: 800 }}>Dashboard</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: '#94a3b8', cursor: 'pointer' }}>
                        <ShieldAlert size={24} />
                        <span style={{ fontSize: '11px', fontWeight: 800 }}>Equipment</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: '#94a3b8', cursor: 'pointer' }}>
                        <MapPin size={24} />
                        <span style={{ fontSize: '11px', fontWeight: 800 }}>Locations</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: '#94a3b8', cursor: 'pointer' }}>
                        <Search size={24} />
                        <span style={{ fontSize: '11px', fontWeight: 800 }}>Search</span>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default WildfireMonitoring;