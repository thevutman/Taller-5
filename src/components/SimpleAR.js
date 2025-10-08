import React, { useState, useRef, useEffect } from 'react';
import './SimpleAR.css';

const SimpleAR = ({ parkData, onClose }) => {
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [arDetected, setArDetected] = useState(false);
  const [showVideo, setShowVideo] = useState(false); // Nuevo estado para controlar el video
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scanIntervalRef = useRef(null);

  useEffect(() => {
    startCamera();
    
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      
      setCameraStream(stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          startARSimulation();
        };
      }
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      setCameraError('No se pudo acceder a la cámara. Verifica los permisos.');
    }
  };

  const startARSimulation = () => {
    // Simular detección de marcador después de 2 segundos
    setTimeout(() => {
      setIsScanning(true);
      startScanning();
    }, 2000);
  };

  const startScanning = () => {
    setScanProgress(0);
    scanIntervalRef.current = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanIntervalRef.current);
          setArDetected(true);
          setIsScanning(false);
          setShowVideo(true); // Mostrar el video al detectar el marcador
          return 100;
        }
        return prev + Math.random() * 10 + 5;
      });
    }, 200);
  };

  const handleClose = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    onClose();
  };

  return (
    <div className="simple-ar-container">
      {/* Botón de cerrar */}
      <div className="ar-close-controls">
        <button className="ar-close-btn" onClick={handleClose}>
          ✕ Cerrar AR
        </button>
      </div>

      {/* Video de la cámara */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="ar-video"
      />

      {/* Canvas oculto para procesamiento */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />

      {/* Overlay AR */}
      <div className="ar-overlay">
        {/* Instrucciones */}
        <div className="ar-instructions">
          <h3>📱 Realidad Aumentada</h3>
          <p>Apunta hacia el marcador AR para ver el tótem</p>
          <a href="/ar-marker.html" target="_blank" className="marker-link">
            📄 Ver Marcador AR
          </a>
        </div>

        {/* Visor AR */}
        <div className="ar-viewfinder">
          <div className="viewfinder-corner tl"></div>
          <div className="viewfinder-corner tr"></div>
          <div className="viewfinder-corner bl"></div>
          <div className="viewfinder-corner br"></div>
          
          {!arDetected ? (
            <div className="ar-content">
              {!isScanning ? (
                <div className="searching-state">
                  <div className="search-icon">🔍</div>
                  <p>Buscando marcador AR...</p>
                  <div className="search-pulse"></div>
                </div>
              ) : (
                <div className="scanning-state">
                  <div className="scan-icon">📡</div>
                  <p>¡Marcador detectado! Escaneando...</p>
                  
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${scanProgress}%` }}
                      ></div>
                    </div>
                    <p className="progress-text">{Math.round(scanProgress)}%</p>
                  </div>
                  
                  <div className="scan-lines">
                    <div className="scan-line horizontal"></div>
                    <div className="scan-line vertical"></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            showVideo ? (
              <div className="ar-video-container">
                <video
                  src="/videos/Baile Candanga.mp4" // Cambia esta ruta al archivo de video
                  autoPlay
                  loop
                  controls
                  className="ar-detected-video"
                />
              </div>
            ) : (
              <div className="ar-detected">
                <div className="detected-icon">✅</div>
                <h3>¡Tótem AR Detectado!</h3>
                
                <div className="ar-totem">
                  <div className="totem-base"></div>
                  <div className="totem-column"></div>
                  <div className="totem-top"></div>
                  <div className="totem-text">{parkData.icon}</div>
                </div>
                
                <div className="ar-info">
                  <h4>{parkData.name}</h4>
                  <p>{parkData.description}</p>
                  <div className="ar-features">
                    {parkData.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="ar-feature">
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="floating-elements">
                  <div className="floating-element">🌟</div>
                  <div className="floating-element">✨</div>
                  <div className="floating-element">🦋</div>
                  <div className="floating-element">🌸</div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Error de cámara */}
      {cameraError && (
        <div className="ar-error">
          <div className="error-content">
            <h3>⚠️ Error de Cámara</h3>
            <p>{cameraError}</p>
            <button className="retry-btn" onClick={startCamera}>
              🔄 Reintentar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleAR;