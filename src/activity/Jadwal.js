import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Alert,
  NativeModules,
} from 'react-native';
import {create} from 'tailwind-rn';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import Header from '../components/Header';
import styles from '../../styles.json';
import {instance, authCheck} from '../helper/instance';
import {getHoursMinutes} from '../helper/helper';
import {JAM_PELAJARAN} from '../config/config';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const {tailwind, getColor} = create(styles);
const {width, height} = Dimensions.get('window');

const days = [
  {day: 'Senin', time: '07.00 - 12.45', code: 1},
  {day: 'Selasa', time: '06.30 - 12.45', code: 2},
  {day: 'Rabu', time: '06.30 - 12.45', code: 3},
  {day: 'Kamis', time: '06.30 - 12.45', code: 4},
  {day: 'Jumat', time: '06.30 - 12.45', code: 5},
];
const Jadwal = ({navigation}) => {
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        instance(token)
          .get('/siswa/get-schedule')
          .then(res => {
            authCheck(res.data.code, navigation);
            setSchedule(res.data.data);
            setLoading(false);
          })
          .catch(error => {
            authCheck(error?.response?.status, navigation);
            setLoading(false);
            Alert.alert('Error', 'Kesalahanan saat mengambil data');
          });
      } catch (error) {
        setLoading(false);

        Alert.alert('Error', 'Kesalahanan saat mengambil data');
      }
    });
    return unsubscribe;
  }, []);
  return (
    <React.Fragment>
      <Header title="Jadwal Pelajaran" />
      <Spinner
        visible={loading}
        textContent={'Sedang memuat...'}
        textStyle={{color: '#FFF'}}
      />
      {!loading && (
        <View
          style={{
            width: '100%',
            height: '100%',
            flex: 1,
            backgroundColor: getColor('white'),
          }}>
          <ScrollView>
            <View
              style={{paddingBottom: 40, paddingTop: 5, paddingHorizontal: 20}}>
              {days.map((day, key) => (
                <TouchableHighlight
                  key={key}
                  activeOpacity={0.8}
                  underlayColor={getColor('gray-50')}
                  onPress={() =>
                    navigation.navigate('List Jadwal Siswa', {
                      day: day.day,
                      code: day.code,
                    })
                  }>
                  <View
                    key={key}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      borderBottomWidth: 1,
                      paddingVertical: 25,
                      borderColor: getColor('gray-300'),
                    }}>
                    <View>
                      <Text style={{fontSize: 18, color: getColor('gray-800')}}>
                        {day.day}
                      </Text>
                      <Text style={{fontSize: 12, color: getColor('gray-400')}}>
                        {schedule[day.day].length > 0
                          ? getHoursMinutes(schedule[day.day][0].time)
                          : '00.00'}
                        {' - '}
                        {schedule[day.day].length > 0
                          ? getHoursMinutes(
                              schedule[day.day][schedule[day.day].length - 1]
                                .time,
                              JAM_PELAJARAN,
                            )
                          : '00.00'}
                      </Text>
                    </View>
                    <Icon
                      name="chevron-forward-outline"
                      size={20}
                      color={getColor('gray-700')}
                    />
                  </View>
                </TouchableHighlight>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </React.Fragment>
  );
};

const style = StyleSheet.create({
  shadow: {
    elevation: 2,
  },
});

export default Jadwal;
