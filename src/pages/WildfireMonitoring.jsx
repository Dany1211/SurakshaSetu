import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    Flame, Wind, Droplets, Wind as AirIcon,
    Thermometer, ShieldAlert, AlertTriangle,
    MapPin, Navigation, Info, Activity,
    CloudRain, Search, Target, Zap, Waves
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WildfireMonitoring = () => {
    const { t } = useLanguage();
    const [lastUpdated, setLastUpdated] = useState('--');

    useEffect(() => {
        setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST');
    }, []);

    const wildfireStats = [
        { label: 'Thermal Hotspots', value: '14', sub: 'Detected in Aarey Forest', color: 'text-red-500', icon: Flame, bg: 'bg-red-50', border: 'border-red-100' },
        { label: 'Air Quality Index', value: '342', sub: 'Sanjay Gandhi NP: Hazardous', color: 'text-pink-600', icon: AirIcon, bg: 'bg-pink-50', border: 'border-pink-100' },
        { label: 'Propagation rate', value: '4.2 km/h', sub: 'NE Vector Projection', color: 'text-orange-500', icon: Navigation, bg: 'bg-orange-50', border: 'border-orange-100' },
        { label: 'Atmospheric dryness', value: '12%', sub: 'Critical Aridity Level', color: 'text-amber-600', icon: Droplets, bg: 'bg-amber-50', border: 'border-amber-100' },
    ];

    return (
        <div className="p-8 max-w-[1700px] mx-auto space-y-8 animate-fadeInUp">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-orange-600 rounded-full" />
                        <h1 className="text-[28px] font-black text-slate-900 tracking-tight leading-none uppercase">
                            Thermal Intelligence: Forest Fire Monitoring
                        </h1>
                    </div>
                    <p className="text-[14px] font-bold text-slate-400 flex items-center gap-2">
                        <Target className="w-4 h-4 text-orange-500" />
                        Satellite Hotspot Detection & AQI Toxicity Mapping
                    </p>
                </div>

                <div className="flex items-center gap-3 px-5 py-2.5 bg-orange-50 rounded-[20px] border border-orange-100 shadow-sm relative overflow-hidden group">
                    <div className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                    <span className="text-[11px] font-black text-orange-600 uppercase tracking-widest leading-none">Scanning Thermal Spectrum</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wildfireStats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} border border-transparent group-hover:border-current transition-colors`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">SATELLITE SYNC</span>
                        </div>
                        <p className="text-[32px] font-black text-slate-900 tracking-tighter mb-1">{stat.value}</p>
                        <p className="text-[13px] font-black text-slate-800 uppercase tracking-tight">{stat.label}</p>
                        <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tight">{stat.sub}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                {/* Visual Thermal Analysis Area */}
                <div className="xl:col-span-8 space-y-6">
                    <div className="bg-slate-900 rounded-[40px] h-[480px] relative overflow-hidden shadow-2xl group">
                        {/* Thermal Simulation */}
                        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_40%_40%,_#dc2626_0%,_transparent_25%),_radial-gradient(circle_at_60%_50%,_#ea580c_0%,_transparent_30%),_radial-gradient(circle_at_45%_65%,_#dc2626_0%,_transparent_20%)] animate-pulse" />

                        <div className="absolute top-10 left-10 z-10 space-y-4">
                            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-3xl text-white inline-block shadow-2xl">
                                <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">Thermal Intensity Matrix</p>
                                <p className="text-[20px] font-black tracking-tight">LEVEL: SEVERE <span className="text-red-600 animate-pulse ml-1">●</span></p>
                            </div>
                        </div>

                        <div className="absolute bottom-10 right-10 text-right opacity-40">
                            <p className="text-[9px] font-black text-white uppercase tracking-[0.3em]">MODIS/VIIRS Satellite Telemetry</p>
                            <p className="text-[13px] font-black text-orange-400">Scan Frequency: 375m Spectrum</p>
                        </div>

                        <div className="absolute inset-0 border-[24px] border-black/5 rounded-[40px] pointer-events-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* AQI Health Widget */}
                        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <AirIcon className="w-24 h-24" />
                            </div>
                            <h3 className="text-[16px] font-black text-slate-900 tracking-tight uppercase flex items-center gap-3 mb-6">
                                <Activity className="w-5 h-5 text-pink-600" />
                                Environmental Toxicity
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-pink-50 rounded-2xl border border-pink-100">
                                    <p className="text-[14px] font-black text-pink-700 leading-tight mb-2 uppercase">Biological Hazard Status</p>
                                    <p className="text-[12px] font-bold text-pink-600 leading-relaxed uppercase tracking-tight">Stay indoors. All residents of Aarey Colony must utilize N95 filtration if transit is mandatory.</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-slate-100">PM2.5: Extreme</span>
                                    <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-slate-100">Visibility: 0.8km</span>
                                </div>
                            </div>
                        </div>

                        {/* Containment Progress */}
                        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group">
                            <h3 className="text-[16px] font-black text-slate-900 tracking-tight uppercase flex items-center gap-3 mb-8">
                                <Zap className="w-5 h-5 text-blue-600" />
                                Operational Mitigation
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-end mb-3">
                                        <span className="text-[13px] font-black text-slate-800 tracking-tight uppercase">Line Containment Depth</span>
                                        <span className="text-[16px] font-black text-blue-600 tabular-nums">35%</span>
                                    </div>
                                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '35%' }}
                                            transition={{ duration: 1.5 }}
                                            className="h-full bg-blue-600 rounded-full"
                                        />
                                    </div>
                                </div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest italic">Projected Zero-Growth Baseline: 18:00 Hours</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Intelligence */}
                <div className="xl:col-span-4 space-y-6 flex flex-col">

                    {/* Hotspot Ledger */}
                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex-1">
                        <h3 className="text-[16px] font-black text-slate-900 tracking-tight uppercase mb-8">Thermal Hotspot Ledger</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Sanjay Gandhi NP (North Side)', status: 'Active Flame', color: 'text-red-600', bg: 'bg-red-50' },
                                { name: 'Aarey Forest West Perimeter', status: 'Moderate Burn', color: 'text-orange-600', bg: 'bg-orange-50' },
                                { name: 'Yeoor Hills Sector #3', status: 'Smoldering', color: 'text-amber-600', bg: 'bg-amber-50' },
                                { name: 'Tulsi Lake Drainage Basin', status: 'NEW DETECTION', color: 'text-red-600', bg: 'bg-red-50' },
                            ].map((spot, i) => (
                                <div key={i} className="flex flex-col gap-2 p-4 rounded-2xl border border-slate-50 hover:border-slate-200 transition-colors group">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-[13px] font-black text-slate-900 tracking-tight uppercase">{spot.name}</h4>
                                        <div className={`w-1.5 h-1.5 rounded-full ${spot.color.replace('text', 'bg')} animate-pulse`} />
                                    </div>
                                    <span className={`text-[10px] font-black ${spot.color} uppercase tracking-widest`}>{spot.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Deployment Alpha Status */}
                    <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl">
                        <div className="flex items-center gap-3 mb-8">
                            <ShieldAlert className="w-5 h-5 text-red-500" />
                            <h3 className="text-[15px] font-black tracking-tight uppercase">Task-Force Deployment</h3>
                        </div>
                        <div className="space-y-5">
                            {[
                                { label: 'Heavy Fire Units', val: '18 Units Active' },
                                { label: 'Forest Wardens', val: '12 Teams Deployed' },
                                { label: 'Aerial Water Tenders', val: '2 Helis On-Station' }
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-end border-b border-white/10 pb-3 last:border-0 hover:translate-x-1 transition-transform cursor-default">
                                    <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                                    <span className="text-[13px] font-black text-white">{item.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Meteorological Risks */}
                    <div className="bg-orange-600 rounded-[32px] p-8 text-white shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                            <Wind className="w-20 h-20" />
                        </div>
                        <h3 className="text-[15px] font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            Vantage Risk Analysis
                        </h3>
                        <p className="text-[13px] font-bold leading-relaxed uppercase tracking-tight opacity-90">
                            Extreme 12% humidity detected. Spontaneous ignition probability in Sector 7 is assessed as VERY HIGH.
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default WildfireMonitoring;
