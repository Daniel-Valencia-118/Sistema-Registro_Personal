import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function RecentrarMapa({ coords }) {
    const map = useMap();
    useEffect(() => {
        if (coords[0] && coords[1]) {
            map.setView(coords, map.getZoom());
        }
    }, [coords, map]);
    return null;
}

export default function MapPicker({ lat, lng, onChange, height = '350px' }) {
    const centroCiudad = [-16.495581349984814, -68.13352637564697]; 
    const centroInicial = lat && lng ? [lat, lng] : centroCiudad;

    function ClickListener() {
        useMapEvents({
            click(e) {
                onChange({
                    lat: e.latlng.lat,
                    lng: e.latlng.lng
                });
            },
        });
        return null;
    }

    return (
        <div className="w-full border rounded overflow-hidden z-0" style={{ height }}>
            <MapContainer 
                center={centroInicial} 
                zoom={20}
                style={{ height: '100%', width: '100%' }}
            >
            <TileLayer
                attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                subdomains={['a', 'b', 'c']}
            />

                
                <ClickListener />
                <RecentrarMapa coords={[lat, lng]} />

                {lat && lng && (
                    <Marker position={[lat, lng]} />
                )}
            </MapContainer>
        </div>
    );
}
