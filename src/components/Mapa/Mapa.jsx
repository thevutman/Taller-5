import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GeoJSON, MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet'
import L, { divIcon, geoJSON as leafletGeoJSON } from 'leaflet'
import 'leaflet/dist/leaflet.css'

import './Mapa.scss'
import LMapa from '../../assets/Mapa.png'
import totemsGeojsonUrl from '../../data/totems.geojson?url'

const INITIAL_CENTER = [6.555143, -75.823926]

const featureStyle = () => ({
  color: '#51eaea',
  weight: 4,
  opacity: 0.85,
  dashArray: '10 12',
  lineCap: 'round',
  lineJoin: 'round',
  fillColor: '#b6fffa',
  fillOpacity: 0.2,
})

function Mapa () {
  const [geojsonData, setGeojsonData] = useState(null)
  const [mapInstance, setMapInstance] = useState(null)
  const [currentPosition, setCurrentPosition] = useState(null)
  const [locationStatus, setLocationStatus] = useState('Buscando tu ubicación...')
  // navigation
  const navigate = useNavigate()
  useEffect(() => {
    let isMounted = true

    fetch(totemsGeojsonUrl)
      .then(async (response) => {
        if (!response.ok) throw new Error('No se pudo cargar el GeoJSON')
        return await response.json()
      })
      .then((data) => {
        // si no existen puntos de tótem en el GeoJSON, añadimos 3 puntos con propiedades para navegación
        const hasTotemPoints = (data.features || []).some(
          (f) => f && f.properties && f.properties.isTotem,
        )

        let augmented = data
        if (!hasTotemPoints) {
          const totemPoints = [
            {
              type: 'Feature',
              properties: {
                id: 'musica',
                title: 'Tótem: Música',
                description: 'Experiencia musical de la Candanga',
                emoji: '🥁',
                isTotem: true,
              },
              geometry: {
                type: 'Point',
                // [lng, lat]
                coordinates: [-75.82544495444589, 6.555152663157422],
              },
            },
            {
              type: 'Feature',
              properties: {
                id: 'origenes',
                title: 'Tótem: Orígenes',
                description: 'Experiencia de orígenes',
                emoji: '🎭',
                isTotem: true,
              },
              geometry: {
                type: 'Point',
                coordinates: [-75.82920090370843, 6.560821344484065],
              },
            },
            {
              type: 'Feature',
              properties: {
                id: 'vestimenta',
                title: 'Tótem: Vestimenta',
                description: 'Experiencia de vestimenta',
                emoji: '🧥',
                isTotem: true,
              },
              geometry: {
                type: 'Point',
                coordinates: [-75.82414366382665, 6.5562989654186055],
              },
            },
          ]

          augmented = {
            ...data,
            features: [...(data.features || []), ...totemPoints],
          }
        }

        console.log('GeoJSON cargado (augmentado si era necesario):', augmented)
        if (isMounted) setGeojsonData(augmented)
      })
      .catch((err) => {
        console.error('Error cargando GeoJSON:', err)
        if (isMounted) setLocationStatus('No se pudo cargar el mapa de totems')
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus('La geolocalización no es compatible con tu dispositivo')
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const nextPosition = [position.coords.latitude, position.coords.longitude]
        setCurrentPosition(nextPosition)
        setLocationStatus('¡Listo! Estás en modo explorador')
      },
      () => {
        setLocationStatus('Activa la ubicación para vivir la experiencia completa')
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      },
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  useEffect(() => {
    if (!mapInstance || !geojsonData) return

    const layer = leafletGeoJSON(geojsonData)
    const bounds = layer.getBounds()

    if (bounds.isValid()) {
      mapInstance.fitBounds(bounds.pad(0.2))
    }

    // force resize in case container was hidden/changed
    setTimeout(() => mapInstance.invalidateSize && mapInstance.invalidateSize(), 300)
  }, [mapInstance, geojsonData])

  useEffect(() => {
    if (!mapInstance || !currentPosition) return

    mapInstance.flyTo(currentPosition, 17, {
      animate: true,
      duration: 2,
    })
  }, [mapInstance, currentPosition])

  const locationIcon = useMemo(
    () =>
      divIcon({
        className: 'pokemon-map__locationIcon',
        html: `
          <div class="pokemon-map__locationPulse"></div>
          <div class="pokemon-map__locationCore"></div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      }),
    [],
  )

  // icon para puntos de totem (si tu GeoJSON usa Point features)
  const totemIcon = useMemo(
    () =>
      divIcon({
        className: 'totem-map__icon',
        html: `<div class="totem-map__emoji">🌳</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      }),
    [],
  )

  // convierte Point features a Markers para que sean clicables y tengan tooltip/popup
  const pointToLayer = (feature, latlng) => {
    if (!feature || feature.geometry?.type !== 'Point') {
      return L.marker(latlng)
    }

    const iconHtml = feature?.properties?.emoji
      ? divIcon({
          className: 'totem-map__icon',
          html: `<div class="totem-map__emoji">${feature.properties.emoji}</div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        })
      : totemIcon

    return L.marker(latlng, { icon: iconHtml })
  }

  const onEachFeature = (feature, layer) => {
    if (!feature || !feature.properties) return
    const title = feature.properties.title || feature.properties.name || 'Tótem'
    const desc = feature.properties.description || ''

    // tooltip para todos los features
    layer.bindTooltip(`<strong>${title}</strong>`, { permanent: false, direction: 'top', offset: [0, -10] })

    // si es un totem (Point) hacemos la navegación al hacer click
    if (feature.properties.isTotem) {
      layer.on('click', (e) => {
        const id = feature.properties.id || feature.properties.title
        // navegar a la ruta /totem/:id — ajusta la ruta según tu router
        try {
          navigate(`/totem/${id}`)
        } catch (err) {
          // en caso de fallback si navigate no funciona (ej. require hack), usamos window.location
          window.location.href = `/totem/${id}`
        }
      })
      // Popup con botón (opcional)
      layer.bindPopup(`<strong>${title}</strong><br/>${desc}<br/><button onclick="window.location.href='/totem/${feature.properties.id}'">Ver</button>`)
    } else {
      // para LineString u otros: click centra y abre popup
      layer.on('click', () => {
        if (mapInstance) {
          const target = layer.getLatLng ? layer.getLatLng() : layer.getBounds().getCenter()
          mapInstance.flyTo(target, 18, { duration: 1.2 })
        }
        layer.bindPopup(`<strong>${title}</strong><br/>${desc}`).openPopup()
      })
    }
  }

  return (
    <div className='map'>
      <header className='map__header'> 
        <div className="map__header-logo" onClick={() => navigate("/intro")}>
          <img src={LMapa} alt="Logo Mapa"/>
        </div>
        <h1 className='map__header-title'>Mapa</h1>
      </header>

      <main className='map__body'>
          <MapContainer
            className='pokemon-map__leaflet'
            center={INITIAL_CENTER}
            zoom={16}
            minZoom={14}
            maxZoom={19}
            zoomControl={false}
            preferCanvas
            whenCreated={setMapInstance}
            style={{ height: '60vh', width: '100%' }}
          >
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {geojsonData && (
              <GeoJSON
                data={geojsonData}
                style={featureStyle}
                pointToLayer={pointToLayer}
                onEachFeature={onEachFeature}
              />
            )}

            {currentPosition && (
              <Marker position={currentPosition} icon={locationIcon}>
                <Tooltip
                  permanent
                  direction='top'
                  offset={[0, -20]}
                  className='pokemon-map__tooltip'
                >
                  ¡Estás aquí!
                </Tooltip>
              </Marker>
            )}
          </MapContainer>
      </main>
    </div>
  )
}

export default Mapa
