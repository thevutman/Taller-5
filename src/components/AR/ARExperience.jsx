import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ARExperience.scss'

import markerUrl from '../../assets/test_pattern.patt?url'
import videoUrl from '../../assets/videoHistoriaCandanga.mp4'

export default function ARExperience() {
  const navigate = useNavigate()
  const markerRef = useRef(null)
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [scriptsReady, setScriptsReady] = useState(false)
  const moveIntervalRef = useRef(null)

  // helper para cargar script con promesa (evita duplicados)
  const loadScript = (src, id, checkGlobal) =>
    new Promise((resolve, reject) => {
      if (checkGlobal && window[checkGlobal]) return resolve()
      const existing = document.getElementById(id)
      if (existing) {
        existing.addEventListener('load', () => resolve())
        existing.addEventListener('error', (e) => reject(e))
        return
      }
      const s = document.createElement('script')
      s.id = id
      s.src = src
      s.async = true
      s.onload = () => resolve()
      s.onerror = (e) => reject(e)
      document.head.appendChild(s)
    })

  // cargar A-Frame y AR.js en orden y luego permitir renderizar la escena
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        await loadScript('https://aframe.io/releases/1.4.0/aframe.min.js', 'aframe-script', 'AFRAME')
        // ar.js build para aframe
        await loadScript('https://unpkg.com/ar.js@3.3.2/aframe/build/aframe-ar.js', 'arjs-script', 'ARjs')
        // espera un tick para que A-Frame registre componentes
        await new Promise((r) => setTimeout(r, 200))
        if (mounted) setScriptsReady(true)
      } catch (err) {
        console.error('Error cargando scripts AR:', err)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  // mover el <video> de la cámara dentro del contenedor una vez que los scripts están listos
  useEffect(() => {
    if (!scriptsReady) return
    const tryMove = () => {
      const videos = Array.from(document.querySelectorAll('video'))
      const camVideo = videos.find((v) => v !== videoRef.current && !!v.srcObject)
      if (camVideo && containerRef.current) {
        // quitar atributos que fuerzan tamaño
        camVideo.removeAttribute('width')
        camVideo.removeAttribute('height')
        // estilos claros (CSS con !important en el .scss forzará si es necesario)
        camVideo.style.position = 'absolute'
        camVideo.style.top = '0'
        camVideo.style.left = '0'
        camVideo.style.width = '100%'
        camVideo.style.height = '100%'
        camVideo.style.objectFit = 'cover'
        camVideo.style.zIndex = '0'
        camVideo.style.pointerEvents = 'none'
        camVideo.controls = false
        if (camVideo.parentElement !== containerRef.current) containerRef.current.appendChild(camVideo)
        return true
      }
      return false
    }

    // intentar varias veces hasta encontrar el video de la cámara
    if (!moveIntervalRef.current) {
      moveIntervalRef.current = setInterval(() => {
        if (tryMove()) {
          clearInterval(moveIntervalRef.current)
          moveIntervalRef.current = null
        }
      }, 250)
      // intento inmediato
      tryMove()
    }

    return () => {
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current)
        moveIntervalRef.current = null
      }
    }
  }, [scriptsReady])

  // marker found / lost: reproducir/pausar video de assets
  useEffect(() => {
    if (!scriptsReady) return
    const markerEl = markerRef.current
    const vidEl = videoRef.current
    if (!markerEl || !vidEl) return

    const onMarkerFound = () => {
      vidEl.muted = false
      vidEl.play().catch(() => {
        console.warn('Autoplay bloqueado: requiere interacción del usuario para sonido')
      })
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
  }, [scriptsReady])

  // cleanup al desmontar: pausar video, detener tracks de la cámara y remover escena
  useEffect(() => {
    return () => {
      // pausar video de assets
      if (videoRef.current) {
        try {
          videoRef.current.pause()
          videoRef.current.currentTime = 0
        } catch (e) {}
      }

      // detener todas las pistas de MediaStream presentes en videos
      try {
        const videos = Array.from(document.querySelectorAll('video'))
        videos.forEach((v) => {
          const stream = v.srcObject
          if (stream && stream.getTracks) {
            stream.getTracks().forEach((t) => {
              try {
                t.stop()
              } catch (e) {}
            })
            try {
              v.srcObject = null
            } catch (e) {}
          }
        })
      } catch (e) {}

      // remover escena A-Frame si quedó
      try {
        const scene = document.querySelector('a-scene')
        if (scene && scene.parentElement) scene.parentElement.removeChild(scene)
      } catch (e) {}
    }
  }, [])

  return (
    <div className="ar-experience">
      <header className="ar-experience__header">
        <button className="ar-experience__back" onClick={() => navigate(-1)}>← Volver</button>
        <div className="ar-experience__header-center">
          <h2 className="ar-experience__title">AR - Escanea el patrón</h2>
        </div>
      </header>

      <main className="ar-experience__main">
        {!scriptsReady ? (
          <div className="ar-experience__loading" style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>Cargando cámara AR…</p>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="ar-experience__cameraWrap"
            style={{ position: 'relative', width: '100%', height: '70vh', overflow: 'hidden', background: '#000' }}
          >
            <a-scene
              vr-mode-ui="enabled: false"
              embedded
              renderer="logarithmicDepthBuffer: true;"
              arjs="sourceType: webcam; debugUIEnabled: false;"
              style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
            >
              <a-assets>
                <video
                  id="ar-video"
                  ref={videoRef}
                  src={videoUrl}
                  playsInline
                  webkit-playsinline="true"
                  preload="auto"
                  crossOrigin="anonymous"
                  muted
                />
              </a-assets>

              <a-marker type="pattern" url={markerUrl} ref={markerRef} emitevents="true">
                <a-video src="#ar-video" width="1" height="0.5625" position="0 0 0" rotation="-90 0 0" visible="false" />
              </a-marker>

              <a-entity camera />
            </a-scene>
          </div>
        )}

        <p className="ar-experience__hint">Coloca el patrón frente a la cámara. Usa el botón volver para salir (la cámara se detendrá automáticamente).</p>
      </main>
    </div>
  )
}