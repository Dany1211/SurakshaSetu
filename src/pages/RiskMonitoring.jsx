import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    CloudRain, CloudLightning, Cloud, Sun, AlertTriangle, RefreshCw,
    Wifi, WifiOff, Droplets, Eye, Wind, Thermometer
} from 'lucide-react';
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

const riskPill = {
    HIGH: { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
    MEDIUM: { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
    LOW: { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
};

// ===========================================================
//  Forecast Card
// ===========================================================
const ForecastCard = ({ data, isToday }) => {
    const Icon = weatherIcons[data.icon] || Sun;
    const pill = riskPill[data.risk] || riskPill.LOW;

    return (
        <div style={{
            minWidth: '140px', padding: '16px 14px', borderRadius: '14px',
            background: isToday ? 'linear-gradient(135deg, #eff6ff, #dbeafe)' : 'white',
            border: isToday ? '1.5px solid #93c5fd' : '1px solid #f1f5f9',
            boxShadow: isToday ? '0 4px 16px rgba(37,99,235,0.08)' : '0 1px 3px rgba(0,0,0,0.03)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            fontFamily: 'Outfit, sans-serif', cursor: 'default',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            flexShrink: 0,
        }}>
            <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: isToday ? '#2563eb' : '#0f172a', margin: 0 }}>
                    {isToday ? 'Today' : data.day}
                </p>
                <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>{data.date}</p>
            </div>

            <Icon style={{ width: '28px', height: '28px', color: isToday ? '#2563eb' : '#64748b', strokeWidth: 1.6 }} />
            <p style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{data.temp}°</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Droplets style={{ width: '11px', height: '11px', color: '#3b82f6' }} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>{data.rainfall}mm</span>
            </div>

            {/* Extra: wind + humidity */}
            <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <Wind style={{ width: '9px', height: '9px', color: '#94a3b8' }} />
                    <span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 500 }}>{data.wind}km/h</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <Thermometer style={{ width: '9px', height: '9px', color: '#94a3b8' }} />
                    <span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 500 }}>{data.humidity}%</span>
                </div>
            </div>

            <span style={{
                fontSize: '9px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px',
                background: pill.bg, color: pill.color, border: `1px solid ${pill.border}`,
                textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
                {data.risk}
            </span>
        </div>
    );
};

// ===========================================================
//  Alert Banner
// ===========================================================
const AlertBanner = ({ alert }) => (
    <div style={{
        padding: '12px 16px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px',
        background: alert.bg, border: `1px solid ${alert.border}`,
        fontFamily: 'Outfit, sans-serif',
    }}>
        <div style={{
            width: '8px', height: '8px', borderRadius: '50%', background: alert.color,
            boxShadow: `0 0 6px ${alert.color}40`, flexShrink: 0,
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: alert.color, margin: 0, marginBottom: '2px' }}>
                {alert.title}
            </p>
            <p style={{ fontSize: '11px', color: '#64748b', margin: 0, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {alert.summary}
            </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600 }}>{alert.time}</span>
            <span style={{
                fontSize: '8px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px',
                background: '#f8fafc', color: '#94a3b8', border: '1px solid #e2e8f0',
            }}>LIVE</span>
        </div>
    </div>
);

// ===========================================================
//  Rainfall Mini-Chart
// ===========================================================
const RainfallChart = ({ forecast }) => {
    const maxRain = Math.max(...forecast.map(d => d.rainfall), 1);

    return (
        <div style={{
            background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
            padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)', fontFamily: 'Outfit, sans-serif',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                    <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Rainfall Trend</h3>
                    <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>5-day forecast (mm)</p>
                </div>
                <Droplets style={{ width: '16px', height: '16px', color: '#3b82f6' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '100px' }}>
                {forecast.map((d, i) => {
                    const height = maxRain > 0 ? (d.rainfall / maxRain) * 100 : 5;
                    const barColor = d.risk === 'HIGH' ? '#ef4444' : d.risk === 'MEDIUM' ? '#f59e0b' : '#22c55e';
                    return (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '9px', fontWeight: 600, color: '#94a3b8' }}>{d.rainfall}</span>
                            <div style={{
                                width: '100%', maxWidth: '32px', height: `${Math.max(height, 4)}%`, minHeight: '4px',
                                borderRadius: '6px 6px 4px 4px',
                                background: `linear-gradient(180deg, ${barColor}90, ${barColor}50)`,
                                transition: 'height 0.5s ease',
                            }} />
                            <span style={{ fontSize: '9px', fontWeight: 600, color: '#64748b' }}>{d.day}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ===========================================================
//  IMD Status Widget
// ===========================================================
const IMDStatusWidget = ({ apiOnline, lastUpdated, onRefresh, refreshing }) => (
    <div style={{
        background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
        padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)', fontFamily: 'Outfit, sans-serif',
    }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Weather Data Source</h3>
            <Eye style={{ width: '14px', height: '14px', color: '#94a3b8' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <div style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: apiOnline ? '#22c55e' : '#ef4444',
                boxShadow: apiOnline ? '0 0 6px rgba(34,197,94,0.4)' : '0 0 6px rgba(239,68,68,0.4)',
            }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: apiOnline ? '#16a34a' : '#dc2626' }}>
                {apiOnline ? 'API Online' : 'API Offline — Using Cache'}
            </span>
            {apiOnline ? <Wifi style={{ width: '12px', height: '12px', color: '#16a34a' }} /> : <WifiOff style={{ width: '12px', height: '12px', color: '#dc2626' }} />}
        </div>

        <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, marginBottom: '4px', fontWeight: 500 }}>
            Source: OpenWeatherMap API (Mumbai, IN)
        </p>
        <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, marginBottom: '12px', fontWeight: 500 }}>
            Last updated: {lastUpdated}
        </p>

        <button
            onClick={onRefresh}
            disabled={refreshing}
            style={{
                width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0',
                background: refreshing ? '#f8fafc' : 'white', cursor: refreshing ? 'wait' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                fontSize: '11px', fontWeight: 600, color: '#64748b', fontFamily: 'Outfit, sans-serif',
                transition: 'all 0.15s ease',
            }}
        >
            <RefreshCw style={{
                width: '12px', height: '12px',
                animation: refreshing ? 'spin 1s linear infinite' : 'none',
            }} />
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
    </div>
);

// ===========================================================
//  AI Interpretation Card
// ===========================================================
const AIInterpretation = ({ summary, timestamp }) => (
    <div style={{
        background: 'linear-gradient(135deg, #eff6ff, #f0f9ff)',
        borderRadius: '14px', border: '1px solid #bfdbfe', padding: '16px',
        fontFamily: 'Outfit, sans-serif',
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <div style={{
                width: '24px', height: '24px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', color: 'white',
            }}>✦</div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                AI Risk Analysis
            </span>
        </div>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#1e3a5f', margin: 0, lineHeight: 1.5 }}>
            {summary}
        </p>
        <p style={{ fontSize: '9px', color: '#94a3b8', margin: 0, marginTop: '8px', fontWeight: 500 }}>
            Based on live OpenWeatherMap data • {timestamp}
        </p>
    </div>
);

// ===========================================================
//  Current Weather Banner
// ===========================================================
const CurrentWeatherBanner = ({ current }) => (
    <div style={{
        background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
        padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        fontFamily: 'Outfit, sans-serif', marginBottom: '16px',
        display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap',
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: current.isRaining ? 'linear-gradient(135deg, #dbeafe, #bfdbfe)' : 'linear-gradient(135deg, #fef3c7, #fde68a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                {current.isRaining
                    ? <CloudRain style={{ width: '24px', height: '24px', color: '#2563eb' }} />
                    : <Sun style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
                }
            </div>
            <div>
                <p style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: 0 }}>{current.temp}°C</p>
                <p style={{ fontSize: '11px', color: '#64748b', margin: 0, fontWeight: 500, textTransform: 'capitalize' }}>{current.description}</p>
            </div>
        </div>

        {/* Stats pills */}
        {[
            { icon: Droplets, label: 'Humidity', value: `${current.humidity}%`, color: '#3b82f6' },
            { icon: Wind, label: 'Wind', value: `${current.wind} km/h`, color: '#64748b' },
            { icon: Eye, label: 'Visibility', value: `${current.visibility} km`, color: '#8b5cf6' },
            { icon: CloudRain, label: 'Rain (1h)', value: `${current.rain1h}mm`, color: '#0ea5e9' },
        ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                <s.icon style={{ width: '14px', height: '14px', color: s.color }} />
                <div>
                    <p style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600, margin: 0, textTransform: 'uppercase' }}>{s.label}</p>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{s.value}</p>
                </div>
            </div>
        ))}

        {/* Live badge */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#16a34a' }}>LIVE</span>
        </div>
    </div>
);

// ===========================================================
//  MAIN PAGE
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
            }) + ' IST, ' + new Date().toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata',
            }));
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
            <div style={{
                padding: '20px', fontFamily: 'Outfit, sans-serif',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: '100%', color: '#94a3b8', fontSize: '14px', fontWeight: 600,
            }}>
                <RefreshCw style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite', marginRight: '10px' }} />
                Fetching live weather data from OpenWeatherMap...
            </div>
        );
    }

    return (
        <div style={{
            padding: '20px', maxWidth: '1400px', margin: '0 auto',
            fontFamily: 'Outfit, sans-serif',
        }}>
            {/* Page Header */}
            <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {t('imd.page.title')}
                </h1>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, marginTop: '4px', fontWeight: 500 }}>
                    {apiOnline ? 'Live data from OpenWeatherMap API • Mumbai, Maharashtra' : 'API offline — showing cached data'}
                </p>
            </div>

            {/* Current Weather Banner */}
            {current && <CurrentWeatherBanner current={current} />}

            {/* 5-Day Forecast */}
            {forecast && (
                <div style={{
                    background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
                    padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)', marginBottom: '16px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <div>
                            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                                {t('imd.forecast.title')}
                            </h2>
                            <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>
                                5-day forecast • OpenWeatherMap
                            </p>
                        </div>
                        <span style={{
                            fontSize: '8px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px',
                            background: apiOnline ? '#f0fdf4' : '#fef2f2',
                            color: apiOnline ? '#16a34a' : '#dc2626',
                            border: `1px solid ${apiOnline ? '#bbf7d0' : '#fecaca'}`,
                        }}>{apiOnline ? 'LIVE DATA' : 'CACHED'}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }} className="custom-scrollbar">
                        {forecast.map((d, i) => (
                            <ForecastCard key={i} data={d} isToday={i === 0} />
                        ))}
                    </div>
                </div>
            )}

            {/* Alerts + Side Column */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                {/* Alerts */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                        background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
                        padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)', height: '100%',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                            <div>
                                <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                                    {t('imd.alerts.title')}
                                </h2>
                                <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>
                                    Auto-generated from live weather data
                                </p>
                            </div>
                            <AlertTriangle style={{ width: '16px', height: '16px', color: '#f59e0b' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {alerts.length > 0 ? alerts.map(alert => (
                                <AlertBanner key={alert.id} alert={alert} />
                            )) : (
                                <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', padding: '20px' }}>
                                    No active alerts
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Side column */}
                <div style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <IMDStatusWidget
                        apiOnline={apiOnline}
                        lastUpdated={lastUpdated}
                        onRefresh={loadData}
                        refreshing={refreshing}
                    />
                    <AIInterpretation summary={aiSummary} timestamp={lastUpdated} />
                </div>
            </div>

            {/* Rainfall Chart */}
            {forecast && <RainfallChart forecast={forecast} />}
        </div>
    );
};

export default RiskMonitoring;
