import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './ARExperience.scss'

// importa archivos desde src/assets como URL (Vite)
import markerUrl from '../../assets/test_pattern.patt?url'
import videoUrl from '../../assets/videoHistoriaCandanga.mp4?url'

export default function ARExperience() {
  const navigate = useNavigate()
  const markerRef = useRef(null)
  const videoRef = useRef(null)

  // inyectar A-Frame + AR.js si no están presentes
  useEffect(() => {
    if (!window.AFRAME) {
      const s = document.createElement('script')
      s.src = 'https://aframe.io/releases/1.4.0/aframe.min.js'
      s.async = true
      document.head.appendChild(s)
    }
    if (!(window.ARjs || (window.AFRAME && window.AFRAME.components && window.AFRAME.components['arjs']))) {
      const s2 = document.createElement('script')
      s2.src = 'https://unpkg.com/ar.js@3.3.2/aframe/build/aframe-ar.js'
      s2.async = true
      document.head.appendChild(s2)
    }
  }, [])

  useEffect(() => {
    const markerEl = markerRef.current
    const vidEl = videoRef.current

    if (!markerEl || !vidEl) return

    const onMarkerFound = () => {
      vidEl.play().catch(() => {
        // autoplay puede fallar en algunos navegadores sin interacción
        console.warn('No se pudo autoplay, espera interacción del usuario')
      })
      vidEl.removeAttribute('muted')
      // mostrar video entity
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
        {/* escena A-Frame + AR.js. Usa pattern marker (.patt) ubicado en assets */}
        <a-scene
          vr-mode-ui="enabled: false"
          embedded
          renderer="logarithmicDepthBuffer: true;"
          arjs="sourceType: webcam; debugUIEnabled: false;"
        >
          <a-assets>
            <video id="ar-video" ref={videoRef} src={videoUrl} playsInline webkit-playsinline preload="auto" crossOrigin="anonymous" />
          </a-assets>

          {/* marker pattern: marker.patt (asegúrate que marker.patt está en src/assets y se importó arriba) */}
          <a-marker
            type="pattern"
            url={markerUrl}
            ref={markerRef}
            emitevents="true"
          >
            {/* video se posiciona plano sobre el marker; ajusta scale/position según tu patrón */}
            <a-video src="#ar-video" width="1" height="0.5625" position="0 0 0" rotation="-90 0 0" visible="false"></a-video>
          </a-marker>

          <a-entity camera></a-entity>
        </a-scene>
      </main>
    </div>
  )
}