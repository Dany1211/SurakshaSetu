import { Droplets, Waves } from 'lucide-react';

const RiskCard = ({ wardName, rainfall, riverLevel, riskLevel }) => {
    const riskColor = riskLevel === 'HIGH' ? '#ef4444' : riskLevel === 'MEDIUM' ? '#f59e0b' : '#22c55e';
    const riskBg = riskLevel === 'HIGH' ? '#fef2f2' : riskLevel === 'MEDIUM' ? '#fffbeb' : '#f0fdf4';
    const riskBorder = riskLevel === 'HIGH' ? '#fecaca' : riskLevel === 'MEDIUM' ? '#fde68a' : '#bbf7d0';
    const rainfallPct = Math.min((rainfall / 200) * 100, 100);

    return (
        <div style={{
            padding: '12px', borderRadius: '12px', border: '1px solid #f1f5f9',
            background: 'white', fontFamily: 'Outfit, sans-serif',
            transition: 'border-color 0.2s',
        }}>
            {/* Ward name + Risk tag */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', letterSpacing: '-0.01em' }}>
                    {wardName}
                </span>
                <span style={{
                    padding: '2px 8px', borderRadius: '6px', fontSize: '9px', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.04em',
                    background: riskBg, color: riskColor, border: `1px solid ${riskBorder}`,
                }}>
                    {riskLevel}
                </span>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Droplets style={{ width: '12px', height: '12px', color: '#94a3b8', strokeWidth: 1.8 }} />
                    <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>Rain</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b', marginLeft: '2px' }}>{rainfall}mm</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Waves style={{ width: '12px', height: '12px', color: '#94a3b8', strokeWidth: 1.8 }} />
                    <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>River</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b', marginLeft: '2px' }}>{riverLevel}m</span>
                </div>
            </div>

            {/* Thin progress bar */}
            <div style={{ width: '100%', height: '3px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{
                    width: `${rainfallPct}%`, height: '100%', borderRadius: '999px',
                    background: riskColor, transition: 'width 0.6s ease',
                }} />
            </div>
        </div>
    );
};

export default RiskCard;
