/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './src/activity/Home';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import styles from './styles.json';
import {create, getColor} from 'tailwind-rn';
import Maps from './src/activity/Maps';
import {useEffect} from 'react/cjs/react.development';
import {Alert, BackHandler, PermissionsAndroid} from 'react-native';
import Footer from './src/components/Footer';
const {tailwind} = create(styles);

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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Jadwal" component={Maps} />
        <Stack.Screen name="Absen" component={Maps} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
