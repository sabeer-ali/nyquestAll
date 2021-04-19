import * as React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  LoginScreen,
  DealerLoginScreen,
  HomeScreen,
  DeviceInfoScreen,
  InstallationDetailsScreen,
  DashboardScreen,
  SupportScreen,
  SupportDetailsScreen,
  DeviceConfigScreen,
  DeviceConfigDeviceInfoScreen,
  deviceConfigCustomerDetailsScreen,
  deviceConfigStepsScreen,
  deviceConfigMenuScreen,
  serverConfigScreen,
  FAQScreen,
  MyAccountScreen,
  WifiSetupScreen,
  UserListScreen,
} from '../screens';

const Stack = createStackNavigator();

const StackNav = props => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={UserListScreen}
        options={{title: 'Login', headerShown: false}}
      />
      {/* <Stack.Screen
        name="dealerlogin"
        component={UserListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="customerlogin"
        component={UserListScreen}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default StackNav;
