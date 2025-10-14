// src/components/TotemMap.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
// 🛑 Solución al error: Importa la URL del archivo GeoJSON usando la sintaxis de Vite
import totemDataUrl from '../data/totems.geojson?url'; 

// FIX para los iconos de marcador de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const TotemMap = () => {
    const [geoJsonData, setGeoJsonData] = useState(null);

    useEffect(() => {
        // Carga asíncrona de los datos GeoJSON
        fetch(totemDataUrl)
            .then(response => response.json()) 
            .then(data => setGeoJsonData(data))
            .catch(error => console.error("Error cargando GeoJSON:", error));
    }, []); 

    const initialPosition = [6.5570, -75.8271]; 

    // Función para definir el popup de cada marcador
    const onEachFeature = (feature, layer) => {
        layer.bindPopup(`
            <strong>${feature.properties.name}</strong><br/>
            ${feature.properties.description}
        `);
    };

    // Función para usar el ícono de marcador por defecto de Leaflet
    const pointToLayer = (feature, latlng) => {
        return L.marker(latlng);
    };

    return (
        <div style={{ height: '400px', width: '100%', marginBottom: '20px' }}>
            <h3>Mapa de Tótems 🗺️</h3>
            <MapContainer center={initialPosition} zoom={13} style={{ height: '100%' }}>
                {/*<TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />*/}
                
                {/* Renderizar solo si los datos están cargados */}
                {geoJsonData && (
                    <GeoJSON 
                        data={geoJsonData}
                        pointToLayer={pointToLayer}
                        onEachFeature={onEachFeature}
                    />
                )}
            </MapContainer>
        </div>
    );
};

export default TotemMap;