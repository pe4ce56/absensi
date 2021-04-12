import React from 'react';
import {Image, Text, View} from 'react-native';
import tailwind from 'tailwind-rn';

export default () => {
  return (
    <View
      style={tailwind(
        'flex flex-row justify-between  items-center bg-gray-50 border-b-2 border-gray-100  p-4 w-full',
      )}>
      <View>
        <Text style={tailwind('text-base font-semibold')}>
          XII Rekayasa Perangkat Lunak 1
        </Text>
        <Text style={tailwind('text-sm text-blue-500')}>10/05/2002</Text>
      </View>
      <View>
        <Image
          style={tailwind('h-8 w-8 rounded-full ')}
          source={{
            uri:
              'https://icons-for-free.com/iconfiles/png/512/avatar+person+profile+user+icon-1320086059654790795.png',
          }}
        />
      </View>
    </View>
  );
};
