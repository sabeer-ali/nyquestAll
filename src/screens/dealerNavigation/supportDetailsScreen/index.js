import React from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {
  PrimaryCommonLayout,
  CommonBottomNavigator,
  CustomList,
  CustomTabView,
} from '../../../components';
import {
  contactSupportIcon,
  infoSqureIcon,
  supportAgentIcon,
  helpSupportIcon,
} from '../../../assets';
import primaryCommonLayout from '../../../components/primaryCommonLayout';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {iconLVIcon, playIcon} from '../../../assets';

export default SupportDetailsScreen = ({navigation, route}) => {
  const [routes] = React.useState([
    {key: 'productManual', title: 'Product Manual'},
    {key: 'installationVideo', title: 'Installation Video'},
  ]);

  const FirstRoute = () => (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}>
      <CustomList
        config
        navigateNext
        deviceName="iCON LV"
        deviceId="Added on 01/11/2020"
        deviceConfigStatus="NOT CONFIGURED"
        // onpress={() => navigation.navigate('deviceInfo')}
        icon={iconLVIcon}
        iconBgColor="#e746451a"
      />
      <CustomList
        config
        navigateNext
        deviceName="iCON HV"
        deviceId="Added on 01/11/2020"
        deviceConfigStatus="NOT CONFIGURED"
        // onpress={() => navigation.navigate('deviceInfo')}
        icon={iconLVIcon}
        iconBgColor="#e746451a"
      />
    </View>
  );

  const SecondRoute = () => (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}>
      <CustomList
        config
        navigateNext
        deviceName="iCON LV"
        deviceId="04:20 | 01/11/2020"
        deviceConfigStatus="NOT CONFIGURED"
        // onpress={() => navigation.navigate('deviceInfo')}
        icon={playIcon}
        iconBgColor="#212121"
      />
      <CustomList
        config
        navigateNext
        deviceName="iCON HV"
        deviceId="05:20 | 01/11/2020"
        deviceConfigStatus="NOT CONFIGURED"
        // onpress={() => navigation.navigate('deviceInfo')}
        icon={playIcon}
        iconBgColor="#212121"
      />
    </View>
  );

  const renderScene = SceneMap({
    productManual: FirstRoute,
    installationVideo: SecondRoute,
  });
  return (
    <View style={{flex: 1}}>
      <PrimaryCommonLayout
        leftIconAction={() => navigation.navigate('dealerSupport')}
        centerText={route.params.data}>
        <CustomTabView routes={routes} renderScene={renderScene} />
      </PrimaryCommonLayout>
      <View style={{backgroundColor: '#F5F8FF'}}>
        <CommonBottomNavigator navigation={navigation} state="supportScreen" />
      </View>
    </View>
  );
};
