import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Styles from './styles';
import {
  homeIcon,
  dashboardIcon,
  plusIcon,
  contactSupportIcon,
  customerIcon,
} from '../../assets';
export default CommonBottomNavigator = ({navigation, state}) => {
  return (
    <View style={Styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('home', {
            state,
          })
        }>
        <Image
          source={homeIcon}
          style={
            state === 'homeScreen'
              ? {tintColor: '#243A5E'}
              : {tintColor: '#BDBDBD'}
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('dashboard', {
            state,
          })
        }>
        <Image
          source={dashboardIcon}
          style={state === 'dashboardScreen' && {tintColor: '#243A5E'}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('deviceConfig', {
            state,
          })
        }
        style={Styles.plusButtonStyle}>
        <Image source={plusIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('support', {
            state,
          });
        }}>
        <Image
          source={contactSupportIcon}
          style={state === 'supportScreen' && {tintColor: '#243A5E'}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('myAccount', {
            state,
          });
        }}>
        <Image
          source={customerIcon}
          style={
            state === 'myAccount'
              ? {tintColor: '#243A5E'}
              : {tintColor: '#BDBDBD'}
          }
        />
      </TouchableOpacity>
    </View>
  );
};
