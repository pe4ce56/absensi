import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {create} from 'tailwind-rn';
import styles from '../../styles.json';
const {tailwind, getColor} = create(styles);

import Home from '../activity/Home';
import Maps from '../activity/Maps';
import Jadwal from '../activity/Jadwal';
import Profile from '../activity/Profile';
import Authentication from '../activity/Authentication';
import ChangePassword from '../activity/ChangePassword';
import More from '../activity/More';
import ListJadwal from '../activity/ListJadwal';

const HomeStack = createStackNavigator();

const HomeScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home Siswa"
        component={Home}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Absensi Siswa"
        component={Maps}
        options={({route}) => ({
          tabBarVisible: false,
          headerStyle: {
            backgroundColor: route.params.color,
          },
          headerTintColor: '#fff',
        })}
      />
    </HomeStack.Navigator>
  );
};

const JadwalStack = createStackNavigator();

const JadwalScreen = () => {
  return (
    <JadwalStack.Navigator>
      <JadwalStack.Screen
        name="Jadwal Siswa"
        component={Jadwal}
        options={{headerShown: false}}
      />
      <JadwalStack.Screen
        name="List Jadwal Siswa"
        component={ListJadwal}
        options={({route}) => ({
          tabBarVisible: false,
          headerShown: false,

          headerTintColor: '#fff',
        })}
      />
    </JadwalStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();

const MoreScreen = () => {
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
        name="More Siswa"
        component={More}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="Profil Siswa"
        options={({route}) => ({
          headerStyle: {
            backgroundColor: getColor('biru'),
          },
          headerTintColor: '#fff',
        })}
        component={Profile}
      />
      <ProfileStack.Screen
        name="Verifikasi Password Siswa"
        component={Authentication}
        options={({route}) => ({
          headerStyle: {
            backgroundColor: getColor('biru'),
          },
          headerTintColor: '#fff',
        })}
      />
      <ProfileStack.Screen
        options={({route}) => ({
          headerStyle: {
            backgroundColor: getColor('biru'),
          },
          headerTintColor: '#fff',
        })}
        name="Ubah Password Suswa"
        component={ChangePassword}
      />
    </ProfileStack.Navigator>
  );
};

export default {
  HomeScreen,
  JadwalScreen,
  MoreScreen,
};
