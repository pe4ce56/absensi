import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {create} from 'tailwind-rn';

import Home from '../activity/guru/Home';
import Schedule from '../activity/guru/Schedule';
import ScheduleList from '../activity/guru/ScheduleList';

import styles from '../../styles.json';

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

export default {
  HomeScreen,
  ScheduleScreen,
};
