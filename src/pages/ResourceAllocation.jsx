import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    Users, Truck, Navigation, HeartPulse, Shield, Package,
    MapPin, AlertTriangle, CheckCircle2, Clock, Phone,
    Droplets, Utensils, Zap, Radio, Wrench, Building2
} from 'lucide-react';

// ===========================================================
//  DATA
// ===========================================================

// Summary stats
const summaryStats = [
    { label: 'Total Vehicles', value: 46, sub: 'Buses, Boats, Ambulances', icon: Truck, color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
    { label: 'Active Personnel', value: 184, sub: '23 teams deployed', icon: Users, color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
    { label: 'Supply Points', value: 6, sub: '4 active, 2 standby', icon: Package, color: '#0ea5e9', bg: '#f0f9ff', border: '#bae6fd' },
    { label: 'Response Time', value: '18 min', sub: 'avg across all wards', icon: Clock, color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
];

// Vehicle fleet
const vehicles = [
    { type: 'Municipal Buses', deployed: 18, total: 24, icon: Truck, color: '#2563eb', locations: 'Kurla (6), Andheri (5), Sion (4), Dadar (3)' },
    { type: 'Rescue Boats', deployed: 8, total: 12, icon: Navigation, color: '#0ea5e9', locations: 'Kurla (3), Sion (3), Bandra (2)' },
    { type: 'Ambulances', deployed: 6, total: 10, icon: HeartPulse, color: '#dc2626', locations: 'Town Hall (2), Sports Complex (2), Community Hall (2)' },
    { type: 'Fire Trucks', deployed: 3, total: 5, icon: Zap, color: '#f59e0b', locations: 'Andheri (1), Dadar (1), Borivali (1)' },
    { type: 'Water Tankers', deployed: 4, total: 6, icon: Droplets, color: '#06b6d4', locations: 'Kurla (2), Sion (1), Bandra (1)' },
    { type: 'Relief Vans', deployed: 3, total: 4, icon: Package, color: '#8b5cf6', locations: 'Town Hall (1), School #3 (1), Sports Complex (1)' },
];

// Ward allocation
const wardAllocations = [
    { ward: 'Kurla West', risk: 'HIGH', buses: 6, boats: 3, ambulances: 2, teams: 6, status: 'Active', eta: '8 min' },
    { ward: 'Andheri West', risk: 'HIGH', buses: 5, boats: 0, ambulances: 1, teams: 4, status: 'Active', eta: '12 min' },
    { ward: 'Sion', risk: 'MEDIUM', buses: 4, boats: 3, ambulances: 2, teams: 4, status: 'Active', eta: '10 min' },
    { ward: 'Dadar', risk: 'MEDIUM', buses: 3, boats: 0, ambulances: 1, teams: 3, status: 'Standby', eta: '15 min' },
    { ward: 'Bandra East', risk: 'MEDIUM', buses: 0, boats: 2, ambulances: 0, teams: 3, status: 'Standby', eta: '18 min' },
    { ward: 'Borivali', risk: 'LOW', buses: 0, boats: 0, ambulances: 0, teams: 2, status: 'Monitoring', eta: '25 min' },
    { ward: 'Colaba', risk: 'LOW', buses: 0, boats: 0, ambulances: 0, teams: 1, status: 'Monitoring', eta: '30 min' },
];

// Supply inventory
const supplies = [
    { name: 'Meal Packs', available: 3200, needed: 5000, unit: 'packs', icon: Utensils, color: '#f59e0b' },
    { name: 'Drinking Water', available: 8500, needed: 10000, unit: 'liters', icon: Droplets, color: '#0ea5e9' },
    { name: 'First Aid Kits', available: 120, needed: 150, unit: 'kits', icon: HeartPulse, color: '#dc2626' },
    { name: 'Blankets', available: 800, needed: 1200, unit: 'units', icon: Package, color: '#7c3aed' },
    { name: 'Tarpaulins', available: 200, needed: 300, unit: 'sheets', icon: Building2, color: '#64748b' },
    { name: 'Power Banks', available: 90, needed: 200, unit: 'units', icon: Zap, color: '#16a34a' },
];

// Personnel teams
const teams = [
    { name: 'NDRF Alpha Team', members: 12, location: 'Kurla West', status: 'Active', type: 'Rescue' },
    { name: 'NDRF Bravo Team', members: 12, location: 'Sion', status: 'Active', type: 'Rescue' },
    { name: 'BMC Rescue Unit 1', members: 8, location: 'Andheri West', status: 'Active', type: 'Rescue' },
    { name: 'BMC Rescue Unit 2', members: 8, location: 'Bandra East', status: 'Standby', type: 'Rescue' },
    { name: 'Medical Team A', members: 6, location: 'Town Hall Shelter', status: 'Active', type: 'Medical' },
    { name: 'Medical Team B', members: 6, location: 'Sports Complex', status: 'Active', type: 'Medical' },
    { name: 'Police Patrol Unit', members: 15, location: 'Dadar', status: 'Active', type: 'Security' },
    { name: 'Fire Brigade Unit', members: 10, location: 'Borivali', status: 'Standby', type: 'Fire' },
    { name: 'Volunteer Group 1', members: 20, location: 'Primary School #3', status: 'Active', type: 'Support' },
    { name: 'Comm Relay Team', members: 4, location: 'Command Center', status: 'Active', type: 'Comms' },
];

// ===========================================================
//  SUB-COMPONENTS
// ===========================================================

const StatusBadge = ({ status }) => {
    const styles = {
        Active: { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
        Standby: { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
        Monitoring: { bg: '#f8fafc', color: '#64748b', border: '#e2e8f0' },
    };
    const s = styles[status] || styles.Monitoring;
    return (
        <span style={{
            fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '6px',
            background: s.bg, color: s.color, border: `1px solid ${s.border}`, textTransform: 'uppercase',
            letterSpacing: '0.05em'
        }}>{status}</span>
    );
};

const RiskBadge = ({ risk }) => {
    const styles = {
        HIGH: { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
        MEDIUM: { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
        LOW: { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
    };
    const s = styles[risk] || styles.LOW;
    return (
        <span style={{
            fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '6px',
            background: s.bg, color: s.color, border: `1px solid ${s.border}`, textTransform: 'uppercase',
            letterSpacing: '0.05em'
        }}>{risk}</span>
    );
};

const TypeBadge = ({ type }) => {
    const colors = {
        Rescue: '#2563eb', Medical: '#dc2626', Security: '#7c3aed',
        Fire: '#f59e0b', Support: '#16a34a', Comms: '#0ea5e9',
    };
    return (
        <span style={{
            fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px',
            background: `${colors[type] || '#64748b'}10`, color: colors[type] || '#64748b',
            border: `1px solid ${colors[type] || '#64748b'}30`,
            textTransform: 'uppercase', letterSpacing: '0.06em'
        }}>{type}</span>
    );
};

// ===========================================================
//  MAIN PAGE
// ===========================================================
const ResourceAllocation = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'vehicles', label: 'Vehicle Fleet' },
        { id: 'supplies', label: 'Supplies' },
        { id: 'personnel', label: 'Personnel' },
    ];

    return (
        <div style={{
            padding: '20px', maxWidth: '1400px', margin: '0 auto',
            fontFamily: 'Outfit, sans-serif',
        }}>
            {/* Page Header */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Users style={{ width: '28px', height: '28px', color: '#2563eb' }} />
                    {t('menu.resource_allocation')}
                </h1>
                <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0, marginTop: '10px', fontWeight: 500 }}>
                    Vehicle fleet, supplies, personnel deployment & ward-level allocation
                </p>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
                {summaryStats.map((stat, i) => (
                    <div key={i} style={{
                        padding: '20px 24px', borderRadius: '16px', background: 'white',
                        border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                            <div style={{
                                width: '42px', height: '42px', borderRadius: '12px',
                                background: stat.bg, border: `1px solid ${stat.border}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <stat.icon style={{ width: '20px', height: '20px', color: stat.color }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
                                <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a' }}>LIVE</span>
                            </div>
                        </div>
                        <p style={{ fontSize: '30px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>{stat.value}</p>
                        <p style={{ fontSize: '14px', fontWeight: 700, color: '#334155', margin: '4px 0 0' }}>{stat.label}</p>
                        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '2px 0 0', fontWeight: 500 }}>{stat.sub}</p>
                    </div>
                ))}
            </div>

            {/* Tab Bar */}
            <div style={{
                display: 'flex', gap: '4px', marginBottom: '16px', padding: '4px',
                background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9', width: 'fit-content',
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 700,
                            cursor: 'pointer', border: 'none', fontFamily: 'Outfit, sans-serif',
                            background: activeTab === tab.id ? 'white' : 'transparent',
                            color: activeTab === tab.id ? '#2563eb' : '#64748b',
                            boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                            transition: 'all 0.15s ease',
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* =============== TAB: OVERVIEW =============== */}
            {activeTab === 'overview' && (
                <div style={{ display: 'flex', gap: '16px' }}>
                    {/* Ward Allocation Table */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                            background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
                            padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <div>
                                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Ward-Level Allocation</h2>
                                    <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>Resources assigned per ward</p>
                                </div>
                                <MapPin style={{ width: '20px', height: '20px', color: '#64748b' }} />
                            </div>

                            {/* Table Header */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: '160px 80px 60px 60px 60px 60px 90px 70px',
                                gap: '10px', padding: '12px 14px', borderRadius: '8px', background: '#f8fafc',
                                marginBottom: '6px',
                            }}>
                                {['Ward', 'Risk', 'Buses', 'Boats', 'Amb.', 'Teams', 'Status', 'ETA'].map(h => (
                                    <span key={h} style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</span>
                                ))}
                            </div>

                            {/* Table Rows */}
                            {wardAllocations.map((w, i) => (
                                <div key={i} style={{
                                    display: 'grid', gridTemplateColumns: '160px 80px 60px 60px 60px 60px 90px 70px',
                                    gap: '10px', padding: '14px 14px', alignItems: 'center',
                                    borderBottom: i < wardAllocations.length - 1 ? '1px solid #f8fafc' : 'none',
                                }}>
                                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{w.ward}</span>
                                    <RiskBadge risk={w.risk} />
                                    <span style={{ fontSize: '15px', fontWeight: 600, color: w.buses > 0 ? '#0f172a' : '#cbd5e1' }}>{w.buses}</span>
                                    <span style={{ fontSize: '15px', fontWeight: 600, color: w.boats > 0 ? '#0f172a' : '#cbd5e1' }}>{w.boats}</span>
                                    <span style={{ fontSize: '15px', fontWeight: 600, color: w.ambulances > 0 ? '#0f172a' : '#cbd5e1' }}>{w.ambulances}</span>
                                    <span style={{ fontSize: '15px', fontWeight: 600, color: w.teams > 0 ? '#0f172a' : '#cbd5e1' }}>{w.teams}</span>
                                    <StatusBadge status={w.status} />
                                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748b' }}>{w.eta}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Resource Sidebar */}
                    <div style={{ width: '320px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Vehicle Summary */}
                        <div style={{
                            background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
                            padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                        }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Truck style={{ width: '18px', height: '18px', color: '#2563eb' }} /> Fleet Status
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {vehicles.slice(0, 4).map((v, i) => {
                                    const pct = Math.round((v.deployed / v.total) * 100);
                                    return (
                                        <div key={i}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <v.icon style={{ width: '16px', height: '16px', color: v.color }} />
                                                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#334155' }}>{v.type}</span>
                                                </div>
                                                <span style={{ fontSize: '15px', fontWeight: 800, color: v.color }}>{v.deployed}/{v.total}</span>
                                            </div>
                                            <div style={{ height: '5px', borderRadius: '999px', background: '#f1f5f9', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', width: `${pct}%`, borderRadius: '999px', background: v.color, transition: 'width 0.5s ease' }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Critical Supplies */}
                        <div style={{
                            background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
                            padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                        }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Package style={{ width: '18px', height: '18px', color: '#0ea5e9' }} /> Supply Levels
                            </h3>
                            {supplies.slice(0, 4).map((s, i) => {
                                const pct = Math.round((s.available / s.needed) * 100);
                                const isLow = pct < 50;
                                return (
                                    <div key={i} style={{ marginBottom: i < 3 ? '12px' : 0 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>{s.name}</span>
                                            <span style={{ fontSize: '13px', fontWeight: 600, color: isLow ? '#dc2626' : '#64748b' }}>
                                                {s.available.toLocaleString()}/{s.needed.toLocaleString()} {s.unit}
                                            </span>
                                        </div>
                                        <div style={{ height: '4px', borderRadius: '999px', background: '#f1f5f9', overflow: 'hidden' }}>
                                            <div style={{
                                                height: '100%', width: `${pct}%`, borderRadius: '999px',
                                                background: isLow ? '#ef4444' : '#22c55e', transition: 'width 0.5s ease',
                                            }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Emergency Contacts */}
                        <div style={{
                            background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
                            padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <Phone style={{ width: '20px', height: '20px', color: '#dc2626' }} />
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Helplines</h3>
                            </div>
                            {[
                                { name: 'NDRF Control Room', number: '011-24363260' },
                                { name: 'BMC Disaster Cell', number: '1916' },
                                { name: 'Police Emergency', number: '100' },
                                { name: 'Ambulance', number: '108' },
                            ].map((c, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 3 ? '1px solid #f8fafc' : 'none' }}>
                                    <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>{c.name}</span>
                                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', fontVariantNumeric: 'tabular-nums' }}>{c.number}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* =============== TAB: VEHICLES =============== */}
            {activeTab === 'vehicles' && (
                <div style={{
                    background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
                    padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div>
                            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Vehicle Fleet Breakdown</h2>
                            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>All vehicles with deployment locations</p>
                        </div>
                        <Truck style={{ width: '20px', height: '20px', color: '#64748b' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        {vehicles.map((v, i) => {
                            const pct = Math.round((v.deployed / v.total) * 100);
                            const remaining = v.total - v.deployed;
                            return (
                                <div key={i} style={{
                                    padding: '18px', borderRadius: '12px', border: '1px solid #f1f5f9',
                                    background: '#fafbfc',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: '48px', height: '48px', borderRadius: '12px',
                                                background: `${v.color}10`, border: `1px solid ${v.color}25`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                <v.icon style={{ width: '22px', height: '22px', color: v.color }} />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{v.type}</p>
                                                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>
                                                    {remaining > 0 ? `${remaining} in reserve` : 'All deployed'}
                                                </p>
                                            </div>
                                        </div>
                                        <span style={{ fontSize: '28px', fontWeight: 800, color: v.color }}>{v.deployed}<span style={{ fontSize: '16px', color: '#94a3b8', fontWeight: 500 }}>/{v.total}</span></span>
                                    </div>
                                    <div style={{ height: '8px', borderRadius: '999px', background: '#f1f5f9', overflow: 'hidden', marginBottom: '12px' }}>
                                        <div style={{ height: '100%', width: `${pct}%`, borderRadius: '999px', background: v.color, transition: 'width 0.5s ease' }} />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <MapPin style={{ width: '16px', height: '16px', color: '#94a3b8' }} />
                                        <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>{v.locations}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* =============== TAB: SUPPLIES =============== */}
            {activeTab === 'supplies' && (
                <div style={{
                    background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
                    padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div>
                            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Supply Inventory</h2>
                            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>Stock levels at all relief points</p>
                        </div>
                        <Package style={{ width: '20px', height: '20px', color: '#64748b' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        {supplies.map((s, i) => {
                            const pct = Math.round((s.available / s.needed) * 100);
                            const isLow = pct < 50;
                            const isCritical = pct < 30;
                            return (
                                <div key={i} style={{
                                    padding: '20px', borderRadius: '12px',
                                    border: `1px solid ${isCritical ? '#fecaca' : '#f1f5f9'}`,
                                    background: isCritical ? '#fef2f2' : '#fafbfc',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <s.icon style={{ width: '22px', height: '22px', color: s.color }} />
                                            <span style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>{s.name}</span>
                                        </div>
                                        {isCritical && (
                                            <span style={{
                                                fontSize: '12px', fontWeight: 700, padding: '4px 8px', borderRadius: '4px',
                                                background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca',
                                            }}>LOW STOCK</span>
                                        )}
                                    </div>
                                    <p style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
                                        {s.available.toLocaleString()}
                                        <span style={{ fontSize: '16px', color: '#94a3b8', fontWeight: 600 }}> / {s.needed.toLocaleString()} {s.unit}</span>
                                    </p>
                                    <div style={{ height: '8px', borderRadius: '999px', background: '#f1f5f9', overflow: 'hidden', marginTop: '16px' }}>
                                        <div style={{
                                            height: '100%', width: `${pct}%`, borderRadius: '999px',
                                            background: isCritical ? '#ef4444' : isLow ? '#f59e0b' : '#22c55e',
                                            transition: 'width 0.5s ease',
                                        }} />
                                    </div>
                                    <p style={{ fontSize: '14px', color: isLow ? '#dc2626' : '#64748b', margin: '12px 0 0', fontWeight: 600 }}>
                                        {pct}% stocked {isLow ? '— needs replenishment' : ''}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* =============== TAB: PERSONNEL =============== */}
            {activeTab === 'personnel' && (
                <div style={{
                    background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
                    padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div>
                            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Team Deployment</h2>
                            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>{teams.length} teams • {teams.reduce((a, t) => a + t.members, 0)} total personnel</p>
                        </div>
                        <Shield style={{ width: '20px', height: '20px', color: '#64748b' }} />
                    </div>

                    {/* Table Header */}
                    <div style={{
                        display: 'grid', gridTemplateColumns: '220px 100px 100px 180px 100px',
                        gap: '12px', padding: '12px 14px', borderRadius: '8px', background: '#f8fafc', marginBottom: '8px',
                    }}>
                        {['Team Name', 'Members', 'Type', 'Location', 'Status'].map(h => (
                            <span key={h} style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</span>
                        ))}
                    </div>

                    {teams.map((team, i) => (
                        <div key={i} style={{
                            display: 'grid', gridTemplateColumns: '220px 100px 100px 180px 100px',
                            gap: '12px', padding: '16px 14px', alignItems: 'center',
                            borderBottom: i < teams.length - 1 ? '1px solid #f8fafc' : 'none',
                        }}>
                            <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{team.name}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Users style={{ width: '14px', height: '14px', color: '#94a3b8' }} />
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>{team.members}</span>
                            </div>
                            <TypeBadge type={team.type} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <MapPin style={{ width: '14px', height: '14px', color: '#94a3b8' }} />
                                <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748b' }}>{team.location}</span>
                            </div>
                            <StatusBadge status={team.status} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResourceAllocation;
