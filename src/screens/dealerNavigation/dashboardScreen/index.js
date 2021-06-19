import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Styles from './styles';
import {CommonBottomNavigator, CustomSecondaryList} from '../../../components';
import {
  dashboardIcon,
  solarIcon,
  healthIcon,
  configDeviceIcons,
  timeIcon,
  batteryIcon,
  solarSavingIcon,
  co2Icon,
  treeIcon,
} from '../../../assets';

export default DashboardScreen = ({navigation}) => {
  const getDashboardDetails = () => {
    let endPoints = '';
    MiddleWareForAuth('GET', endPoints, null, (res, err) => {
      setLoader(false);
      console.log('res, err in Home screen', res.data, err);
      if (err === null) {
        if (res !== null && err === null && res.data) {
          if (res.data && res.data.status && res.data.status === 'error') {
            showToaster('error', res.data.message);
          } else {
            console.log('res.data.devlst', res.data.data);

            if (res && res.data && res.data.data) {
              let data = [...deviceList, ...res.data.data];
              setDeviceList(data);
              setDeviceCount(res.data.devicecnt);
            }
          }
        }
      } else {
        console.error('Device List in Home API Error', err);
        showToaster('error', 'Somthing went wrong');
      }
    });
  };
  return (
    <View style={Styles.container}>
      {/* <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}> */}
      <View style={Styles.topSection}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 8,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={dashboardIcon} style={{tintColor: '#E28534'}} />
        </View>
        <Text style={Styles.welcomeText}>Dashboard</Text>
        <Text style={Styles.descriptionText}>
          Here is your overall data overview
        </Text>
      </View>
      <View style={Styles.bottomSection}>
        <View style={Styles.secondaryListing}>
          <CustomSecondaryList
            text1="Solar"
            text2="Today"
            image={configDeviceIcons}
            bgColor="#77C5E4"
            value="100.97"
            params="kWh"
          />
          <CustomSecondaryList
            text1="Device"
            text2="Status"
            image={healthIcon}
            bgColor="#7AB78C"
            value="Live"
          />
        </View>
        <View style={Styles.secondaryListing}>
          <CustomSecondaryList
            text1="Last"
            text2="Update"
            image={timeIcon}
            bgColor="#5BBDC0"
            time="17:00:35"
            date="31/10/20"
          />

          <CustomSecondaryList
            text1="Total"
            text2="Savings"
            image={solarSavingIcon}
            bgColor="#F8AB9B"
            value="100.97"
            params="kWh"
          />
        </View>
        <View style={Styles.secondaryListing}>
          <CustomSecondaryList
            text1="Co2"
            text2="Savings"
            image={co2Icon}
            bgColor="#6F6F6F"
            value="83.62"
            params="kg"
          />

          <CustomSecondaryList
            text1="Trees"
            text2="Saved"
            image={treeIcon}
            bgColor="#9CD09F"
            value="04"
            params="Trees"
          />
        </View>
      </View>
      {/* </ScrollView> */}
      <View style={{backgroundColor: '#F5F8FF'}}>
        <CommonBottomNavigator
          navigation={navigation}
          state="dashboardScreen"
        />
      </View>
    </View>
  );
};
