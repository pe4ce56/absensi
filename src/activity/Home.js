import React, {useEffect, useState} from 'react';
import {View, Text, TouchableHighlight, ScrollView} from 'react-native';
import styles from '../../styles.json';
import {create} from 'tailwind-rn';
import Header from '../components/Header';
const {tailwind} = create(styles);

const Home = () => {
  const [data, setData] = useState();
  useEffect(() => {
    fetch('https://absensi-app.herokuapp.com/api/login', {
      method: 'POST',
      data: JSON.stringify({username: 'admin', password: 'admin'}),
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }, []);
  return (
    <React.Fragment>
      <Header />
      <ScrollView style={tailwind('p-4 bg-gray-100 h-full')}>
        <Text style={tailwind('text-2xl text-gray-600')}>Absensi hari ini</Text>
        <TouchableHighlight>
          <View
            style={tailwind(
              'flex flex-row justify-between items-center border-l-5 border-ijo  rounded-lg bg-white mt-4 px-4 py-3 ',
            )}>
            <View>
              <Text style={tailwind('text-tiny text-gray-500')}>
                Pendidikan Agama Islam
              </Text>
              <Text style={tailwind('text-xs text-gray-400')}>
                Supardi, S.pd
              </Text>
            </View>
            <View>
              <Text>07.00</Text>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View
            style={tailwind(
              'flex flex-row justify-between items-center border-l-5 border-abang rounded-lg bg-white mt-4 px-4  py-3  ',
            )}>
            <View>
              <Text style={tailwind('text-tiny text-gray-500')}>
                Pendidikan Agama Islam
              </Text>
              <Text style={tailwind('text-xs text-gray-400')}>
                Supardi, S.pd
              </Text>
            </View>
            <View>
              <Text style={tailwind('text-xs')}>07.00</Text>
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight>
          <View
            style={tailwind(
              'flex flex-row justify-between items-center border-l-5 border-biru rounded-lg bg-white mt-4 px-4 py-3 ',
            )}>
            <View>
              <Text style={tailwind('text-tiny text-gray-500')}>
                Pendidikan Agama Islam
              </Text>
              <Text style={tailwind('text-xs text-gray-400')}>
                Supardi, S.pd
              </Text>
            </View>
            <View>
              <Text>07.00</Text>
            </View>
          </View>
        </TouchableHighlight>
        {[1, 2, 3, 4, 5, 6].map((data, key) => (
          <TouchableHighlight key={key}>
            <View
              style={tailwind(
                'flex flex-row justify-between items-center border-l-5 border-gray-300 rounded-lg bg-white mt-4 px-4 py-3 ',
              )}>
              <View>
                <Text style={tailwind('text-tiny text-gray-500')}>
                  Pendidikan Agama Islam
                </Text>
                <Text style={tailwind('text-sm text-gray-400')}>
                  Supardi, S.pd
                </Text>
              </View>
              <View>
                <Text>07.00</Text>
              </View>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    </React.Fragment>
  );
};

export default Home;
