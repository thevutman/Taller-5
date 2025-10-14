import React, { useEffect, useRef, useState } from 'react';

// 🛑 CLAVE: Usamos el patrón de prueba que ya funciona
const CUSTOM_PATTERN_URL = '/test_pattern.patt'; 
const TEST_VIDEO_URL = '/videos/TestVideo.mp4'; 

const ARScanner = () => {
    const sceneRef = useRef(null); 
    const [isARActive, setIsARActive] = useState(false); 
    const [scanStatus, setScanStatus] = useState("Esperando activación...");
  
    useEffect(() => {
        if (!isARActive) return;

        console.log("LOG: AR activado. Inicializando escena de video.");
        const container = sceneRef.current;

        if (container) {
            const scene = document.createElement('a-scene');
            scene.setAttribute('vr-mode-ui', 'enabled: false');
            scene.setAttribute('embedded', 'true');
            scene.setAttribute('arjs', 'sourceType: webcam; detectionMode: mono; maxDetectionRate: 60;');
            
            // 1. Assets: Cargar el video
            const assets = document.createElement('a-assets');
            const videoElement = document.createElement('video');
            videoElement.setAttribute('id', 'video-asset');
            videoElement.setAttribute('src', TEST_VIDEO_URL);
            videoElement.setAttribute('autoplay', 'false'); // 🛑 APAGADO: CLAVE para el control manual
            videoElement.setAttribute('loop', 'false');
            videoElement.setAttribute('playsinline', 'true');
            videoElement.setAttribute('crossorigin', 'anonymous');
            
            assets.appendChild(videoElement);
            scene.appendChild(assets);

            // 2. Marcador: Usamos el patrón personalizado
            const marker = document.createElement('a-marker');
            marker.setAttribute('type', 'pattern'); 
            marker.setAttribute('url', CUSTOM_PATTERN_URL); 
            
            // 3. Contenido 3D: El plano de video
            const videoPlane = document.createElement('a-video');
            videoPlane.setAttribute('src', '#video-asset');
            videoPlane.setAttribute('width', '2'); 
            videoPlane.setAttribute('height', '1.5');
            
            // 🛑 POSICIÓN AJUSTADA: 0.75 metros de altura
            videoPlane.setAttribute('position', '0 0.75 0'); 
            videoPlane.setAttribute('rotation', '90 0 180'); // Vertical y de frente

            marker.appendChild(videoPlane);
            scene.appendChild(marker);
            
            // 4. CONTROL DE REPRODUCCIÓN POR EVENTOS
            marker.addEventListener('markerFound', () => {
                console.log("LOG [FOUND]: Marcador DETECTADO. Iniciando video.");
                setScanStatus("¡Tótem detectado! Reproduciendo contenido...");
                // Usamos .play() que funcionará sin problemas porque el video ya cargó
                videoElement.play(); 
            });

            marker.addEventListener('markerLost', () => {
                console.log("LOG [LOST]: Marcador perdido. Pausando video.");
                setScanStatus("Marcador perdido. Buscando de nuevo...");
                videoElement.pause();
                videoElement.currentTime = 0; // Reiniciar
            });
            
            container.appendChild(scene); 
            console.log(`LOG: Escena AR de video montada. Busque el patrón: ${CUSTOM_PATTERN_URL}`);

            return () => {
                console.log("LOG: Desmontando ARScanner de video.");
                container?.removeChild(scene);
            };
        }
    }, [isARActive]);
    
    const activateAR = () => {
        setIsARActive(true);
    };
    
    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            <h3>Escáner de Realidad Aumentada (Video)</h3>
            
            {!isARActive ? (
                <div style={{ height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '2px dashed #4CAF50' }}>
                    <p>Presione para iniciar la cámara y cargar el video.</p>
                    <button 
                        onClick={activateAR}
                        style={{ padding: '15px 30px', fontSize: '1.2em', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
                    >
                        Activar Escáner AR
                    </button>
                </div>
            ) : (
                <>
                    <div 
                      ref={sceneRef} 
                      style={{ 
                          width: '100%', 
                          height: '400px', 
                          position: 'relative', 
                          border: '2px solid #333', 
                          overflow: 'hidden',
                          backgroundColor: 'transparent'
                      }} 
                    />
                    <p style={{marginTop: '10px'}}>Estado: **{scanStatus}**</p>
                </>
            )}
        </div>
    );
};

export default ARScanner;