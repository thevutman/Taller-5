import React, { useState, useRef, Suspense, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Cylinder } from '@react-three/drei';
import SimpleAR from './SimpleAR';
import './ParkDetailScreen.css';
import './SimpleAR.css';

// Componente del Tótem 3D
const Totem3D = ({ parkData }) => {
  const meshRef = useRef();

  return (
    <group ref={meshRef}>
      {/* Base del tótem */}
      <Cylinder args={[1.2, 1.5, 0.3]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Cylinder>
      
      {/* Columna principal */}
      <Cylinder args={[0.8, 0.8, 3]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#A0522D" />
      </Cylinder>
      
      {/* Parte superior decorativa */}
      <Sphere args={[0.9]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#228B22" />
      </Sphere>
      
      {/* Símbolo del parque */}
      <Text
        position={[0, 0, 0.9]}
        fontSize={0.8}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        {parkData.icon}
      </Text>
      
      {/* Texto del nombre */}
      <Text
        position={[0, -0.8, 0.9]}
        fontSize={0.3}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
      >
        {parkData.name}
      </Text>
      
      {/* Elementos decorativos */}
      <Box args={[0.1, 0.1, 0.1]} position={[0.5, 1, 0.9]}>
        <meshStandardMaterial color="#FFD700" />
      </Box>
      <Box args={[0.1, 0.1, 0.1]} position={[-0.5, 1, 0.9]}>
        <meshStandardMaterial color="#FFD700" />
      </Box>
      <Box args={[0.1, 0.1, 0.1]} position={[0.5, -1, 0.9]}>
        <meshStandardMaterial color="#FFD700" />
      </Box>
      <Box args={[0.1, 0.1, 0.1]} position={[-0.5, -1, 0.9]}>
        <meshStandardMaterial color="#FFD700" />
      </Box>
    </group>
  );
};

const ParkDetailScreen = () => {
  const { parqueId } = useParams();
  const navigate = useNavigate();
  const [showAR, setShowAR] = useState(false);
  const [arActive, setArActive] = useState(false);

  const parksData = {
    principal: {
      name: 'Parque Principal',
      icon: '🌳',
      description: 'El corazón verde de nuestro pueblo, donde la naturaleza y la comunidad se encuentran.',
      features: [
        '🌲 Más de 100 árboles centenarios',
        '🦋 Jardín de mariposas nativo',
        '🏃‍♂️ Senderos para caminar y trotar',
        '🎪 Área de juegos infantiles',
        '🎭 Anfiteatro al aire libre'
      ],
      history: 'Fundado en 1892, este parque ha sido testigo de la historia de nuestro pueblo durante más de un siglo.',
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
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Totem3D parkData={currentPark} />
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
        <SimpleAR parkData={currentPark} onClose={closeAR} />
      )}
    </div>
  );
};

export default ParkDetailScreen;
