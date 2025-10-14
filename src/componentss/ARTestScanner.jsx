// src/components/ARTestScanner.jsx
import React, { useEffect, useRef, useState } from 'react';

// 🛑 CLAVE: Ruta a tu archivo de patrón (.patt)
const CUSTOM_PATTERN_URL = '/test_pattern.patt'; 

const ARTestScanner = () => {
    const sceneRef = useRef(null); 
    const [isARActive, setIsARActive] = useState(false); 
    const [scanStatus, setScanStatus] = useState("Esperando activación...");

    useEffect(() => {
        if (!isARActive) return;

        console.log("LOG [1. INICIO]: AR TESTER activado. Montando escena A-Frame.");
        setScanStatus("Cámara activa. Buscando patrón...");

        const container = sceneRef.current;

        if (container) {
            const scene = document.createElement('a-scene');
            scene.setAttribute('vr-mode-ui', 'enabled: false');
            scene.setAttribute('embedded', 'true');
            // Inicialización de AR.js
            scene.setAttribute('arjs', 'sourceType: webcam; detectionMode: mono; maxDetectionRate: 60;');
            
            // 🛑 MARCADOR PERSONALIZADO (Tipo 'pattern' con la URL del archivo .patt)
            const marker = document.createElement('a-marker');
            marker.setAttribute('type', 'pattern'); 
            marker.setAttribute('url', CUSTOM_PATTERN_URL); 
            
            // Contenido 3D: Una caja simple
            const box = document.createElement('a-box');
            box.setAttribute('position', '0 0.5 0'); // 0.5 metros de altura sobre el marcador
            box.setAttribute('material', 'color: purple; opacity: 0.8');
            box.setAttribute('shadow', '');

            marker.appendChild(box);
            scene.appendChild(marker);
            
            // 💡 LOG Y CONTROL: Marcador ENCONTRADO
            marker.addEventListener('markerFound', () => {
                console.log("LOG [2. ESCANEANDO]: ¡Patrón PERSONALIZADO ENCONTRADO! Mostrando caja.");
                setScanStatus("¡Patrón detectado! Caja 3D visible.");
            });

            // 💡 LOG Y CONTROL: Marcador PERDIDO
            marker.addEventListener('markerLost', () => {
                console.log("LOG [3. PERDIDO]: Patrón perdido. Ocultando caja.");
                setScanStatus("Patrón perdido. Buscando de nuevo...");
            });
            
            container.appendChild(scene); 
            console.log(`LOG [4. FINAL]: Escena montada. Apunte a: ${CUSTOM_PATTERN_URL}`);

            return () => {
                console.log("LOG [5. LIMPIEZA]: Desmontando ARTestScanner.");
                container?.removeChild(scene);
            };
        }
    }, [isARActive]);
    
    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            <h3>Probador de Escaneo AR (Sin Video)</h3>
            
            {!isARActive ? (
                <div style={{ height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '2px dashed #9C27B0' }}>
                    <p>Haga clic para iniciar la cámara y el motor de detección de patrones.</p>
                    <button 
                        onClick={() => setIsARActive(true)}
                        style={{ padding: '15px 30px', fontSize: '1.2em', backgroundColor: '#9C27B0', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
                    >
                        Iniciar Prueba de Escaneo
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

export default ARTestScanner;