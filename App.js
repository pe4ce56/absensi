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
import Icon from 'react-native-vector-icons/Ionicons';

import Home from './src/activity/Home';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import styles from './styles.json';
import {create, getColor} from 'tailwind-rn';
import Maps from './src/components/Maps';
const {tailwind} = create(styles);
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'clipboard' : 'clipboard-outline';
            } else if (route.name === 'Jadwal') {
              iconName = focused ? 'time' : 'time-outline';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          showLabel: true,
          activeTintColor: getColor('blue-300'),
          inactiveTintColor: 'gray',
          style: tailwind('h-16 py-3'),
        }}
        initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Jadwal" component={Maps} />
        <Tab.Screen name="Absen" component={Maps} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
