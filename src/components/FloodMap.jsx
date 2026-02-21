import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers, Filter } from 'lucide-react';

// Fix default marker icon issue with bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const createRiskIcon = (riskLevel) => {
    const colors = {
        HIGH: '#ef4444',
        MEDIUM: '#f59e0b',
        LOW: '#22c55e',
    };
    const color = colors[riskLevel] || '#94a3b8';

    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="
            width: 14px; height: 14px;
            background: ${color};
            border: 2.5px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
    });
};

const floodZones = [
    { id: 1, name: 'Andheri West', lat: 19.1365, lng: 72.8296, riskLevel: 'HIGH', rainfall: 145, riverLevel: 3.2 },
    { id: 2, name: 'Dadar', lat: 19.0178, lng: 72.8478, riskLevel: 'MEDIUM', rainfall: 85, riverLevel: 2.1 },
    { id: 3, name: 'Borivali', lat: 19.2307, lng: 72.8567, riskLevel: 'LOW', rainfall: 40, riverLevel: 1.5 },
    { id: 4, name: 'Kurla', lat: 19.0726, lng: 72.8845, riskLevel: 'HIGH', rainfall: 160, riverLevel: 3.2 },
    { id: 5, name: 'Bandra East', lat: 19.0596, lng: 72.8505, riskLevel: 'MEDIUM', rainfall: 110, riverLevel: 2.8 },
    { id: 6, name: 'Colaba', lat: 18.9067, lng: 72.8147, riskLevel: 'LOW', rainfall: 30, riverLevel: 1.2 },
    { id: 7, name: 'Sion', lat: 19.0436, lng: 72.8620, riskLevel: 'HIGH', rainfall: 155, riverLevel: 3.5 },
    { id: 8, name: 'Malad', lat: 19.1874, lng: 72.8484, riskLevel: 'MEDIUM', rainfall: 95, riverLevel: 2.4 },
];

const riskColors = {
    HIGH: { fill: '#ef4444', opacity: 0.15, border: '#ef4444' },
    MEDIUM: { fill: '#f59e0b', opacity: 0.12, border: '#f59e0b' },
    LOW: { fill: '#22c55e', opacity: 0.08, border: '#22c55e' },
};

const FloodMap = () => {
    const center = [19.076, 72.8777]; // Mumbai
    const controlsRef = useRef(null);
    const legendRef = useRef(null);

    // Prevent Leaflet from capturing click/scroll events on our overlay controls
    useEffect(() => {
        if (controlsRef.current) {
            L.DomEvent.disableClickPropagation(controlsRef.current);
            L.DomEvent.disableScrollPropagation(controlsRef.current);
        }
        if (legendRef.current) {
            L.DomEvent.disableClickPropagation(legendRef.current);
            L.DomEvent.disableScrollPropagation(legendRef.current);
        }
    }, []);

    return (
        <div className="map-wrapper w-full h-full" style={{ position: 'relative', overflow: 'clip', isolation: 'isolate', zIndex: 1 }}>
            {/* Map overlay buttons — uses L.DomEvent to block Leaflet from stealing clicks */}
            <div
                ref={controlsRef}
                style={{
                    position: 'absolute', top: '14px', left: '14px', zIndex: 1000,
                    display: 'flex', gap: '8px',
                }}
            >
                <button
                    onClick={() => { console.log('ZONES clicked'); }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        padding: '6px 12px', borderRadius: '8px', fontSize: '10px', fontWeight: 700,
                        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
                        border: '1px solid #e2e8f0', color: '#334155', cursor: 'pointer',
                        fontFamily: 'Outfit, sans-serif', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    }}
                >
                    <Layers style={{ width: '12px', height: '12px', color: '#2563eb' }} />
                    ZONES
                </button>
                <button
                    onClick={() => { console.log('FILTERS clicked'); }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        padding: '6px 12px', borderRadius: '8px', fontSize: '10px', fontWeight: 700,
                        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
                        border: '1px solid #e2e8f0', color: '#334155', cursor: 'pointer',
                        fontFamily: 'Outfit, sans-serif', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    }}
                >
                    <Filter style={{ width: '12px', height: '12px', color: '#94a3b8' }} />
                    FILTERS
                </button>
            </div>

            <MapContainer
                center={center}
                zoom={12}
                scrollWheelZoom={true}
                zoomControl={false}
                className="w-full h-full"
                style={{ background: '#f1f5f9' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {/* Risk Zone Circles */}
                {floodZones.map((zone) => (
                    <Circle
                        key={`circle-${zone.id}`}
                        center={[zone.lat, zone.lng]}
                        radius={zone.riskLevel === 'HIGH' ? 1200 : zone.riskLevel === 'MEDIUM' ? 900 : 600}
                        pathOptions={{
                            color: riskColors[zone.riskLevel].border,
                            fillColor: riskColors[zone.riskLevel].fill,
                            fillOpacity: riskColors[zone.riskLevel].opacity,
                            weight: 1.5,
                            dashArray: zone.riskLevel === 'LOW' ? '4 4' : undefined,
                        }}
                    />
                ))}

                {/* Ward Markers */}
                {floodZones.map((zone) => (
                    <Marker
                        key={zone.id}
                        position={[zone.lat, zone.lng]}
                        icon={createRiskIcon(zone.riskLevel)}
                    >
                        <Popup>
                            <div style={{ fontFamily: 'Outfit, sans-serif', padding: '4px', minWidth: '140px', fontSize: '12px' }}>
                                <p style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px', marginBottom: '4px' }}>{zone.name}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                    <span style={{
                                        display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%',
                                        background: zone.riskLevel === 'HIGH' ? '#ef4444' : zone.riskLevel === 'MEDIUM' ? '#f59e0b' : '#22c55e'
                                    }} />
                                    <span style={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{zone.riskLevel} RISK</span>
                                </div>
                                <div style={{ color: '#64748b' }}>
                                    <p>Rainfall: <strong style={{ color: '#0f172a' }}>{zone.rainfall}mm</strong></p>
                                    <p>River: <strong style={{ color: '#0f172a' }}>{zone.riverLevel}m</strong></p>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Map Legend */}
            <div
                ref={legendRef}
                style={{
                    position: 'absolute', bottom: '16px', left: '16px', zIndex: 1000,
                    background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
                    borderRadius: '8px', border: '1px solid #e2e8f0', padding: '10px 12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)', fontFamily: 'Outfit, sans-serif'
                }}
            >
                <p style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Risk Level</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {[
                        { label: 'High', color: '#ef4444' },
                        { label: 'Medium', color: '#f59e0b' },
                        { label: 'Low', color: '#22c55e' },
                    ].map((item) => (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color, border: '2px solid white', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }} />
                            <span style={{ fontSize: '10px', fontWeight: 600, color: '#334155' }}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FloodMap;
