import { useEffect, useMemo, useState } from 'react'
import { GeoJSON, MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet'
import { divIcon, geoJSON as leafletGeoJSON } from 'leaflet'
import 'leaflet/dist/leaflet.css'

import './Mapa.scss'

import Logo from '../../assets/Logo.png'
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

  useEffect(() => {
    let isMounted = true

    fetch(totemsGeojsonUrl)
      .then(async (response) => {
        if (!response.ok) throw new Error('No se pudo cargar el GeoJSON')
        return await response.json()
      })
      .then((data) => {
        if (isMounted) setGeojsonData(data)
      })
      .catch(() => {
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

  return (
    <div className='pokemon-map'>
      <header className='pokemon-map__header'>
        <div className='pokemon-map__logo'>
          <img src={Logo} alt='Logo Parque Explora' />
        </div>
        <div className='pokemon-map__trainerCard'>
          <span className='pokemon-map__trainerLabel'>Entrenador</span>
          <strong className='pokemon-map__trainerName'>Explorador Candanga</strong>
        </div>
      </header>

      <main className='pokemon-map__body'>
        <div className='pokemon-map__titleBlock'>
          <h1>Explora los tótems</h1>
          <p>Captura experiencias mientras caminas por el parque. Sigue la ruta brillante para encontrarlos.</p>
        </div>

        <div className='pokemon-map__mapShell'>
          <div className='pokemon-map__radarOverlay' />
          <div className='pokemon-map__scanline' />

          <MapContainer
            className='pokemon-map__leaflet'
            center={INITIAL_CENTER}
            zoom={16}
            minZoom={14}
            maxZoom={19}
            zoomControl={false}
            preferCanvas
            whenCreated={setMapInstance}
          >
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {geojsonData && <GeoJSON data={geojsonData} style={featureStyle} />}

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
        </div>

        <section className='pokemon-map__statusPanel'>
          <div className='pokemon-map__statusBubble'>
            <span className='pokemon-map__statusLabel'>Estado</span>
            <p className='pokemon-map__statusText'>{locationStatus}</p>
          </div>
          <div className='pokemon-map__statusBubble'>
            <span className='pokemon-map__statusLabel'>Totems visibles</span>
            <p className='pokemon-map__statusText'>
              {geojsonData?.features?.length ? geojsonData.features.length : 'Cargando...'}
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Mapa
