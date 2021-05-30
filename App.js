/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {Text, Alert, BackHandler, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {create, getColor} from 'tailwind-rn';
import styles from './styles.json';
import Navigation from './Navigation';
import AsyncStorage from '@react-native-community/async-storage';

const {tailwind} = create(styles);

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = {fontFamily: 'Helvetica'};

const App = () => {
  const [route, setRoute] = useState();
  useEffect(async () => {
    var permissions = [
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ];

    try {
      PermissionsAndroid.requestMultiple(permissions).then(granted => {
        if (
          granted['android.permission.ACCESS_FINE_LOCATION'] !==
            PermissionsAndroid.RESULTS.GRANTED ||
          granted['android.permission.ACCESS_COARSE_LOCATION'] !==
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          Alert.alert(
            'Akses lokasi ditolak',
            'Anda tidak dapat menggunakan aplikasi ini',
            [
              {
                text: 'OK',
                onPress: () => {
                  BackHandler.exitApp();
                },
              },
            ],
          );
        }
      });
      const token = await AsyncStorage.getItem('token');
      const user = JSON.parse(await AsyncStorage.getItem('user'));

      if (token) {
        if (user?.role === 'siswa') setRoute('Siswa');
        else if (user?.role === 'guru') setRoute('Guru');
        else setRoute('Login');
      } else {
        setRoute('Login');
      }
    } catch (err) {
      console.warn(err);
    }

    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      {route && <Navigation route={route} />}
    </NavigationContainer>
  );
};

export default App;
