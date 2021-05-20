import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Dimensions,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePicker from '@react-native-community/datetimepicker';
import {create} from 'tailwind-rn';

import Header from '../../../components/Header';
import LineContainer from '../../../components/LineContainer';
import {useFocusEffect} from '@react-navigation/core';

import {JAM_PELAJARAN} from '../../../config/config';
import {instance, authCheck} from '../../../helper/instance';
import {
  getDay,
  getDate,
  convertSchedule,
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
  return (
    <View style={style.container}>
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
            </View>
          </View>
          <View style={{...style.card, marginTop: 30}}>
            <Text style={style.listTitle}>Daftar Absen</Text>
            <View style={style.line} />
            {[1, 2, 3, 4, 5, 6, 76].map(() => (
              <View style={style.containerList}>
                <View>
                  <Text style={style.valueList}>Micheal</Text>
                  <Text style={style.labelList}>00.68</Text>
                </View>
                <View style={style.bullet} />
              </View>
            ))}
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
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  bullet: {
    width: 17,
    height: 17,
    borderWidth: 4,
    borderRadius: 17,
    borderColor: getColor('ijo'),
    alignSelf: 'center',
  },
});

export default Detail;
