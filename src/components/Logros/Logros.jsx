import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Logo from "../../assets/Logo.png"
import "./Logros.scss"
import candelio from '../../assets/candelio.png'
import origenes from '../../assets/origenes.png'
import vestimenta from '../../assets/vestimenta.png'
import Logros from '../../assets/Logros.png';

export default function LogrosPage() {
  const navigate = useNavigate()
  const [achievements, setAchievements] = useState({
    candela: false,
    origenes: false,
    vestimenta: false,
  })

  const handleChange = (key) => (e) => {
    setAchievements((prev) => ({ ...prev, [key]: e.target.checked }))
  }

  return (
    <div className="logros">
      <header className='logros__header'> 
        <div className="logros__header-logo" onClick={() => navigate("/intro")}>
          <img src={Logros} alt="Logo Logros"/>
        </div>
        <h1 className='logros__header-title'>Logros</h1>
      </header>

      {/* Contenido */}
      <main className="logros__main">
        {/* Lista de logros */}
        <div className="logros__list">
          {/* Logro 1: Candela */}
          <div className="logros__item">
            <div className="logros__item-content">
              <img src={candelio} alt="Candela de Candelio" className="logros__item-image" />
              <div className="logros__item-info">
                <h3 className="logros__item-title">Recupera a candela</h3>
              </div>
            </div>
            <div className="logros__item-checkbox">
              <input
                id="candela"
                type="checkbox"
                checked={achievements.candela}
                onChange={handleChange("candela")}
                className="logros__checkbox"
              />
              <label htmlFor="candela" className="logros__checkbox-label">
                Completado
              </label>
            </div>
          </div>

          {/* Logro 2: Orígenes */}
          <div className="logros__item">
            <div className="logros__item-content">
              <img src={origenes} alt="Orígenes" className="logros__item-image" />
              <div className="logros__item-info">
                <h3 className="logros__item-title">Recupera a orígenes</h3>
              </div>
            </div>
            <div className="logros__item-checkbox">
              <input
                id="origenes"
                type="checkbox"
                checked={achievements.origenes}
                onChange={handleChange("origenes")}
                className="logros__checkbox"
              />
              <label htmlFor="origenes" className="logros__checkbox-label">
                Completado
              </label>
            </div>
          </div>

          {/* Logro 3: Vestimenta */}
          <div className="logros__item">
            <div className="logros__item-content">
              <img src={vestimenta} alt="Vestimenta" className="logros__item-image" />
              <div className="logros__item-info">
                <h3 className="logros__item-title">Recupera a vestimenta</h3>
              </div>
            </div>
            <div className="logros__item-checkbox">
              <input
                id="vestimenta"
                type="checkbox"
                checked={achievements.vestimenta}
                onChange={handleChange("vestimenta")}
                className="logros__checkbox"
              />
              <label htmlFor="vestimenta" className="logros__checkbox-label">
                Completado
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
