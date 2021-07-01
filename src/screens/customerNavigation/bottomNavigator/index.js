import React from 'react';
import {View, Text, Image} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import {color, CommonStyles} from '../../../utils/CommonStyles';
import {
  dashboardIcon,
  supportExclamation,
  customerSmallIcon,
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
    {key: 'settings', icon: supportExclamation},
    {
      key: 'myAccount',
      icon: data => {
        return (
          <Image
            source={customerSmallIcon}
            style={{width: 20, height: 20, tintColor: data.color}}
          />
        );
      },
    },
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
