import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapViewer({ lat, lng, height = '250px', ...props }) {

    if (!lat || !lng) {
        return <p className="text-gray-400 text-sm italic">Sin ubicación registrada.</p>;
    }

    const posicion = [parseFloat(lat), parseFloat(lng)];

    return (
        <div className="space-y-2">
            <div ref={props.ref} className="w-full border rounded overflow-hidden z-0 relative" style={{ height }}>
                <MapContainer 
                    center={posicion} 
                    zoom={20}
                    dragging={false}      
                    scrollWheelZoom={false}
                    doubleClickZoom={false}
                    id="mapa-viewer"
                    zoomControl={false}    
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={posicion} />
                </MapContainer>
            </div>
        </div>
    );
}
