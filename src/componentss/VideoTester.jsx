// src/components/VideoTester.jsx
import React, { useRef, useEffect } from 'react';

// 🛑 CLAVE DE LA PRUEBA: La ruta del archivo que estamos usando en ARScanner
const VIDEO_PATH_TO_TEST = '/videos/TestVideo.mp4'; 
// Si tu video realmente se llama 'TestVideo.mp4' en la raíz de /public, usa:
// const VIDEO_PATH_TO_TEST = '/TestVideo.mp4'; 

const VideoTester = () => {
    const videoRef = useRef(null);
    const [status, setStatus] = React.useState("Esperando carga...");

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        // Añadimos listeners para verificar el estado de la carga
        videoElement.addEventListener('loadeddata', () => {
            console.log("LOG TEST: Video cargado exitosamente. Intentando reproducir.");
            setStatus("Video cargado. Intentando reproducir (se requiere interacción).");
            
            // Intenta reproducir, capturando el error de autoplay si ocurre.
            videoElement.play().catch(error => {
                if (error.name === 'NotAllowedError' || error.name === 'NotSupportedError') {
                    setStatus(`Error: ${error.name}. Toca el video para iniciarlo.`);
                    console.error(`ERROR TEST: ${error.name}. Falló el autoplay.`);
                } else {
                    setStatus(`Error inesperado: ${error.name}.`);
                    console.error(`ERROR TEST: Error de reproducción:`, error);
                }
            });
        });

        // Listener clave: si falla la carga por ruta o formato.
        videoElement.addEventListener('error', (e) => {
            const error = e.target.error;
            setStatus(`¡ERROR CRÍTICO! Falló la carga. Código: ${error.code} (${error.message}).`);
            console.error("ERROR TEST: Falló la carga del video. Verifique RUTA y FORMATO (H.264 MP4).", e);
        });

        return () => {
            // Limpieza (opcional pero buena práctica)
            videoElement.removeEventListener('loadeddata', () => {});
            videoElement.removeEventListener('error', () => {});
        };

    }, []); // Se ejecuta solo al montar

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Prueba de Reproducción y Ruta de Video</h3>
            <p>Ruta Probada: <code>{VIDEO_PATH_TO_TEST}</code></p>
            <p>Estado: <strong>{status}</strong></p>

            <video
                ref={videoRef}
                src={VIDEO_PATH_TO_TEST}
                controls // Muestra controles para que puedas iniciar manualmente si falla el autoplay
                muted // Muteado para reducir las restricciones de autoplay
                playsInline
                style={{ width: '100%', maxWidth: '400px', margin: '15px 0', border: '1px solid black' }}
            >
                Tu navegador no soporta el tag de video.
            </video>
            
            <p>Si el video aparece pero no se reproduce, haz clic en el botón de Play.</p>
            <p>Si no ves nada o ves un icono roto, **la ruta o el formato están mal**.</p>
        </div>
    );
};

export default VideoTester;