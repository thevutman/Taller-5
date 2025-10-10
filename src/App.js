// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomeScreen from './components/HomeScreen';
// import MapScreen from './components/MapScreen';
// import ParkDetailScreen from './components/ParkDetailScreen';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<HomeScreen />} />
//           <Route path="/mapa" element={<MapScreen />} />
//           <Route path="/parque/:parqueId" element={<ParkDetailScreen />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// src/App.jsx
// src/App.jsx (Modificado para incluir el Modo TEST_VIDEO)


// import React, { useState } from 'react';
// import ARScanner from './components/ARScanner';
// import TotemMap from './components/TotemMap';
// import VideoTester from './components/VideoTester'; // Importamos el nuevo componente
// import ARTestScanner from './components/ARTestScanner'; // 🛑 Importamos el nuevo componente de prueba
// import Totem3DViewer from './components/Totem3DViwer';

// const App = () => {
//     // Nuevo estado: puede ser 'MENU', 'AR', 'MAP', o 'TEST_VIDEO'
//     const [mode, setMode] = useState('MENU');

//     const renderContent = () => {
//         switch (mode) {
//             case 'AR':
//                 console.log("LOG: Modo AR seleccionado.");
//                 return <ARScanner />;
//             case 'MAP':
//                 console.log("LOG: Modo Mapa seleccionado.");
//                 return <TotemMap />;
//             case 'TEST_VIDEO':
//                 console.log("LOG: Modo Prueba de Video seleccionado.");
//                 return <VideoTester />; // Renderiza el componente de prueba
//             case 'AR_TEST': // 🛑 Nuevo modo
//                 console.log("LOG: Modo Prueba de Escaneo AR seleccionado.");
//                 return <ARTestScanner />;
//             case '3D_VIEWER':
//                 console.log("LOG: Modo Visor 3D seleccionado.");
//                 return <Totem3DViewer />;
//             case 'MENU':
//             default:
//                 return (
//                     <div style={{ padding: '40px', textAlign: 'center', border: '2px dashed #ccc' }}>
//                         <h2>Bienvenido al Menú Principal</h2>
//                         <p>Seleccione una opción para probar la funcionalidad.</p>
//                     </div>
//                 );
//         }
//     };

//     return (
//         <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//             <h1>✨ App Web de Escaneo RA</h1>
            
//             <div style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
//                 <button onClick={() => setMode('MAP')} /* ... (Estilos y props de MAP) ... */>
//                     Mapa de Tótems 🗺️
//                 </button>
//                 <button onClick={() => setMode('AR')} /* ... (Estilos y props de AR) ... */>
//                     Modo Escáner AR 👁️
//                 </button>
//                 {/* 🛑 Nuevo botón para la prueba de video */}
//                 <button 
//                     onClick={() => setMode('TEST_VIDEO')}
//                     style={{ 
//                         marginLeft: '10px',
//                         padding: '10px 20px', 
//                         fontWeight: mode === 'TEST_VIDEO' ? 'bold' : 'normal',
//                         backgroundColor: mode === 'TEST_VIDEO' ? '#ff9800' : '#f0f0f0',
//                         color: mode === 'TEST_VIDEO' ? 'white' : 'black',
//                         border: 'none',
//                         borderRadius: '5px'
//                     }}
//                 >
//                     Prueba de Video 🎥
//                 </button>
//                {/* 🛑 Nuevo botón para la prueba de escaneo */}
//                 <button 
//                     onClick={() => setMode('AR_TEST')}
//                     style={{ 
//                         marginLeft: '10px',
//                         padding: '10px 20px', 
//                         fontWeight: mode === 'AR_TEST' ? 'bold' : 'normal',
//                         backgroundColor: mode === 'AR_TEST' ? '#9C27B0' : '#f0f0f0',
//                         color: mode === 'AR_TEST' ? 'white' : 'black',
//                         border: 'none',
//                         borderRadius: '5px'
//                     }}
//                 >
//                     Probar Escaneo (Caja) 🔲
//                 </button>
//                 <button 
//                     onClick={() => setMode('3D_VIEWER')}
//                     style={{ 
//                         marginLeft: '10px',
//                         padding: '10px 20px', 
//                         fontWeight: mode === 'VISOR_3D' ? 'bold' : 'normal',
//                         backgroundColor: mode === 'VISOR_3D' ? '#6200EE' : '#f0f0f0',
//                         color: mode === 'VISOR_3D' ? 'white' : 'black',
//                         border: 'none',
//                         borderRadius: '5px'
//                     }}
//                 >
//                     Visor 3D del Tótem 🗿
//                 </button>
//             </div>

//             {renderContent()}
//         </div>
//     );
// };

// export default App;


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import ParkMap from './components/ParkMap';
import ParkDetail from './components/ParkDetail';
// Importa tus componentes existentes
import ARScanner from './componentss/ARScanner'; 
import TotemMap from './componentss/TotemMap'; 
import ARTestScanner from './componentss/ARTestScanner'; // Puedes quitar este si quieres, pero es útil para debug.

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Nivel 0: Inicio */}
                <Route path="/" element={<WelcomeScreen />} />
                
                {/* Nivel 1: Mapa y Lista */}
                <Route path="/mapa" element={<ParkMap />} />
                
                {/* Nivel 2: Detalle del Parque, 3D y Botón AR */}
                <Route path="/parque/:id" element={<ParkDetail />} />
                
                {/* (Opcional) Rutas de prueba directa */}
                <Route path="/ar-debug" element={<ARScanner />} />
                <Route path="/map-debug" element={<TotemMap />} />
                <Route path="/ar-test" element={<ARTestScanner />} />

                {/* Ruta de fallback si no encuentra nada */}
                <Route path="*" element={<WelcomeScreen />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;