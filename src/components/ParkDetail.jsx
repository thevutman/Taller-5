// src/components/ParkDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Totem3DViewer from '../componentss/Totem3DViwer'; // Tu visor 3D
import ARScanner from '../componentss/ARScanner'; // Tu scanner AR
import { PARQUES } from '../data/parques';

const ParkDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // 🛑 DECISIÓN: Usaremos ARScanner como un componente separado aquí.
    const [showAR, setShowAR] = React.useState(false); 
    const parque = PARQUES.find(p => p.id === id);

    if (!parque) {
        return <div style={{ padding: '20px' }}>Parque no encontrado. <button onClick={() => navigate('/mapa')}>Volver al Mapa</button></div>;
    }
    

    const buttonStyle = {
        padding: '12px 25px', fontSize: '1.1em', backgroundColor: '#FF5733', color: 'white',
        border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '15px', marginRight: '10px'
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <button 
                onClick={() => navigate('/mapa')} 
                style={{ marginBottom: '20px', padding: '8px 15px', background: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px' }}
            >
                ← Volver al Mapa
            </button>

            <h1>{parque.name}</h1>
            <p style={{ color: '#666' }}>{parque.description}</p>
            
            <hr style={{ margin: '20px 0' }} />

            {/* 🧊 Visor 3D del Tótem */}
            <h3>2. Modelo 3D del Tótem</h3>
            <Totem3DViewer key={parque.id} /> 

            <hr style={{ margin: '20px 0' }} />

            {/* 👁️ Sección AR */}
            <h3>3. Realidad Aumentada</h3>
            <p>Presiona el botón para activar la cámara y el escáner del patrón AR.</p>
            
            <button 
                style={buttonStyle} 
                onClick={() => setShowAR(!showAR)}
            >
                {showAR ? 'Ocultar Escáner AR' : 'Activar Escáner AR'}
            </button>
            
            <div style={{ marginTop: '20px' }}>
                 {showAR && <ARScanner />}
            </div>
            
        </div>
    );
};

export default ParkDetail;