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
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import {getHoursMinutes, getStatus, getBackground} from '../helper/helper';

import styles from '../../styles.json';
import {create} from 'tailwind-rn';

import {getTimeNow} from '../helper/helper';
import {instance, authCheck} from '../helper/instance';
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
  const [absen, setAbsen] = useState({});
  const [loading, setLoading] = useState(true);
  const [paddingTop, setPaddingTop] = useState(1);
  const [spinner, setSpinner] = useState(true);

  const [coord, setCoord] = useState({
    latitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
    longitude: 0,
  });
  useEffect(() => {
    ToastAndroid.showWithGravityAndOffset(
      'Sedang mengambil lokasi, Tunggu sampai akurat',
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
        setSpinner(false);
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

    // setLoading(false);
    return () => Geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getAbsen();
    });

    return unsubscribe;
  }, [navigation]);

  const getAbsen = async () => {
    const {id} = route.params.data;
    try {
      const token = await AsyncStorage.getItem('token');
      instance(token)
        .get(`/siswa/get-absent-by-schedule/${id}`)
        .then(res => {
          authCheck(res.data.code, navigation);
          navigation.setParams({
            color: getBackground(
              getStatus(res.data.data[0].time, res.data.data[0].absented),
            ),
          });
          setAbsen(res.data.data[0]);
        });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const absentHandler = async () => {
    setSpinner(true);
    const post = {
      schedule_id: route.params.data.id,

      absent_time: getTimeNow(),
      location: JSON.stringify({lat: coord.latitude, long: coord.longitude}),
    };

    try {
      const token = await AsyncStorage.getItem('token');
      instance(token)
        .post('/siswa/absent', post)
        .then(res => {
          authCheck(res.data.code, navigation);
          setSpinner(false);
          getAbsen();
        })
        .catch(err => {
          authCheck(err?.response?.status, navigation);
          setSpinner(false);
        });
    } catch (error) {
      Alert.alert('Error', error.message);
      setSpinner(false);
    }
  };

  return (
    <SafeAreaView>
      <Spinner
        visible={spinner}
        textContent={'Sedang memuat...'}
        textStyle={{color: '#FFF'}}
      />
      {!loading && (
        <View style={{backgroundColor: 'white', height: height}}>
          <StatusBar
            backgroundColor={getBackground(
              getStatus(absen?.time, absen?.absented),
            )}
            barStyle="light-content"
          />
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
                    <Text style={style.value}>{absen?.mapel?.name}</Text>
                  </View>
                  <View>
                    <Text style={style.label}>Guru Pengajar</Text>
                    <Text style={style.value}>{absen?.teacher?.name}</Text>
                  </View>
                  <View>
                    <Text style={style.label}>Jam Pelajaran</Text>
                    <Text style={style.value}>
                      {getHoursMinutes(absen?.time)}
                    </Text>
                  </View>
                  <View>
                    <Text style={style.label}>Status</Text>
                    <Text
                      style={{
                        ...style.value,
                        color: getBackground(
                          getStatus(absen?.time, absen?.absented),
                        ),
                      }}>
                      {getStatus(absen?.time, absen.absented)}
                    </Text>
                  </View>
                  {!absen?.absented && (
                    <TouchableHighlight
                      activeOpacity={0.8}
                      underlayColor={getColor('biru')}
                      onPress={absentHandler}
                      style={tailwind(
                        'mt-6 bg-biru  w-full px-5 py-3 rounded self-center items-center',
                      )}>
                      <Text style={tailwind('text-white text-lg')}>Absen</Text>
                    </TouchableHighlight>
                  )}
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
