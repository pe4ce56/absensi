import React from 'react';
import {
  Button,
  Dimensions,
  PermissionsAndroid,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  TouchableHighlightBase,
  View,
} from 'react-native';
import MapView, {Geojson, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react/cjs/react.development';

import styles from '../../styles.json';
import {create} from 'tailwind-rn';
const {tailwind} = create(styles);
export default () => {
  const [loading, setLoading] = useState(true);
  const [paddingTop, setPaddingTop] = useState(1);

  const [coord, setCoord] = useState({
    latitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
    longitude: 0,
  });
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setCoord({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          longitudeDelta: 0.005,
          latitudeDelta: 0.005,
        });
        console.log(position);
        setLoading(false);
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  }, []);
  return (
    <React.Fragment>
      {!loading ? (
        <View style={{paddingTop: paddingTop}}>
          <MapView
            style={style.mapContainer}
            initialRegion={coord}
            followUserLocation={true}
            showsUserLocation={true}
            showsMyLocationButton={true}
            provider={PROVIDER_GOOGLE}
            onMapReady={() => setPaddingTop(0)}>
            <MapView.Marker
              coordinate={{
                latitude: coord.latitude,
                longitude: coord.longitude,
              }}
              title={'Lokasi kamu saat ini'}
              draggable
            />
          </MapView>

          <View
            style={tailwind(
              'absolute opacity-80 bottom-32 items-center w-full',
            )}>
            <TouchableHighlight
              onPress={() => {}}
              style={tailwind(
                'mt-6 bg-white  w-1/2 px-5 py-3 rounded-full items-center',
              )}>
              <Text style={{color: 'black'}}>Absen</Text>
            </TouchableHighlight>
          </View>
        </View>
      ) : (
        <Text>loading</Text>
      )}
    </React.Fragment>
  );
};
let {width, height} = Dimensions.get('window');
const style = StyleSheet.create({
  mapContainer: {
    justifyContent: 'center',
    height: height,
  },
});
