import React, {useEffect, useState, useCallback} from 'react';

import {useFocusEffect} from '@react-navigation/native';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import MapView, {Geojson, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import styles from '../../styles.json';
import {create} from 'tailwind-rn';
const {tailwind, getColor} = create(styles);
const Maps = ({navigation: {dangerouslyGetParent}}) => {
  // to delete bottom bar
  useFocusEffect(
    React.useCallback(() => {
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
  React.useEffect(() => {
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
      error => {
        Alert.alert('Error', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        forceRequestLocation: true,
        distanceFilter: 2,
      },
    );
  }, []);
  return (
    <View style={{backgroundColor: 'white', height: height}}>
      {!loading && (
        <View style={{paddingTop: paddingTop}}>
          <MapView
            style={style.mapContainer}
            initialRegion={coord}
            userLocationPriority="high"
            followUserLocation={true}
            showsUserLocation={false}
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
          <View style={{height: height * (2 / 3) - 80}}>
            <ScrollView>
              <View style={tailwind('px-5')}>
                <View>
                  <View>
                    <Text style={style.label}>Mata Pelajaran</Text>
                    <Text style={style.value}>Matematika</Text>
                  </View>
                  <View>
                    <Text style={style.label}>Guru Pengajar</Text>
                    <Text style={style.value}>Ririn Masita S.Pd</Text>
                  </View>
                  <View>
                    <Text style={style.label}>Jam Pelajaran</Text>
                    <Text style={style.value}>09.15 - 10.00</Text>
                  </View>
                  <View>
                    <Text style={style.label}>Status</Text>
                    <Text style={style.value}>Belum Absen</Text>
                  </View>
                </View>
                <TouchableHighlight
                  activeOpacity={0.8}
                  underlayColor={getColor('biru')}
                  onPress={() => {}}
                  style={tailwind(
                    'mt-6 bg-biru  w-full px-5 py-3 rounded self-center items-center',
                  )}>
                  <Text style={tailwind('text-white text-lg')}>Absen</Text>
                </TouchableHighlight>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};
let {width, height} = Dimensions.get('window');
const style = StyleSheet.create({
  mapContainer: {
    justifyContent: 'center',
    height: height / 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '100',
    color: getColor('gray-400'),
    marginTop: 20,
  },
  value: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 18,
    color: getColor('gray-900'),
    fontWeight: '600',
    marginTop: 5,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: getColor('gray-500'),
  },
});

export default Maps;
