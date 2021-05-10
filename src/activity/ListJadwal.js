import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {create} from 'tailwind-rn';
import styles from '../../styles.json';
const {tailwind, getColor} = create(styles);
const {width, height} = Dimensions.get('screen');
export default ({navigation, route}) => {
  const Header = () => (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: getColor('biru'),
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor={getColor('biru')}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={22} color={getColor('white')} />
        </TouchableHighlight>
        <Text
          style={{
            color: getColor('white'),
            marginLeft: 16,
            fontSize: 18,
          }}>
          Jadwal
        </Text>
      </View>
      <Text
        style={{
          marginTop: 33,
          color: getColor('white'),
          fontSize: 22,
        }}>
        {`Jadwal Hari ${route.params.day}`}
      </Text>
    </View>
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <View
        style={{
          width: '100%',
          backgroundColor: getColor('white'),
          display: 'flex',
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
          <View style={{paddingBottom: 90, paddingTop: 10}}>
            {[1, 2, 3, 4, 5].map((data, key) => (
              <TouchableHighlight
                key={key}
                // underlayColor={getBackground(data.status)}
                underlayColor={getColor('gray-50')}
                activeOpacity={0.9}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginRight: 30,
                    position: 'relative',
                    backgroundColor: 'transparent',
                    marginVertical: 20,
                  }}>
                  <View style={{width: width / 4, alignItems: 'center'}}>
                    <Text style={{fontSize: 14}}>07.00</Text>
                  </View>
                  <View style={tailwind('px-7')}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: getColor('gray-800'),
                      }}>
                      Pendidikan Agama Islam
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: getColor('gray-400'),
                      }}>
                      John Cena, Spd. MM
                    </Text>
                    <Text style={{fontSize: 12, color: getColor('gray-500')}}>
                      (Jam ke-1 s/d jam ke-2)
                    </Text>
                  </View>

                  <View
                    style={{
                      ...tailwind(' rounded-full bg-white  '),
                      position: 'absolute',
                      left: width / 4 - 5.8,
                      top: 3,
                      width: 15,
                      height: 15,
                      borderWidth: 4,
                      borderColor: getColor('abu'),
                    }}
                  />
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
