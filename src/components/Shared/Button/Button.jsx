// src/components/Shared/Button/Button.jsx

import React from 'react';
import './Button.scss';

const Button = ({ text, onClick }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;