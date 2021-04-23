import AsyncStorage from '@react-native-async-storage/async-storage';

const StoreLocalDB = async (key, value, callback) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    if (callback) callback(null);
  } catch (e) {
    console.error('Err in Async Data STORE', e);
    if (e && callback) callback(e);
  }
};

const getLocalDB = async (key, callback) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (callback) callback(null);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Err in Async Data GET', e);
    if (callback) callback(null);
  }
};
export {StoreLocalDB, getLocalDB};
