// src/components/TotemMap.jsx
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import totemDataUrl from '../../data/totems.geojson?url';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const TotemMap = ({ className = '' }) => {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [mapInstance, setMapInstance] = useState(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        fetch(totemDataUrl)
            .then(response => response.json())
            .then(data => setGeoJsonData(data))
            .catch(error => console.error("Error cargando GeoJSON:", error));
    }, []);

    useEffect(() => {
        if (!mapInstance || !wrapperRef.current) return;
        const ro = new ResizeObserver(() => {
            setTimeout(() => {
                try { mapInstance.invalidateSize(); } catch (e) { /* ignore */ }
            }, 50);
        });
        ro.observe(wrapperRef.current);
        setTimeout(() => {
            try { mapInstance.invalidateSize(); } catch (e) { /* ignore */ }
        }, 50);
        return () => ro.disconnect();
    }, [mapInstance]);

    const initialPosition = [6.5570, -75.8271];

    const onEachFeature = (feature, layer) => {
        if (feature.properties?.name || feature.properties?.description) {
            layer.bindPopup(`
                <strong>${feature.properties.name || ''}</strong><br/>
                ${feature.properties.description || ''}
            `);
        }
    };

    const geoStyle = (feature) => ({
        color: feature?.properties?.color || '#FF5722',
        weight: feature?.properties?.weight ?? 3,
        opacity: feature?.properties?.opacity ?? 0.95,
        fill: false
    });

    return (
        <div ref={wrapperRef} className={`TotemMap__wrapper ${className}`} style={{ width: '100%', height: '100%' }}>
            <MapContainer
                center={initialPosition}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
                whenCreated={(map) => setMapInstance(map)}
                attributionControl={false}
            >
                {geoJsonData && (
                    <GeoJSON
                        data={geoJsonData}
                        style={geoStyle}
                        onEachFeature={onEachFeature}
                        filter={feature => feature.geometry?.type !== 'Point'} // mostrar solo líneas/polígonos
                    />
                )}
            </MapContainer>
        </div>
    );
};

export default TotemMap;