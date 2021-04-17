import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {create} from 'tailwind-rn';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../components/Header';

import styles from '../../styles.json';

const {tailwind, getColor} = create(styles);
const {width, height} = Dimensions.get('window');
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
      <View style={tailwind('border-t-2 border-gray-100 mb-3')}>
        {[1, 2, 3, 4, 4, 5, 6, 7, 8].map((data, key) => (
          <View
            style={tailwind('flex flex-row justify-between px-3')}
            key={key}>
            <Text
              style={{
                ...tailwind(' text-gray-500 mt-2'),
                fontSize: 15,
              }}>
              Agama
            </Text>
            <Text style={{...tailwind(' text-gray-500 mt-2'), fontSize: 15}}>
              07.00
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <React.Fragment>
      <Header />
      <View
        style={{
          width: width,
          backgroundColor: getColor('gray-50'),
          borderTopRightRadius: 40,
          flex: 1,
          position: 'absolute',
          top: 100,
          height: height - 100,
        }}>
        <Text style={tailwind('text-2xl text-gray-600 my-4  px-4')}>
          Jadwal Pelajaran
        </Text>
        <View
          style={{
            height: height - 220,
            paddingHorizontal: 16,
          }}>
          <ScrollView>
            <View style={{paddingBottom: 40}}>
              {days.map((day, key) => (
                // hidden the shadow top left
                <View style={tailwind('mt-2 overflow-hidden  pb-2')} key={key}>
                  <TouchableHighlight
                    activeOpacity={0.8}
                    underlayColor={getColor('biru')}
                    style={tailwind('rounded-lg ')}
                    onPress={() => handleToggle(day)}
                    style={{
                      ...tailwind('rounded-lg '),
                      backgroundColor: getColor('biru'),
                      paddingLeft: 5,
                    }}>
                    {/* Container */}
                    <View
                      style={{
                        ...tailwind(' rounded-lg bg-white px-2'),
                        ...style.shadow,
                      }}>
                      <View style={tailwind(' px-2 py-3  border-gray-100')}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <Text
                              style={tailwind(
                                'text-base text-gray-600 capitalize',
                              )}>
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
                      </View>
                      {toggleJadwal[day] && <Items />}
                    </View>
                  </TouchableHighlight>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
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
