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

  // Forzar reproducción del video cuando esté listo
  useEffect(() => {
    if (videoRef.current && cameraStream && !videoReady) {
      const video = videoRef.current;
      let isPlaying = false;
      
      const tryPlay = () => {
        if (isPlaying || video.readyState < 2) return;
        
        isPlaying = true;
        video.play().then(() => {
          console.log('Video reproducido exitosamente');
          setVideoReady(true);
          isPlaying = false;
        }).catch(err => {
          console.log('Error al reproducir, reintentando en 2 segundos...', err.message);
          isPlaying = false;
          setTimeout(tryPlay, 2000);
        });
      };
      
      // Esperar a que el video esté listo
      if (video.readyState >= 2) {
        setTimeout(tryPlay, 500);
      } else {
        const handleLoadedData = () => {
          video.removeEventListener('loadeddata', handleLoadedData);
          setTimeout(tryPlay, 500);
        };
        video.addEventListener('loadeddata', handleLoadedData);
      }
    }
  }, [cameraStream, videoReady]);

  // Efecto específico para iOS - forzar visualización
  useEffect(() => {
    if (videoRef.current && cameraStream) {
      const video = videoRef.current;
      
      // Detectar si es iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      
      if (isIOS) {
        console.log('Detectado iOS - aplicando fixes específicos');
        
        // Forzar actualización del video
        const forceUpdate = () => {
          video.style.display = 'none';
          video.offsetHeight; // Trigger reflow
          video.style.display = 'block';
        };
        
        setTimeout(forceUpdate, 1000);
        setTimeout(forceUpdate, 3000);
      }
    }
  }, [cameraStream]);

  const startCamera = async () => {
    try {
      console.log('Solicitando acceso a la cámara...');
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      
      console.log('Stream de cámara obtenido:', stream);
      console.log('Tracks de video:', stream.getVideoTracks());
      
      setCameraStream(stream);
      
      if (videoRef.current) {
        console.log('Asignando stream al video element...');
        videoRef.current.srcObject = stream;
        
        // Configurar event listeners antes de intentar reproducir
        videoRef.current.onloadedmetadata = () => {
          console.log('Metadata del video cargada');
          console.log('Dimensiones del video:', videoRef.current.videoWidth, 'x', videoRef.current.videoHeight);
          setVideoReady(true);
          startARSimulation();
        };
        
        videoRef.current.oncanplay = () => {
          console.log('Video puede reproducirse');
          setVideoReady(true);
        };
        
        videoRef.current.onerror = (e) => {
          console.error('Error en el video element:', e);
        };
        
        // Intentar reproducir después de un pequeño delay
        setTimeout(() => {
          if (videoRef.current && !videoReady) {
            videoRef.current.play().then(() => {
              console.log('Video iniciado correctamente');
            }).catch(err => {
              console.log('Error al reproducir video (intento inicial):', err.message);
              // No es crítico, el useEffect se encargará de reintentar
            });
          }
        }, 100);
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
          setShowVideo(true); // Mostrar el video al detectar el marcador
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

  const forceVideoPlay = () => {
    if (videoRef.current && !videoReady) {
      console.log('Forzando reproducción del video...');
      
      const video = videoRef.current;
      
      // Detectar iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      
      if (isIOS) {
        console.log('Aplicando fix específico para iOS');
        
        // Forzar atributos específicos para iOS
        video.setAttribute('webkit-playsinline', 'true');
        video.setAttribute('playsinline', 'true');
        video.muted = true;
        video.autoplay = true;
        
        // Forzar actualización visual
        video.style.transform = 'scaleX(-1)';
        video.style.opacity = '1';
        video.style.visibility = 'visible';
        
        // Resetear y reintentar
        video.load();
        
        setTimeout(() => {
          video.play().then(() => {
            console.log('Video iOS forzado a reproducir exitosamente');
            setVideoReady(true);
          }).catch(err => {
            console.error('Error al forzar video iOS:', err.message);
            setCameraError('Error en iOS. Intenta tocar la pantalla y luego el botón.');
          });
        }, 1500);
      } else {
        // Resetear el video completamente para otros navegadores
        video.load();
        
        setTimeout(() => {
          video.play().then(() => {
            console.log('Video forzado a reproducir exitosamente');
            setVideoReady(true);
          }).catch(err => {
            console.error('Error al forzar video:', err.message);
            setCameraError('No se pudo reproducir el video. Intenta recargar la página.');
          });
        }, 1000);
      }
    }
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
        webkit-playsinline="true"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        x5-video-orientation="portraint"
        className="ar-video"
        controls={false}
        preload="auto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          backgroundColor: '#000',
          transform: 'scaleX(-1)' // Espejo horizontal para cámara frontal
        }}
      />
      
      {/* Overlay de cámara no disponible */}
      {!videoReady && (
        <div className="camera-overlay">
          <div className="camera-placeholder">
            <div className="camera-icon">📷</div>
            <h3>Iniciando Cámara...</h3>
            <p>Esperando acceso a la cámara del dispositivo</p>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

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
          
          {!videoReady && (
            <button className="force-video-btn" onClick={forceVideoPlay}>
              🔄 Activar Video
            </button>
          )}
          
          {videoReady && cameraStream && (
            <button className="ios-fix-btn" onClick={forceVideoPlay}>
              📱 Fix iOS Video
            </button>
          )}
          
          {/* Debug info */}
          <div className="debug-info">
            <small>Estado: {detectionStatus}</small>
            <br/>
            <small>Video: {videoReady ? '✅ Activo' : '❌ Cargando...'}</small>
            <br/>
            <small>Cámara: {cameraStream ? '✅ Conectada' : '❌ Desconectada'}</small>
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