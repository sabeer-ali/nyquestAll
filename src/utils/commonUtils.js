import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const getAllKeys = async () => {
  let data = await AsyncStorage.getAllKeys();
  console.log('ALL Keys...', data);
};

const StoreLocalDB = async (key, value, callback) => {
  try {
    const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
    await getLocalDB(key, resGetLocal => {
      if (resGetLocal !== null) {
        AsyncStorage.removeItem(key);
      }
    });
    await AsyncStorage.setItem(key, jsonValue);
    console.log('key, value in DB -->', key, value, jsonValue);
    if (callback) callback(null);
  } catch (e) {
    console.error('Err in Async Data STORE', e);
    if (e) {
      if (callback) callback(e);
    }
  }
};

const getLocalDB = async (key, callback) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (callback) {
      callback(jsonValue != null ? JSON.parse(jsonValue) : null);
    } else {
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    }
  } catch (e) {
    console.error('Err in Async Data GET', e);
    if (callback) callback(null);
  }
};

const removeLocalDB = async (key, callback) => {
  try {
    await AsyncStorage.removeItem(key);
    AsyncStorage.getAllKeys().then(re => {
      console.error('Remove Async Data', re);
    });
    if (callback) callback();
  } catch (err) {
    console.error('Remove Async Data', err);
  }
};

const logOut = async (key, callback) => {
  await AsyncStorage.removeItem(key);
  if (callback) callback();
};

const Loader = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="" />
    </View>
  );
};

const showToaster = (type, msg) => {
  Toast.show({
    type: type ? type : 'error',
    position: 'top',
    text2: msg ? msg : 'Need A custom Message',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 10,
    bottomOffset: 40,
    onShow: () => {},
    onHide: () => {},
    onPress: () => {},
  });
};

export {
  Loader,
  showToaster,
  StoreLocalDB,
  getLocalDB,
  getAllKeys,
  logOut,
  removeLocalDB,
};
