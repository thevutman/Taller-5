import React, { useState } from 'react';
import { LiborioSlides } from '../../data/liborio';
import './Liborio.scss';
import { useNavigate } from 'react-router-dom';

export default function Liborio() {
    const [slideIndex, setSlideIndex] = useState(0);
    const navigate = useNavigate();
    const slide = LiborioSlides[slideIndex];

    const preventVideoInteraction = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const ensurePlaying = (e) => {
      try { e.currentTarget.play(); } catch (err) { /* ignore */ }
    };

    const continueToNextSlide = () => {
      if (slideIndex < LiborioSlides.length - 1) {
        setSlideIndex((prevIndex) => Math.min(prevIndex + 1, LiborioSlides.length - 1));
      }
      else {
        navigate('/map');
      }
    };

    return (
        <div className="Liborio__container">
          {slideIndex <= 2 && (
            <div className="Liborio__card" onClick={continueToNextSlide} >
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
                        autoPlay
                        loop
                        muted
                        playsInline
                        // prevent native controls / interactions
                        onClick={preventVideoInteraction}
                        onDoubleClick={preventVideoInteraction}
                        onContextMenu={(e) => e.preventDefault()}
                        onPause={ensurePlaying}
                        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') e.preventDefault(); }}
                      >
                        <source src={slide.video} type="video/mp4" />
                        Tu navegador no soporta video.
                      </video>
                    )}
                    {slideIndex === 2 && slide.video2 && (
                      <video
                        className="Liborio__video2"
                        autoPlay
                        loop
                        muted
                        playsInline
                        onClick={preventVideoInteraction}
                        onDoubleClick={preventVideoInteraction}
                        onContextMenu={(e) => e.preventDefault()}
                        onPause={ensurePlaying}
                        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') e.preventDefault(); }}
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
