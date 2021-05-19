import React from 'react';

import {View, ScrollView, Dimensions} from 'react-native';
import {create} from 'tailwind-rn';

import styles from '../../styles.json';

const {getColor, tailwind} = create(styles);
const {height, width} = Dimensions.get('window');

const LineContainer = ({children}) => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: getColor('white'),
        height: '100%',
      }}>
      <View
        style={{
          ...tailwind('border-l-2 border-gray-300 '),
          backgroundColor: getColor('white'),
          position: 'absolute',
          left: width / 4,
          width: '100%',
          height: '100%',
          top: 0,
          zIndex: 0,
        }}
      />
      <ScrollView>
        <View style={{paddingBottom: 110, paddingTop: 10}}>{children}</View>
      </ScrollView>
    </View>
  );
};

export default LineContainer;
