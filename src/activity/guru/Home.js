import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePicker from '@react-native-community/datetimepicker';
import {create} from 'tailwind-rn';

import Header from '../../components/Header';
import LineContainer from '../../components/LineContainer';

import {instance, authCheck} from '../../helper/instance';
import {
  getDay,
  getDate,
  convertSchedule,
  getHoursMinutes,
} from '../../helper/helper';
import styles from '../../../styles.json';

const {getColor, tailwind} = create(styles);
const {height, width} = Dimensions.get('window');

const Home = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const convertDate = `${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getFullYear()}`;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setDate(new Date());
      await getAbsent();
    });
    return unsubscribe;
  }, []);
  useEffect(async () => {
    await getAbsent();
  }, [date]);

  const getAbsent = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');

      instance(token)
        .get(`/guru/get-absent-schedule/${convertDate}`)
        .then(res => {
          authCheck(res.data.code, navigation);
          setLoading(false);
          setSchedule(convertSchedule(res.data.data, true));
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

  return (
    <View style={{flex: 1}}>
      <Header title={'Absensi Siswa'} />
      <Spinner
        visible={loading}
        textContent={'Sedang memuat...'}
        textStyle={{color: '#FFF'}}
      />
      <View style={style.container}>
        <TouchableHighlight
          onPress={() => setShowDatePicker(true)}
          underlayColor={getColor('gray-100')}
          activeOpacity={0.9}>
          <View style={style.datePickerButton}>
            <Text style={style.date}>
              {getDay(date)}, {getDate(date)}
            </Text>
            <Text style={style.labelDatePicker}>Ubah Tanggal</Text>
          </View>
        </TouchableHighlight>
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
                      (Jam ke {item.start}
                      {item.end ? `s/d Jam ke ${item.end})` : ')'}
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
                      borderColor: getColor('ijo'),
                    }}
                  />
                </View>
              </TouchableHighlight>
            ))}
          </LineContainer>
        </View>
      </View>
      {showDatePicker && (
        <DateTimePicker
          onTouchCancel={() => setShowDatePicker(false)}
          testID="dateTimePicker"
          mode="date"
          onChange={onChange}
          value={date}
          is24Hour={true}
          display="default"
        />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  datePickerButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 0.4,
    borderColor: getColor('gray-500'),
  },
  date: {
    fontSize: 17,
    color: getColor('gray-700'),
  },
  labelDatePicker: {
    fontSize: 14,
    color: getColor('gray-500'),
  },
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
export default Home;
