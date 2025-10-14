import React, { useState, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import SimpleAR from './SimpleAR';
import ARScanner from './ARScanner';
import './ParkDetailScreen.css';
import './SimpleAR.css';
import * as THREE from 'three';

// Componente del Tótem 3D cargado desde un archivo .gl
const Totem3D = () => {
  const { scene } = useGLTF('/models/totem.glb'); // Ruta corregida al archivo .glb

  return <primitive object={scene} scale={[3, 3, 3]} />; // Escala aumentada
};

const ParkDetailScreen = () => {
  const { parqueId } = useParams();
  const navigate = useNavigate();
  const [showAR, setShowAR] = useState(false);
  const [arActive, setArActive] = useState(false);

  const parksData = {
    principal: {
      name: 'Musica/Ritmos',
      icon: '💃',
      description: 'El corazón verde de nuestro pueblo, donde la naturaleza y la comunidad se encuentran.',
      features: [
        'Originalmente la Candanga no tenía coreografía fija; se bailaba de manera espontánea y natural, descalzos o con sandalias de llanta.',
        'Con el tiempo, se incorporaron elementos coreográficos y el uso de cotizas (calzado típico).',
        'Un rasgo distintivo actual es el equilibrio corporal: las bailarinas cargan canastas en la cabeza, evocando a las palenqueras, lo que refuerza su vínculo con la tradición afroantillana.',
        'La música guía el movimiento: los pasos son tranquilos, elegantes y armónicos con el compás de las cuerdas y el tambor.',
        
      ],
      history: 'Nació en Santa Fe de Antioquia y se conserva en veredas como Obregón.',
      arImage: '/images/totem-principal.jpg'
    },
    santafe: {
      name: 'Parque Santafé',
      icon: '🌺',
      description: 'Un oasis de tranquilidad urbana con jardines temáticos y espacios de meditación.',
      features: [
        '🌹 Jardín de rosas premiado',
        '🧘‍♀️ Área de yoga y meditación',
        '🦆 Laguna con patos y peces',
        '📚 Biblioteca al aire libre',
        '☕ Café orgánico'
      ],
      history: 'Inaugurado en 1965, este parque fue diseñado siguiendo principios de paisajismo zen.',
      arImage: '/images/totem-santafe.jpg'
    },
    recreativo: {
      name: 'Parque Recreativo',
      icon: '🎪',
      description: 'Diversión garantizada para toda la familia con actividades deportivas y recreativas.',
      features: [
        '⚽ Canchas de fútbol y básquet',
        '🏊‍♂️ Piscina olímpica',
        '🎢 Juegos mecánicos',
        '🍔 Zona de parrillas',
        '🎨 Talleres de arte'
      ],
      history: 'Construido en 1980, es el centro de actividades deportivas y familiares del pueblo.',
      arImage: '/images/totem-recreativo.jpg'
    }
  };

  const currentPark = parksData[parqueId] || parksData.principal;

  const goBack = () => {
    navigate('/mapa');
  };

  const handleARActivation = () => {
    setShowAR(true);
    setArActive(true);
  };

  const closeAR = () => {
    setShowAR(false);
    setArActive(false);
  };

  return (
    <div className="park-detail-screen">
      <div className="park-header">
        <button className="back-button" onClick={goBack}>
          ← Volver al Mapa
        </button>
        <h1>{currentPark.icon} {currentPark.name}</h1>
      </div>

      <div className="park-content">
        <div className="park-info">
          <div className="park-description">
            <h2>Descripción</h2>
            <p>{currentPark.description}</p>
          </div>

          <div className="park-features">
            <h2>Características</h2>
            <ul>
              {currentPark.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="park-history">
            <h2>Historia</h2>
            <p>{currentPark.history}</p>
          </div>
        </div>

        <div className="totem-section">
          <h2>Tótem Interactivo 3D</h2>
          <div className="totem-container">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <Suspense fallback={null}>
                <Totem3D />
                <OrbitControls enableZoom={true} enablePan={false} />
              </Suspense>
            </Canvas>
          </div>
          
          <div className="totem-instructions">
            <p>🔄 Arrastra para rotar • 🔍 Rueda para acercar</p>
            <p>Este es el tótem que encontrarás físicamente en el parque</p>
          </div>
        </div>
      </div>

      <div className="ar-section">
        <button className="ar-button" onClick={handleARActivation}>
          📱 ACTIVAR REALIDAD AUMENTADA
        </button>
        <div className="ar-description">
          <p>Experimenta el tótem en realidad aumentada con AR.js</p>
          <p className="ar-instruction">
            <a href="/ar-marker.html" target="_blank" className="marker-link">
              📄 Ver Marcador AR
            </a>
            <span className="separator"> | </span>
            Necesitas un marcador AR para usar esta función
          </p>
        </div>
      </div>

      {showAR && (
        <div className="ar-modal">
          <button className="close-ar" onClick={closeAR}>✖ Cerrar AR</button>
          <ARScanner />
        </div>
      )}
    </div>
  );
};

export default ParkDetailScreen;
