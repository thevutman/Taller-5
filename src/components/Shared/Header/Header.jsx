import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

function Header() {
  const navigate = useNavigate();

  const handleBack = () => {
    // si no hay historial, enviamos al inicio como fallback
    // if (window.history.length > 1) navigate(-1);
    // else navigate('/');
    navigate('/');
  };

  return (
    <div className="Header">
      <div className="Header__container">
        <i
          className="fa-solid fa-arrow-left Header__back-icon"
          role="button"
          tabIndex={0}
          aria-label="Volver"
          onClick={handleBack}
        />
        <h1 className="Header__title">Mapa</h1>
      </div>
    </div>
  );
}

export default Header;