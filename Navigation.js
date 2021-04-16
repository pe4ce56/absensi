import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {create} from 'tailwind-rn';
import styles from './styles.json';
const {tailwind, getColor} = create(styles);

import Home from './src/activity/Home';
import Maps from './src/activity/Maps';
import Jadwal from './src/activity/Jadwal';
import Profile from './src/activity/Profile';
import Authentication from './src/activity/Authentication';
import ChangePassword from './src/activity/ChangePassword';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Absensi"
        component={Maps}
        ooptions={({route}) => ({
          tabBarVisible: false,
        })}
      />
    </HomeStack.Navigator>
  );
};
const ProfileStack = createStackNavigator();

const ProfilScreen = () => {
  const getBar = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Ubah Password') {
      return false;
    }

    return true;
  };
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profil"
        component={Profile}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="Verifikasi Password"
        component={Authentication}
      />
      <ProfileStack.Screen name="Ubah Password" component={ChangePassword} />
    </ProfileStack.Navigator>
  );
};

const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={tailwind('items-center ')}>
              <Icon
                name="clipboard-outline"
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
        name="Jadwal"
        component={Jadwal}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={tailwind('items-center')}>
              <Icon
                name="time-outline"
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
        name="Profil"
        component={ProfilScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={tailwind('items-center')}>
              <Icon
                name="person-outline"
                size={25}
                color={focused ? getColor('biru') : getColor('gray-600')}
              />
              <Text
                style={{
                  fontSize: 13,
                  color: focused ? getColor('biru') : getColor('gray-600'),
                }}>
                Profil
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
