import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {create} from 'tailwind-rn';
import styles from '../../../styles.json';

import {instance, authCheck, logout} from '../../helper/instance';
const {tailwind, getColor} = create(styles);
const {height} = Dimensions.get('window');
const More = ({navigation}) => {
  const [loading, setLoading] = useState();
  const [profile, setProfile] = useState();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const user = JSON.parse(await AsyncStorage.getItem('user'));

        instance(token)
          .get(`/guru/profile/${user.id}`)
          .then(res => {
            authCheck(res.data.code, navigation);
            setProfile(res.data.data);
          })
          .catch(err => {
            authCheck(err?.response?.status, navigation);
            Alert.alert('Error', 'Kesalahanan saat mengambil data');
            setLoading(false);
          });
      } catch (error) {
        setLoading(false);
        console.log(error);
        Alert.alert('Error', error.message);
      }
    });
    return unsubscribe;
  }, []);
  return (
    <View style={{flex: 1, height: height, backgroundColor: '#fff'}}>
      <Spinner
        visible={loading}
        textContent={'Sedang memuat...'}
        textStyle={{color: '#FFF'}}
      />
      <ScrollView>
        <View style={{marginBottom: 90}}>
          <View style={tailwind('bg-biru py-14 mb-5')}>
            <View style={tailwind('relative h-32 w-32 self-center  ')}>
              <Image
                style={tailwind('h-32 w-32 self-center  rounded-full')}
                source={{
                  uri: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
                }}
              />
            </View>
            <Text style={style.name}>{profile?.name}</Text>
          </View>
          <TouchableHighlight
            style={style.menu}
            activeOpacity={0.9}
            underlayColor={getColor('gray-50')}
            onPress={() => navigation.navigate('Profil Guru')}>
            <>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name="person-outline"
                  size={25}
                  color={getColor('gray-400')}
                />
                <Text style={style.labelMenu}>Profil</Text>
              </View>
              <Icon
                name="chevron-forward-outline"
                size={20}
                color={getColor('gray-400')}
              />
            </>
          </TouchableHighlight>
          <TouchableHighlight
            style={style.menu}
            activeOpacity={0.9}
            underlayColor={getColor('gray-50')}
            onPress={() => {
              navigation.navigate('About');
            }}>
            <>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name="information-circle-outline"
                  size={25}
                  color={getColor('gray-400')}
                />
                <Text style={style.labelMenu}>Tentang Aplikasi</Text>
              </View>
              <Icon
                name="chevron-forward-outline"
                size={20}
                color={getColor('gray-400')}
              />
            </>
          </TouchableHighlight>
          <TouchableHighlight
            style={style.menu}
            activeOpacity={0.9}
            underlayColor={getColor('red-50')}
            onPress={async () => {
              await logout(navigation);
            }}>
            <>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name="log-out-outline"
                  size={25}
                  color={getColor('abang')}
                />
                <Text style={{...style.labelMenu, color: getColor('abang')}}>
                  Logout
                </Text>
              </View>
              <Icon
                name="chevron-forward-outline"
                size={22}
                color={getColor('abang')}
              />
            </>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  name: {
    fontWeight: '600',
    fontSize: 25,
    textAlign: 'center',
    color: getColor('white'),
    marginTop: 10,
    fontFamily: 'Roboto',
  },
  kelas: {
    fontSize: 18,
    color: getColor('white'),
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 15,
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: getColor('gray-200'),
  },
  labelMenu: {
    fontSize: 16,
    marginLeft: 20,
  },
});

export default More;
