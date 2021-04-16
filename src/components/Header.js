import React from 'react';
import {Image, Text, View} from 'react-native';
import tailwind from 'tailwind-rn';

export default () => {
  return (
    <View
      style={{
        ...tailwind(
          'flex flex-row justify-between bg-white px-6 py-6 w-full h-full bg-gray-500 ',
        ),
        backgroundColor: '#414865',
      }}>
      <View>
        <Text style={tailwind('text-base font-semibold text-white')}>
          XII Rekayasa Perangkat Lunak 1
        </Text>
        <Text
          style={{
            ...tailwind(
              'text-sm text-gray-900 rounded-full w-24 px-2 bg-gray-50',
            ),
            paddingVertical: 1,
          }}>
          10/05/2002
        </Text>
      </View>
      <View>
        <Image
          style={tailwind('h-12 w-12 rounded-full ')}
          source={{
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLS5K1aszN2SkSpLdr4kLSCEeMBQMi5YSvA&usqp=CAU',
          }}
        />
      </View>
    </View>
  );
};
