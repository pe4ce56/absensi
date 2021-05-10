import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableHighlightBase,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {create} from 'tailwind-rn';
import styles from '../../styles.json';
const {tailwind, getColor} = create(styles);
const {height, width} = Dimensions.get('window');
const Profile = ({navigation}) => {
  return (
    <View style={style.container}>
      <View style={style.rounded} />
      <ScrollView style={{width: width, height: height}}>
        <View style={{paddingBottom: 100}}>
          <View style={tailwind(' h-28 w-28 self-center  mt-5')}>
            <Image
              style={tailwind('h-28 w-28 self-center  rounded-full')}
              source={{
                uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLS5K1aszN2SkSpLdr4kLSCEeMBQMi5YSvA&usqp=CAU',
              }}
            />
          </View>
          <TouchableHighlight
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
          </TouchableHighlight>
          <View style={style.card}>
            <Text style={style.title}>Data Pribadi</Text>
            <Text style={style.label}>NISN</Text>
            <Text style={style.value}>12312361256</Text>
            <Text style={style.label}>Nama</Text>
            <Text style={style.value}>Shevera Gosel</Text>
            <Text style={style.label}>Kelas</Text>
            <Text style={style.value}>12 Rekayasa Perangkat Lunak 1</Text>
            <Text style={style.label}>Jenis Kelamin</Text>
            <Text style={style.value}>Laki Laki</Text>
            <Text style={style.label}>Kelas</Text>
            <Text style={style.value}>12 Rekayasa Perangkat Lunak 1</Text>
            <Text style={style.label}>Alamat</Text>
            <Text style={style.value}>123 Main Street, New York, NY 10030</Text>
            <Text style={style.label}>Tanggal Lahir</Text>
            <Text style={style.value}>10 Mei 2020</Text>
            <View style={{marginTop: 70}}>
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
            </View>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: getColor('gray-700'),
  },
  label: {
    fontSize: 15,
    color: getColor('gray-400'),
    marginTop: 20,
  },
  value: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 17,
    color: '#3A4856',
    fontWeight: '500',
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
