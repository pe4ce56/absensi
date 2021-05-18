import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {create} from 'tailwind-rn';

import styles from '../../styles.json';
import {instance, authCheck} from '../helper/instance';

const {tailwind, getColor} = create(styles);
const {height, width} = Dimensions.get('window');
const Profile = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        instance(token)
          .get(`/siswa/profile`)
          .then(res => {
            authCheck(res.data.code, navigation);
            setProfile(res.data.data);
            setLoading(false);
          })
          .catch(err => {
            authCheck(err?.response?.status, navigation);
            setLoading(false);
            Alert.alert('Error', 'Kesalahanan saat mengambil data');
          });
      } catch (error) {
        setLoading(false);
        Alert.alert('Error', error.message);
      }
    });
    return unsubscribe;
  }, []);
  return (
    <View style={style.container}>
      <Spinner
        visible={loading}
        textContent={'Sedang memuat...'}
        textStyle={{color: '#FFF'}}
      />
      <View style={style.rounded} />
      <ScrollView style={{width: width, height: height}}>
        <View style={{paddingBottom: 100}}>
          <View style={tailwind(' h-28 w-28 self-center  mt-5')}>
            <Image
              style={tailwind('h-28 w-28 self-center  rounded-full')}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLS5K1aszN2SkSpLdr4kLSCEeMBQMi5YSvA&usqp=CAU',
              }}
            />
          </View>
          {/* <TouchableHighlight
            style={{
              ...tailwind(
                'bg-biru py-1 px-2 mt-7 self-center rounded border-white ',
              ),
              borderWidth: 1.5,
            }}>
            <View>
              <Text style={tailwind('text-center text-white text-tiny ')}>
                UBAH FOTO
              </Text>
            </View>
          </TouchableHighlight> */}
          <View style={style.card}>
            <Text style={style.title}>DATA PRIBADI</Text>
            <View>
              <Text style={style.label}>NISN</Text>
              <Text style={style.value}>{profile?.NISN}</Text>
            </View>
            <View>
              <Text style={style.label}>Nama</Text>
              <Text style={style.value}>{profile?.nama}</Text>
            </View>
            <View>
              <Text style={style.label}>Kelas</Text>
              <Text style={style.value}>{profile?.class?.nama}</Text>
            </View>
            <View>
              <Text style={style.label}>Jenis Kelamin</Text>
              <Text style={style.value}>
                {profile?.jk === 'l' ? 'Laki Laki' : 'Perempuan'}
              </Text>
            </View>
            <View>
              <Text style={style.label}>Alamat</Text>
              <Text style={style.value}>{profile?.alamat}</Text>
            </View>
            <View>
              <Text style={style.label}>Tanggal Lahir</Text>
              <Text style={style.value}>{profile?.tanggal_lahir}</Text>
            </View>
            {/* <View style={{marginTop: 70}}>
              <TouchableHighlight
                activeOpacity={0.8}
                underlayColor={getColor('gray-300')}
                onPress={() => navigation.navigate('Verifikasi Password')}
                style={style.btnChangePassword}>
                <>
                  <Text
                    style={{
                      color: getColor('gray-100'),
                      fontSize: 15,
                      marginRight: 6,
                    }}>
                    Ubah Password
                  </Text>
                  <Icon
                    name="chevron-forward-outline"
                    size={14}
                    color={getColor('gray-100')}
                  />
                </>
              </TouchableHighlight>
            </View> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  rounded: {
    backgroundColor: getColor('biru'),
    height: height / 2,
    width: width * 2,
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    top: -20,
    position: 'absolute',
  },
  card: {
    alignSelf: 'center',
    width: '90%',
    elevation: 1,
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: getColor('gray-700'),
  },
  label: {
    fontSize: 14,
    color: getColor('gray-400'),
    marginTop: 20,
  },
  value: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 15,
    color: getColor('gray-500'),

    fontWeight: 'bold',
    marginTop: 5,
  },
  btnChangePassword: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: getColor('gray-400'),
    width: 'auto',
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
  },
});

export default Profile;
