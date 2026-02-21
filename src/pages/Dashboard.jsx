import RiskCard from '../components/RiskCard';
import PlanPanel from '../components/PlanPanel';
import FloodMap from '../components/FloodMap';
import SOSPanel from '../components/SOSPanel';
import ResourcePanel from '../components/ResourcePanel';

const Dashboard = () => {
    const mockWards = [
        { id: 1, name: 'Andheri West', rainfall: 145, riverLevel: 3.2, riskLevel: 'HIGH' },
        { id: 2, name: 'Dadar', rainfall: 85, riverLevel: 2.1, riskLevel: 'MEDIUM' },
        { id: 3, name: 'Borivali', rainfall: 40, riverLevel: 1.5, riskLevel: 'LOW' },
        { id: 4, name: 'Kurla', rainfall: 160, riverLevel: 3.2, riskLevel: 'HIGH' },
        { id: 5, name: 'Bandra', rainfall: 110, riverLevel: 2.8, riskLevel: 'MEDIUM' },
    ];

    return (
        <div style={{
            padding: '16px', height: '100%', maxWidth: '1600px', margin: '0 auto',
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
            <div style={{ width: '280px', flexShrink: 0, height: '100%' }}
                className="hidden xl:block"
            >
                <div style={{
                    background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9',
                    height: '100%', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    display: 'flex', flexDirection: 'column', overflow: 'hidden',
                }}>
                    {/* SOS Alerts */}
                    <SOSPanel />

                    {/* Resources Available (Buses, Boats, Ambulances) */}
                    <ResourcePanel />

                    {/* Ward Monitoring Header */}
                    <div style={{
                        padding: '12px 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                        <div>
                            <h2 style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                                Ward Monitoring
                            </h2>
                            <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>Live Updates</p>
                        </div>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '5px',
                            padding: '2px 8px', background: '#fef2f2', borderRadius: '6px',
                        }}>
                            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 2s infinite' }} />
                            <span style={{ fontSize: '9px', fontWeight: 700, color: '#dc2626' }}>LIVE</span>
                        </div>
                    </div>

                    {/* Ward Cards */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 12px' }}
                        className="custom-scrollbar"
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {mockWards.map((ward) => (
                                <RiskCard
                                    key={ward.id}
                                    wardName={ward.name}
                                    rainfall={ward.rainfall}
                                    riverLevel={ward.riverLevel}
                                    riskLevel={ward.riskLevel}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
