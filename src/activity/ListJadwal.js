import React from 'react';
import {Text, View} from 'react-native';

import {create} from 'tailwind-rn';
import styles from '../../styles.json';
const {tailwind, getColor} = create(styles);

export default () => {
  return (
    <View style={{backgroundColor: getColor('white')}}>
      <Text>test</Text>
    </View>
  );
};
