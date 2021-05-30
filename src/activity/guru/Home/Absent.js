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
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {create} from 'tailwind-rn';

import Maps from '../../../components/Maps';

import {
  getHoursMinutes,
  getStatus,
  getBackground,
} from '../../../helper/helper';
import {getTimeNow} from '../../../helper/helper';
import styles from '../../../../styles.json';
import {instance, authCheck} from '../../../helper/instance';
import {JAM_PELAJARAN} from '../../../config/config';
const {tailwind, getColor} = create(styles);
const {width, height} = Dimensions.get('window');

const Absent = ({navigation, route}) => {
  const absent = route.params.absent[0];
  const {NISN, nama, kelas, total, mapel} = route.params;
  const {lat, long} = JSON.parse(absent.lokasi);
  const [spinner, setSpiner] = useState(true);
  const [loading, setLoading] = useState(false);
  const [paddingTop, setPaddingTop] = useState(1);
  const [zIndexMap, setZIndexMap] = useState(1);
  const [coord, setCoord] = useState({
    latitude: lat,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
    longitude: long,
  });
  useEffect(() => {
    setSpiner(true);
    setLoading(true);
    setCoord({...coord, latitude: lat, longitude: long});
    setSpiner(false);
    setLoading(false);
  }, []);

  return (
    <SafeAreaView>
      <Spinner
        visible={spinner}
        textContent={'Sedang memuat...'}
        textStyle={{color: '#FFF'}}
      />
      {!spinner && absent.id && (
        <View style={{backgroundColor: 'white', height: height}}>
          <View style={{paddingTop: paddingTop}}>
            {!loading && (
              <Maps
                style={{...style.mapContainer, zIndex: zIndexMap}}
                coord={coord}
                setPaddingTop={setPaddingTop}
              />
            )}
            <View style={style.cardContainer}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={({nativeEvent}) => {
                  if (nativeEvent.contentOffset.y === 0) setZIndexMap(1);
                  else setZIndexMap(0);
                }}>
                <View style={style.card}>
                  <View>
                    <Text style={style.label}>NISN</Text>
                    <Text style={style.value}>{NISN}</Text>
                  </View>
                  <View>
                    <Text style={style.label}>Nama</Text>
                    <Text style={style.value}>{nama}</Text>
                  </View>
                  <View>
                    <Text style={style.label}>Kelas</Text>
                    <Text style={style.value}>{kelas.name}</Text>
                  </View>
                  <View>
                    <Text style={style.label}>Mapel</Text>
                    <Text style={style.value}>{mapel.name}</Text>
                  </View>
                  <View>
                    <Text style={style.label}>Jam Pelajaran</Text>
                    <Text style={style.value}>
                      {getHoursMinutes(absent.schedule.waktu)} -{' '}
                      {getHoursMinutes(
                        absent.schedule.waktu,
                        total * JAM_PELAJARAN,
                      )}
                    </Text>
                  </View>
                  <View>
                    <Text style={style.label}>Jam Absen</Text>
                    <Text style={style.value}>
                      {getHoursMinutes(absent.waktu)}
                    </Text>
                  </View>
                  <View>
                    <Text style={style.label}>Status</Text>
                    <Text
                      style={{
                        ...style.value,
                        color: getBackground(
                          getStatus(absent.schedule.waktu, absent),
                        ),
                      }}>
                      {getStatus(absent.schedule.waktu, absent)}
                    </Text>
                  </View>
                  {absent.keterangan && (
                    <View>
                      <Text style={style.label}>Keterangan</Text>
                      <Text style={style.value}>{absent.keterangan}</Text>
                    </View>
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

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    position: 'absolute',
    width: width,
    height: height / 3,
  },
  cardContainer: {
    height: height,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  card: {
    alignSelf: 'center',
    width: '100%',
    elevation: 4,
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 150,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: height / 3,
    zIndex: 1,
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

export default Absent;
