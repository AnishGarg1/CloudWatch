import React, { useEffect } from 'react';
import Radar from 'radar-sdk-js';
import 'radar-sdk-js/dist/radar.css';

const MapContainer = ({ lat, lon }) => {
  useEffect(() => {
    // Initialize Radar
    const API_KEY = process.env.REACT_APP_MAP_API_KEY;
    Radar.initialize(API_KEY);
    
    // Create a map centered at the provided coordinates
    const map = Radar.ui.map({
      container: 'map',
      style: 'radar-default-v1',
      center: [lon, lat], // Use props to set the center
      zoom: 14,
    });
    
    // Add a marker at the provided coordinates
    Radar.ui.marker({ text: 'Location Marker' })  // You can customize the marker text here
      .setLngLat([lon, lat])  // Use props to set the marker position
      .addTo(map);
  }, [lat, lon]); // Re-run the effect when lat or lon changes

  return (
    <div id="map-container" className='border-2 rounded-md' style={{ width: '100%', height: '300px', position: 'relative' }}>
      <div id="map" style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

export default MapContainer;
