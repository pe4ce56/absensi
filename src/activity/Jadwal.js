import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {create} from 'tailwind-rn';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../components/Header';

import styles from '../../styles.json';
const {tailwind} = create(styles);
const days = ['senin', 'selasa', 'rabu', 'kamis', 'jumat'];
const Jadwal = () => {
  const [toggleJadwal, setToggleJadwal] = useState({
    senin: false,
    selasa: false,
    rabu: false,
    kamis: false,
    jumat: false,
  });

  //   to handle toggle on click
  const handleToggle = day => {
    //   set all toggle to false
    let toggleFalse = Object.assign(
      ...Object.keys(toggleJadwal).map(k => ({[k]: false})),
    );

    setToggleJadwal({...toggleFalse, [day]: toggleJadwal[day] ? false : true});
  };

  const Items = () => {
    return (
      <View style={tailwind('px-6')}>
        <View style={tailwind('flex flex-row justify-between ')}>
          <Text style={tailwind('text-base text-gray-500 mt-2')}>Agama</Text>
          <Text style={tailwind('text-base text-gray-500 mt-2')}>07.00</Text>
        </View>
        <View style={tailwind('flex flex-row justify-between ')}>
          <Text style={tailwind('text-base text-gray-500 mt-2')}>
            Bahasa Indonesia
          </Text>
          <Text style={tailwind('text-base text-gray-500 mt-2')}>08.00</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={tailwind('bg-white')}>
      <Header />
      <Text style={tailwind('text-2xl text-gray-600 bg-white my-4  px-4')}>
        Jadwal Pelajaran
      </Text>
      <ScrollView
        style={{
          ...tailwind('bg-white h-full px-4'),
          marginBottom: 86,
        }}>
        {days.map((day, key) => (
          <View style={tailwind('mt-2 overflow-hidden  pb-2')}>
            <TouchableHighlight
              activeOpacity={0.8}
              style={tailwind('rounded-lg ')}
              onPress={() => handleToggle(day)}>
              <View
                style={{
                  ...tailwind(
                    'flex flex-row justify-between items-center  border-l-6 border-biru  rounded-lg bg-white px-3 py-4 ',
                  ),
                  ...style.shadow,
                }}>
                <View>
                  <Text style={tailwind('text-xl text-gray-500 capitalize')}>
                    {day}
                  </Text>
                </View>
                <View>
                  <Icon
                    name={
                      toggleJadwal[day]
                        ? 'chevron-up-outline'
                        : 'chevron-down-outline'
                    }
                    size={21}
                  />
                </View>
              </View>
            </TouchableHighlight>
            {toggleJadwal[day] && <Items />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  shadow: {
    elevation: 4,
  },
});

export default Jadwal;
