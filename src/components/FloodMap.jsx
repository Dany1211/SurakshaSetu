import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { useState, useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// ---- Risk zone marker ----
const createRiskIcon = (riskLevel) => {
    const colors = { HIGH: '#ef4444', MEDIUM: '#f59e0b', LOW: '#22c55e' };
    const color = colors[riskLevel] || '#94a3b8';
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="
            width: 12px; height: 12px; background: ${color};
            border: 2px solid white; border-radius: 50%;
            box-shadow: 0 1px 4px rgba(0,0,0,0.25);
        "></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
    });
};

// ---- Shelter marker (green square with Lucide icon) ----
const createShelterIcon = () => {
    return L.divIcon({
        className: 'shelter-marker',
        html: `<div style="
            width: 24px; height: 24px; background: #16a34a;
            border: 2px solid white; border-radius: 6px;
            box-shadow: 0 2px 8px rgba(22,163,74,0.25);
            display: flex; align-items: center; justify-content: center;
            color: white; transform: translate(-50%, -50%);
        ">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </div>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
    });
};

// ---- DATA ----
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

const shelters = [
    { id: 's1', name: 'Town Hall Community Center', lat: 19.0800, lng: 72.8780, capacity: 500, status: 'Open' },
    { id: 's2', name: 'Primary School #3', lat: 19.1290, lng: 72.8350, capacity: 300, status: 'Open' },
    { id: 's3', name: 'District Sports Complex', lat: 19.0500, lng: 72.8550, capacity: 800, status: 'Open' },
    { id: 's4', name: 'Municipal School #7', lat: 19.0230, lng: 72.8420, capacity: 250, status: 'Open' },
    { id: 's5', name: 'Bandra Community Hall', lat: 19.0650, lng: 72.8450, capacity: 350, status: 'Filling' },
    { id: 's6', name: 'Borivali Relief Camp', lat: 19.2250, lng: 72.8500, capacity: 200, status: 'Open' },
];

const hospitals = [
    { name: "City Central Hospital", lat: 19.0760, lng: 72.8777, capacity: 250, current: 120 },
    { name: "Riverbank Medical Center", lat: 19.0650, lng: 72.9000, capacity: 180, current: 95 },
    { name: "Mumbai North General Hospital", lat: 19.1400, lng: 72.8500, capacity: 300, current: 176 },
    { name: "Holy Cross Community Hospital", lat: 19.0300, lng: 72.8600, capacity: 120, current: 87 },
    { name: "Bandra Care Center", lat: 19.0544, lng: 72.8402, capacity: 90, current: 55 },
    { name: "Sion Emergency Hospital", lat: 19.0470, lng: 72.8656, capacity: 200, current: 142 }
];

const riskColors = {
    HIGH: { fill: '#ef4444', opacity: 0.15, border: '#ef4444' },
    MEDIUM: { fill: '#f59e0b', opacity: 0.12, border: '#f59e0b' },
    LOW: { fill: '#22c55e', opacity: 0.08, border: '#22c55e' },
};

const filterOptions = ['ALL', 'HIGH', 'MEDIUM', 'LOW'];


// ---- Hospital marker (blue building with Lucide icon) ----
const createHospitalIcon = () => {
    return L.divIcon({
        className: 'hospital-marker',
        html: `<div style="
            width: 24px; height: 24px; background: #2563eb;
            border: 2px solid white; border-radius: 6px;
            box-shadow: 0 2px 8px rgba(37,99,235,0.25);
            display: flex; align-items: center; justify-content: center;
            color: white; transform: translate(-50%, -50%);
        ">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
        </div>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
    });
};


const FloodMap = () => {
    const center = [19.076, 72.8777];
    const controlsRef = useRef(null);
    const legendRef = useRef(null);

    const [showZones, setShowZones] = useState(true);
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [showShelters, setShowShelters] = useState(true);
    const [showHospitals, setShowHospitals] = useState(true);
    const [showRainfall, setShowRainfall] = useState(false);
    const [showControls, setShowControls] = useState(true);

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

    const visibleZones = activeFilter === 'ALL'
        ? floodZones
        : floodZones.filter(z => z.riskLevel === activeFilter);

    const cycleFilter = () => {
        const idx = filterOptions.indexOf(activeFilter);
        setActiveFilter(filterOptions[(idx + 1) % filterOptions.length]);
    };

    const filterLabel = {
        ALL: 'All Zones',
        HIGH: '🔴 High',
        MEDIUM: '🟡 Medium',
        LOW: '🟢 Low',
    };

    // Shared button style helper
    const btnStyle = (active, activeColor, activeBorder) => ({
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '6px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: 800,
        background: active ? activeColor : 'rgba(255,255,255,0.9)',
        color: active ? 'white' : '#475569',
        backdropFilter: 'blur(8px)',
        border: active ? `1px solid ${activeBorder}` : '1px solid #e2e8f0',
        cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        width: '115px',
        textTransform: 'uppercase',
        letterSpacing: '0.04em'
    });

    return (
        <div className="map-wrapper w-full h-full" style={{ position: 'relative', overflow: 'clip', isolation: 'isolate', zIndex: 1 }}>
            {/* ---- Controls Panel ---- */}
            <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 1000, display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <AnimatePresence>
                    {showControls && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            ref={controlsRef}
                            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                        >
                            <button onClick={() => setShowZones(!showZones)} style={btnStyle(showZones, '#2563eb', '#1d4ed8')}>
                                <Layers style={{ width: '14px', height: '14px' }} />
                                Zones
                            </button>

                            <button onClick={cycleFilter} style={btnStyle(activeFilter !== 'ALL', '#0f172a', '#0f172a')}>
                                <Filter style={{ width: '14px', height: '14px' }} />
                                {filterLabel[activeFilter]}
                            </button>

                            <button onClick={() => setShowShelters(!showShelters)} style={btnStyle(showShelters, '#16a34a', '#15803d')}>
                                🏠 Shelters
                            </button>

                            <button onClick={() => setShowHospitals(!showHospitals)} style={btnStyle(showHospitals, '#2563eb', '#1d4ed8')}>
                                🏥 Hospitals
                            </button>

                            <button onClick={() => setShowRainfall(!showRainfall)} style={btnStyle(showRainfall, '#7c3aed', '#6d28d9')}>
                                🌧️ Rainfall
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Hide/Show Toggle Button */}
                <button
                    onClick={() => setShowControls(!showControls)}
                    style={{
                        padding: '8px', background: 'white', border: '1px solid #e2e8f0',
                        borderRadius: '8px', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', color: '#64748b',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    }}
                >
                    {showControls ? <ChevronLeft style={{ width: '16px', height: '16px' }} /> : <ChevronRight style={{ width: '16px', height: '16px' }} />}
                </button>
            </div>

            <MapContainer center={center} zoom={12} scrollWheelZoom={true} zoomControl={false} className="w-full h-full" style={{ background: '#f1f5f9' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {/* Risk Zone Circles */}
                {showZones && visibleZones.map((zone) => (
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

                {/* Rainfall Heatmap */}
                {showRainfall && floodZones.map((zone) => (
                    <Circle
                        key={`rain-${zone.id}`}
                        center={[zone.lat, zone.lng]}
                        radius={zone.rainfall * 12}
                        pathOptions={{
                            color: 'transparent',
                            fillColor: '#6d28d9',
                            fillOpacity: 0.06 + (zone.rainfall / 180) * 0.14,
                            weight: 0,
                        }}
                    />
                ))}

                {/* Ward Markers */}
                {visibleZones.map((zone) => (
                    <Marker key={zone.id} position={[zone.lat, zone.lng]} icon={createRiskIcon(zone.riskLevel)}>
                        <Popup>
                            <div style={{ fontFamily: 'Outfit, sans-serif', padding: '4px', minWidth: '160px', fontSize: '14px' }}>
                                <p style={{ fontWeight: 700, color: '#0f172a', fontSize: '16px', marginBottom: '6px' }}>{zone.name}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                    <span style={{
                                        display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%',
                                        background: zone.riskLevel === 'HIGH' ? '#ef4444' : zone.riskLevel === 'MEDIUM' ? '#f59e0b' : '#22c55e'
                                    }} />
                                    <span style={{ fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>{zone.riskLevel} RISK</span>
                                </div>
                                <p style={{ color: '#64748b', fontSize: '14px' }}>Rainfall: <strong style={{ color: '#0f172a' }}>{zone.rainfall}mm</strong></p>
                                <p style={{ color: '#64748b', fontSize: '14px' }}>River: <strong style={{ color: '#0f172a' }}>{zone.riverLevel}m</strong></p>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Shelter Markers */}
                {showShelters && shelters.map((shelter) => (
                    <Marker key={shelter.id} position={[shelter.lat, shelter.lng]} icon={createShelterIcon()}>
                        <Popup>
                            <div style={{ fontFamily: 'Outfit, sans-serif', padding: '4px', minWidth: '160px', fontSize: '14px' }}>
                                <p style={{ fontWeight: 700, color: '#0f172a', fontSize: '15px', marginBottom: '4px' }}>🏠 {shelter.name}</p>
                                <p style={{ fontSize: '11px', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', marginBottom: '8px' }}>
                                    SAFE SHELTER ZONE
                                </p>
                                <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 4px' }}>Status: <strong style={{ color: '#16a34a' }}>{shelter.status}</strong></p>
                                <p style={{ color: '#64748b', fontSize: '13px' }}>Capacity: <strong style={{ color: '#0f172a' }}>{shelter.capacity} people</strong></p>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Hospital Markers */}
                {showHospitals && hospitals.map((hosp, i) => {
                    const occupancy = Math.round((hosp.current / hosp.capacity) * 100);
                    return (
                        <Marker key={`hosp-${i}`} position={[hosp.lat, hosp.lng]} icon={createHospitalIcon()}>
                            <Popup>
                                <div style={{ fontFamily: 'Outfit, sans-serif', padding: '4px', minWidth: '180px' }}>
                                    <p style={{ fontWeight: 800, color: '#0f172a', fontSize: '14px', margin: '0 0 2px' }}>🏥 {hosp.name}</p>
                                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '10px' }}>Medical Emergency Center</p>

                                    <div style={{ marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                                            <span style={{ color: '#64748b' }}>Occupancy</span>
                                            <span style={{ color: occupancy > 85 ? '#ef4444' : '#2563eb' }}>{occupancy}%</span>
                                        </div>
                                        <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                                            <div style={{ width: `${occupancy}%`, height: '100%', background: occupancy > 85 ? '#ef4444' : '#2563eb', borderRadius: '10px' }} />
                                        </div>
                                    </div>

                                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                                        Beds: <strong style={{ color: '#0f172a' }}>{hosp.capacity - hosp.current}</strong> available
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            {/* ---- Legend (Compact - Bottom Right) ---- */}
            <div ref={legendRef} style={{
                position: 'absolute', bottom: '16px', right: '16px', zIndex: 1000,
                background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)',
                borderRadius: '8px', border: '1px solid #e2e8f0', padding: '8px 10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)', fontFamily: 'Outfit, sans-serif',
                minWidth: '100px'
            }}>
                <p style={{ fontSize: '9px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Legend</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {[
                        { label: 'High', color: '#ef4444' },
                        { label: 'Medium', color: '#f59e0b' },
                        { label: 'Low', color: '#22c55e' },
                    ].map((item) => (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#475569' }}>{item.label}</span>
                        </div>
                    ))}
                    {(showShelters || showHospitals || showRainfall) && <div style={{ height: '1px', background: '#f1f5f9', margin: '3px 0' }} />}
                    {showShelters && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '9px' }}>🏠</span>
                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#475569' }}>Shelter</span>
                        </div>
                    )}
                    {showHospitals && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '9px' }}>🏥</span>
                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#475569' }}>Hospital</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FloodMap;
