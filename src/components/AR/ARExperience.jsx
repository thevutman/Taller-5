import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './ARExperience.scss'

import markerUrl from '../../assets/test_pattern.patt?url'
import videoUrl from '../../assets/videoHistoriaCandanga.mp4?url'

export default function ARExperience() {
  const navigate = useNavigate()
  const markerRef = useRef(null)
  const videoRef = useRef(null)
  const containerRef = useRef(null) // <-- contenedor donde queremos el video de la cámara

  // cargar A-Frame y AR.js si hace falta
  useEffect(() => {
    if (!window.AFRAME) {
      const s = document.createElement('script')
      s.src = 'https://aframe.io/releases/1.4.0/aframe.min.js'
      s.async = true
      document.head.appendChild(s)
    }
    if (!window.ARjs) {
      const s2 = document.createElement('script')
      s2.src = 'https://unpkg.com/ar.js@3.3.2/aframe/build/aframe-ar.js'
      s2.async = true
      document.head.appendChild(s2)
    }
  }, [])

  // mover el elemento <video> de la cámara dentro de un div propio para poder dimensionarlo
  useEffect(() => {
    let stopped = false
    const tryMove = () => {
      if (stopped) return
      // buscamos el video que contiene la cámara (webcam) - AR.js suele crear un <video> con srcObject
      const videos = Array.from(document.querySelectorAll('video'))
      const camVideo = videos.find((v) => v !== videoRef.current && !!v.srcObject)
      if (camVideo && containerRef.current) {
        // aplicar estilos para que ocupe el contenedor y no interfiera con eventos
        camVideo.style.width = '100%'
        camVideo.style.height = '100%'
        camVideo.style.objectFit = 'cover'
        camVideo.style.position = 'absolute'
        camVideo.style.top = '0'
        camVideo.style.left = '0'
        camVideo.style.zIndex = '0'
        camVideo.style.pointerEvents = 'none'

        // mover DOM: colocarlo dentro del wrapper
        if (containerRef.current && camVideo.parentElement !== containerRef.current) {
          containerRef.current.appendChild(camVideo)
        }
        return
      }
      // si no está aún, reintentar por un corto periodo
      setTimeout(tryMove, 300)
    }

    // arrancar intentos después de pequeña espera para que AR.js cree el video
    const timer = setTimeout(tryMove, 500)

    return () => {
      stopped = true
      clearTimeout(timer)
    }
  }, [])

  // lógica de mostrar/ocultar video de assets cuando se detecta marker
  useEffect(() => {
    const markerEl = markerRef.current
    const vidEl = videoRef.current
    if (!markerEl || !vidEl) return

    const onMarkerFound = () => {
      vidEl.play().catch(() => {})
      vidEl.removeAttribute('muted')
      const videoEntity = markerEl.querySelector('a-video')
      if (videoEntity) videoEntity.setAttribute('visible', 'true')
    }
    const onMarkerLost = () => {
      vidEl.pause()
      const videoEntity = markerEl.querySelector('a-video')
      if (videoEntity) videoEntity.setAttribute('visible', 'false')
    }

    markerEl.addEventListener('markerFound', onMarkerFound)
    markerEl.addEventListener('markerLost', onMarkerLost)
    return () => {
      markerEl.removeEventListener('markerFound', onMarkerFound)
      markerEl.removeEventListener('markerLost', onMarkerLost)
    }
  }, [])

  return (
    <div className="ar-experience">
      <header className="ar-experience__header">
        <button className="ar-experience__back" onClick={() => navigate(-1)}>← Volver</button>
        <h2 className="ar-experience__title">AR - Escanea el patrón</h2>
      </header>

      <main className="ar-experience__main">
        {/* Wrapper para poder controlar tamaño/posición del vídeo de la cámara */}
        <div ref={containerRef} className="ar-experience__cameraWrap" style={{ position: 'relative', width: '100%', height: '60vh', overflow: 'hidden', background: '#000' }}>
          {/* El <a-scene> está en modo embedded para que su render y el canvas queden dentro del componente.
              AR.js creará el <video> de cámara; el useEffect lo moverá dentro de este container para que puedas
              controlar tamaño con CSS del .ar-experience__cameraWrap */}
          <a-scene
            vr-mode-ui="enabled: false"
            embedded
            renderer="logarithmicDepthBuffer: true;"
            arjs="sourceType: webcam; debugUIEnabled: false;"
            style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
          >
            <a-assets>
              <video id="ar-video" ref={videoRef} src={videoUrl} playsInline webkit-playsinline preload="auto" crossOrigin="anonymous" />
            </a-assets>

            <a-marker type="pattern" url={markerUrl} ref={markerRef} emitevents="true">
              <a-video src="#ar-video" width="1" height="0.5625" position="0 0 0" rotation="-90 0 0" visible="false"></a-video>
            </a-marker>

            <a-entity camera></a-entity>
          </a-scene>
        </div>

        <p className="ar-experience__hint">Coloca el patrón frente a la cámara. Puedes cambiar el tamaño del recuadro de la cámara con CSS.</p>
      </main>
    </div>
  )
}