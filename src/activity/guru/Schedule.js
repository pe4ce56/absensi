import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Alert} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

import Header from '../../components/Header';
import DayList from '../../components/DayList';

import {instance, authCheck} from '../../helper/instance';

const Schedule = ({navigation}) => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        instance(token)
          .get('/guru/get-schedule')
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
    <SafeAreaView>
      <Header title="Jadwal Mengajar" />
      <Spinner
        visible={loading}
        textContent={'Sedang memuat...'}
        textStyle={{color: '#FFF'}}
      />
      <View style={{height: '100%'}}>
        <DayList
          navigate={{navigation, to: 'Teacher Schedule List'}}
          schedule={schedule}
        />
      </View>
    </SafeAreaView>
  );
};

export default Schedule;
