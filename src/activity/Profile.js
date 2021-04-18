import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {create} from 'tailwind-rn';
import styles from '../../styles.json';
const {tailwind, getColor} = create(styles);
const {height} = Dimensions.get('window');
const Profile = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          height: height - 120,
        }}>
        <ScrollView>
          <View style={{paddingBottom: 40}}>
            <View style={tailwind('relative h-44 w-44 self-center  mt-10')}>
              <Image
                style={tailwind('h-44 w-44 self-center  rounded-full')}
                source={{
                  uri:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLS5K1aszN2SkSpLdr4kLSCEeMBQMi5YSvA&usqp=CAU',
                }}
              />
              <TouchableHighlight
                style={tailwind(
                  'bg-gray-400 justify-center items-center rounded-full w-9 h-9 absolute bottom-0 right-0',
                )}>
                <Icon name="camera-outline" size={26} color="white" />
              </TouchableHighlight>
            </View>
            <Text style={style.name}>Bandi Susanto</Text>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor={getColor('biru')}
              onPress={() => navigation.navigate('Verifikasi Password')}
              style={tailwind(
                'bg-biru py-2  w-40 mt-2 self-center rounded-lg',
              )}>
              <View>
                <Text style={tailwind('text-center text-gray-100 text-tiny ')}>
                  Ubah Password
                </Text>
              </View>
            </TouchableHighlight>
            <View style={tailwind(' px-5')}>
              <View>
                <Text style={style.label}>NISN</Text>
                <Text style={style.value}>123456543</Text>
              </View>
              <View>
                <Text style={style.label}>Kelas</Text>
                <Text style={style.value}>XII Rekayasa Perangkat Lunak 1</Text>
              </View>
              <View>
                <Text style={style.label}>Jenis Kelamin</Text>
                <Text style={style.value}>Laki Laki</Text>
              </View>
              <View>
                <Text style={style.label}>Whatsapp</Text>
                <Text style={style.value}>08221974659</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  name: {
    fontWeight: '600',
    fontSize: 25,
    textAlign: 'center',
    color: getColor('gray-900'),
    marginTop: 25,
    fontFamily: 'Roboto',
  },
  label: {
    fontSize: 16,
    fontWeight: '100',
    color: getColor('gray-400'),
    marginTop: 20,
  },
  value: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 18,
    color: getColor('gray-900'),
    fontWeight: '600',
    marginTop: 5,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: getColor('gray-500'),
  },
});

export default Profile;
