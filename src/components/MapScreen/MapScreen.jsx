import React from 'react'
import { useState } from 'react'
import './MapScreen.scss'
import {MapaSlides} from '../../data/mapa'
import Header from '../Shared/Header/Header'
import TotemMap from '../TotemMap/TotemMap'

export default function MapScreen () {
    const [slideIndex] = useState(0)
    const slide = MapaSlides[slideIndex]
    
    return (
        <div className="MapScreen__container">
            <div className="MapScreen__card">
                <Header />
                
                <div className="MapScreen__content">
                    <h2 className="MapScreen__subtitle">{slide.subtitle}</h2>
                    
                    {/* Agregamos la card del mapa con fondo gris */}
                    <div className="MapScreen__mapPreview">
                      <TotemMap />
                    </div>
                    <h3 className="MapScreen__subtitle2">{slide.subtitle2}</h3>
                    
                    <div className="MapScreen__locations">
                      <div className="MapScreen__locationCard">
                        <div className="MapScreen__location-iconContainer">
                        { slide.video && (
                          <video className="MapScreen__locationCard__location-icon" autoPlay loop muted>
                            <source src={slide.video} type="video/mp4" />
                            Tu navegador no soporta video.
                          </video>
                        )}
                      </div>
                      <div className="MapScreen__location-info"> 
                      <h4>{slide.text}</h4>
                      <p>{slide.text2}</p>
                      <div className="MapScreen__locationButtons">
                        {slide.showButtonMap && (
                          <button
                            className="MapScreen__btnMapa"
                          >
                            {slide.buttonMap}
                          </button>
                          )}
                                <button className="MapScreen__btnExperiencia">{slide.buttonExperiencia}</button>
                      </div>
                      </div>
                      
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}