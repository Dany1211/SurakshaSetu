import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    Wind, Activity, ArrowUpRight, ShieldAlert,
    Navigation, Thermometer, CloudRain, Clock,
    AlertTriangle, Droplets, MapPin, CheckCircle2,
    Eye, Radar, Target, Info
} from 'lucide-react';
import { motion } from 'framer-motion';

const CycloneMonitoring = () => {
    const { t } = useLanguage();
    const [lastUpdated, setLastUpdated] = useState('--');

    useEffect(() => {
        setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST');
    }, []);

    const cycloneStats = [
        { label: 'Sustained Winds', value: '185 km/h', sub: 'Extremely Severe', color: 'text-red-600', icon: Wind, bg: 'bg-red-50', border: 'border-red-100' },
        { label: 'Central Pressure', value: '965 hPa', sub: 'Barometric Trend: Dec', color: 'text-blue-600', icon: Activity, bg: 'bg-blue-50', border: 'border-blue-100' },
        { label: 'Velocity Vector', value: 'NNW @ 15 km/h', sub: 'Coastal Trajectory', color: 'text-violet-600', icon: Navigation, bg: 'bg-violet-50', border: 'border-violet-100' },
        { label: 'Surge Magnitude', value: '4.5 Meters', sub: 'Coastal Inundation Risk', color: 'text-cyan-600', icon: CloudRain, bg: 'bg-cyan-50', border: 'border-cyan-100' },
    ];

    const alerts = [
        { id: 1, level: 'RED', title: 'Mandatory Coastal Evacuation', zone: 'Sector A-D (Coastal Zones)', time: '10m ago' },
        { id: 2, level: 'ORANGE', title: 'Port Operations Suspension', zone: 'JNPT & Bandra/Worli Port', time: '25m ago' },
        { id: 3, level: 'YELLOW', title: 'Regional Grid Proactive Cut', zone: 'Low-lying Kurla Region', time: '40m ago' },
    ];

    return (
        <div className="p-8 max-w-[1700px] mx-auto space-y-8 animate-fadeInUp">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-red-600 rounded-full" />
                        <h1 className="text-[28px] font-black text-slate-900 tracking-tight leading-none uppercase">
                            Cyclonic Intelligence: <span className="text-red-600 italic">"TAUKTAE"</span>
                        </h1>
                    </div>
                    <p className="text-[14px] font-bold text-slate-400 flex items-center gap-2">
                        <Radar className="w-4 h-4 text-red-500" />
                        Doppler Trajectory & Landfall Probability Matrix
                    </p>
                </div>

                <div className="flex items-center gap-3 px-5 py-2.5 bg-red-50 rounded-[20px] border border-red-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-red-600/5 group-hover:bg-red-600/10 transition-colors" />
                    <div className="w-2 h-2 rounded-full bg-red-600 animate-ping relative z-10" />
                    <span className="text-[11px] font-black text-red-600 uppercase tracking-widest relative z-10">Active Tracking: Phase 4</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cycloneStats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:translate-y-[-4px] transition-all"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} border ${stat.border}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">WMO-IMD SYNC</span>
                        </div>
                        <p className="text-[32px] font-black text-slate-900 tracking-tighter mb-1">{stat.value}</p>
                        <p className="text-[13px] font-black text-slate-800 uppercase tracking-tight">{stat.label}</p>
                        <p className={`text-[11px] font-bold mt-1 ${stat.color} uppercase tracking-tight`}>{stat.sub}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                {/* Visual Tracking Intelligence */}
                <div className="xl:col-span-8 flex flex-col gap-6">
                    <div className="bg-slate-900 rounded-[40px] h-[520px] relative overflow-hidden group shadow-2xl">
                        {/* Radar Backdrop Pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                        {/* Header Overlay */}
                        <div className="absolute top-8 left-8 z-10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                                <Target className="w-4 h-4 text-red-400" />
                                <span className="text-[11px] font-black text-white/90 uppercase tracking-widest">Ground-Zero Intersection</span>
                            </div>
                            <p className="text-[12px] font-bold text-blue-300 ml-2 uppercase tracking-tight">Landfall ETA: T-Minus 4h 22m</p>
                        </div>

                        {/* Radial Radar Visual - Pure CSS/Tailwind */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[400px] h-[400px] rounded-full border border-blue-500/10 flex items-center justify-center">
                                <div className="w-[300px] h-[300px] rounded-full border border-blue-500/20 flex items-center justify-center">
                                    <div className="w-[200px] h-[200px] rounded-full border border-blue-500/30 flex items-center justify-center">
                                        <div className="relative">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_20px_#ef4444]" />
                                            <div className="absolute w-[200px] h-px bg-gradient-to-r from-red-500/60 to-transparent top-1/2 left-1/2 -translate-y-1/2 origin-left animate-radar-sweep" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-10 left-10 flex flex-col gap-1 opacity-40">
                            <p className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Integrated Satellite Feed</p>
                            <p className="text-[14px] font-black text-blue-400 tabular-nums">LAT: 18.9°N | LON: 72.8°E</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
                        <Activity className="w-24 h-24 absolute top-0 right-0 text-slate-50 -mr-8 rotate-12" />
                        <h3 className="text-[18px] font-black text-slate-900 tracking-tight flex items-center gap-3 mb-8">
                            <ShieldAlert className="w-6 h-6 text-red-500" />
                            Counter-Disaster Protocol
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                            {[
                                'Establish mandatory radius perimeter in Coastal Zone Alpha',
                                'Proactive blackout command sent to sub-stations (22:00)',
                                'Fleet pre-positioned at 450 coordinate (Colaba Terminal)',
                                'Emergency evacuation vans standby for informal settlements',
                                'Bandra-Worli sea link shutdown status: ACTIVE',
                                'Fuel reserves check for Tier 1 Medical facilities: NOMINAL'
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 py-3 border-b border-slate-50 last:border-0">
                                    <div className="p-1 rounded bg-emerald-50 text-emerald-600 mt-0.5 shrink-0">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-[13px] font-bold text-slate-600 leading-snug">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Strategic Intelligence */}
                <div className="xl:col-span-4 space-y-6 flex flex-col">

                    {/* Live Warning Feed */}
                    <div className="bg-red-600 rounded-[32px] p-8 text-white shadow-xl shadow-red-200">
                        <div className="flex items-center gap-3 mb-8">
                            <AlertTriangle className="w-5 h-5" />
                            <h3 className="text-[15px] font-black uppercase tracking-tight">Priority Mandates</h3>
                        </div>
                        <div className="space-y-4">
                            {alerts.map(alert => (
                                <div key={alert.id} className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/15 transition-all group cursor-pointer">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="text-[14px] font-black tracking-tight group-hover:text-red-100 transition-colors uppercase">{alert.title}</p>
                                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-md ${alert.level === 'RED' ? 'bg-white text-red-600' : 'bg-amber-500 text-white'}`}>{alert.level}</span>
                                    </div>
                                    <p className="text-[11px] font-bold text-red-100 opacity-70 uppercase tracking-widest leading-none">{alert.zone} • {alert.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Zone Vulnerability Mapping */}
                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex-1">
                        <h3 className="text-[16px] font-black text-slate-900 tracking-tight uppercase mb-8">Inundation Probabilities</h3>
                        <div className="space-y-8">
                            {[
                                { name: 'Colaba Waterfront', risk: 95, color: 'bg-red-600' },
                                { name: 'Worli Village', risk: 88, color: 'bg-red-600' },
                                { name: 'Bandra West', risk: 72, color: 'bg-amber-500' },
                                { name: 'Juhu Outpost', risk: 65, color: 'bg-amber-500' },
                                { name: 'Versova Reach', risk: 45, color: 'bg-emerald-500' },
                            ].map((w, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-end mb-3">
                                        <span className="text-[13px] font-black text-slate-800 tracking-tight uppercase">{w.name}</span>
                                        <span className="text-[14px] font-black text-slate-900 tabular-nums">{w.risk}%</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${w.risk}%` }}
                                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                            className={`h-full ${w.color}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* IMD Outlook Meta Card */}
                    <div className="bg-slate-900 rounded-[32px] p-8 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <Info className="w-5 h-5 text-blue-400" />
                            <h4 className="text-[13px] font-black uppercase tracking-widest text-blue-300">Executive Outlook</h4>
                        </div>
                        <p className="text-[13px] font-bold text-slate-400 leading-relaxed uppercase tracking-tight">
                            "TC Tauktae" has transitioned to VSCS category. High tide (4.2m) at 22:15 coincides with eye-wall approach. Wind gusting to 210km/h expected at Colaba headlands.
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default CycloneMonitoring;
