import { useRef, useState, useEffect } from 'react'
import { MarkerType } from '@types'
import mapboxgl from 'mapbox-gl'
import { Marker } from 'mapbox-gl'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

const generateNewMarker = ({ markerData }: { markerData: MarkerType }) => {
  const {
    type,
    location: { _lat, _long },
  } = markerData
  const color = type === 'farms' ? '#63df29' : '#f2c94c'
  return new Marker({ color, scale: 1.5 }).setLngLat([_long, _lat])
}

export type PropsType = {
  markersData: MarkerType[]
}

const Map = ({ markersData }: PropsType) => {
  const mapContainer = useRef<any>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const mapMarkers = useRef<mapboxgl.Marker[]>([])
  const [lng, setLng] = useState(4.1111)
  const [lat, setLat] = useState(43.58)
  const [zoom, setZoom] = useState(9)

  const displayMarkersOnMap = () => {
    if (mapMarkers.current.length > 0) {
      mapMarkers.current.forEach((marker) => marker.remove())
      mapMarkers.current = []
    }
    markersData.forEach((markerData) => {
      const marker = generateNewMarker({
        markerData,
      })
      mapMarkers.current.push(marker)
      marker.addTo(map.current!)
    })
  }

  useEffect(() => {
    if (map.current) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    })
  }, [map, mapContainer, lng, lat, zoom])

  useEffect(() => {
    if (!map.current) return
    if (markersData.length < 1) return

    displayMarkersOnMap()
  }, [map, markersData])

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
      }}
      ref={mapContainer}
    ></div>
  )
}

export default Map
