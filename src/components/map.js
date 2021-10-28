import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export const MapBox = ({ mapProps }) => {
  const mapContainer = useRef()

  // Get access token
  mapboxgl.accessToken = accessToken

  // Init map
  useEffect(() => {
    const map = new mapboxgl.Map({
      center: [-1.126, 46.135],
      zoom: 13,
      container: mapContainer.current,
      style: 'mapbox://styles/developer-ubidreams/ckssofhmd0kav17tbrmcpjoyt?optimize=true',
      scrollZoom: false,
      interactive: false
    })

    new mapboxgl.Marker({ color: '#6B7C93' }).setLngLat([-1.125405, 46.136074]).addTo(map)
  }, [])

  return <div ref={mapContainer} className='w-100 mapContainer'></div>
}

export default MapBox
