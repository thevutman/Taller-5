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
            <h1>Resiliencia: Recuerdo de aquello Olvidado </h1>
            <p className="subtitle">Explora la Candanga, el Bunde y los Diablitos</p>
          </div>
        </div>
        
        <div className="welcome-text">
          <h2>¡Bienvenido!</h2>
          <p>Santa Fe de Antioquia es un territorio donde la historia aún se escucha en los cantos, se siente en los tambores y se mueve en los pasos de sus danzas. En sus calles coloniales, entre plazas, balcones y montañas, las tradiciones no son recuerdos del pasado, sino expresiones que siguen respirando, transformándose y uniendo a la comunidad.</p>
          <p>Cada diciembre, el pueblo se llena de color, música y movimiento: los tambores anuncian la Candanga, las voces se elevan en el Bunde y los Diablitos recorren las calles con alegría y misterio. Estas celebraciones son mucho más que fiestas: son la memoria viva de generaciones que han sabido mantener su identidad a través del arte, el ritmo y la palabra.</p>
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
            <span>3 Tematicas unicas en 3 zonas diferentes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
