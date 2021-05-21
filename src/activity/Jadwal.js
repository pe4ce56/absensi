import React, {useEffect, useState} from 'react';
import {Alert, NativeModules} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import Header from '../components/Header';
import DayList from '../components/DayList';
import {instance, authCheck} from '../helper/instance';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

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
            console.log(error);
            Alert.alert('Error', 'Kesalahanan saat mengambil data');
          });
      } catch (error) {
        setLoading(false);

        console.log(error);
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
      {!loading && schedule && (
        <DayList
          navigate={{navigation, to: 'List Jadwal Siswa'}}
          schedule={schedule}
        />
      )}
    </React.Fragment>
  );
};

export default Jadwal;
