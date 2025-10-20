import React, { useState, } from 'react';
import { LiborioSlides } from '../../data/liborio';
import './Liborio.scss';


export default function Liborio() {
    const [slideIndex, setSlideIndex] = useState(0);
    const slide = LiborioSlides[slideIndex];
    
    return (
        <div className="Liborio__container">
          {slideIndex <=2 && (
            <div className="Liborio__card" onClick={() => setSlideIndex(slideIndex + 1)} >
                <div className="Liborio__media">
                    {slide.images && slide.images.length ? (
                        <div className="Liborio__carousel">
                            <img
                                src={slide.images[0]}
                                alt={slide.title}
                                className="Liborio__image"
                            />
                        </div>
                    ) : slide.image ? (
                        <img src={slide.image} alt={slide.title} className="Liborio__image" />
                    ) : null}
                    {slideIndex === 1 && slide.video && (
                      <video 
                        className="Liborio__video"
                        controls
                      >
                        <source src={slide.video} type="video/mp4" />
                        Tu navegador no soporta video.
                      </video>
                    )}
                    {slideIndex === 2 && slide.video2 && (
                      <video
                        className="Liborio__video2"
                        controls
                        >
                        <source src={slide.video2} type="video/mp4" />
                        Tu navegador no soporta video.
                      </video>
                    )}
                    
                    
                </div>
                <div className="Liborio__header">
                    <h1 className="Liborio__title">{slide.title}</h1>
                </div>
                
            </div>
          )}
        </div>
    );
}
