import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    CloudRain, CloudLightning, Cloud, Sun, AlertTriangle, RefreshCw,
    Wifi, WifiOff, Droplets, Eye, Wind, Thermometer, ChevronRight,
    Activity, Gauge, Calendar, Sparkles, MapPin, ExternalLink, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    fetchCurrentWeather, fetchForecast,
    generateAISummary, generateAlerts
} from '../utils/weatherService';

const weatherIcons = {
    heavy: CloudRain,
    thunder: CloudLightning,
    cloudy: Cloud,
    sunny: Sun,
};

const riskPillColors = {
    HIGH: 'bg-red-50 text-red-600 border-red-200',
    MEDIUM: 'bg-amber-50 text-amber-600 border-amber-200',
    LOW: 'bg-emerald-50 text-emerald-600 border-emerald-200',
};

// ===========================================================
//  Forecast Card
// ===========================================================
const ForecastCard = ({ data, isToday, index }) => {
    const Icon = weatherIcons[data.icon] || Sun;
    const colorClass = riskPillColors[data.risk] || riskPillColors.LOW;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
                min-w-[170px] p-5 rounded-[24px] border border-slate-100 flex flex-col items-center gap-4 transition-all group
                ${isToday ? 'bg-blue-50/50 border-blue-200 shadow-lg shadow-blue-500/5' : 'bg-white hover:border-slate-300 hover:shadow-sm'}
            `}
        >
            <div className="text-center">
                <p className={`text-[15px] font-black tracking-tight ${isToday ? 'text-blue-600' : 'text-slate-900'}`}>
                    {isToday ? 'TODAY' : data.day.toUpperCase()}
                </p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{data.date}</p>
            </div>

            <div className={`p-4 rounded-2xl ${isToday ? 'bg-white shadow-sm' : 'bg-slate-50'}`}>
                <Icon className={`w-8 h-8 ${isToday ? 'text-blue-600' : 'text-slate-400'} group-hover:scale-110 transition-transform`} strokeWidth={2} />
            </div>

            <div className="text-center">
                <p className="text-[28px] font-black text-slate-900 leading-none">{data.temp}°</p>
                <div className="flex items-center justify-center gap-1.5 mt-2">
                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-[13px] font-bold text-slate-500">{data.rainfall}mm</span>
                </div>
            </div>

            <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${colorClass}`}>
                {data.risk}
            </span>
        </motion.div>
    );
};

// ===========================================================
//  Rainfall Trend Chart Component
// ===========================================================
const RainfallTrend = ({ forecast }) => {
    const maxRain = Math.max(...forecast.map(d => d.rainfall), 1);

    return (
        <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-sm overflow-hidden relative">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-[16px] font-black text-slate-900 tracking-tight">Rainfall Trajectory</h3>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">5-Day Volume Distribution</p>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                    <Gauge className="w-5 h-5" />
                </div>
            </div>

            <div className="flex items-end gap-4 h-[140px] px-2">
                {forecast.map((d, i) => {
                    const height = (d.rainfall / maxRain) * 100;
                    const barColor = d.risk === 'HIGH' ? 'bg-red-500' : d.risk === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-500';
                    return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
                            <span className="text-[11px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1">{d.rainfall}mm</span>
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${Math.max(height, 8)}%` }}
                                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                                className={`w-full max-w-[40px] rounded-t-xl rounded-b-md ${barColor} shadow-sm relative overflow-hidden`}
                            >
                                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            </motion.div>
                            <span className="text-[11px] font-black text-slate-600 uppercase tracking-tighter">{d.day}</span>
                        </div>
                    );
                })}
            </div>

            {/* Background Lines */}
            <div className="absolute bottom-16 left-6 right-6 h-[100px] -z-10 border-b border-slate-50 border-t border-t-slate-50/50 pointer-events-none" />
        </div>
    );
};

// ===========================================================
//  Alert Center Component
// ===========================================================
const AlertCenter = ({ alerts }) => (
    <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-sm h-full">
        <div className="flex items-center justify-between mb-6">
            <div>
                <h3 className="text-[16px] font-black text-slate-900 tracking-tight">Official Advisories</h3>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">IMD Meteorological Directives</p>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <AlertCircle className="w-5 h-5" />
            </div>
        </div>

        <div className="space-y-3">
            {alerts.length > 0 ? alerts.map((alert, idx) => (
                <motion.div
                    key={alert.id}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-2xl border flex items-center gap-4 group transition-all"
                    style={{ backgroundColor: alert.bg, borderColor: alert.border }}
                >
                    <div className="relative flex-shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: alert.color }} />
                        <div className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ backgroundColor: alert.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-black text-slate-900 leading-tight mb-0.5" style={{ color: alert.color }}>{alert.title}</p>
                        <p className="text-[12px] font-bold text-slate-500 truncate">{alert.summary}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{alert.time}</span>
                    </div>
                </motion.div>
            )) : (
                <div className="py-12 text-center">
                    <p className="text-[13px] font-bold text-slate-400 italic">No critical weather anomalies detected.</p>
                </div>
            )}
        </div>
    </div>
);

// ===========================================================
//  Weather Stats Pill
// ===========================================================
const WeatherStat = ({ icon: Icon, label, value, color }) => (
    <div className="flex items-center gap-3.5 px-5 py-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <div className={`p-2 rounded-xl border border-slate-100 ${color} bg-slate-50/50`}>
            <Icon className="w-4 h-4" />
        </div>
        <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] leading-none mb-1">{label}</p>
            <p className="text-[15px] font-black text-slate-900 leading-none">{value}</p>
        </div>
    </div>
);

// ===========================================================
//  MAIN COMPONENT: RiskMonitoring
// ===========================================================
const RiskMonitoring = () => {
    const { t } = useLanguage();
    const [current, setCurrent] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [apiOnline, setApiOnline] = useState(false);
    const [lastUpdated, setLastUpdated] = useState('--');
    const [refreshing, setRefreshing] = useState(false);

    const loadData = async () => {
        setRefreshing(true);
        const [w, f] = await Promise.all([fetchCurrentWeather(), fetchForecast()]);

        if (w) {
            setCurrent(w);
            setApiOnline(true);
            setLastUpdated(new Date().toLocaleTimeString('en-IN', {
                hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata',
            }) + ' IST');
        } else {
            setApiOnline(false);
        }

        if (f) setForecast(f);
        setLoading(false);
        setRefreshing(false);
    };

    useEffect(() => { loadData(); }, []);

    const alerts = current && forecast ? generateAlerts(current, forecast) : [];
    const aiSummary = generateAISummary(current, forecast);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] gap-6">
                <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-blue-600 animate-spin" />
                    <CloudRain className="w-8 h-8 text-blue-600 absolute inset-0 m-auto animate-pulse" />
                </div>
                <div className="text-center">
                    <p className="text-[17px] font-black text-slate-900 tracking-tight">Syncing with OpenWeatherMap</p>
                    <p className="text-[13px] font-bold text-slate-400 mt-1">Retrieving live atmospheric data for Mumbai...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-fadeInUp">

            {/* Page Header — Pro Header Style */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                        <h1 className="text-[28px] font-black text-slate-900 tracking-tight leading-none">
                            Atmospheric Intelligence
                        </h1>
                    </div>
                    <p className="text-[14px] font-bold text-slate-400 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Mumbai, Maharashtra • Station ID: OWM-400001
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">LAST TELEMETRY SYNC</p>
                        <p className="text-[14px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 mt-1">
                            {lastUpdated}
                        </p>
                    </div>
                    <button
                        onClick={loadData}
                        disabled={refreshing}
                        className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all active:scale-95 group"
                    >
                        <RefreshCw className={`w-5 h-5 text-slate-600 ${refreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                    </button>
                </div>
            </div>

            {/* Top Grid: Hero Weather + Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Current Hero — Large & Premium */}
                <div className="lg:col-span-12 xl:col-span-8 flex flex-col md:flex-row gap-8 bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                    <div className="flex items-center gap-8">
                        <div className={`
                            w-32 h-32 rounded-[32px] flex items-center justify-center shadow-lg transition-all
                            ${current.isRaining ? 'bg-blue-600 shadow-blue-200' : 'bg-amber-400 shadow-amber-100'}
                        `}>
                            {current.isRaining
                                ? <CloudRain className="w-16 h-16 text-white" strokeWidth={1.5} />
                                : <Sun className="w-16 h-16 text-white" strokeWidth={1.5} />
                            }
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <p className="text-[64px] font-black text-slate-900 leading-none tracking-tighter">{current.temp}°</p>
                                <div className="h-10 w-px bg-slate-100 mx-4" />
                                <div>
                                    <p className="text-[18px] font-black text-slate-900 uppercase tracking-tight leading-none">{current.description}</p>
                                    <p className="text-[12px] font-bold text-slate-400 mt-1 flex items-center gap-1.5">
                                        <Thermometer className="w-3.5 h-3.5" />
                                        Feels like {current.feelsLike}°C
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 h-full content-center">
                        <WeatherStat icon={Droplets} label="Humidity" value={`${current.humidity}%`} color="text-blue-500" />
                        <WeatherStat icon={Wind} label="Wind Speed" value={`${current.wind} km/h`} color="text-slate-500" />
                        <WeatherStat icon={Eye} label="Visibility" value={`${current.visibility} km`} color="text-violet-500" />
                        <WeatherStat icon={CloudRain} label="Precip (1h)" value={`${current.rain1h}mm`} color="text-cyan-500" />
                    </div>
                </div>

                {/* AI Risk Analysis — High Glossy Strategic Aesthetic */}
                <div className="lg:col-span-12 xl:col-span-4 bg-blue-600 rounded-[32px] p-8 text-white shadow-xl shadow-blue-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl opacity-50" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400 rounded-full -ml-16 -mb-16 blur-2xl opacity-20" />

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-[17px] font-black tracking-tight leading-none">Strategic AI Summary</h3>
                                <p className="text-[11px] font-bold text-blue-200/80 uppercase tracking-widest mt-1">Real-time Interpretation</p>
                            </div>
                        </div>

                        <p className="text-[19px] font-bold leading-relaxed tracking-tight flex-1">
                            {aiSummary}
                        </p>

                        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[11px] font-black text-blue-100 uppercase tracking-widest">Active Intelligence Mode</span>
                            </div>
                            <Activity className="w-4 h-4 text-blue-200/50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Grid: Forecast + Trend */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* 5-Day Forecast Panel */}
                <div className="lg:col-span-12 xl:col-span-8 bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-[16px] font-black text-slate-900 tracking-tight">Weather Propagation</h3>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">5-Day Temporal Forecast</p>
                        </div>
                        <Calendar className="w-5 h-5 text-slate-300" />
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                        {forecast.map((d, i) => (
                            <ForecastCard key={i} data={d} isToday={i === 0} index={i} />
                        ))}
                    </div>
                </div>

                {/* Vertical Side Stats / Data Health */}
                <div className="lg:col-span-12 xl:col-span-4 space-y-6 flex flex-col justify-between">
                    <RainfallTrend forecast={forecast} />

                    {/* API Status Widget — Integrated look */}
                    <div className="bg-slate-900 rounded-[24px] p-6 text-white shadow-lg overflow-hidden relative">
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${apiOnline ? 'bg-emerald-500' : 'bg-red-500'} shadow-[0_0_12px_rgba(16,185,129,0.5)]`} />
                                <span className={`text-[13px] font-black tracking-tight ${apiOnline ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {apiOnline ? "NETWORK ONLINE" : "OFFLINE / CACHED"}
                                </span>
                            </div>
                            <Wifi className={`w-4 h-4 ${apiOnline ? 'text-white/40' : 'text-red-400'}`} />
                        </div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">TELEMETRY SOURCE</p>
                        <p className="text-[13px] font-bold text-slate-200">National Weather API Gateway (Mumbai)</p>

                        <div className="absolute bottom-0 right-0 p-4 opacity-5">
                            <RefreshCw className="w-24 h-24 rotate-12" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom: Alert Center */}
            <div className="grid grid-cols-1 gap-6 pb-8">
                <AlertCenter alerts={alerts} />
            </div>

            {/* Footer Attribution */}
            <div className="flex items-center justify-center gap-8 py-6 opacity-30">
                <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">OpenWeatherMap Core</span>
                </div>
                <div className="w-1 h-1 bg-slate-400 rounded-full" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Suraksha Setu Intel</span>
            </div>

        </div>
    );
};

export default RiskMonitoring;
