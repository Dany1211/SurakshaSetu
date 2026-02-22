import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    AlertTriangle, MapPin, Phone, UserCheck,
    Bell, ShieldAlert, CloudRain, Clock,
    ChevronRight, CheckCircle2, MessageSquare,
    AlertCircle, Sparkles, Activity, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCurrentWeather, fetchForecast, generateAlerts } from '../utils/weatherService';

const mockSOS = [
    { id: 1, caller: 'Ramesh Patil', location: 'Kurla West, Near Station', issue: 'Family stranded on 2nd floor', time: '2 min ago', urgent: true, phone: '+91 98XXX XXXXX' },
    { id: 2, caller: 'Anjali Deshmukh', location: 'Sion Circle, Main Road', issue: 'Elderly person needs medical help', time: '8 min ago', urgent: true, phone: '+91 97XXX XXXXX' },
    { id: 3, caller: 'Municipal Ward Office', location: 'Andheri Subway', issue: 'Water level rising rapidly', time: '15 min ago', urgent: false, phone: '022-2XXX XXXX' },
    { id: 4, caller: 'Suresh Raina', location: 'Bandra Reclamation', issue: 'Car stalled in deep water', time: '22 min ago', urgent: true, phone: '+91 99XXX XXXXX' },
];

const Alerts = ({ initialTab = 'weather' }) => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState(initialTab);
    const [sosAlerts, setSosAlerts] = useState(mockSOS);
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
        setSosAlerts(prev => prev.map(a => a.id === id ? { ...a, assigned: true } : a));
    };

    const handleResolve = (id) => {
        setSosAlerts(prev => prev.filter(a => a.id !== id));
    };

    const urgentCount = sosAlerts.filter(a => a.urgent).length;

    return (
        <div className="p-8 max-w-[1700px] mx-auto space-y-8 animate-fadeInUp">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-red-600 rounded-full" />
                        <h1 className="text-[28px] font-black text-slate-900 tracking-tight leading-none">
                            Alert Center
                        </h1>
                    </div>
                    <p className="text-[14px] font-bold text-slate-400 flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Real-time Distress Logic & Meteorological Risks
                    </p>
                </div>

                {/* Premium Tab Switcher */}
                <div className="flex p-1 bg-slate-100/50 rounded-2xl border border-slate-100 backdrop-blur-sm relative overflow-hidden">
                    <button
                        onClick={() => setActiveTab('weather')}
                        className={`
                            relative z-10 px-8 py-2.5 rounded-xl text-[11px] font-black tracking-widest transition-all flex items-center gap-2
                            ${activeTab === 'weather' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}
                        `}
                    >
                        RISK TELEMETRY
                        {weatherAlerts.length > 0 && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('sos')}
                        className={`
                            relative z-10 px-8 py-2.5 rounded-xl text-[11px] font-black tracking-widest transition-all flex items-center gap-2
                            ${activeTab === 'sos' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}
                        `}
                    >
                        SOS DISTRESS
                        {urgentCount > 0 && <span className="px-1.5 py-0.5 rounded-md bg-red-100 text-[8px] text-red-600">{urgentCount}</span>}
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'sos' ? (
                    <motion.div
                        key="sos"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="grid grid-cols-1 xl:grid-cols-12 gap-8"
                    >
                        {/* SOS Feed */}
                        <div className="xl:col-span-8 space-y-4">
                            {sosAlerts.length > 0 ? sosAlerts.map((alert, idx) => (
                                <motion.div
                                    key={alert.id}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`
                                        p-6 rounded-[32px] bg-white border border-slate-100 shadow-sm transition-all relative overflow-hidden
                                        ${alert.urgent ? 'border-l-[6px] border-l-red-500 shadow-red-500/5' : 'border-l-[6px] border-l-slate-200'}
                                    `}
                                >
                                    <div className="flex gap-6">
                                        <div className={`
                                            w-16 h-16 rounded-3xl flex items-center justify-center shrink-0
                                            ${alert.urgent ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-50 text-slate-400 border border-slate-100'}
                                        `}>
                                            <ShieldAlert className="w-8 h-8" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="text-[19px] font-black text-slate-900 tracking-tight leading-none">{alert.caller}</h3>
                                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-2">{alert.phone}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center gap-2 mb-2 justify-end">
                                                        <Clock className="w-3.5 h-3.5 text-slate-300" />
                                                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{alert.time}</span>
                                                    </div>
                                                    {alert.urgent && (
                                                        <span className="px-2 py-0.5 rounded-lg bg-red-500 text-white text-[9px] font-black uppercase tracking-[0.1em]">Immediate Action</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 mt-4">
                                                <div className="shrink-0 pt-0.5">
                                                    <MapPin className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <p className="text-[14px] font-bold text-slate-600 uppercase tracking-tight leading-snug">{alert.location}</p>
                                            </div>

                                            <p className="text-[17px] font-black text-slate-800 leading-relaxed mt-6 mb-8">
                                                "{alert.issue}"
                                            </p>

                                            <div className="flex gap-4 pt-6 border-t border-slate-50">
                                                {alert.assigned ? (
                                                    <div className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                        <UserCheck className="w-5 h-5" />
                                                        <span className="text-[13px] font-black uppercase tracking-widest">Team Dispatched</span>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => handleAssign(alert.id)}
                                                        className="px-8 py-3.5 rounded-2xl bg-red-600 text-white text-[13px] font-black uppercase tracking-widest shadow-lg shadow-red-200 hover:bg-red-700 transition-all active:scale-95"
                                                    >
                                                        Dispatch Rescue Now
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleResolve(alert.id)}
                                                    className="px-6 py-3.5 rounded-2xl bg-white text-slate-400 border border-slate-200 text-[13px] font-black uppercase tracking-widest hover:border-slate-300 transition-all"
                                                >
                                                    Resolved
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )) : (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="p-20 text-center bg-white rounded-[40px] border border-dashed border-slate-200"
                                >
                                    <div className="p-6 bg-emerald-50 text-emerald-500 rounded-full w-fit mx-auto mb-6">
                                        <CheckCircle2 className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-[20px] font-black text-slate-900 tracking-tight">System All-Clear</h3>
                                    <p className="text-[14px] font-bold text-slate-400 mt-2 uppercase tracking-tight">No active distress signals in queue.</p>
                                </motion.div>
                            )}
                        </div>

                        {/* Sidebar Stats */}
                        <div className="xl:col-span-4 space-y-6">
                            <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl">
                                <h3 className="text-[16px] font-black tracking-tight mb-8 uppercase flex items-center justify-between">
                                    Queue Metrics
                                    <Activity className="w-5 h-5 text-slate-600" />
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Active Tickets</span>
                                        <span className="text-[24px] font-black tracking-tighter">{sosAlerts.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-red-500/10 p-4 rounded-2xl border border-red-500/20">
                                        <span className="text-[12px] font-bold text-red-200 uppercase tracking-widest">Critical High</span>
                                        <span className="text-[24px] font-black text-red-500 tracking-tighter">{urgentCount}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20">
                                        <span className="text-[12px] font-bold text-emerald-200 uppercase tracking-widest">In Motion</span>
                                        <span className="text-[24px] font-black text-emerald-500 tracking-tighter">{sosAlerts.filter(a => a.assigned).length}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-600 rounded-[32px] p-8 text-white shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                                <div className="flex items-center gap-3 mb-4">
                                    <MessageSquare className="w-6 h-6" />
                                    <h4 className="text-[15px] font-black uppercase tracking-tight">Dispatcher Memo</h4>
                                </div>
                                <p className="text-[14px] font-bold leading-relaxed opacity-90">
                                    Priority should be given to medical emergencies involving vulnerable individuals. Maintain clear comms with field units every 15 minutes.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* Weather Alerts Feed */
                    <motion.div
                        key="weather"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        {loading ? (
                            <div className="py-20 text-center animate-pulse">
                                <p className="text-[14px] font-black text-slate-400 uppercase tracking-widest">Synthesizing IMD Telemetry...</p>
                            </div>
                        ) : weatherAlerts.length > 0 ? weatherAlerts.map((alert, idx) => (
                            <motion.div
                                key={alert.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`
                                    p-6 rounded-[28px] flex items-center gap-8 border transition-all
                                    hover:shadow-md cursor-default
                                `}
                                style={{ backgroundColor: alert.bg, borderColor: alert.border }}
                            >
                                <div className="relative shrink-0">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: alert.color }} />
                                    <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: alert.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-[18px] font-black leading-none mb-2 tracking-tight" style={{ color: alert.color }}>{alert.title}</h3>
                                    <p className="text-[15px] font-bold text-slate-700/80 leading-relaxed">{alert.summary}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-[11px] font-black text-slate-400 mb-1 uppercase tracking-widest">Forecast Timestamp</p>
                                    <p className="text-[15px] font-black text-slate-800 tabular-nums">{alert.time}</p>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="p-20 text-center bg-white rounded-[40px] border border-slate-100 shadow-sm">
                                <CloudRain className="w-12 h-12 text-slate-200 mx-auto mb-6" />
                                <h3 className="text-[20px] font-black text-slate-900 tracking-tight">Environmental Stability Detected</h3>
                                <p className="text-[14px] font-bold text-slate-400 mt-2 uppercase tracking-tight">No active weather warnings for current region.</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Alerts;
