import React, {useRef, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Animated,
  Dimensions,
  LayoutAnimation,
  NativeModules,
} from 'react-native';
import {create} from 'tailwind-rn';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../components/Header';

import styles from '../../styles.json';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
const {tailwind, getColor} = create(styles);
const {width, height} = Dimensions.get('window');
const days = [
  {day: 'Senin', time: '07.00 - 12.45'},
  {day: 'Selasa', time: '06.30 - 12.45'},
  {day: 'Rabu', time: '06.30 - 12.45'},
  {day: 'Kamis', time: '06.30 - 12.45'},
  {day: 'Jumat', time: '06.30 - 12.45'},
];
const Jadwal = ({navigation}) => {
  return (
    <React.Fragment>
      <Header />
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
                activeOpacity={0.8}
                underlayColor={getColor('gray-50')}
                onPress={() =>
                  navigation.navigate('ListJadwal', {day: day.day})
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
                      {day.time}
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
    </React.Fragment>
  );
};

const style = StyleSheet.create({
  shadow: {
    elevation: 2,
  },
});

export default Jadwal;
