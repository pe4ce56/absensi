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

import Icon from 'react-native-vector-icons/Ionicons';
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
      mapel: 'Bahasa Jawa',
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
          backgroundColor: getColor('white'),
          flex: 1,
          height: '100%',
        }}>
        <View
          style={{
            ...tailwind('border-l-2 border-gray-300 '),
            backgroundColor: getColor('white'),
            position: 'absolute',
            left: width / 4,
            width: '100%',
            height: '100%',
            top: 0,
            zIndex: 0,
          }}
        />
        <ScrollView>
          <View style={{paddingBottom: 90, paddingTop: 10}}>
            {absen.map((data, key) => (
              <TouchableHighlight
                key={key}
                // underlayColor={getBackground(data.status)}
                underlayColor={getColor('gray-50')}
                onPress={() =>
                  navigation.navigate('Absensi', {
                    ...data,
                    color: getBackground(data.status),
                  })
                }
                activeOpacity={0.9}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginRight: 30,
                    position: 'relative',
                    backgroundColor: 'transparent',
                    marginTop: 15,
                    marginBottom: 15,
                  }}>
                  <View style={{width: width / 4, alignItems: 'center'}}>
                    <Text style={{fontSize: 14}}>{data.waktu}</Text>
                  </View>
                  <View style={tailwind('px-7')}>
                    <Text style={{fontSize: 16, color: getColor('gray-700')}}>
                      {data.mapel}
                    </Text>
                    <Text style={{fontSize: 13, color: getColor('gray-400')}}>
                      {data.guru}
                    </Text>
                    <Text style={{fontSize: 13, color: getColor('gray-500')}}>
                      (Jam ke-1 s/d jam ke-2)
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      name="chevron-forward-outline"
                      size={20}
                      color={getColor('gray-600')}
                    />
                  </View>
                  <View
                    style={{
                      ...tailwind(' rounded-full bg-white  '),
                      position: 'absolute',
                      left: width / 4 - 5.8,
                      top: 3,
                      width: 15,
                      height: 15,
                      borderWidth: 4,
                      borderColor: getBackground(data.status),
                    }}
                  />
                </View>
                {/* <View
                    style={tailwind('overflow-hidden  pb-2 mt-2')}
                    key={key}>
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
                   */}
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
