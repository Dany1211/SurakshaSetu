import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PlanPanel from '../components/PlanPanel';
import {
    MapPin, Users, Clock, Shield, Sparkles, AlertTriangle,
    Building2, Navigation, Phone, CheckCircle2
} from 'lucide-react';

// ---- Shelter Data ----
const shelters = [
    { id: 1, name: 'Town Hall Community Center', area: 'Kurla', capacity: 500, current: 87, status: 'Open', supplies: true, medical: true },
    { id: 2, name: 'Primary School #3', area: 'Andheri', capacity: 300, current: 0, status: 'Ready', supplies: true, medical: false },
    { id: 3, name: 'District Sports Complex', area: 'Sion', capacity: 800, current: 234, status: 'Open', supplies: true, medical: true },
    { id: 4, name: 'Municipal School #7', area: 'Dadar', capacity: 250, current: 0, status: 'Ready', supplies: true, medical: false },
    { id: 5, name: 'Bandra Community Hall', area: 'Bandra', capacity: 350, current: 145, status: 'Filling', supplies: true, medical: true },
    { id: 6, name: 'Borivali Relief Camp', area: 'Borivali', capacity: 200, current: 0, status: 'Ready', supplies: false, medical: false },
];

// ---- Route Data ----
const evacuationRoutes = [
    { id: 1, from: 'Kurla West', to: 'Town Hall Community Center', distance: '2.3 km', time: '8 min', road: 'LBS Marg → CST Road', status: 'Clear' },
    { id: 2, from: 'Andheri West', to: 'Primary School #3', distance: '1.8 km', time: '6 min', road: 'SV Road → Link Road', status: 'Clear' },
    { id: 3, from: 'Sion', to: 'District Sports Complex', distance: '1.5 km', time: '5 min', road: 'Eastern Express Hwy', status: 'Clear' },
    { id: 4, from: 'Dadar', to: 'Municipal School #7', distance: '1.1 km', time: '4 min', road: 'Tilak Bridge Road', status: 'Waterlogged' },
    { id: 5, from: 'Bandra East', to: 'Bandra Community Hall', distance: '2.0 km', time: '7 min', road: 'Swami Vivekanand Rd', status: 'Clear' },
];



// ===========================================================
//  Shelter Card
// ===========================================================
const ShelterCard = ({ shelter }) => {
    const occupancy = shelter.capacity > 0 ? Math.round((shelter.current / shelter.capacity) * 100) : 0;
    const statusColor = shelter.status === 'Open' ? '#16a34a' : shelter.status === 'Filling' ? '#d97706' : '#3b82f6';
    const barColor = occupancy > 80 ? '#ef4444' : occupancy > 50 ? '#f59e0b' : '#22c55e';

    return (
        <div style={{
            padding: '14px 16px', borderRadius: '12px', background: 'white',
            border: '1px solid #f1f5f9', fontFamily: 'Outfit, sans-serif',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building2 style={{ width: '14px', height: '14px', color: '#64748b' }} />
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>{shelter.name}</span>
                </div>
                <span style={{
                    fontSize: '9px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px',
                    color: statusColor, background: `${statusColor}10`, border: `1px solid ${statusColor}30`,
                    textTransform: 'uppercase',
                }}>
                    {shelter.status}
                </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <MapPin style={{ width: '10px', height: '10px', color: '#94a3b8' }} />
                <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>{shelter.area}</span>
                <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, marginLeft: 'auto' }}>
                    {shelter.current} / {shelter.capacity} people
                </span>
            </div>

            {/* Capacity bar */}
            <div style={{ height: '4px', borderRadius: '999px', background: '#f1f5f9', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{
                    height: '100%', width: `${occupancy}%`, borderRadius: '999px',
                    background: barColor, transition: 'width 0.5s ease',
                }} />
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '6px' }}>
                {shelter.supplies && (
                    <span style={{ fontSize: '8px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>
                        ✓ Supplies
                    </span>
                )}
                {shelter.medical && (
                    <span style={{ fontSize: '8px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
                        ✓ Medical
                    </span>
                )}
            </div>
        </div>
    );
};

// ===========================================================
//  Route Card
// ===========================================================
const RouteCard = ({ route }) => {
    const isBlocked = route.status === 'Waterlogged';
    return (
        <div style={{
            padding: '12px 16px', borderRadius: '10px',
            background: isBlocked ? '#fffbeb' : 'white',
            border: `1px solid ${isBlocked ? '#fde68a' : '#f1f5f9'}`,
            fontFamily: 'Outfit, sans-serif', display: 'flex', alignItems: 'center', gap: '12px',
        }}>
            {/* Route arrow */}
            <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', flexShrink: 0,
            }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', border: '2px solid white', boxShadow: '0 0 0 1px #fecaca' }} />
                <div style={{ width: '1.5px', height: '20px', background: isBlocked ? '#f59e0b' : '#22c55e' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', border: '2px solid white', boxShadow: '0 0 0 1px #bbf7d0' }} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a' }}>{route.from} → {route.to}</span>
                </div>
                <p style={{ fontSize: '10px', color: '#64748b', margin: 0, fontWeight: 500 }}>
                    via {route.road} • {route.distance} • ~{route.time}
                </p>
            </div>

            <span style={{
                fontSize: '8px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px',
                textTransform: 'uppercase', flexShrink: 0,
                background: isBlocked ? '#fef3c7' : '#f0fdf4',
                color: isBlocked ? '#d97706' : '#16a34a',
                border: `1px solid ${isBlocked ? '#fde68a' : '#bbf7d0'}`,
            }}>
                {isBlocked ? '⚠ Waterlogged' : '✓ Clear'}
            </span>
        </div>
    );
};



// ===========================================================
//  Emergency Contacts
// ===========================================================
const EmergencyContacts = () => (
    <div style={{
        background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
        padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)', fontFamily: 'Outfit, sans-serif',
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Phone style={{ width: '14px', height: '14px', color: '#dc2626' }} />
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Emergency Helplines</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
                { name: 'NDRF Control Room', number: '011-24363260' },
                { name: 'Mumbai BMC Disaster', number: '1916' },
                { name: 'Police Emergency', number: '100' },
                { name: 'Ambulance', number: '108' },
            ].map((c, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: i < 3 ? '1px solid #f8fafc' : 'none' }}>
                    <span style={{ fontSize: '11px', fontWeight: 500, color: '#64748b' }}>{c.name}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', fontVariantNumeric: 'tabular-nums' }}>{c.number}</span>
                </div>
            ))}
        </div>
    </div>
);

// ===========================================================
//  MAIN PAGE
// ===========================================================
const EvacuationPlanning = () => {
    const { t } = useLanguage();

    return (
        <div style={{
            padding: '20px', maxWidth: '1400px', margin: '0 auto',
            fontFamily: 'Outfit, sans-serif',
        }}>
            {/* Page Header */}
            <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Sparkles style={{ width: '22px', height: '22px', color: '#2563eb' }} />
                    {t('menu.evacuation_planning')}
                </h1>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, marginTop: '4px', fontWeight: 500 }}>
                    AI-generated evacuation plans, shelter status, routes & resource deployment
                </p>
            </div>

            {/* ---- AI Plan (main component) ---- */}
            <div style={{ marginBottom: '16px' }}>
                <PlanPanel />
            </div>

            {/* ---- ROW: Shelters + Routes side by side ---- */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                {/* Shelters */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                        background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
                        padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)', height: '100%',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                            <div>
                                <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                                    Designated Shelters
                                </h2>
                                <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>
                                    {shelters.length} shelters • {shelters.reduce((a, s) => a + s.capacity, 0)} total capacity
                                </p>
                            </div>
                            <Building2 style={{ width: '16px', height: '16px', color: '#64748b' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {shelters.map(s => (
                                <ShelterCard key={s.id} shelter={s} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Routes + Resources side column */}
                <div style={{ width: '420px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Evacuation Routes */}
                    <div style={{
                        background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
                        padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                            <div>
                                <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                                    Evacuation Routes
                                </h2>
                                <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>
                                    Road status for each ward → shelter path
                                </p>
                            </div>
                            <Navigation style={{ width: '16px', height: '16px', color: '#64748b' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {evacuationRoutes.map(r => (
                                <RouteCard key={r.id} route={r} />
                            ))}
                        </div>
                    </div>



                    {/* Emergency Contacts */}
                    <EmergencyContacts />
                </div>
            </div>
        </div>
    );
};

export default EvacuationPlanning;
