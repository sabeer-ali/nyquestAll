import * as React from 'react';
import {StatusBar} from 'react-native';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import StackNav from './StackNavigations';

const NavigationWrapper = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#243A5E" />
      <StackNav />
    </NavigationContainer>
  );
};

export default NavigationWrapper;
