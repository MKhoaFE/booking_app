import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapComponent = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '30rem'
  };

  const center = {
    lat: 51.508742,
    lng: -0.120850
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDqQVjuk3Enj20UZ_9QY4YUmrq_Q9OA8cQ">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={5}
      />
    </LoadScript>
  );
}

export default MapComponent;