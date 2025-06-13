import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import MapLoader from './MapLoader';

// Fix leaflet's default icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const PropertyLocationMap = ({ district, city, key }) => {

    const [position, setPosition] = useState(null);

    const fetchPosition = async () => {
        const query = encodeURIComponent(`${district}, ${city}`);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

        try {
            const response = await axios.get(url);
            const data = response.data;

            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                setPosition([parseFloat(lat), parseFloat(lon)]);
            } else {
                console.warn('No location found for', query);
            }
        } catch (error) {
            console.error('Geocoding error:', error);
        }
    };
    useEffect(() => {
        fetchPosition();
    }, [district, city, fetchPosition]);

    if (!position) {
        return <MapLoader />
    }

    return (
        <MapContainer
            center={position}
            zoom={13}
            style={{ height: '400px', width: '100%', borderRadius: '20px', zIndex: 1 }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />
            <Marker position={position}>
                <Popup>
                    {district}, {city}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default PropertyLocationMap;