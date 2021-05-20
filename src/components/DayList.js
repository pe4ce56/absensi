import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  NativeModules,
} from 'react-native';
import {create} from 'tailwind-rn';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../../styles.json';

import {getHoursMinutes} from '../helper/helper';
import {JAM_PELAJARAN} from '../config/config';

const {tailwind, getColor} = create(styles);
const {width, height} = Dimensions.get('window');
const days = [
  {day: 'Senin', time: '07.00 - 12.45', code: 1},
  {day: 'Selasa', time: '06.30 - 12.45', code: 2},
  {day: 'Rabu', time: '06.30 - 12.45', code: 3},
  {day: 'Kamis', time: '06.30 - 12.45', code: 4},
  {day: 'Jumat', time: '06.30 - 12.45', code: 5},
];
const DayList = ({navigate: {navigation, to}, schedule}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: getColor('white'),
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={{paddingBottom: 90, paddingTop: 5, paddingHorizontal: 20}}>
          {days.map((day, key) => (
            <TouchableHighlight
              key={key}
              activeOpacity={0.8}
              underlayColor={getColor('gray-50')}
              onPress={() =>
                navigation.navigate(to, {
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
                    {schedule[day.day]?.length > 0
                      ? getHoursMinutes(schedule[day.day][0].time)
                      : '00.00'}
                    {' - '}
                    {schedule[day.day]?.length > 0
                      ? getHoursMinutes(
                          schedule[day.day][schedule[day.day].length - 1].time,
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
  );
};

export default DayList;
