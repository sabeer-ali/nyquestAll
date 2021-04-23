import React from 'react';
import {View, Modal, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeModules} from 'react-native';

import {
  TopBottomLayout,
  CustomWrapper,
  CustomHeaderWithDesc,
  CustomList,
  CustomHeader,
} from '../../../components';
import {CommonStyles} from '../../../utils/CommonStyles';
import {
  DeviceCommunication_wifisetup,
  DeviceCommunication_ExitConfig,
} from '../../../utils/deviceConfigs/deviceConfig';
import {Loader} from '../../../utils/commonUtils';
import {closeIcon, wifiIcon, iconLVIcon} from '../../../assets';
import Styles from './styles';

const DeviceInfo = ({
  setCustomerDetails,
  setModal,
  isData,
  setReConfig,
  setReDeploy,
  deviceDetails,
  handleConfig,
  isLoading,
  isConnected,
  navigation,
}) => {
  return (
    <CustomWrapper bg="#F5F8FF" btlr25 btrr25>
      <View style={Styles.deviceInfoContainer}>
        <CustomHeaderWithDesc
          headerText={isConnected ? 'Success' : 'Confirm'}
          descText={
            isConnected
              ? 'Device has been added to your account '
              : 'Are you sure? Want to add this device?'
          }
        />
      </View>
      <View style={Styles.deviceDetailsContainer}>
        <CustomList
          deviceInfo
          deviceName={deviceDetails !== null ? deviceDetails.devicetype : 'NA'}
          deviceId={deviceDetails !== null ? deviceDetails.deviceId : 'NA'}
          // deviceConfigStatus={isData ? 'CONFIGURED' : 'NOT CONFIGURED'}
          colorChanged="#7AB78C"
          icon={iconLVIcon}
          iconBgColor={
            '#C4C4C4'
            // deviceDetails !== null
            //   ? deviceDetails.dev_category === 'H' && '#e746451a'
            //   : '#C4C4C4'
          }
        />
      </View>
      <CustomWrapper ph3>
        {isLoading ? (
          <Loader />
        ) : (
          <CustomButton
            text={isConnected ? 'Done' : 'Confirm'}
            backgroundStyle={CommonStyles.buttonBgStyle}
            textStyle={CommonStyles.buttonTextStyle}
            onpress={() => {
              isConnected
                ? navigation.navigate('CustomerBottomNavigator')
                : handleConfig();
            }}
          />
        )}
      </CustomWrapper>
    </CustomWrapper>
  );
};

const BottomSection = ({navigation, deviceDetails}) => {
  const [isModal, setModal] = React.useState(false);
  const [isLoading, setLoader] = React.useState(false);
  const [ssid, setSSID] = React.useState('');
  const [wifiPassword, setWifiPassword] = React.useState('');
  const [wifiList, setWifiList] = React.useState([]);
  const [selectedWifi, setSelectedWifi] = React.useState('');
  const [isConnected, setConnection] = React.useState(false);
  const [deviceCommunicationData, setDeviceCommunicationDat] = React.useState(
    '',
  );
  const [isPopup, setPopup] = React.useState(false);

  const handleWifiSelection = item => {
    setModal(true);
    setSelectedWifi(item);
    setSSID(item);
  };

  React.useEffect(() => {
    AsyncStorage.getItem('@res_devCommunication_stage_1').then(resDb => {
      const jsonValue = JSON.parse(resDb);
      if (jsonValue) {
        setDeviceCommunicationDat(jsonValue);
      }
    });

    NativeModules.WifiConnectivity.onCreate(res => {
      if (res) NativeModules.WifiConnectivity.onPause();
      if (typeof res === 'string') {
        let jsonValue = JSON.parse(res);
        setWifiList(jsonValue);
      } else {
        setWifiList(res);
      }
    });
  }, []);

  const handleConfig = () => {
    setLoader(true);
    setTimeout(() => {
      DeviceCommunication_wifisetup(
        deviceCommunicationData.deviceType === 1 ||
          deviceCommunicationData.deviceType === 2
          ? 'LV'
          : 'HV',
        {
          sessionId: deviceCommunicationData.sessionId,
          wifiSSID: selectedWifi !== '' ? selectedWifi : ssid,
          wifiPassword: wifiPassword,
        },
        resWifi => {
          console.log('resWifi ===> ', resWifi);
          setConnection(true);
        },
      );
      setLoader(false);
    }, 5000);
  };

  return (
    <CustomWrapper flex={1} styles={{justifyContent: 'flex-end'}}>
      <ScrollView>
        {wifiList.length
          ? wifiList
              .filter(data => data !== '')
              .map((item, index) => {
                return (
                  <CustomList
                    key={index}
                    defaultList
                    onpress={() => handleWifiSelection(item)}
                    navigateNext
                    icon={wifiIcon}
                    defaultText={item}
                  />
                );
              })
          : null}
      </ScrollView>
      <Button
        uppercase={false}
        mode="contained"
        style={[
          CommonStyles.halfmodalButton,
          {
            backgroundColor: '#7F91BB',
            width: '90%',
            alignSelf: 'center',
          },
        ]}
        labelStyle={CommonStyles.buttonTextStyle}
        onPress={() => {
          setModal(true);
        }}>
        Enter Manually
      </Button>
      {isModal && (
        <Modal visible={true} animationType="fade" transparent={true}>
          <View style={{flex: 1, backgroundColor: '#000000a6'}}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#000000a6',
              }}></View>
            <View
              style={{
                flex: isPopup ? 0.8 : 1.3,
                backgroundColor: '#000000a6',
              }}>
              <CustomWrapper flex={1} bg="#fff" btlr25 btrr25>
                {isPopup ? (
                  <>
                    <DeviceInfo
                      deviceDetails={deviceDetails}
                      handleConfig={handleConfig}
                      isLoading={isLoading}
                      isConnected={isConnected}
                      navigation={navigation}
                    />
                  </>
                ) : (
                  <>
                    <CustomHeader
                      rightIcon={closeIcon}
                      rightIconAction={() => setModal(false)}
                    />
                    <CustomWrapper pv3>
                      <CustomHeaderWithDesc
                        headerText="Enter WiFi details"
                        descText="Enter your WiFi details to continue"
                      />
                    </CustomWrapper>

                    <CustomWrapper ph25>
                      <CustomWrapper pv1>
                        <CustomInput
                          form
                          placeholder="WiFi Name"
                          value={ssid.toString()}
                          onChange={value => setSSID(value)}
                        />
                      </CustomWrapper>

                      <CustomWrapper pv1>
                        <CustomInput
                          form
                          placeholder="WiFi Password"
                          value={wifiPassword.toString()}
                          onChange={value => {
                            setWifiPassword(value);
                          }}
                        />
                      </CustomWrapper>
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <Button
                          uppercase={false}
                          mode="contained"
                          style={[
                            CommonStyles.halfmodalButton,
                            {
                              backgroundColor: '#E28534',
                              width: '90%',
                              alignSelf: 'center',
                            },
                          ]}
                          labelStyle={CommonStyles.buttonTextStyle}
                          onPress={() => {
                            // handleConfig();
                            setPopup(true);
                            setModal(true);
                          }}>
                          Save
                        </Button>
                      )}
                    </CustomWrapper>
                  </>
                )}
              </CustomWrapper>
            </View>
          </View>
        </Modal>
      )}
    </CustomWrapper>
  );
};

const WifiSetupScreen = ({navigation, route}) => {
  const [deviceDetails, setDeviceDetails] = React.useState(null);
  React.useEffect(() => {
    if (route.params) {
      console.log('deviceDetails --- ==== ', route.params.deviceDetails);
      setDeviceDetails(route.params.deviceDetails);
      // deviceDetails
    }
  });
  return (
    <View style={{flex: 1}}>
      <TopBottomLayout
        topHeight={0.1}
        bottomHeight={1}
        backButtonType="backArrow"
        backButtonAction={() => navigation.goBack()}
        topSection={null}
        bottomSection={
          <BottomSection
            navigation={navigation}
            deviceDetails={deviceDetails}
          />
        }
      />
    </View>
  );
};

export default WifiSetupScreen;
