import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  TouchableHighlightBase,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Spinner from 'react-native-loading-spinner-overlay';
import {create} from 'tailwind-rn';

import {useFocusEffect} from '@react-navigation/core';

import {JAM_PELAJARAN} from '../../../config/config';
import {instance, authCheck} from '../../../helper/instance';
import {
  getBackground,
  getStatus,
  getHoursMinutes,
} from '../../../helper/helper';
import styles from '../../../../styles.json';

const {getColor, tailwind} = create(styles);
const {height, width} = Dimensions.get('window');

const Detail = ({navigation: {dangerouslyGetParent}, navigation, route}) => {
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
  const convertDate = () => {
    const {date} = route.params;
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  };
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState({
    'Sudah Absen': 0,
    Terlambat: 0,
    'Tidak Absen': 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getStudent();
    });
    return unsubscribe;
  }, []);

  const getStudent = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const {id} = route.params.data;
      const id_kelas = route.params.data.class.id;
      instance(token)
        .get(`/guru/get-absent-student-list/${id_kelas}/${id}/${convertDate()}`)
        .then(res => {
          authCheck(res.data.code, navigation);
          setStudents(res.data.data);
          getCount(res.data.data);
          setLoading(false);
        })
        .catch(err => {
          authCheck(err?.response?.status, navigation);
          setLoading(false);
          console.log(err);
          Alert.alert('Error', 'Kesalahanan saat mengambil data');
        });
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Kesalahanan saat mengambil data');
    }
  };

  const getCount = data => {
    const temp = {
      'Sudah Absen': 0,
      Terlambat: 0,
      'Tidak Absen': 0,
    };
    for (let student of data) {
      temp[checkStatus(student.absent[0])] += 1;
    }
    setCount(temp);
  };

  const checkStatus = data => {
    return getStatus(
      data?.schedule?.waktu || '00:00:00',
      data?.waktu && {
        waktu: data?.waktu,
      },
      route.params.data.total,
    );
  };

  const getJamPelajaran = () => {
    const timeStart = `${getHoursMinutes(route.params.data.time)} (Jam ke-${
      route.params.data.start
    })`;
    const timeEnd = `${getHoursMinutes(
      route.params.data.time,
      JAM_PELAJARAN * (route.params.data.total - 1),
    )} (Jam ke-${route.params.data.end})`;
    return `${timeStart} ${route.params.data.end ? 's/d ' + timeEnd : ''}`;
  };

  const Indicator = () => (
    <View style={style.indicatorContainer}>
      <View style={style.indicatorItem}>
        <View
          style={{
            ...style.bullet,
            borderColor: getColor('ijo'),
          }}
        />
        <Text style={style.indicatorItemNumber}>{count['Sudah Absen']}</Text>
        <Text style={style.indicatorItemText}>Sudah Absen</Text>
      </View>
      <View style={style.indicatorItem}>
        <View
          style={{
            ...style.bullet,
            borderColor: getColor('kuning'),
          }}
        />
        <Text style={style.indicatorItemNumber}>{count['Terlambat']}</Text>
        <Text style={style.indicatorItemText}>Terlambat</Text>
      </View>
      <View style={style.indicatorItem}>
        <View
          style={{
            ...style.bullet,
            borderColor: getColor('abang'),
          }}
        />
        <Text style={style.indicatorItemNumber}>{count['Tidak Absen']}</Text>
        <Text style={style.indicatorItemText}>Tidak Absen</Text>
      </View>
    </View>
  );

  return (
    <View style={style.container}>
      <Spinner
        visible={loading}
        textContent={'Sedang memuat...'}
        textStyle={{color: '#FFF'}}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={{paddingBottom: 90}}>
          <View>
            <Text style={style.detailTitle}>Detail Jam Pelajaran</Text>
            <View style={style.card}>
              <View>
                <Text style={style.label}>KELAS</Text>
                <Text style={style.value}>{route.params.data.class.name}</Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                }}>
                <Text style={style.label}>MATA PELAJARAN</Text>
                <Text style={style.value}>{route.params.data.mapel.name}</Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                }}>
                <Text style={style.label}>JAM PELAJARAN</Text>
                <Text style={style.value}>{getJamPelajaran()}</Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                }}>
                <Text style={style.label}>JUMLAH SISWA</Text>
                <Text style={style.value}>
                  {route?.params?.data?.class?.students[0]?.total || 0}
                </Text>
              </View>
            </View>
          </View>
          <Text style={{...style.listTitle, marginTop: 30}}>Absensi</Text>
          <View style={{...style.card, marginTop: 10}}>
            <Indicator />

            <Text style={style.daftarSiswa}>Daftar Siswa</Text>
            {students.map((student, key) => (
              <TouchableHighlight
                style={style.containerList}
                key={key}
                underlayColor={getColor('gray-100')}
                onPress={() => {
                  if (student?.absent.length > 0)
                    navigation.navigate('Show Absent', {
                      ...student,
                      kelas: route.params.data.class,
                      mapel: route.params.data.mapel,
                      total: route.params.data.total,
                    });
                }}
                activeOpacity={0.9}>
                <>
                  <View>
                    <Text style={style.valueList}>{student.nama}</Text>
                    <Text style={style.labelList}>
                      {student.absent[0]?.waktu
                        ? getHoursMinutes(student.absent[0].waktu)
                        : '-'}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...style.bullet,
                      borderColor: getBackground(
                        checkStatus(student?.absent[0]),
                      ),
                    }}
                  />
                </>
              </TouchableHighlight>
            ))}
            {students.length < 1 && (
              <Text style={style.not_found}>Tidak ada yang absen</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    backgroundColor: '#fff',
    height: height,
  },
  detailTitle: {
    marginTop: 18,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: '700',
    color: getColor('gray-600'),
  },
  card: {
    alignSelf: 'center',
    width: '100%',
    elevation: 1,
    borderWidth: 1,
    borderColor: getColor('gray-100'),
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 6,
  },
  indicatorContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    width: '100%',
    marginVertical: 30,
  },
  indicatorItem: {
    overflow: 'hidden',
    width: (100 - 10) / 3 + '%',
  },
  indicatorItemNumber: {
    textAlign: 'center',
    marginVertical: 6,
    fontSize: 21,
    color: getColor('gray-800'),
    fontWeight: 'bold',
  },
  indicatorItemText: {
    textAlign: 'center',
    fontSize: 14,
    color: getColor('gray-600'),
    flexWrap: 'wrap',
  },
  daftarSiswa: {
    fontSize: 19,
    marginVertical: 10,
    textAlign: 'center',
    color: getColor('gray-400'),
  },

  label: {
    fontSize: 13,
    color: getColor('gray-400'),
  },
  value: {
    fontSize: 15,
    color: getColor('gray-500'),

    fontWeight: 'bold',
  },

  labelList: {
    fontSize: 14,
    color: getColor('gray-400'),
  },
  valueList: {
    fontSize: 16,
    color: getColor('gray-600'),
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: getColor('gray-600'),
    marginVertical: 5,
  },
  line: {
    height: 2,
    marginTop: 18,
    backgroundColor: getColor('gray-100'),
    marginHorizontal: -16,
  },
  containerList: {
    marginHorizontal: -18,
    paddingHorizontal: 18,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bullet: {
    width: 17,
    height: 17,
    borderWidth: 4,
    borderRadius: 17,
    borderColor: getColor('ijo'),
    alignSelf: 'center',
  },
  not_found: {
    fontSize: 20,
    fontWeight: 'bold',

    color: getColor('gray-400'),
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default Detail;
