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
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import MapView, {Geojson, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import styles from '../../styles.json';
import {create} from 'tailwind-rn';
const {tailwind, getColor} = create(styles);
const Maps = ({navigation: {dangerouslyGetParent}, navigation, route}) => {
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
      'Sedang mengambil lokasi, Tunggu samapai akurat',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      30,
      50,
    );
    const watchId = Geolocation.watchPosition(
      position => {
        setCoord({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          longitudeDelta: 0.0009,
          latitudeDelta: 0.0009,
        });
        setLoading(false);
      },
      error => {
        Alert.alert('Error', error.message);
      },
      {
        enableHighAccuracy: true,
        interval: 2000,
        timeout: 10000,
        fastestInterval: 1000,
        distanceFilter: 2,
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);
  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={route.params.color}
        barStyle="light-content"
      />
      {!loading && (
        <View style={{backgroundColor: 'white', height: height}}>
          <View style={{paddingTop: paddingTop}}>
            <MapView
              style={style.mapContainer}
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
            <View style={style.cardContainer}>
              <ScrollView>
                <View style={style.card}>
                  <View>
                    <Text style={style.title}>Detail Kelas</Text>
                    <View style={style.line} />
                  </View>
                  <View>
                    <Text style={style.label}>Mata Pelajaran</Text>
                    <Text style={style.value}>{route.params.mapel.name}</Text>
                  </View>
                  <View>
                    <Text style={style.label}>Guru Pengajar</Text>
                    <Text style={style.value}>{route.params.teacher.name}</Text>
                  </View>
                  <View>
                    <Text style={style.label}>Jam Pelajaran</Text>
                    <Text style={style.value}>{route.params.time}</Text>
                  </View>
                  <View>
                    <Text style={style.label}>Status</Text>
                    <Text
                      style={{
                        ...style.value,
                        color: route.params.color,
                      }}>
                      {route.params.status}
                    </Text>
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
        </View>
      )}
      {loading && (
        <View
          style={{
            position: 'absolute',
            flex: 1,
            top: 0,
            left: 0,
            width: width,
            height: height,
            backgroundColor: '#fff',
            opacity: 0.7,
          }}></View>
      )}
    </SafeAreaView>
  );
};
let {width, height} = Dimensions.get('window');
const style = StyleSheet.create({
  mapContainer: {
    position: 'absolute',
    width: width,
    height: height / 2.5,
  },
  cardContainer: {
    height: height,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  card: {
    alignSelf: 'center',
    width: '100%',
    elevation: 4,
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 90,
    paddingHorizontal: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: height / 3,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: getColor('gray-800'),
    marginBottom: 5,
  },
  line: {
    alignSelf: 'center',
    width: 70,
    height: 4,
    backgroundColor: getColor('gray-200'),
  },
  label: {
    fontSize: 16,
    fontWeight: '100',
    color: getColor('gray-400'),
    marginTop: 20,
  },
  value: {
    fontSize: 16,
    color: getColor('gray-700'),

    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default Maps;
