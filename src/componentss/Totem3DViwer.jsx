import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Text } from '@react-three/drei';
import * as THREE from 'three'; // Importar THREE para usar materiales

// Ruta de tu modelo GLB. Debe estar en la carpeta /public
const MODEL_PATH = '/models/totem.glb';

// Componente para manejar la rotación del modelo
function Model({ ...props }) {
    // useGLTF es un hook de Drei para cargar modelos GLTF/GLB
    const { scene } = useGLTF(MODEL_PATH);
    const modelRef = useRef();

    scene.traverse((child) => {
        // Solo modificar elementos con material (las mallas)
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                color: 'green',
                metalness: 0.5,
                roughness: 0.5,
                // 🛑 SOLUCIÓN PARA NEGRO: Renderizar ambos lados de la cara
                side: THREE.DoubleSide 
            });
            // ... (otras propiedades) ...
        }
    });

    // useFrame es un hook de Fiber para ejecutar lógica en cada cuadro (render loop)
    useFrame((state, delta) => {
        // Rotación continua para demostrar que el 3D está vivo
        modelRef.current.rotation.y += delta * 0.5; 
    });

    // <primitive> permite renderizar objetos nativos de Three.js (como la escena cargada)
    return <primitive object={scene} ref={modelRef} {...props} />;
}

// Componente principal del visor 3D
const Totem3DViewer = () => {
    return (
        <div style={{ height: '600px', width: '100%', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Visor 3D del Tótem (Rotación e Interacción)</h3>
            
            {/* 🛑 El componente Canvas de Fiber es el contenedor principal del 3D 🛑 */}
            <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
                {/* Suspense maneja el estado de carga mientras se descarga el modelo */}
                <Suspense fallback={
                    <Text color="black" anchorX="center" anchorY="middle">Cargando Modelo...</Text>
                }>
                    {/* Componente que añade la luz ambiental (la iluminación) */}
                    <ambientLight intensity={1.5} />
                    {/* Luz direccional para sombras y realismo */}
                    <directionalLight position={[10, 10, 5]} intensity={3} />
                    <directionalLight position={[-10, 10, -5]} intensity={1.5} /> 
                    {/* Modelo cargado y centrado */}
                    <Model position={[0, -1, 0]} scale={0.8} /> 
                    
                    {/* OrbitControls permite mover, rotar y hacer zoom con el mouse */}
                    <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />

                </Suspense>
            </Canvas>
        </div>
    );
};

export default Totem3DViewer;

// Necesitas importar el componente Text para el Suspense, si no lo tienes,
// puedes simplemente usar: <div className="text-loading">Cargando...</div>
// Para simplificar, si no quieres más dependencias, usa un div simple:
// <Suspense fallback={<div style={{ color: 'black', textAlign: 'center' }}>Cargando Modelo...</div>}>
// ...