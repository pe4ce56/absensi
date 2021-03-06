import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Dimensions,
  Text,
  Alert,
  StatusBar,
  TextInput,
  TouchableHighlight,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {TextField} from 'react-native-material-textfield';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import {create} from 'tailwind-rn';

import styles from '../../styles.json';
import {API_ENDPOINT} from '../config/config';

const {tailwind, getColor} = create(styles);
let {width, height} = Dimensions.get('screen');

export default ({navigation}) => {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setData({
        username: '',
        password: '',
      });
      const token = await AsyncStorage.getItem('token');
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      // if (token) {
      //   if (user.role === 'siswa') navigation.navigate('Siswa');
      //   else if (user.role === 'guru') navigation.navigate('Guru');
      // }
    });
    return unsubscribe;
  }, []);

  const loginHandle = () => {
    setSpinner(true);
    axios(`${API_ENDPOINT}/login`, {
      method: 'post',
      timeout: 10000,
      data,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then(async res => {
        if (res.status) {
          try {
            await AsyncStorage.setItem('token', res.data.data.token);
            await AsyncStorage.setItem(
              'user',
              JSON.stringify(res.data.data.user),
            );
            setData({username: '', password: ''});
            if (res.data.data.user.role === 'siswa')
              navigation.navigate('Siswa');
            else navigation.navigate('Guru');
          } catch (err) {
            Alert.alert('Terjadi Kesalahan', 'Username/Password salah!');
          }
        }

        setSpinner(false);
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Terjadi Kesalahan', 'Username/Password salah!');
        setSpinner(false);
      });
  };

  const handleChange = (key, value) => {
    setData({...data, [key]: value});
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#ffffff',
        alignItems: 'center',
        flex: 1,
      }}>
      <StatusBar backgroundColor={getColor('biru')} barStyle="light-content" />
      <Spinner
        visible={spinner}
        textContent={'Sedang memuat...'}
        textStyle={{color: '#FFF'}}
      />
      <View
        style={{
          width: width * 2,
          height: height / 1.8,
          backgroundColor: getColor('biru'),
          borderBottomLeftRadius: width,
          borderBottomRightRadius: width,
          position: 'absolute',
        }}
      />
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView style={{flex: 1}}>
          <View style={{width: width, paddingVertical: 30}}>
            <Image
              style={{
                alignSelf: 'center',
                width: 80,
                height: 80,
                marginTop: 20,
              }}
              source={require('../assets/LOGO.png')}
            />
            <Text
              style={{
                color: getColor('gray-100'),
                textAlign: 'center',
                fontSize: 21,
                marginTop: 10,
              }}>
              e-ttendance
            </Text>
            {/*BOX*/}
            <View
              style={{
                alignSelf: 'center',
                width: '85%',
                elevation: 1,
                backgroundColor: 'white',
                paddingVertical: 30,
                paddingHorizontal: 25,
                borderRadius: 8,
                marginTop: 35,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 40,
                  color: getColor('gray-600'),
                  textAlign: 'center',
                }}>
                Login
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  marginTop: 60,
                  marginBottom: -20,
                  color: getColor('gray-700'),
                }}>
                Username
              </Text>
              <TextField
                value={data.username}
                onChangeText={val => handleChange('username', val)}
                style={{fontSize: 17}}
              />
              <Text
                style={{
                  fontSize: 17,
                  marginTop: 20,
                  marginBottom: -20,
                  color: getColor('gray-700'),
                }}>
                Password
              </Text>
              <TextField
                textContentType="password"
                value={data.password}
                secureTextEntry={true}
                onChangeText={val => handleChange('password', val)}
                style={{fontSize: 17}}
              />
              <TouchableHighlight
                style={{
                  backgroundColor: getColor('biru'),
                  paddingVertical: 14,
                  borderRadius: 6,
                  marginTop: 35,
                }}
                underlayColor={getColor('blue-400')}
                activeOpacity={0.9}
                onPress={loginHandle}>
                <Text
                  style={{textAlign: 'center', color: '#fff', fontSize: 17}}>
                  Login
                </Text>
              </TouchableHighlight>
              <Text
                style={{
                  marginTop: 80,
                  textAlign: 'center',
                  fontSize: 15,
                  color: getColor('gray-400'),
                }}>
                SMKN 02 Singosari {'\u00A9'} 2021
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
