import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {create} from 'tailwind-rn';

import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

import Header from '../../components/Header';

import styles from '../../../styles.json';
import LineContainer from '../../components/LineContainer';

import {instance, authCheck} from '../../helper/instance';
import {
  getDay,
  getDate,
  convertSchedule,
  getHoursMinutes,
} from '../../helper/helper';
const {width, height} = Dimensions.get('screen');
const {tailwind, getColor} = create(styles);

const ScheduleList = ({navigation, route}) => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        setLoading(true);
        const day = route.params.code;
        const token = await AsyncStorage.getItem('token');
        instance(token)
          .get(`/guru/get-schedule-by-day/${day}`)
          .then(res => {
            authCheck(res.data.code, navigation);
            setSchedule(convertSchedule(res.data.data, true));
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
  const Header = () => (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: getColor('biru'),
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor={getColor('biru')}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={22} color={getColor('white')} />
        </TouchableHighlight>
        <Text
          style={{
            color: getColor('white'),
            marginLeft: 16,
            fontSize: 18,
          }}>
          Jadwal
        </Text>
      </View>
      <Text
        style={{
          marginTop: 33,
          color: getColor('white'),
          fontSize: 22,
        }}>
        {`Jadwal Hari ${route.params.day}`}
      </Text>
    </View>
  );
  return (
    <SafeAreaView>
      <Header />
      <View style={{height: '100%'}}>
        <LineContainer>
          {schedule.map((item, key) => (
            <TouchableHighlight
              key={key}
              underlayColor={getColor('gray-50')}
              onPress={() => {}}
              activeOpacity={0.9}>
              <View style={style.item}>
                <View style={{width: width / 4, alignItems: 'center'}}>
                  <Text style={{fontSize: 14}}>
                    {getHoursMinutes(item.time)}
                  </Text>
                </View>
                <View style={{paddingHorizontal: 28, width: width / 1.6}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: getColor('gray-700'),
                        flexShrink: 1,
                      }}>
                      {item.class.name}
                    </Text>
                  </View>
                  <Text style={{fontSize: 12, color: getColor('gray-400')}}>
                    {item.mapel.name}
                  </Text>
                  <Text style={{fontSize: 12, color: getColor('gray-500')}}>
                    {`(Jam ke-${item.start} ${
                      item.end ? ` s/d jam ke- ${item.end}` : ''
                    })`}
                  </Text>
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
                    borderColor: getColor('biru'),
                  }}
                />
              </View>
            </TouchableHighlight>
          ))}
        </LineContainer>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  item: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    marginRight: 30,
    position: 'relative',
    backgroundColor: 'transparent',
    marginVertical: 16,
  },
});

export default ScheduleList;
