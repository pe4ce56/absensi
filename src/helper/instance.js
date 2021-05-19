const {API_ENDPOINT} = require('../config/config');
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
const instance = token => {
  return axios.create({
    baseURL: API_ENDPOINT,
    timeout: 10000,
    headers: {
      Authorization: 'Bearer ' + token,
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
};

const logout = async navigation => {
  await AsyncStorage.removeItem('token');
  navigation.navigate('Login');
};

const authCheck = async (status, navigation) => {
  if (status == 401 || status == 403) {
    await logout(navigation);
  }
};
module.exports = {instance, authCheck, logout};
