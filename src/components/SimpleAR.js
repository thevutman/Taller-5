import React, { useState, useRef, useEffect } from 'react';
import './SimpleAR.css';

const SimpleAR = ({ parkData, onClose }) => {
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [arDetected, setArDetected] = useState(false);
  const [detectionStatus, setDetectionStatus] = useState('Buscando marcador...');
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
    // Iniciar detección real de marcador
    startMarkerDetection();
  };

  const startMarkerDetection = () => {
    // Detectar marcador cada 500ms
    scanIntervalRef.current = setInterval(() => {
      detectMarker();
    }, 500);
  };

  const detectMarker = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Configurar canvas con el tamaño del video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Dibujar frame actual del video en el canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Obtener datos de imagen del centro de la pantalla
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const sampleSize = 150; // Área de 150x150 píxeles en el centro
    
    const imageData = ctx.getImageData(
      centerX - sampleSize/2, 
      centerY - sampleSize/2, 
      sampleSize, 
      sampleSize
    );
    const data = imageData.data;
    
    // Detectar patrón de marcador AR (cuadrados negros y blancos)
    let blackPixels = 0;
    let whitePixels = 0;
    let totalPixels = data.length / 4;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const brightness = (r + g + b) / 3;
      
      if (brightness < 50) {
        blackPixels++;
      } else if (brightness > 200) {
        whitePixels++;
      }
    }
    
    // Calcular porcentajes
    const blackPercent = (blackPixels / totalPixels) * 100;
    const whitePercent = (whitePixels / totalPixels) * 100;
    
    // Detectar marcador si hay suficiente contraste negro/blanco
    const markerDetected = blackPercent > 5 && whitePercent > 5 && (blackPercent + whitePercent) > 30;
    
    if (markerDetected && !isScanning && !arDetected) {
      console.log('¡Marcador detectado!', { blackPercent, whitePercent });
      setDetectionStatus('¡Marcador detectado! Iniciando escaneo...');
      setIsScanning(true);
      startScanning();
    } else if (!markerDetected && isScanning) {
      console.log('Marcador perdido');
      setDetectionStatus('Marcador perdido. Buscando...');
      setIsScanning(false);
      setScanProgress(0);
      setArDetected(false);
    } else if (!markerDetected && !isScanning && !arDetected) {
      setDetectionStatus('Buscando marcador...');
    }
  };

  const startScanning = () => {
    setScanProgress(0);
    scanIntervalRef.current = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanIntervalRef.current);
          setArDetected(true);
          setIsScanning(false);
          return 100;
        }
        return prev + Math.random() * 8 + 3;
      });
    }, 300);
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
          <p>Apunta la cámara hacia el marcador AR</p>
          <p className="instruction-detail">
            <strong>1.</strong> Abre el marcador en otra pantalla o imprímelo<br/>
            <strong>2.</strong> Apunta la cámara hacia el marcador<br/>
            <strong>3.</strong> Mantén el marcador centrado en el visor verde
          </p>
          <a href="/ar-marker.html" target="_blank" className="marker-link">
            📄 Abrir Marcador AR
          </a>
          
          {/* Debug info */}
          <div className="debug-info">
            <small>Estado: {detectionStatus}</small>
          </div>
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
                  <p>{detectionStatus}</p>
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
