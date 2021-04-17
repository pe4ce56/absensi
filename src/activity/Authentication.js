import React, {useCallback} from 'react';
import {StyleSheet, Text, TextInput, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {create} from 'tailwind-rn';
import styles from '../../styles.json';
import PasswordInputText from 'react-native-hide-show-password-input';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/core';

const {tailwind, getColor} = create(styles);
const Authentication = ({navigation: {dangerouslyGetParent}, navigation}) => {
  // to delete bottom bar
  useFocusEffect(
    useCallback(() => {
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

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: Dimensions.get('window').height,
      }}>
      <View
        style={{
          ...tailwind(
            'flex flex-row rounded-full  border-gray-600 mt-24 self-center items-center justify-center',
          ),
          width: 110,
          height: 110,
          borderWidth: 10,
        }}>
        <Icon name="check" size={80} color={getColor('gray-600')} />
      </View>
      <Text
        style={{
          ...tailwind('text-lg text-gray-600 px-14 text-center mt-2 '),
          fontFamily: 'sans-serif',
        }}>
        Untuk melanjutkan, verifikasi diri anda terlebih dahulu
      </Text>
      <View style={tailwind('px-4 mt-10')}>
        <PasswordInputText label="password" lineWidth={2} />
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor={getColor('biru')}
          onPress={() => navigation.navigate('Ubah Password')}
          style={tailwind('bg-biru mt-9 p-3 items-center rounded-lg')}>
          <Text style={tailwind('text-white text-lg')}>Submit</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Authentication;
