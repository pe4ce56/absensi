import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {create} from 'tailwind-rn';
import styles from './styles.json';
const {tailwind, getColor} = create(styles);

import Login from './src/activity/Login';
import Siswa from './src/Navigation/SiswaNavigation';

const Tab = createBottomTabNavigator();
const SiswaTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeSiswa"
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: 'white',
          height: 60,
        },
      }}>
      <Tab.Screen
        name="HomeSiswa"
        component={Siswa.HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={tailwind('items-center ')}>
              <Icon
                name={focused ? 'clipboard' : 'clipboard-outline'}
                size={25}
                color={focused ? getColor('biru') : getColor('gray-600')}
              />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: focused ? getColor('biru') : getColor('gray-600'),
                }}>
                Absensi
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="JadwalSiswa"
        component={Siswa.JadwalScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={tailwind('items-center')}>
              <Icon
                name={focused ? 'time' : 'time-outline'}
                size={25}
                color={focused ? getColor('biru') : getColor('gray-600')}
              />
              <Text
                style={{
                  fontSize: 13,
                  color: focused ? getColor('biru') : getColor('gray-600'),
                }}>
                Jadwal
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MoreSiswa"
        component={Siswa.MoreScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={tailwind('items-center')}>
              <Icon
                name={focused ? 'menu' : 'menu-outline'}
                size={25}
                color={focused ? getColor('biru') : getColor('gray-600')}
              />
              <Text
                style={{
                  fontSize: 13,
                  color: focused ? getColor('biru') : getColor('gray-600'),
                }}>
                More
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{headerShown: false}}
        component={Login}
      />
      <Stack.Screen
        name="Siswa"
        options={{headerShown: false}}
        component={SiswaTabs}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
