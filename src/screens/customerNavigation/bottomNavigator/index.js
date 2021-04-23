import React from 'react';
import {View, Text, Image} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import {color, CommonStyles} from '../../../utils/CommonStyles';
import {
  dashboardIcon,
  singleSettingsIcon,
  customer2Icon,
} from '../../../assets';

import {
  CustomerSupportScreen,
  CustomerMyAccountScreen,
  CustomerDashboardScreen,
} from '../index';

const BottomNavigator = ({navigation}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'dashboard',
      icon: dashboardIcon,
    },
    {key: 'settings', icon: singleSettingsIcon},
    {key: 'myAccount', icon: customer2Icon},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    dashboard: CustomerDashboardScreen,
    settings: CustomerSupportScreen,
    myAccount: CustomerMyAccountScreen,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor={'#51648B'}
      inactiveColor="#BDBDBD"
      barStyle={{
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderTopLeftRadius: 15,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopRightRadius: 15,
        height: 50,
        width: '100%',
        justifyContent: 'center',
      }}
      style={{}}
    />
  );
};

export default BottomNavigator;
