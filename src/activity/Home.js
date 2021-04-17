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
let {width, height} = Dimensions.get('window');
console.log(height);

const Home = ({navigation}) => {
  const [absen, setAbsen] = useState([
    {
      mapel: 'Pendidikan Agama Islam',
      guru: 'Supardi,S.Pd MM',
      waktu: '07.05',
      status: 'absented',
    },
    {
      mapel: 'Bahasa Indonesia',
      guru: 'Supardi',
      waktu: '07.05',
      status: 'late',
    },
    {
      mapel: 'Bahasa Inggris',
      guru: 'Supardi',
      waktu: '07.05',
      status: 'not absent',
    },
    {
      mapel: 'Bahasa Inggris',
      guru: 'Supardi',
      waktu: '07.05',
      status: 'active',
    },
    {mapel: 'Bahasa jAWA', guru: 'Supardi', waktu: '07.05', status: 'ongoing'},
    {mapel: 'Bahasa jAWA', guru: 'Supardi', waktu: '07.05', status: 'ongoing'},
    {mapel: 'Bahasa jAWA', guru: 'Supardi', waktu: '07.05', status: 'ongoing'},
    {mapel: 'Bahasa jAWA', guru: 'Supardi', waktu: '07.05', status: 'ongoing'},
    {mapel: 'Bahasa jAWA', guru: 'Supardi', waktu: '07.05', status: 'ongoing'},
    {mapel: 'Bahasa jAWA', guru: 'Supardi', waktu: '07.05', status: 'ongoing'},
  ]);
  const getBackground = status => {
    switch (status) {
      case 'absented':
        return getColor('ijo');
      case 'late':
        return getColor('kuning');
      case 'not absent':
        return getColor('abang');
      case 'active':
        return getColor('biru');
      case 'ongoing':
        return getColor('abu');
    }
  };
  return (
    <View style={{alignItems: 'center', flex: 1}}>
      <Header />
      <View
        style={{
          width: width,
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
            height: height - 220,
            paddingHorizontal: 16,
          }}>
          <ScrollView>
            <View style={{paddingBottom: 40}}>
              {absen.map((data, key) => (
                <View style={tailwind('overflow-hidden  pb-2 mt-2')} key={key}>
                  <TouchableHighlight
                    underlayColor={getBackground(data.status)}
                    onPress={() => navigation.navigate('Absensi')}
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
