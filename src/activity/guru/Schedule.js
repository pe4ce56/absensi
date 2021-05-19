import React from 'react';
import {SafeAreaView, View} from 'react-native';

import Header from '../../components/Header';
import LineContainer from '../../components/LineContainer';
const Schedule = ({navigation}) => {
  return (
    <SafeAreaView>
      <Header title="Jadwal Mengajar" />
      <View style={{height: '100%'}}>
        <LineContainer></LineContainer>
      </View>
    </SafeAreaView>
  );
};

export default Schedule;
