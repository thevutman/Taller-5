import React, { useState, useEffect } from 'react';
import { welcomeSlides } from '../../data/WelcomeSlides';
import './WelcomeScreen.scss';

export default function WelcomeScreen({ onStart }) {
    const [slideIndex, setSlideIndex] = useState(0);
    const slide = welcomeSlides[slideIndex];

    return (
        <div className="welcome-screen__container">
          {slideIndex < 2 && (
            <div className="welcome-screen__card">
                <div className="welcome-screen__header">
                    <h1 className="welcome-screen__title">{slide.title}</h1>
                    {slide.subtitle && <h3 className="welcome-screen__subtitle">{slide.subtitle}</h3>}
                    {slide.text && <p className="welcome-screen__text">{slide.text}</p>}  
                </div>

                <div className="welcome-screen__media">
                    {slide.images && slide.images.length ? (
                        <div className="welcome-screen__carousel">
                            <img
                                src={slide.images[0]}
                                alt={slide.title}
                                className="welcome-screen__image"
                            />
                            <img
                                src={slide.images[1]}
                                alt={slide.title}
                                className="welcome-screen__image"
                            />
                            <img
                                src={slide.images[2]}
                                alt={slide.title}
                                className="welcome-screen__image"
                            />
                        </div>
                    ) : slide.image ? (
                        <img src={slide.image} alt={slide.title} className="welcome-screen__image" />
                    ) : null}
                    {slide.video && (
                      <video 
                        className="welcome-screen__video"
                        controls
                      >
                        <source src={slide.video} type="video/mp4" />
                        Tu navegador no soporta video.
                      </video>
                    )}
                </div>
                {slide.showButton && (
                  <button
                      className="welcome-screen__primary"
                      onClick={() => {
                          if (typeof onStart === 'function') onStart();
                      }}
                  >
                      {slide.buttonText || 'Comenzar'}
                  </button>
                )}
                <div className="welcome-screen__footer">
                    <div className="welcome-screen__footer__container">
                        <div className="welcome-screen__footer__nav-selector" onClick={() => setSlideIndex(0)}></div>
                        <div className="welcome-screen__footer__nav-selector" onClick={() => setSlideIndex(1)}></div>
                        <div className="welcome-screen__footer__nav-selector" onClick={() => setSlideIndex(2)}></div>
                    </div>
                </div>
            </div>
          )}
          {slideIndex >= 2 && (
            <div className="welcome-screen__card--final">
                <div className="welcome-screen__header">
                    <h1 className="welcome-screen__title">{slide.title}</h1>
                    {slide.subtitle && <h3 className="welcome-screen__subtitle">{slide.subtitle}</h3>}
                </div>
                <div className="welcome-screen__media--final">
                    {slide.images && slide.images.length ? (
                      <div className="welcome-screen__carousel">
                            <img
                                src={slide.images[0]}
                                alt={slide.title}
                                className="welcome-screen__image"
                            />
                            <img
                                src={slide.images[1]}
                                alt={slide.title}
                                className="welcome-screen__image"
                            />
                            <img
                                src={slide.images[2]}
                                alt={slide.title}
                                className="welcome-screen__image"
                            />
                        </div>
                    ) : slide.image ? (
                        <img src={slide.image} alt={slide.title} className="welcome-screen__image--final" />
                    ) : null}
                    {slide.video && (
                      <video 
                        className="welcome-screen__video"
                        controls
                      >
                        <source src={slide.video} type="video/mp4" />
                        Tu navegador no soporta video.
                      </video>
                    )}
                </div>
                {slide.text && <p className="welcome-screen__text">{slide.text}</p>}  
                {slide.showButton && (
                  <button
                      className="welcome-screen__primary"
                      onClick={() => {
                          if (typeof onStart === 'function') onStart();
                      }}
                  >
                      {slide.buttonText || 'Comenzar'}
                  </button>
                )}
                <div className="welcome-screen__footer">
                    <div className="welcome-screen__footer__container">
                        <div className="welcome-screen__footer__nav-selector" onClick={() => setSlideIndex(0)}></div>
                        <div className="welcome-screen__footer__nav-selector" onClick={() => setSlideIndex(1)}></div>
                        <div className="welcome-screen__footer__nav-selector" onClick={() => setSlideIndex(2)}></div>
                    </div>
                </div>
            </div>
          )}
        </div>
    );
}