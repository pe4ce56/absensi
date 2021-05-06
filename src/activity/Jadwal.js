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
  const [toggleJadwal, setToggleJadwal] = useState({
    senin: false,
    selasa: false,
    rabu: false,
    kamis: false,
    jumat: false,
  });

  //   to handle toggle on click
  const handleToggle = day => {
    LayoutAnimation.easeInEaseOut();
    //   set all toggle to false
    let toggleFalse = Object.assign(
      ...Object.keys(toggleJadwal).map(k => {
        return {[k.toLocaleLowerCase]: false};
      }),
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
          width: '100%',
          height: '100%',
          flex: 1,
          backgroundColor: getColor('white'),
        }}>
        <ScrollView>
          <View
            style={{paddingBottom: 40, paddingTop: 5, paddingHorizontal: 20}}>
            {days.map((day, key) => (
              // <TouchableHighlight
              //   activeOpacity={0.8}
              //   underlayColor={getColor('gray-50')}
              //   onPress={() => navigation.navigate('ListJadwal')}>
              //   <View
              //     key={key}
              //     style={{
              //       display: 'flex',
              //       flexDirection: 'row',
              //       alignItems: 'center',
              //       justifyContent: 'space-between',
              //       width: '100%',
              //       borderBottomWidth: 1,
              //       paddingVertical: 25,
              //       borderColor: getColor('gray-300'),
              //     }}>
              //     <View>
              //       <Text style={{fontSize: 23, color: getColor('gray-600')}}>
              //         {day.day}
              //       </Text>
              //       <Text style={{fontSize: 14, color: getColor('gray-400')}}>
              //         {day.time}
              //       </Text>
              //     </View>
              //     <Icon
              //       name="chevron-forward-outline"
              //       size={21}
              //       color={getColor('gray-400')}
              //     />
              //   </View>
              // </TouchableHighlight>
              // hidden the shadow top left
              <View style={tailwind('mt-2 overflow-hidden  pb-2')} key={key}>
                <TouchableHighlight
                  activeOpacity={0.8}
                  underlayColor={getColor('biru')}
                  style={tailwind('rounded-lg ')}
                  onPress={() => handleToggle(day.day)}
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
                            {day.day}
                          </Text>
                        </View>
                        <View>
                          <Icon
                            name={
                              toggleJadwal[day.day]
                                ? 'chevron-up-outline'
                                : 'chevron-down-outline'
                            }
                            size={21}
                          />
                        </View>
                      </View>
                    </View>
                    {toggleJadwal[day.day] && <Items />}
                  </View>
                </TouchableHighlight>
              </View>
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
