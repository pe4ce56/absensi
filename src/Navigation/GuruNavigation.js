import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {create} from 'tailwind-rn';

import Home from '../activity/guru/Home/Home';
import Detail from '../activity/guru/Home/Detail';
import Schedule from '../activity/guru/Schedule';
import ScheduleList from '../activity/guru/ScheduleList';
import More from '../activity/guru/More';
import Profile from '../activity/guru/Profile';

import styles from '../../styles.json';
import Absent from '../activity/guru/Home/Absent';

const {tailwind, getColor} = create(styles);

const HomeStack = createStackNavigator();
const HomeScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home Guru"
        component={Home}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Detail Guru"
        component={Detail}
        options={{
          title: 'Absensi',
          tabBarVisible: false,
          headerStyle: {
            backgroundColor: getColor('biru'),
          },
          headerTintColor: '#fff',
        }}
      />
      <HomeStack.Screen
        name="Show Absent"
        component={Absent}
        options={{
          title: 'Absensi',
          tabBarVisible: false,
          headerStyle: {
            backgroundColor: getColor('biru'),
          },
          headerTintColor: '#fff',
        }}
      />
    </HomeStack.Navigator>
  );
};

const ScheduleStack = createStackNavigator();
const ScheduleScreen = () => {
  return (
    <ScheduleStack.Navigator>
      <ScheduleStack.Screen
        name="Schedule Guru"
        component={Schedule}
        options={{headerShown: false}}
      />
      <ScheduleStack.Screen
        name="Teacher Schedule List"
        component={ScheduleList}
        options={({route}) => ({
          tabBarVisible: false,
          headerShown: false,

          headerTintColor: '#fff',
        })}
      />
    </ScheduleStack.Navigator>
  );
};

const MoreStack = createStackNavigator();

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
    <MoreStack.Navigator>
      <MoreStack.Screen
        name="More Guru"
        component={More}
        options={{headerShown: false}}
      />
      <MoreStack.Screen
        name="Profil Guru"
        options={({route}) => ({
          headerStyle: {
            backgroundColor: getColor('biru'),
          },
          headerTintColor: '#fff',
        })}
        component={Profile}
      />
    </MoreStack.Navigator>
  );
};

export default {
  HomeScreen,
  ScheduleScreen,
  MoreScreen,
};
