import React from 'react';
import {useEffect, useState, useCallback} from 'react/cjs/react.development';
import {useFocusEffect} from '@react-navigation/native';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ToastAndroid,
} from 'react-native';
import MapView, {Geojson, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import styles from '../../styles.json';
import {create} from 'tailwind-rn';
const {tailwind} = create(styles);
const Maps = ({navigation: {dangerouslyGetParent}}) => {
  // to delete bottom bar
  useFocusEffect(
    useCallback(() => {
      const parent = dangerouslyGetParent();
      if (parent) {
        parent.setOptions({
          tabBarVisible: false,
        });
      }

      return () => {
        if (parent) {
          parent.setOptions({
            tabBarVisible: true,
          });
        }
      };
    }, [dangerouslyGetParent]),
  );

  const [loading, setLoading] = useState(true);
  const [paddingTop, setPaddingTop] = useState(1);

  const [coord, setCoord] = useState({
    latitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
    longitude: 0,
  });
  useEffect(() => {
    ToastAndroid.showWithGravityAndOffset(
      'Sedang Mengambil lokasi',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      30,
      50,
    );
    Geolocation.getCurrentPosition(
      position => {
        setCoord({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          longitudeDelta: 0.005,
          latitudeDelta: 0.005,
        });
        setLoading(false);
      },
      error => {},
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        forceRequestLocation: true,
      },
    );
  }, []);
  return (
    <React.Fragment>
      {!loading && (
        <View style={{paddingTop: paddingTop}}>
          <MapView
            style={style.mapContainer}
            initialRegion={coord}
            userLocationPriority="balanced"
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
              draggable={false}
            />
          </MapView>

          <View style={tailwind(' items-center w-full h-full bg-white')}>
            <View></View>
            <TouchableHighlight
              onPress={() => {}}
              style={tailwind(
                'mt-6 bg-blue-500   w-3/4 px-5 py-3 rounded items-center',
              )}>
              <Text style={tailwind('text-white font-bold')}>Absen</Text>
            </TouchableHighlight>
          </View>
        </View>
      )}
    </React.Fragment>
  );
};
let {width, height} = Dimensions.get('window');
const style = StyleSheet.create({
  mapContainer: {
    justifyContent: 'center',
    height: height / 1.42,
  },
});

export default Maps;
