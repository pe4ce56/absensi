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
const More = ({navigation}) => {
  return (
    <View style={{flex: 1, height: height, backgroundColor: '#fff'}}>
      <ScrollView>
        <View style={tailwind('relative h-44 w-44 self-center  mt-10')}>
          <Image
            style={tailwind('h-44 w-44 self-center  rounded-full')}
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLS5K1aszN2SkSpLdr4kLSCEeMBQMi5YSvA&usqp=CAU',
            }}
          />
        </View>
        <Text style={style.name}>Bandi Susanto</Text>
        <Text style={style.kelas}>XII Rekaya Perangkat Lunak 1</Text>
        <TouchableHighlight
          style={style.menu}
          activeOpacity={0.9}
          underlayColor={getColor('gray-50')}
          onPress={() => navigation.navigate('Profil')}>
          <>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="person-outline"
                size={30}
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
          onPress={() => {}}>
          <>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="information-circle-outline"
                size={30}
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
          onPress={() => {}}>
          <>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="log-out-outline"
                size={30}
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
      </ScrollView>
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
  kelas: {
    fontSize: 17,
    color: getColor('gray-400'),
    textAlign: 'center',
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    paddingVertical: 16,
  },
  labelMenu: {
    fontSize: 18,
    marginLeft: 16,
  },
});

export default More;
