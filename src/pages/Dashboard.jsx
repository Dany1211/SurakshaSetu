import { useEffect } from 'react';
import RiskCard from '../components/RiskCard';
import PlanPanel from '../components/PlanPanel';
import FloodMap from '../components/FloodMap';
import SOSPanel from '../components/SOSPanel';
import ResourcePanel from '../components/ResourcePanel';
import { fetchWardsData } from '../utils/weatherService';
import { Loader2 } from 'lucide-react';
import { logTelemetry } from '../services/firebaseService';
import { useFirebaseSync } from '../hooks/useFirebaseSync';

const Dashboard = () => {
    const { telemetry, loading } = useFirebaseSync();
    const wards = telemetry.wards || [];

    useEffect(() => {
        const loadWards = async () => {
            const data = await fetchWardsData();
            if (data && data.length > 0) {
                // Determine System Risk
                let systemRisk = 'LOW';
                if (data.some(w => w.riskLevel === 'HIGH')) {
                    systemRisk = 'HIGH';
                } else if (data.some(w => w.riskLevel === 'MEDIUM')) {
                    systemRisk = 'MEDIUM';
                }

                // Write to Firebase (Master Node)
                await logTelemetry(data, systemRisk);
            }
        };

        loadWards();
        // Poll every 5 minutes
        const intervalId = setInterval(loadWards, 300000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={{
            padding: '20px', height: '100%', maxWidth: '1600px', margin: '0 auto',
            overflow: 'hidden', display: 'flex', gap: '16px', fontFamily: 'Outfit, sans-serif',
        }}>
            {/* Left: Map + Plan */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0, overflowY: 'auto' }}
                className="custom-scrollbar"
            >
                {/* Flood Map */}
                <div style={{
                    background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden', flexShrink: 0,
                }}>
                    <div style={{ height: '380px' }}>
                        <FloodMap />
                    </div>
                </div>

                {/* AI Evacuation Plan */}
                <div style={{ flexShrink: 0 }}>
                    <PlanPanel />
                </div>
            </div>

            {/* Right: SOS + Resources + Ward Monitoring */}
            <div style={{ width: '320px', flexShrink: 0, height: '100%' }}
                className="hidden xl:block"
            >
                <div style={{
                    background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
                    height: '100%', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    display: 'flex', flexDirection: 'column', overflow: 'hidden',
                }}>
                    {/* SOS Alerts */}
                    <SOSPanel />

                    {/* Resources Available */}
                    <ResourcePanel />

                    {/* Ward Monitoring Header */}
                    <div style={{
                        padding: '14px 18px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                        <div>
                            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                                Ward Monitoring
                            </h2>
                            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>Live Updates</p>
                        </div>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '5px',
                            padding: '4px 10px', background: '#fef2f2', borderRadius: '6px',
                        }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 2s infinite' }} />
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#dc2626' }}>LIVE</span>
                        </div>
                    </div>

                    {/* Ward Cards */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '0 14px 14px' }}
                        className="custom-scrollbar"
                    >
                        {loading ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '10px' }}>
                                <Loader2 style={{ width: '24px', height: '24px', color: '#94a3b8', animation: 'spin 1s linear infinite' }} />
                                <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>Fetching Live Data...</span>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {wards.map((ward) => (
                                    <RiskCard
                                        key={ward.id}
                                        wardName={ward.name}
                                        rainfall={ward.rainfall}
                                        riverLevel={ward.riverLevel}
                                        riskLevel={ward.riskLevel}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
