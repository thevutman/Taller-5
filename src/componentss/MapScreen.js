import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MapScreen.css';
// Importa el componente del mapa real
import TotemMap from './TotemMap';

const MapScreen = () => {
  const navigate = useNavigate();
  const [selectedPark, setSelectedPark] = useState(null);

  const parks = [
    {
      id: 'principal',
      name: 'Parque Principal',
      description: 'El corazón de nuestro pueblo',
      position: { top: '30%', left: '45%' },
      icon: '🌳'
    },
    {
      id: 'santafe',
      name: 'Parque Santa Barbara',
      description: 'Un oasis de tranquilidad urbana',
      position: { top: '60%', left: '25%' },
      icon: '🌺'
    },
    {
      id: 'recreativo',
      name: 'Parque Santa Fe',
      description: 'Diversión para toda la familia',
      position: { top: '45%', left: '70%' },
      icon: '🎪'
    }
  ];

  const handleParkClick = (parkId) => {
    setSelectedPark(parkId);
    setTimeout(() => {
      navigate(`/parque/${parkId}`);
    }, 500);
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="map-screen">
      <div className="map-header">
        <button className="home-button" onClick={goHome}>
          🏠 Inicio
        </button>
        <h1>🗺️ Mapa del Pueblo</h1>
        <div className="map-info">
          <p>Selecciona un parque para explorar</p>
        </div>
      </div>

      {/* Reemplaza el mapa de prueba por el mapa real */}
      <TotemMap />

      {/* Botones flotantes de parques sobre el mapa */}
      <div className="park-buttons-overlay">
        {parks.map(park => (
          <button
            key={park.id}
            className="park-button"
            style={{
              position: 'absolute',
              top: park.position.top,
              left: park.position.left,
              transform: 'translate(-50%, -50%)',
              zIndex: 1000
            }}
            title={park.name}
            onClick={() => handleParkClick(park.id)}
          >
            {park.icon}
          </button>
        ))}
      </div>

      {/* Puedes dejar la leyenda y el overlay de carga si lo necesitas */}
      <div className="map-legend">
        <div className="legend-item">
          <span className="legend-icon">🌳</span>
          <span>Parques disponibles</span>
        </div>
        <div className="legend-item">
          <span className="legend-icon">🏢</span>
          <span>Edificios</span>
        </div>
        <div className="legend-item">
          <span className="legend-icon">🛣️</span>
          <span>Calles principales</span>
        </div>
      </div>

      {selectedPark && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <p>Cargando información del parque...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapScreen;
