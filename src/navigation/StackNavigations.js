import * as React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  WifiSetupScreen,
  DeviceConfigDeviceInfoScreen,
  DeviceConfigScreen,
  NotificationScreen,
  DealerMyAccountEditScreen,
  CustomerMyAccountScreen,
  CustomerBottomNavigator,
  CustomerLoginScreen,
  DealerMyAccountScreen,
  DealerSupportDetailsScreen,
  DealerSupportScreen,
  DealerDashboardScreen,
  DealerInstallationDetailsScreen,
  DealerDeviceInfoScreen,
  DealerWifiSetupScreen,
  DealerServerConfigScreen,
  DealerDeviceConfigMenuScreen,
  DealerDeviceConfigDeviceInfoScreen,
  DealerDeviceConfigScreen,
  DealerHomeScreen,
  DealerLoginScreen,
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
      <Stack.Screen
        name="dealerlogin"
        component={DealerLoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="dealerHome"
        component={DealerHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="dealerDeviceConfig"
        component={DealerDeviceConfigScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="dealerDeviceConfigDeviceInfo"
        component={DealerDeviceConfigDeviceInfoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="dealerDeviceConfigMenu"
        component={DealerDeviceConfigMenuScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="dealerServerConfig"
        component={DealerServerConfigScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="dealerWifiSetup"
        component={DealerWifiSetupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="dealerDeviceInfo"
        component={DealerDeviceInfoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="dealerInstallationDetails"
        component={DealerInstallationDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="dealerDashboard"
        component={DealerDashboardScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="dealerSupport"
        component={DealerSupportScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="dealerSupportDetails"
        component={DealerSupportDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="dealerMyAccount"
        component={DealerMyAccountScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="dealerMyAccountEdit"
        component={DealerMyAccountEditScreen}
        options={{headerShown: false}}
      />
      {/* Customer Login */}
      <Stack.Screen
        name="customerLogin"
        component={CustomerLoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CustomerBottomNavigator"
        component={CustomerBottomNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="customerMyAccount"
        component={CustomerMyAccountScreen}
        options={{headerShown: false}}
      />
      {/* Common Screen */}
      <Stack.Screen
        name="notification"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="deviceConfig"
        component={DeviceConfigScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="deviceConfigDeviceInfo"
        component={DeviceConfigDeviceInfoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="wifiSetup"
        component={WifiSetupScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNav;
