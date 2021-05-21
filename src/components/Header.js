import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {create} from 'tailwind-rn';

import {getDay} from '../helper/helper';
import styles from '../../styles.json';
const {tailwind, getColor} = create(styles);
let {width, height} = Dimensions.get('screen');
export default ({title}) => {
  return (
    <View
      style={{
        ...tailwind(' px-5 py-5 w-full  bg-biru relative'),
        height: 150,
      }}>
      <StatusBar backgroundColor={getColor('biru')} barStyle="light-content" />
      <View style={tailwind('flex flex-row justify-between ')}>
        <View>
          <Text style={{fontSize: 18, color: '#fff'}}>{getDay()}</Text>
          <Text
            style={{
              fontSize: 15,
              color: '#fff',
              marginTop: -2,
            }}>
            {new Date().toLocaleDateString()}
          </Text>
        </View>
        <View>
          <Image
            style={tailwind('h-12 w-12 rounded-full ')}
            source={{
              uri: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
            }}
          />
        </View>
      </View>
      <View style={tailwind('absolute bottom-5 left-5 ')}>
        <Text style={{fontSize: 24, color: '#fff'}}>{title}</Text>
      </View>
    </View>
  );
};
