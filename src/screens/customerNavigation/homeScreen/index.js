import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {logoIcon, notificationIcon, iconLVIcon} from '../../../assets';
import {
  CustomHeader,
  CustomInput,
  CustomList,
  CommonBottomNavigator,
} from '../../../components';
import Styles from './styles';

export default HomeScreen = ({navigation}) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.topSection}>
        <CustomHeader leftIcon={logoIcon} rightIcon={notificationIcon} />
        <Text style={Styles.welcomeText}>Welcome</Text>
        <Text style={Styles.descriptionText}>Here is your device list</Text>
        <View style={Styles.inputContainer}>
          <CustomInput />
        </View>
      </View>
      <View style={Styles.bottomSection}>
        <View style={Styles.configDeviceContainer}>
          <Text style={Styles.configDevice}>Configured Devices</Text>

          <View style={Styles.deviceCountContainer}>
            <Text style={Styles.deviceCount}>07 Devices</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomList
            customerName="customer Name"
            deviceName="iCON LV"
            deviceNickName="Device Nick Name"
            deviceId="A12XA1000005"
            onpress={() => navigation.navigate('deviceInfo')}
            navigateNext
            icon={iconLVIcon}
            iconBgColor="#DBD3EB"
          />
          <CustomList
            customerName="customer Name"
            deviceName="iCON LV"
            deviceNickName="Device Nick Name"
            deviceId="A12XA1000005"
            onpress={() => navigation.navigate('deviceInfo')}
            navigateNext
            icon={iconLVIcon}
            iconBgColor="#DBD3EB"
          />
          <CustomList
            customerName="customer Name"
            deviceName="iCON LV"
            deviceNickName="Device Nick Name"
            deviceId="A12XA1000005"
            onpress={() => navigation.navigate('deviceInfo')}
            navigateNext
            icon={iconLVIcon}
            iconBgColor="#DBD3EB"
          />
          <CustomList
            customerName="customer Name"
            deviceName="iCON LV"
            deviceNickName="Device Nick Name"
            deviceId="A12XA1000005"
            onpress={() => navigation.navigate('deviceInfo')}
            navigateNext
            icon={iconLVIcon}
            iconBgColor="#DBD3EB"
          />
          <CustomList
            customerName="customer Name"
            deviceName="iCON LV"
            deviceNickName="Device Nick Name"
            deviceId="A12XA1000005"
            onpress={() => navigation.navigate('deviceInfo')}
            navigateNext
            icon={iconLVIcon}
            iconBgColor="#DBD3EB"
          />
          <CustomList
            customerName="customer Name"
            deviceName="iCON LV"
            deviceNickName="Device Nick Name"
            deviceId="A12XA1000005"
            onpress={() => navigation.navigate('deviceInfo')}
            navigateNext
            icon={iconLVIcon}
            iconBgColor="#DBD3EB"
          />
          <CustomList
            customerName="customer Name"
            deviceName="iCON LV"
            deviceNickName="Device Nick Name"
            deviceId="A12XA1000005"
            onpress={() => navigation.navigate('deviceInfo')}
            navigateNext
            icon={iconLVIcon}
            iconBgColor="#DBD3EB"
          />
        </ScrollView>
      </View>
      <View style={{backgroundColor: '#F5F8FF'}}>
        <CommonBottomNavigator navigation={navigation} state="homeScreen" />
      </View>
    </View>
  );
};
