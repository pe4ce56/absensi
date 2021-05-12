const {API_ENDPOINT} = require('../config/config');
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
const instance = token => {
  return axios.create({
    baseURL: API_ENDPOINT,
    timeout: 1000,
    headers: {Authorization: 'Bearer ' + token},
  });
};

const logout = async navigation => {
  await AsyncStorage.removeItem('token');
  navigation.navigate('Login');
};

const authCheck = async (status, navigation) => {
  if (status == 403 || status == 401) {
    await logout(navigation);
  }
};
module.exports = {instance, authCheck, logout};
