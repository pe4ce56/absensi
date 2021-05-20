import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {block} from 'react-native-reanimated';

import {create} from 'tailwind-rn';

import styles from '../../styles.json';

const {tailwind, getColor} = create(styles);
let {width, height} = Dimensions.get('screen');
const About = () => {
  const Bullet = ({text, styling}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          ...styling,
        }}>
        <Text style={{fontSize: 30}}>{'\u2022'}</Text>
        <Text style={style.listChangeLog}>{text}</Text>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: 'white', height: height}}>
      <ScrollView>
        <View style={{paddingBottom: 110}}>
          <View style={style.imageContainer}>
            <Image
              style={{
                alignSelf: 'center',
                width: 90,
                height: 90,
              }}
              source={require('../assets/LOGO.png')}
            />
          </View>
          <Text style={style.appName}>e-ttendance</Text>
          <Text style={style.version}>v1.0</Text>
          <View style={{alignItems: 'center', paddingHorizontal: width / 6}}>
            <Text style={style.changeLog}>Change Log :</Text>
            <Bullet text="Map accuracy improvement" styling={{marginTop: 15}} />
            <Bullet text="Fix minor bug" styling={{marginTop: -20}} />
            <Bullet
              text="Improve system efficiency"
              styling={{marginTop: -20}}
            />
          </View>
          <Text style={style.copyright}>SMKN 02 Singosari {'\u00A9'} 2021</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  imageContainer: {
    width: 130,
    height: 130,
    borderRadius: 130,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: getColor('biru'),
    marginTop: 80,
  },
  appName: {
    textAlign: 'center',
    fontSize: 25,
    color: getColor('gray-800'),
    marginTop: 8,
  },
  version: {
    textAlign: 'center',
    fontSize: 16,
    color: getColor('gray-400'),
    marginTop: 2,
  },
  changeLog: {
    marginTop: height / 8,
    color: getColor('gray-800'),
    fontSize: 16,
  },
  listChangeLog: {
    paddingLeft: 5,
    flex: 1,
    fontSize: 14,
    color: getColor('gray-700'),
  },
  copyright: {
    marginTop: 80,
    textAlign: 'center',
    fontSize: 15,
    color: getColor('gray-400'),
  },
});

export default About;
