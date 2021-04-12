import React, {useEffect, useState} from 'react';
import {View, Text, TouchableHighlight, ScrollView} from 'react-native';
import styles from '../../styles.json';
import {create} from 'tailwind-rn';
import Header from '../components/Header';
const {tailwind} = create(styles);

const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <ScrollView style={tailwind('p-4 bg-gray-100 h-full')}>
        <Text style={tailwind('text-3xl text-gray-600')}>Absensi hari ini</Text>
        <TouchableHighlight>
          <View
            style={tailwind(
              'flex flex-row justify-between items-center border-l-5 border-ijo  rounded-xl bg-white mt-4 px-5  py-3  ',
            )}>
            <View>
              <Text style={tailwind('text-base text-gray-500')}>
                Pendidikan Agama Islam
              </Text>
              <Text style={tailwind('text-sm text-gray-400')}>
                Supardi, S.pd{' '}
              </Text>
            </View>
            <View>
              <Text>07.00</Text>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View
            style={tailwind(
              'flex flex-row justify-between items-center border-l-5 border-red-400 rounded-xl bg-white mt-4 px-4  py-3  ',
            )}>
            <View>
              <Text style={tailwind('text-base text-gray-500')}>
                Pendidikan Agama Islam
              </Text>
              <Text style={tailwind('text-sm text-gray-400')}>
                Supardi, S.pd{' '}
              </Text>
            </View>
            <View>
              <Text>07.00</Text>
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight>
          <View
            style={tailwind(
              'flex flex-row justify-between items-center border-l-5 border-blue-400 rounded-xl bg-white mt-4 px-4 py-3  ',
            )}>
            <View>
              <Text style={tailwind('text-base text-gray-500')}>
                Pendidikan Agama Islam
              </Text>
              <Text style={tailwind('text-sm text-gray-400')}>
                Supardi, S.pd{' '}
              </Text>
            </View>
            <View>
              <Text>07.00</Text>
            </View>
          </View>
        </TouchableHighlight>
        {[1, 2, 3, 4, 5, 6].map(() => (
          <TouchableHighlight>
            <View
              style={tailwind(
                'flex flex-row justify-between items-center border-l-5 border-gray-400 rounded-xl bg-white mt-4 px-4 py-3 ',
              )}>
              <View>
                <Text style={tailwind('text-base text-gray-500')}>
                  Pendidikan Agama Islam
                </Text>
                <Text style={tailwind('text-sm text-gray-400')}>
                  Supardi, S.pd{' '}
                </Text>
              </View>
              <View>
                <Text>07.00</Text>
              </View>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    </React.Fragment>
  );
};

export default Home;
