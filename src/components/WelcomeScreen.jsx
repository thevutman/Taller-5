// src/components/WelcomeScreen.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
    const navigate = useNavigate();

    const containerStyle = {
        minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        background: 'linear-gradient(135deg, #f0f8ff, #add8e6)', color: '#333'
    };
    const buttonStyle = {
        padding: '15px 40px', fontSize: '1.5em', backgroundColor: '#4CAF50', color: 'white',
        border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ fontSize: '3em', marginBottom: '10px' }}>Tótems AR</h1>
            <p style={{ fontSize: '1.2em', color: '#555' }}>Explora la realidad aumentada de nuestros parques.</p>
            <button 
                style={buttonStyle} 
                onClick={() => navigate('/mapa')}
            >
                ENTRAR
            </button>
        </div>
    );
};

export default WelcomeScreen;