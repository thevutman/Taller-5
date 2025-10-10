import React, { useEffect, useRef, useState } from 'react';

const ARScene = ({ parkData, onClose }) => {
  const sceneRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Cargar A-Frame y AR.js dinámicamente
    const loadAR = async () => {
      try {
        // Cargar A-Frame
        if (!window.AFRAME) {
          const aframeScript = document.createElement('script');
          aframeScript.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
          aframeScript.onload = () => {
            // Cargar AR.js después de A-Frame
            const arScript = document.createElement('script');
            arScript.src = 'https://cdn.jsdelivr.net/gh/AR-js-org/AR.js@3.4.7/aframe/build/aframe-ar-nft.js';
            arScript.onload = () => {
              setIsLoaded(true);
            };
            document.head.appendChild(arScript);
          };
          document.head.appendChild(aframeScript);
        } else {
          setIsLoaded(true);
        }
      } catch (error) {
        console.error('Error cargando AR:', error);
      }
    };

    loadAR();

    // Cleanup function
    return () => {
      // Limpiar scripts si es necesario
      const aframeScript = document.querySelector('script[src*="aframe"]');
      const arScript = document.querySelector('script[src*="ar.js"]');
      
      if (aframeScript && aframeScript.parentNode) {
        aframeScript.parentNode.removeChild(aframeScript);
      }
      if (arScript && arScript.parentNode) {
        arScript.parentNode.removeChild(arScript);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const scene = sceneRef.current;
    if (!scene) return;

    // Agregar event listeners para AR
    const handleMarkerFound = () => {
      console.log('¡Marcador detectado!');
    };

    const handleMarkerLost = () => {
      console.log('Marcador perdido');
    };

    scene.addEventListener('markerFound', handleMarkerFound);
    scene.addEventListener('markerLost', handleMarkerLost);

    return () => {
      if (scene) {
        scene.removeEventListener('markerFound', handleMarkerFound);
        scene.removeEventListener('markerLost', handleMarkerLost);
      }
    };
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className="ar-scene-container">
        <div className="ar-loading">
          <div className="loading-spinner"></div>
          <h3>Cargando Realidad Aumentada...</h3>
          <p>Por favor espera mientras se inicializa AR.js</p>
          <button className="ar-close-btn" onClick={onClose}>
            ✕ Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ar-scene-container">
      {/* Botón para cerrar AR */}
      <div className="ar-close-controls">
        <button className="ar-close-btn" onClick={onClose}>
          ✕ Cerrar AR
        </button>
      </div>

      {/* Escena A-Frame con AR.js */}
      <a-scene
        ref={sceneRef}
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
        vr-mode-ui="enabled: false"
        renderer="logarithmicDepthBuffer: true;"
        style={{
          width: '100%',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000
        }}
      >
        {/* Cámara AR */}
        <a-camera
          gps-camera
          rotation-reader
          look-controls-enabled="false"
        />

        {/* Marcador AR - Usaremos un patrón Hiro por defecto */}
        <a-marker preset="hiro">
          {/* Tótem 3D mejorado */}
          <a-group id="totem-group" position="0 0.5 0">
            {/* Base del tótem */}
            <a-cylinder
              position="0 -0.5 0"
              radius="1.2"
              height="0.3"
              color="#8B4513"
              shadow
            />
            
            {/* Columna principal */}
            <a-cylinder
              position="0 0 0"
              radius="0.8"
              height="3"
              color="#A0522D"
              shadow
              animation="property: rotation; to: 0 360 0; loop: true; dur: 10000"
            />
            
            {/* Parte superior */}
            <a-sphere
              position="0 2 0"
              radius="0.9"
              color="#228B22"
              shadow
              animation="property: position; to: 0 2.2 0; dir: alternate; dur: 2000; loop: true"
            />
            
            {/* Texto del parque */}
            <a-text
              position="0 0 1"
              align="center"
              value={parkData.name}
              color="#FFFFFF"
              width="4"
              animation="property: rotation; to: 0 360 0; loop: true; dur: 8000"
            />
            
            {/* Elementos decorativos flotantes */}
            <a-box
              position="1.5 1 0"
              width="0.2"
              height="0.2"
              depth="0.2"
              color="#FFD700"
              animation="property: position; to: 1.5 1.5 0; dir: alternate; dur: 1500; loop: true"
            />
            <a-box
              position="-1.5 1 0"
              width="0.2"
              height="0.2"
              depth="0.2"
              color="#FFD700"
              animation="property: position; to: -1.5 1.5 0; dir: alternate; dur: 1800; loop: true"
            />
            <a-box
              position="0 1 1.5"
              width="0.2"
              height="0.2"
              depth="0.2"
              color="#FFD700"
              animation="property: position; to: 0 1.5 1.5; dir: alternate; dur: 1200; loop: true"
            />
            
            {/* Partículas o efectos especiales */}
            <a-entity
              geometry="primitive: ring; radiusInner: 0.5; radiusOuter: 1"
              material="color: #00ff00; opacity: 0.3"
              position="0 3 0"
              animation="property: rotation; to: 0 0 360; loop: true; dur: 3000"
            />
            
            {/* Panel de información flotante */}
            <a-plane
              position="0 -2 2"
              width="6"
              height="3"
              color="#333333"
              opacity="0.8"
              animation="property: rotation; to: 0 5 0; dir: alternate; dur: 4000; loop: true"
            >
              <a-text
                position="0 0.5 0.01"
                align="center"
                value={parkData.name}
                color="#00ff00"
                width="5"
              />
              <a-text
                position="0 0 0.01"
                align="center"
                value="Información del Parque"
                color="#FFFFFF"
                width="4"
              />
            </a-plane>
          </a-group>
        </a-marker>

        {/* Entidad para el suelo/sombras */}
        <a-entity light="type: ambient; color: #BBB" />
        <a-entity light="type: directional; position: 0 1 0; target: #totem-group" />
      </a-scene>

      {/* Instrucciones superpuestas */}
      <div className="ar-instructions">
        <div className="instruction-panel">
          <h3>📱 Realidad Aumentada Activa</h3>
          <p>Apunta tu cámara hacia el marcador AR</p>
          <p className="small">Busca un patrón cuadrado con bordes negros</p>
        </div>
      </div>
    </div>
  );
};

export default ARScene;
