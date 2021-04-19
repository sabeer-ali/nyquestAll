import React from 'react';
import {View, Image, StatusBar} from 'react-native';
import Styles from './style.js';
import {logoWithText} from '../../assets';

const SplashScreen = () => (
  <View style={Styles.container}>
    <StatusBar backgroundColor="#243A5E" />
    <Image source={logoWithText} />
  </View>
);

export default SplashScreen;
