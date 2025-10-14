// src/components/ParkMap.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TotemMap from '../componentss/TotemMap'; // El componente de mapa que ya funciona
import { PARQUES } from '../data/parques';

const ParkMap = () => {
    const navigate = useNavigate();

    const cardStyle = {
        border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '15px',
        cursor: 'pointer', transition: 'box-shadow 0.3s', backgroundColor: 'white'
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>1. Explorar Parques y Tótems</h2>
            
            {/* 🗺️ Mapa General */}
            <div style={{ marginBottom: '30px' }}>
                <TotemMap />
            </div>

            {/* 🎴 Lista de Tarjetas */}
            <h3>Selecciona un Parque:</h3>
            {PARQUES.map(parque => (
                <div 
                    key={parque.id} 
                    style={cardStyle} 
                    onClick={() => navigate(`/parque/${parque.id}`)}
                    onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 123, 255, 0.5)'}
                    onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
                >
                    <h4 style={{ color: '#007bff', margin: '0 0 5px 0' }}>{parque.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.9em' }}>Ver detalles, modelo 3D y activar AR.</p>
                </div>
            ))}
            
            <button 
                onClick={() => navigate('/')} 
                style={{ padding: '10px 20px', marginTop: '20px', border: '1px solid #ccc', borderRadius: '5px', background: '#f8f8f8' }}
            >
                ← Volver al Inicio
            </button>
        </div>
    );
};

export default ParkMap;