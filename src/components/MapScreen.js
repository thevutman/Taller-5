import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MapScreen.css';

const MapScreen = () => {
  const navigate = useNavigate();
  const [selectedPark, setSelectedPark] = useState(null);

  const parks = [
    {
      id: 'principal',
      name: 'Parque Principal',
      description: 'El corazón verde de nuestro pueblo',
      position: { top: '30%', left: '45%' },
      icon: '🌳'
    },
    {
      id: 'santafe',
      name: 'Parque Santafé',
      description: 'Un oasis de tranquilidad urbana',
      position: { top: '60%', left: '25%' },
      icon: '🌺'
    },
    {
      id: 'recreativo',
      name: 'Parque Recreativo',
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

      <div className="map-container">
        <div className="map-background">
          {/* Elementos decorativos del mapa */}
          <div className="road road-horizontal" style={{top: '40%', left: '0%', width: '100%'}}></div>
          <div className="road road-vertical" style={{top: '0%', left: '50%', height: '100%'}}></div>
          <div className="building" style={{top: '15%', left: '15%'}}>🏢</div>
          <div className="building" style={{top: '20%', left: '75%'}}>🏪</div>
          <div className="building" style={{top: '70%', left: '60%'}}>🏫</div>
          <div className="building" style={{top: '75%', left: '10%'}}>⛪</div>
          
          {/* Marcadores de parques */}
          {parks.map((park) => (
            <div
              key={park.id}
              className={`park-marker ${selectedPark === park.id ? 'selected' : ''}`}
              style={park.position}
              onClick={() => handleParkClick(park.id)}
            >
              <div className="park-icon">{park.icon}</div>
              <div className="park-pulse"></div>
              <div className="park-tooltip">
                <h3>{park.name}</h3>
                <p>{park.description}</p>
                <span className="click-hint">👆 Toca para explorar</span>
              </div>
            </div>
          ))}
        </div>
      </div>

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
