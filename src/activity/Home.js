import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import {create} from 'tailwind-rn';

import styles from '../../styles.json';
import Header from '../components/Header';
import {
  getHoursMinutes,
  getStatus,
  getBackground,
  convertSchedule,
} from '../helper/helper';
import {instance, authCheck} from '../helper/instance';

const {tailwind, getColor} = create(styles);
let {width, height} = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [absents, setAbsents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        instance(token)
          .get('/siswa/absent')
          .then(res => {
            authCheck(res.data.code, navigation);

            setLoading(false);
            setAbsents(convertSchedule(res.data.data));
          })
          .catch(err => {
            authCheck(err?.response?.status, navigation);
            Alert.alert('Error', 'Kesalahanan saat mengambil data');
            setLoading(false);
          });
      } catch (error) {
        Alert.alert('Error', 'Kesalahanan saat mengambil data');
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{alignItems: 'center', flex: 1}}>
      <Header title="Absensi Hari Ini" />
      <Spinner
        visible={loading}
        textContent={'Sedang memuat...'}
        textStyle={{color: '#FFF'}}
      />
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
            {absents.map((absent, key) => (
              <TouchableHighlight
                key={key}
                underlayColor={getBackground(
                  getStatus(absent.time, absent.absented),
                )}
                underlayColor={getColor('gray-50')}
                onPress={() =>
                  navigation.navigate('Absensi Siswa', {
                    data: {...absent},
                    status: getStatus(absent.time, absent.absented),
                    color: getBackground(
                      getStatus(absent.time, absent.absented),
                    ),
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
                    marginVertical: 16,
                  }}>
                  <View style={{width: width / 4, alignItems: 'center'}}>
                    <Text style={{fontSize: 14}}>
                      {getHoursMinutes(absent.time)}
                    </Text>
                  </View>
                  <View style={tailwind('px-7')}>
                    <Text style={{fontSize: 16, color: getColor('gray-800')}}>
                      {absent.mapel.name}
                    </Text>
                    <Text style={{fontSize: 12, color: getColor('gray-400')}}>
                      {absent.teacher.name}
                    </Text>
                    <Text style={{fontSize: 12, color: getColor('gray-500')}}>
                      {`(Jam ke-${absent.start} ${
                        absent.end ? ` s/d jam ke- ${absent.end}` : ''
                      })`}
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
                      borderColor: getBackground(
                        getStatus(absent.time, absent.absented, absent.total),
                      ),
                    }}
                  />
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
