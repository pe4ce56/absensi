/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {Text, Alert, BackHandler, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import styles from './styles.json';
import {create, getColor} from 'tailwind-rn';
import Navigation from './Navigation';
const {tailwind} = create(styles);
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = {fontFamily: 'Helvetica'};
const App = () => {
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
    } catch (err) {
      console.warn(err);
    }
  });
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
