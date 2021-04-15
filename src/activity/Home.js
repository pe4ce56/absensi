import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
} from 'react-native';
import styles from '../../styles.json';
import {create} from 'tailwind-rn';
import Header from '../components/Header';
import Footer from '../components/Footer';
const {tailwind} = create(styles);

const Home = ({navigation}) => {
  return (
    <View style={tailwind('bg-white flex-1 ')}>
      <Header />
      <Text style={tailwind('text-2xl text-gray-600 my-4 px-4')}>
        Absensi hari ini
      </Text>
      <ScrollView
        style={{...tailwind('bg-white h-full px-4'), marginBottom: 87}}>
        <View style={tailwind('mt-2 overflow-hidden  pb-2')}>
          <TouchableHighlight
            onPress={() => navigation.navigate('Absensi')}
            activeOpacity={0.8}
            style={tailwind('rounded-lg ')}>
            <View
              style={{
                ...tailwind(
                  'flex flex-row justify-between items-center  border-l-6 border-ijo  rounded-lg bg-white px-4 py-3 ',
                ),
                ...style.shadow,
              }}>
              <View>
                <Text style={tailwind('text-tiny text-gray-500')}>
                  Pendidikan Agama Islam
                </Text>
                <Text style={tailwind('text-xs text-gray-400')}>
                  Supardi, S.pd
                </Text>
              </View>
              <View>
                <Text>07.00</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <View style={tailwind('mt-2 overflow-hidden  pb-2')}>
          <TouchableHighlight
            onPress={() => navigation.navigate('Absensi')}
            activeOpacity={0.8}
            style={tailwind('rounded-lg ')}>
            <View
              style={{
                ...tailwind(
                  'flex flex-row justify-between items-center  border-l-6 border-abang  rounded-lg bg-white px-4 py-3 ',
                ),
                ...style.shadow,
              }}>
              <View>
                <Text style={tailwind('text-tiny text-gray-500')}>
                  Pendidikan Agama Islam
                </Text>
                <Text style={tailwind('text-xs text-gray-400')}>
                  Supardi, S.pd
                </Text>
              </View>
              <View>
                <Text>07.00</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <View style={tailwind('mt-2 overflow-hidden  pb-2')}>
          <TouchableHighlight
            onPress={() => navigation.navigate('Absensi')}
            activeOpacity={0.8}
            style={tailwind('rounded-lg ')}>
            <View
              style={{
                ...tailwind(
                  'flex flex-row justify-between items-center  border-l-6 border-biru  rounded-lg bg-white px-4 py-3 ',
                ),
                ...style.shadow,
              }}>
              <View>
                <Text style={tailwind('text-tiny text-gray-500')}>
                  Pendidikan Agama Islam
                </Text>
                <Text style={tailwind('text-xs text-gray-400')}>
                  Supardi, S.pd
                </Text>
              </View>
              <View>
                <Text>07.00</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>

        {[1, 2, 3, 4, 5, 6].map((data, key) => (
          <View style={tailwind('mt-2 overflow-hidden  pb-2')}>
            <TouchableHighlight
              onPress={() => navigation.navigate('Absensi')}
              activeOpacity={0.8}
              style={tailwind('rounded-lg ')}>
              <View
                style={{
                  ...tailwind(
                    'flex flex-row justify-between items-center  border-l-6 border-gray-400  rounded-lg bg-white px-4 py-3 ',
                  ),
                  ...style.shadow,
                }}>
                <View>
                  <Text style={tailwind('text-tiny text-gray-500')}>
                    Pendidikan Agama Islam
                  </Text>
                  <Text style={tailwind('text-xs text-gray-400')}>
                    Supardi, S.pd
                  </Text>
                </View>
                <View>
                  <Text>07.00</Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  shadow: {
    elevation: 4,
  },
});

export default Home;
