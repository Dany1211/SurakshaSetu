import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom Icons
const createStartIcon = () => {
    return L.divIcon({
        className: 'start-marker',
        html: `<div style="
            width: 20px; height: 20px; background: #ef4444;
            border: 3px solid white; border-radius: 50%;
            box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
            display: flex; align-items: center; justify-content: center;
        "><div style="width: 6px; height: 6px; background: white; border-radius: 50%;"></div></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    });
};

const createEndIcon = () => {
    return L.divIcon({
        className: 'end-marker',
        html: `<div style="
            width: 24px; height: 24px; background: #22c55e;
            border: 3px solid white; border-radius: 6px;
            box-shadow: 0 2px 8px rgba(34, 197, 94, 0.4);
            display: flex; align-items: center; justify-content: center;
            font-size: 13px; color: white;
        ">🏠</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });
};

// Component to handle the Routing Machine instance
const Routing = ({ startCoord, endCoord }) => {
    const map = useMap();
    const routingControlRef = useRef(null);

    useEffect(() => {
        if (!map) return;

        if (routingControlRef.current) {
            map.removeControl(routingControlRef.current);
        }

        if (startCoord && endCoord) {
            const plan = new L.Routing.Plan([
                L.latLng(startCoord.lat, startCoord.lng),
                L.latLng(endCoord.lat, endCoord.lng)
            ], {
                createMarker: function () { return null; }, // We'll handle our own markers above
            });

            routingControlRef.current = L.Routing.control({
                waypoints: [
                    L.latLng(startCoord.lat, startCoord.lng),
                    L.latLng(endCoord.lat, endCoord.lng)
                ],
                plan: plan,
                lineOptions: {
                    styles: [{ color: '#3b82f6', opacity: 0.8, weight: 6 }] // Sleek blue route line
                },
                show: false, // Hide the turn-by-turn text box on the map
                addWaypoints: false,
                routeWhileDragging: false,
                fitSelectedRoutes: true,
                showAlternatives: false
            }).addTo(map);
        }

        return () => {
            if (routingControlRef.current) {
                map.removeControl(routingControlRef.current);
            }
        };
    }, [map, startCoord, endCoord]);

    return null;
};

const ActionPlanMap = ({ startCoord, endCoord, startName, endName }) => {
    const defaultCenter = [19.076, 72.8777]; // Mumbai Center

    return (
        <div style={{ height: '400px', width: '100%', borderRadius: '14px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <MapContainer
                center={startCoord || defaultCenter}
                zoom={12}
                scrollWheelZoom={true}
                className="w-full h-full"
                style={{ background: '#f1f5f9' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {startCoord && (
                    <Marker position={[startCoord.lat, startCoord.lng]} icon={createStartIcon()}>
                        <Popup>
                            <div style={{ fontFamily: 'Outfit, sans-serif' }}>
                                <strong>Evacuation Origin</strong><br />
                                {startName}
                            </div>
                        </Popup>
                    </Marker>
                )}

                {endCoord && (
                    <Marker position={[endCoord.lat, endCoord.lng]} icon={createEndIcon()}>
                        <Popup>
                            <div style={{ fontFamily: 'Outfit, sans-serif' }}>
                                <strong>Designated Shelter</strong><br />
                                {endName}
                            </div>
                        </Popup>
                    </Marker>
                )}

                {startCoord && endCoord && (
                    <Routing startCoord={startCoord} endCoord={endCoord} />
                )}

            </MapContainer>
        </div>
    );
};

export default ActionPlanMap;
