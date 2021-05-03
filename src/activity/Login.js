import React from 'react';
import {useState} from 'react';
import {
  View,
  SafeAreaView,
  Dimensions,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {ScrollView} from 'react-native-gesture-handler';

import {create} from 'tailwind-rn';
import styles from '../../styles.json';
const {tailwind, getColor} = create(styles);
let {width, height} = Dimensions.get('screen');
export default ({navigation}) => {
  const [data, setData] = useState({
    username: null,
    password: null,
  });
  const handleChange = (key, value) => {
    setData({...data, [key]: value});
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#ffffff',
        alignItems: 'center',
        flex: 1,
      }}>
      <View
        style={{
          width: width * 2,
          height: height / 1.8,
          backgroundColor: getColor('biru'),
          borderBottomLeftRadius: width,
          borderBottomRightRadius: width,
          position: 'absolute',
        }}
      />
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView style={{flex: 1}}>
          <View style={{width: width, paddingVertical: 30}}>
            <Image
              style={{
                alignSelf: 'center',
                width: 80,
                height: 80,
                marginTop: 20,
              }}
              source={require('../assets/LOGO.png')}
            />
            <Text
              style={{
                color: getColor('gray-100'),
                textAlign: 'center',
                fontSize: 21,
                marginTop: 10,
              }}>
              e-ttendance
            </Text>
            {/*BOX*/}
            <View
              style={{
                alignSelf: 'center',
                width: '85%',
                elevation: 1,
                backgroundColor: 'white',
                paddingVertical: 30,
                paddingHorizontal: 25,
                borderRadius: 8,
                marginTop: 35,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 40,
                  color: getColor('gray-600'),
                  textAlign: 'center',
                }}>
                Login
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  marginTop: 60,
                  marginBottom: -20,
                  color: getColor('gray-700'),
                }}>
                Username
              </Text>
              <TextField
                value={data.username}
                onChangeText={val => handleChange(val, 'username')}
                style={{fontSize: 17}}
              />
              <Text
                style={{
                  fontSize: 17,
                  marginTop: 20,
                  marginBottom: -20,
                  color: getColor('gray-700'),
                }}>
                Password
              </Text>
              <TextField
                textContentType="password"
                value={data.username}
                onChangeText={val => handleChange(val, 'username')}
                style={{fontSize: 17}}
              />
              <TouchableHighlight
                style={{
                  backgroundColor: getColor('biru'),
                  paddingVertical: 14,
                  borderRadius: 6,
                  marginTop: 35,
                }}
                underlayColor={getColor('blue-400')}
                activeOpacity={0.9}
                onPress={() => {
                  navigation.navigate('Main');
                }}>
                <Text
                  style={{textAlign: 'center', color: '#fff', fontSize: 17}}>
                  Login
                </Text>
              </TouchableHighlight>
              <Text
                style={{
                  marginTop: 80,
                  textAlign: 'center',
                  fontSize: 15,
                  color: getColor('gray-400'),
                }}>
                SMKN 02 Singosari {'\u00A9'} 2021
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
