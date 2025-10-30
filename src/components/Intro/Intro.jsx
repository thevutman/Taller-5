import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Intro.scss'
import Logo from '../../assets/Logo.png'
import Candanga from '../../assets/Candanga.png'
import Logros from '../../assets/Logros.png'
import Mapa from '../../assets/Mapa.png'
import Totems from '../../assets/Totems.png'

function Intro() {
    const navigate = useNavigate()
    return (
        <div className="intro-container">
            {/* Header con logo */}
            <header className="intro-container__header">
                <img src={Logo} alt="Logo Retumbó" />
            </header>

            {/* Contenido principal */}
            <main className="intro-container__main">
                {/* Imagen principal */}
                <div className="intro-container__main__image" onClick={() => navigate("/Historia")}>
                    <img src={Candanga} alt="Candanga de Obregón" />
                </div>

                {/* Iconos de navegación */}
                <div className="intro-container__main__icons">
                    <div className="intro-container__main__icon">
                        <div onClick={() => navigate('/Logros')}>
                            <img src={Logros} alt="Mapa" className="w-8 h-8" />
                            <span>Logros</span>
                        </div>
                    </div>

                    <div className="intro-container__main__icon">
                        <div onClick={() => navigate('/Mapa')}>
                            <img src={Mapa} alt="Mapa" className="w-8 h-8" />
                            <span>Mapa</span>
                        </div>
                    </div>

                    <div className="intro-container__main__icon">
                        <div onClick={() => navigate('/Totems')}>
                            <img src={Totems} alt="Totems" className="w-8 h-8" />
                            <span>Totems</span>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default Intro