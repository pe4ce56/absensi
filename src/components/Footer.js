import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {create, getColor} from 'tailwind-rn';

import styles from '../../styles.json';
const {tailwind} = create(styles);

export default () => {
  return (
    <View
      style={tailwind(
        'absolute bottom-0 flex flex-row justify-around w-full bg-white  ',
      )}>
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor={getColor('gray-100')}
        onPress={() => console.log(' testr')}
        style={tailwind('p-2 px-4')}>
        <View style={tailwind('items-center ')}>
          <Icon name="home-outline" size={20} color={getColor('gray-500')} />
          <Text style={{marginTop: 5, marginBottom: 3, fontSize: 12}}>
            Home
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor={getColor('gray-100')}
        onPress={() => console.log(' testr')}
        style={tailwind('p-2 px-4')}>
        <View style={tailwind('items-center ')}>
          <Icon name="time-outline" size={20} color={getColor('gray-500')} />
          <Text
            style={{
              marginTop: 5,
              marginBottom: 3,
              fontSize: 12,
              textAlign: 'center',
            }}>
            Jadwal
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};
