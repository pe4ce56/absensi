import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  TouchableHighlightBase,
} from 'react-native';
import styles from '../../styles.json';
import {create} from 'tailwind-rn';
import Header from '../components/Header';

const {tailwind, getColor} = create(styles);
let {width, height} = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [absen, setAbsen] = useState([
    {
      mapel: 'Pendidikan Agama Islam',
      guru: 'Supardi,S.Pd MM',
      waktu: '07.05',
      status: 'Sudah Absen',
    },
    {
      mapel: 'Bahasa Indonesia',
      guru: 'Supardi',
      waktu: '07.05',
      status: 'Terlambat',
    },
    {
      mapel: 'Bahasa Inggris',
      guru: 'Supardi',
      waktu: '07.05',
      status: 'Tidak Absen',
    },
    {
      mapel: 'Bahasa Inggris',
      guru: 'Supardi',
      waktu: '07.05',
      status: 'Belum Absen',
    },
    {
      mapel: 'Bahasa jAWA',
      guru: 'Supardi',
      waktu: '07.05',
      status: 'Belum Mulai',
    },
    {
      mapel: 'Bahasa jAWA',
      guru: 'Supardi',
      waktu: '07.05',
      status: 'Belum Mulai',
    },
    {
      mapel: 'Bahasa jAWA',
      guru: 'Supardi',
      waktu: '07.05',
      status: 'Belum Mulai',
    },
    {
      mapel: 'Bahasa jAWA',
      guru: 'Supardi',
      waktu: '07.05',
      status: 'Belum Mulai',
    },
    {
      mapel: 'Bahasa jAWA',
      guru: 'Supardi',
      waktu: '07.05',
      status: 'Belum Mulai',
    },
    {
      mapel: 'Bahasa jAWA',
      guru: 'Supardi',
      waktu: '07.05',
      status: 'Belum Mulai',
    },
  ]);
  const getBackground = status => {
    switch (status) {
      case 'Sudah Absen':
        return getColor('ijo');
      case 'Terlambat':
        return getColor('kuning');
      case 'Tidak Absen':
        return getColor('abang');
      case 'Belum Absen':
        return getColor('biru');
      case 'Belum Mulai':
        return getColor('abu');
    }
  };
  return (
    <View style={{alignItems: 'center', flex: 1}}>
      <Header />
      <View
        style={{
          width: '100%',
          backgroundColor: getColor('gray-50'),
          borderTopRightRadius: 40,
          flex: 1,
          position: 'absolute',
          top: 100,
          height: '100%',
        }}>
        <Text style={tailwind('text-2xl text-gray-700 my-4 px-4')}>
          Absensi hari ini
        </Text>
        <View
          style={{
            height: height - 250,
            paddingHorizontal: 16,
          }}>
          <ScrollView>
            <View style={{paddingBottom: 90}}>
              {absen.map((data, key) => (
                <View style={tailwind('overflow-hidden  pb-2 mt-2')} key={key}>
                  <TouchableHighlight
                    underlayColor={getBackground(data.status)}
                    onPress={() =>
                      navigation.navigate('Absensi', {
                        ...data,
                        color: getBackground(data.status),
                      })
                    }
                    activeOpacity={0.9}
                    style={{
                      ...tailwind('rounded-lg '),
                      backgroundColor: getBackground(data.status),
                      paddingLeft: 5,
                    }}>
                    <View
                      style={{
                        ...tailwind(
                          'flex flex-row justify-between items-center rounded-lg px-4 py-3 bg-white',
                        ),
                        elevation: 2,
                      }}>
                      <View>
                        <Text style={tailwind('text-tiny text-gray-500')}>
                          {data.mapel}
                        </Text>
                        <Text style={tailwind('text-xs text-gray-400')}>
                          {data.guru}
                        </Text>
                      </View>
                      <View>
                        <Text style={tailwind('text-xs text-gray-700')}>
                          {data.waktu}
                        </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Home;
