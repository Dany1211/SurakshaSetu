import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PlanPanel from '../components/PlanPanel';
import {
    MapPin, Users, Clock, Shield, Sparkles, AlertTriangle,
    Building2, Navigation, Phone, CheckCircle2, ChevronRight,
    Map, Activity, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
const ShelterCard = ({ shelter, index }) => {
    const occupancy = shelter.capacity > 0 ? Math.round((shelter.current / shelter.capacity) * 100) : 0;
    const statusConfig = {
        Open: 'text-emerald-600 bg-emerald-50 border-emerald-100',
        Filling: 'text-amber-600 bg-amber-50 border-amber-100',
        Ready: 'text-blue-600 bg-blue-50 border-blue-100',
    };
    const barColor = occupancy > 80 ? 'bg-red-500' : occupancy > 50 ? 'bg-amber-500' : 'bg-emerald-500';

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-5 rounded-[24px] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-[15px] font-black text-slate-900 tracking-tight leading-tight">{shelter.name}</h4>
                        <div className="flex items-center gap-1.5 mt-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{shelter.area}</span>
                        </div>
                    </div>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${statusConfig[shelter.status]}`}>
                    {shelter.status}
                </span>
            </div>

            <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Occupancy Depth</span>
                <span className="text-[13px] font-black text-slate-900 tabular-nums">{occupancy}%</span>
            </div>

            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${occupancy}%` }}
                    className={`h-full ${barColor}`}
                />
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-300" />
                    <span className="text-[13px] font-black text-slate-700">{shelter.current} <span className="text-slate-400 font-bold">/ {shelter.capacity}</span></span>
                </div>
                <div className="flex gap-2 ml-auto">
                    {shelter.supplies && <div title="Supplies Available" className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100 text-[10px] uppercase font-black">S</div>}
                    {shelter.medical && <div title="Medical Onsite" className="w-6 h-6 rounded-md bg-red-50 flex items-center justify-center text-red-600 border border-red-100 text-[10px] uppercase font-black">M</div>}
                </div>
            </div>
        </motion.div>
    );
};

// ===========================================================
//  Route Card
// ===========================================================
const RouteCard = ({ route, index }) => {
    const isBlocked = route.status === 'Waterlogged';
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            className={`
                p-4 rounded-2xl border transition-all flex items-center gap-4 group
                ${isBlocked ? 'bg-amber-50 border-amber-100' : 'bg-white border-slate-100 hover:border-slate-300 shadow-sm'}
            `}
        >
            <div className="flex flex-col items-center gap-1 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <div className={`w-0.5 h-6 ${isBlocked ? 'bg-amber-300' : 'bg-emerald-500'} rounded-full`} />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-[14px] font-black text-slate-900 truncate tracking-tight">{route.from} ➔ {route.to}</p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1 truncate">{route.road}</p>
            </div>

            <div className="text-right shrink-0">
                <span className={`
                    px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border
                    ${isBlocked ? 'text-amber-600 border-amber-200 bg-white' : 'text-emerald-600 border-emerald-100 bg-emerald-50'}
                `}>
                    {route.status}
                </span>
                <p className="text-[11px] font-black text-slate-400 mt-2 uppercase tracking-tighter">~{route.time} • {route.distance}</p>
            </div>
        </motion.div>
    );
};

// ===========================================================
//  MAIN PAGE: EvacuationPlanning
// ===========================================================
const EvacuationPlanning = () => {
    const { t } = useLanguage();

    return (
        <div className="p-8 max-w-[1700px] mx-auto space-y-8 animate-fadeInUp">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                        <h1 className="text-[28px] font-black text-slate-900 tracking-tight leading-none">
                            Evacuation Directives
                        </h1>
                    </div>
                    <p className="text-[14px] font-bold text-slate-400 flex items-center gap-2">
                        <Map className="w-4 h-4" />
                        Tactical Exit Mapping & Shelter Logistics
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-[20px] border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-500" />
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">System Readiness: Optimal</span>
                    </div>
                </div>
            </div>

            {/* AI Generated Intelligence Section */}
            <div className="relative">
                <div className="absolute -top-4 -left-4 p-3 bg-blue-600 rounded-2xl shadow-lg z-10">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                <PlanPanel />
            </div>

            {/* Row Content: Shelters and Tactical Routes */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Shelters Intelligence */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-[18px] font-black text-slate-900 tracking-tight uppercase tracking-[0.05em]">Safe Zones & Shelters</h3>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">{shelters.length} Operations Relief Points Identified</p>
                        </div>
                        <button className="text-[11px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                            View All <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {shelters.map((s, i) => (
                            <ShelterCard key={s.id} shelter={s} index={i} />
                        ))}
                    </div>
                </div>

                {/* Tactical Routes Sidebar */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-8">

                    {/* Routes Directive */}
                    <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl shadow-slate-200">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <Navigation className="w-5 h-5 text-blue-400" />
                                <h3 className="text-[16px] font-black tracking-tight uppercase">Tactical Corridors</h3>
                            </div>
                            <div className="px-2 py-0.5 rounded-lg bg-blue-500/20 border border-blue-500/30 text-[9px] font-black uppercase tracking-widest text-blue-300">
                                Live Traffic Intel
                            </div>
                        </div>

                        <div className="space-y-4">
                            {evacuationRoutes.map((r, i) => (
                                <RouteCard key={r.id} route={r} index={i} />
                            ))}
                        </div>

                        <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
                            <p className="text-[11px] font-bold text-blue-100 leading-relaxed uppercase tracking-tight">
                                Routes are dynamically recalculated based on waterlogging reports and police checkpoints.
                            </p>
                        </div>
                    </div>

                    {/* Quick Contacts Integration */}
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

            </div>

        </div>
    );
};

export default EvacuationPlanning;
