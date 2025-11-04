import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Musica.scss'

import Logo from '../../assets/Logo.png'
import Totems from '../../assets/Totems_Musica.png'

function Musica() {
  const navigate = useNavigate()
  return (
    <div className='totem'>
      <header className='totem__header'>
        <div className="totem__header-logo" onClick={() => navigate("/intro")}>
          <img src={Logo} alt="Logo Tótem" />
        </div>
        <h1 className='totem__header-title'>La candanga</h1>
      </header>

      <div className='totem__content'>
        <div className='totem__title'>Musica/Ritmos</div>

        <model-viewer
          src="/tambor.glb"
          alt="Tótem 3D"
          poster="/models/tambor.webp"
          ar
          ar-modes="scene-viewer quick-look webxr"
          camera-controls
          auto-rotate
          shadow-intensity="1"
          style={{ width: '100%', height: '100%' }}
        ></model-viewer>
      </div>

      <div className='totem__subtitle'>
        <div className='totem__text'>Subele el volumen a tu telefono para que puedas escuchar la descripcion del totem</div>
      </div>

      <div className='totem__imagenTotemsContainer'>
        <img src={Totems} alt="Imagen Totems" className='totem__imagenTotems' />
      </div>

      <div className='totem__buttonContainer'>
        {/* Navega a la pantalla AR */}
        <button
          className='totem__custom-button'
          onClick={() => navigate('/ar/musica')}
        >
          AR
        </button>
      </div>
    </div>
  )
}

export default Musica