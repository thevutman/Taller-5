import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.scss';
import Logo from '../../assets/Logo.png';
// import Button from '../Shared/Button';

export default function WelcomeScreen({ onStart }) {
    const navigate = useNavigate();

    const handleStart = () => {
      if (typeof onStart === 'function') onStart();
      navigate('/Intro'); // <-- asegúrate que coincide con la ruta en App.jsx
    };

    return (
        <div className="welcome-screen">
            <div className="welcome-screen__container">
                {/* Logo Retumbó */}
                <div className="welcome-screen__container__logo">
                    <img src={Logo} alt="Logo Retumbó" className="welcome-screen__container__logo__image" />
                </div>

                {/* Texto descriptivo */}
                <div className="welcome-screen__container__description">
                    <p className="">
                        Explora la esencia de Santa Fe de Antioquia. Descubre el Bunde. Conoce la Candanga de Obregón. Vive a Los Diablitos.
                    </p>
                </div>

                {/* Botón Comenzar */}
                <button className="welcome-screen__container__button" onClick={handleStart}>
                    Comenzar
                </button>
            </div>
        </div>
    );
}