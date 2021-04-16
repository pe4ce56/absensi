import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {create} from 'tailwind-rn';
import styles from '../../styles.json';
import PasswordInputText from 'react-native-hide-show-password-input';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/core';

const {tailwind, getColor} = create(styles);
const ChangePassword = ({navigation: {dangerouslyGetParent}, navigation}) => {
  // to delete bottom bar
  const [hide, setHide] = useState(false);
  useEffect(() => {
    setHide(!false);
  }, []);
  useEffect(() => {
    const parent = dangerouslyGetParent();
    if (parent) {
      parent.setOptions({
        tabBarVisible: false,
      });
    }
  }, [hide]);

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: Dimensions.get('window').height,
      }}>
      <View
        style={{
          ...tailwind(
            'flex flex-row  border-gray-600 mt-24 self-center items-center justify-center',
          ),
          width: 130,
          height: 90,
          borderWidth: 10,
          borderRadius: 20,
        }}>
        <Icon name="times" size={40} color={getColor('gray-600')} />
        <Icon name="times" size={40} color={getColor('gray-600')} />
        <Icon name="times" size={40} color={getColor('gray-600')} />
      </View>
      <Text
        style={{
          ...tailwind('text-lg text-gray-600 px-14 text-center mt-2 '),
          fontFamily: 'sans-serif',
        }}>
        Gunakan password yang tidak mudah ditebak orang lain
      </Text>
      <View style={tailwind('px-4 mt-10')}>
        <PasswordInputText
          style={tailwind('border-gray-400 ')}
          label="Password Baru"
        />
        <PasswordInputText
          style={tailwind('border-gray-400 ')}
          label="Konfirmasi Password Baru"
        />
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor={getColor('biru')}
          onPress={() => setHide(!hide)}
          style={tailwind('bg-biru mt-9 p-3 items-center rounded-lg')}>
          <Text style={tailwind('text-white text-lg')}>Submit</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ChangePassword;
