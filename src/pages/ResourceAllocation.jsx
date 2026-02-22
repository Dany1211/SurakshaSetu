import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    Users, Truck, Navigation, HeartPulse, Shield, Package,
    MapPin, AlertTriangle, CheckCircle2, Clock, Phone,
    Droplets, Utensils, Zap, Radio, Wrench, Building2, ChevronRight, Activity, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ===========================================================
//  DATA
// ===========================================================

const summaryStats = [
    { label: 'Fleet Assets', value: 46, sub: 'Buses, Boats, Specialty', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50/50', border: 'border-blue-100/50' },
    { label: 'Active Personnel', value: 184, sub: '23 teams deployed', icon: Users, color: 'text-violet-600', bg: 'bg-violet-50/50', border: 'border-violet-100/50' },
    { label: 'Distribution Points', value: 6, sub: '4 active, 2 standby', icon: Package, color: 'text-cyan-600', bg: 'bg-cyan-50/50', border: 'border-cyan-100/50' },
    { label: 'Avg Latency', value: '18 min', sub: 'Response time (all wards)', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50/50', border: 'border-emerald-100/50' },
];

const vehicles = [
    { type: 'Municipal Buses', deployed: 18, total: 24, icon: Truck, color: '#2563eb', locations: 'Kurla (6), Andheri (5), Sion (4), Dadar (3)' },
    { type: 'Rescue Boats', deployed: 8, total: 12, icon: Navigation, color: '#0ea5e9', locations: 'Kurla (3), Sion (3), Bandra (2)' },
    { type: 'Ambulances', deployed: 6, total: 10, icon: HeartPulse, color: '#dc2626', locations: 'Town Hall (2), Sports Complex (2), Community Hall (2)' },
    { type: 'Fire Trucks', deployed: 3, total: 5, icon: Zap, color: '#f59e0b', locations: 'Andheri (1), Dadar (1), Borivali (1)' },
    { type: 'Water Tankers', deployed: 4, total: 6, icon: Droplets, color: '#06b6d4', locations: 'Kurla (2), Sion (1), Bandra (1)' },
    { type: 'Relief Vans', deployed: 3, total: 4, icon: Package, color: '#8b5cf6', locations: 'Town Hall (1), School #3 (1), Sports Complex (1)' },
];

const wardAllocations = [
    { ward: 'Kurla West', risk: 'HIGH', buses: 6, boats: 3, ambulances: 2, teams: 6, status: 'Active', eta: '8 min' },
    { ward: 'Andheri West', risk: 'HIGH', buses: 5, boats: 0, ambulances: 1, teams: 4, status: 'Active', eta: '12 min' },
    { ward: 'Sion', risk: 'MEDIUM', buses: 4, boats: 3, ambulances: 2, teams: 4, status: 'Active', eta: '10 min' },
    { ward: 'Dadar', risk: 'MEDIUM', buses: 3, boats: 0, ambulances: 1, teams: 3, status: 'Standby', eta: '15 min' },
    { ward: 'Bandra East', risk: 'MEDIUM', buses: 0, boats: 2, ambulances: 0, teams: 3, status: 'Standby', eta: '18 min' },
    { ward: 'Borivali', risk: 'LOW', buses: 0, boats: 0, ambulances: 0, teams: 2, status: 'Monitoring', eta: '25 min' },
];

const supplies = [
    { name: 'Emergency Rations', available: 3200, needed: 5000, unit: 'packs', icon: Utensils, color: '#f59e0b' },
    { name: 'Potable Water', available: 8500, needed: 10000, unit: 'liters', icon: Droplets, color: '#0ea5e9' },
    { name: 'Trauma Kits', available: 120, needed: 150, unit: 'kits', icon: HeartPulse, color: '#dc2626' },
    { name: 'Shelter Kits', available: 800, needed: 1200, unit: 'units', icon: Package, color: '#7c3aed' },
    { name: 'Survival Gear', available: 200, needed: 300, unit: 'sheets', icon: Shield, color: '#64748b' },
    { name: 'Power Units', available: 90, needed: 200, unit: 'units', icon: Zap, color: '#16a34a' },
];

const teams = [
    { name: 'NDRF Alpha Team', members: 12, location: 'Kurla West', status: 'Active', type: 'Rescue' },
    { name: 'NDRF Bravo Team', members: 12, location: 'Sion', status: 'Active', type: 'Rescue' },
    { name: 'BMC Rescue Unit 1', members: 8, location: 'Andheri West', status: 'Active', type: 'Rescue' },
    { name: 'BMC Rescue Unit 2', members: 8, location: 'Bandra East', status: 'Standby', type: 'Rescue' },
    { name: 'Medical Team A', members: 6, location: 'Town Hall Shelter', status: 'Active', type: 'Medical' },
    { name: 'Police Patrol Unit', members: 15, location: 'Dadar', status: 'Active', type: 'Security' },
];

// ===========================================================
//  HELPER COMPONENTS
// ===========================================================

const StatusPill = ({ status }) => {
    const config = {
        Active: 'text-emerald-600 bg-emerald-50 border-emerald-100',
        Standby: 'text-amber-600 bg-amber-50 border-amber-100',
        Monitoring: 'text-slate-500 bg-slate-50 border-slate-100',
    };
    return (
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${config[status] || config.Monitoring}`}>
            {status}
        </span>
    );
};

const ResourceAllocation = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'METRICS' },
        { id: 'vehicles', label: 'FLEET' },
        { id: 'supplies', label: 'INVENTORY' },
        { id: 'personnel', label: 'DEPLOYMENT' },
    ];

    return (
        <div className="p-8 max-w-[1700px] mx-auto space-y-8 animate-fadeInUp">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                        <h1 className="text-[28px] font-black text-slate-900 tracking-tight leading-none">
                            Operational Logistics
                        </h1>
                    </div>
                    <p className="text-[14px] font-bold text-slate-400 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Resource Distribution & Capability Mapping
                    </p>
                </div>

                <div className="flex p-1 bg-slate-100/50 rounded-2xl border border-slate-100 backdrop-blur-sm self-start">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                px-6 py-2 rounded-xl text-[11px] font-black tracking-widest transition-all
                                ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50' : 'text-slate-400 hover:text-slate-600'}
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryStats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className={`p-3 rounded-2xl border ${stat.bg} ${stat.color} ${stat.border}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-[8px] font-black text-emerald-600 tracking-widest border border-emerald-100">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                LIVE
                            </div>
                        </div>
                        <p className="text-[34px] font-black text-slate-900 leading-none tracking-tighter mb-2">{stat.value}</p>
                        <p className="text-[13px] font-black text-slate-800 uppercase tracking-tight">{stat.label}</p>
                        <p className="text-[12px] font-bold text-slate-400 mt-1">{stat.sub}</p>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                    >
                        {/* Main Table Area */}
                        <div className="lg:col-span-8 bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 overflow-hidden">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-[18px] font-black text-slate-900 tracking-tight">Ward Capability matrix</h3>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Assigned Payload per Administrative Zone</p>
                                </div>
                                <MapPin className="w-5 h-5 text-slate-300" />
                            </div>

                            <div className="overflow-x-auto no-scrollbar">
                                <table className="w-full text-left border-separate border-spacing-y-3">
                                    <thead>
                                        <tr className="bg-slate-50/50 rounded-xl overflow-hidden">
                                            {['Zone', 'Risk', 'Buses', 'Boats', 'Teams', 'Status', ''].map(h => (
                                                <th key={h} className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] first:rounded-l-2xl last:rounded-r-2xl border-y border-slate-50">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wardAllocations.map((w, idx) => (
                                            <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                                                <td className="px-5 py-4 first:rounded-l-[20px] bg-white border-y border-l border-slate-100">
                                                    <span className="text-[15px] font-black text-slate-900">{w.ward}</span>
                                                </td>
                                                <td className="px-5 py-4 border-y border-slate-100">
                                                    <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${w.risk === 'HIGH' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                                        {w.risk}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 border-y border-slate-100">
                                                    <span className="text-[15px] font-black text-slate-700">{w.buses}</span>
                                                </td>
                                                <td className="px-5 py-4 border-y border-slate-100">
                                                    <span className="text-[15px] font-black text-slate-700">{w.boats}</span>
                                                </td>
                                                <td className="px-5 py-4 border-y border-slate-100">
                                                    <span className="text-[15px] font-black text-slate-700">{w.teams}</span>
                                                </td>
                                                <td className="px-5 py-4 border-y border-slate-100">
                                                    <StatusPill status={w.status} />
                                                </td>
                                                <td className="px-5 py-4 last:rounded-r-[20px] bg-white border-y border-r border-slate-100 text-right">
                                                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 group-hover:text-blue-600 transition-all">
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Side Column Data */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Inventory Progress */}
                            <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl shadow-slate-200 relative overflow-hidden">
                                <Activity className="w-24 h-24 absolute -bottom-8 -right-8 text-white/5 rotate-12" />
                                <h3 className="text-[16px] font-black tracking-tight mb-8">Supply Criticality</h3>
                                <div className="space-y-6">
                                    {supplies.slice(0, 3).map((s, i) => {
                                        const pct = (s.available / s.needed) * 100;
                                        return (
                                            <div key={i}>
                                                <div className="flex justify-between items-center mb-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <s.icon className="w-4 h-4 text-slate-400" />
                                                        <span className="text-[13px] font-bold text-slate-200">{s.name}</span>
                                                    </div>
                                                    <span className="text-[12px] font-black tracking-tight">{Math.round(pct)}%</span>
                                                </div>
                                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${pct}%` }}
                                                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                                        className={`h-full rounded-full ${pct < 40 ? 'bg-red-500' : 'bg-emerald-500'}`}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Hotline Box */}
                            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-100">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-[15px] font-black text-slate-900 tracking-tight leading-none uppercase">Response Hotlines</h4>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { name: 'NDRF Base', num: '011-24363260' },
                                        { name: 'BMC Command', num: '1916' },
                                        { name: 'Medical Heli', num: '108' }
                                    ].map((c, i) => (
                                        <div key={i} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0 hover:translate-x-1 transition-transform cursor-pointer">
                                            <span className="text-[13px] font-bold text-slate-400">{c.name}</span>
                                            <span className="text-[15px] font-black text-slate-800 tabular-nums">{c.num}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* VEHICLES TAB */}
                {activeTab === 'vehicles' && (
                    <motion.div
                        key="vehicles"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {vehicles.map((v, i) => {
                            const pct = (v.deployed / v.total) * 100;
                            return (
                                <div key={i} className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm group">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="p-4 rounded-3xl bg-slate-50 text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                            <v.icon className="w-8 h-8" />
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[28px] font-black text-slate-900 leading-none mb-1">{v.deployed}</p>
                                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">In Operation / {v.total}</p>
                                        </div>
                                    </div>
                                    <h4 className="text-[17px] font-black text-slate-900 tracking-tight mb-2">{v.type}</h4>
                                    <p className="text-[12px] font-bold text-slate-400 leading-relaxed min-h-[48px] line-clamp-2">{v.locations}</p>
                                    <div className="mt-6 flex flex-col gap-2">
                                        <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            <span>Deployment Depth</span>
                                            <span>{Math.round(pct)}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${pct}%` }}
                                                className="h-full bg-blue-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                )}

                {/* SUPPLIES TAB */}
                {activeTab === 'supplies' && (
                    <motion.div
                        key="supplies"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
                    >
                        {supplies.map((s, i) => (
                            <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-50 transition-colors" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-100 group-hover:border-blue-200 transition-colors">
                                            <s.icon className="w-6 h-6 text-slate-500 group-hover:text-blue-600 transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="text-[17px] font-black text-slate-900 tracking-tight">{s.name}</h4>
                                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Global Stockpile</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1 mb-8">
                                        <p className="text-[42px] font-black text-slate-900 leading-none tracking-tighter">{s.available.toLocaleString()}</p>
                                        <p className="text-[13px] font-bold text-slate-400">{s.unit.toUpperCase()} READY FOR DISPATCH</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Surplus</span>
                                        </div>
                                        <span className="text-[15px] font-black text-slate-900">{Math.round((s.available / s.needed) * 100)}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}

                {/* PERSONNEL TAB */}
                {activeTab === 'personnel' && (
                    <motion.div
                        key="personnel"
                        className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {teams.map((t, i) => (
                                <div key={i} className="flex gap-6 p-6 rounded-[24px] bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm transition-all group">
                                    <div className="w-20 h-20 rounded-[20px] bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                                        <Users className="w-10 h-10 text-slate-300 group-hover:text-blue-600 transition-colors" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="text-[17px] font-black text-slate-900 tracking-tight">{t.name}</h4>
                                            <StatusPill status={t.status} />
                                        </div>
                                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                                            <MapPin className="w-3 h-3" />
                                            Active in {t.location}
                                        </p>
                                        <div className="flex items-center gap-8">
                                            <div>
                                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">STRENGTH</p>
                                                <p className="text-[18px] font-black text-slate-800 leading-none">{t.members} <span className="text-[11px] text-slate-400">PAX</span></p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">DISCIPLINE</p>
                                                <p className="text-[13px] font-black text-blue-600 transition-colors bg-blue-50 px-2 py-0.5 rounded-md leading-none">{t.type.toUpperCase()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default ResourceAllocation;
