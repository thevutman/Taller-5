import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEnter = () => {
    setLoading(true);
    // Simular carga del sistema
    setTimeout(() => {
      navigate('/mapa');
    }, 2000);
  };

  return (
    <div className="home-screen">
      <div className="home-content">
        <div className="logo-container">
          <div className="logo">
            <h1>🌳 Parques AR</h1>
            <p className="subtitle">Explora los parques de tu pueblo en realidad aumentada</p>
          </div>
        </div>
        
        <div className="welcome-text">
          <h2>¡Bienvenido!</h2>
          <p>Descubre la belleza de nuestros parques con tecnología de realidad aumentada.</p>
          <p>Escanea los tótems físicos y vive una experiencia única.</p>
        </div>

        {!loading ? (
          <button className="enter-button" onClick={handleEnter}>
            <span>🚀 ENTRAR AL SISTEMA</span>
          </button>
        ) : (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando sistema...</p>
          </div>
        )}
        
        <div className="features">
          <div className="feature">
            <span className="feature-icon">🗺️</span>
            <span>Mapa interactivo</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📱</span>
            <span>Realidad aumentada</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🌲</span>
            <span>3 parques únicos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
