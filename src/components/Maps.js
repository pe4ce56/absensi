import React, {useState, useEffect} from 'react';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
const Maps = ({coord, style, setPaddingTop}) => {
  return (
    <MapView
      style={style}
      initialRegion={coord}
      userLocationPriority="high"
      followUserLocation={true}
      showsUserLocation={true}
      provider={PROVIDER_GOOGLE}
      onMapReady={() => setPaddingTop(0)}>
      <MapView.Marker
        coordinate={{
          latitude: coord.latitude,
          longitude: coord.longitude,
        }}
        title={'Lokasi kamu saat ini'}
        draggable={false}
      />
    </MapView>
  );
};

export default Maps;
