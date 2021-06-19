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
import {getLocalDB, Loader} from '../../../utils/commonUtils';
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
  isConnected,
  navigation,
  isWifiUpdate,
  isLoadingForExit,
}) => {
  console.log('deviceDetails in 2nd popup', deviceDetails);
  const [isLoading, setLoader] = React.useState(false);

  const handleExitConfig = () => {
    // console.log('200', deviceCommunicationData);
    setLoader(true);
    if (isWifiUpdate) {
    } else {
      AsyncStorage.getItem('@res_devCommunication_stage_1_customer_main').then(
        resDb => {
          const jsonValue = JSON.parse(resDb);
          console.log('isWifiUpdate', jsonValue);
          setTimeout(() => {
            DeviceCommunication_ExitConfig(
              jsonValue.deviceType === 1 || jsonValue.deviceType === 2
                ? 'LV'
                : 'HV',
              {
                sessionId: jsonValue.sessionId,
              },
              resWifi => {
                console.log('res EXIT Config ===> ', resWifi);
                // setExitConfig(false);
                // setconfigStatus(true);
                setModal(false);
                navigation.navigate('CustomerBottomNavigator');
              },
            );
            setLoader(false);
          }, 5000);
        },
      );
    }
  };

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
        {isWifiUpdate ? (
          <CustomList
            deviceInfo
            deviceName={
              deviceDetails !== null ? deviceDetails.dev_category : 'NA'
            }
            deviceId={
              deviceDetails !== null
                ? deviceDetails.dev_id
                  ? deviceDetails.dev_id
                  : deviceDetails.deviceId
                : 'NA'
            }
            colorChanged="#7AB78C"
            icon={iconLVIcon}
            iconBgColor={'#C4C4C4'}
          />
        ) : (
          <CustomList
            deviceInfo
            deviceName={
              deviceDetails !== null ? deviceDetails.dev_category : 'NA'
            }
            deviceId={
              deviceDetails !== null
                ? deviceDetails.dev_id
                  ? deviceDetails.dev_id
                  : deviceDetails.deviceId
                : 'NA'
            }
            // deviceConfigStatus={isData ? 'CONFIGURED' : 'NOT CONFIGURED'}
            colorChanged="#7AB78C"
            icon={iconLVIcon}
            iconBgColor={'#C4C4C4'}
          />
        )}
      </View>
      <CustomWrapper ph3>
        {isLoading || isLoadingForExit ? (
          <Loader />
        ) : (
          <CustomButton
            text={isConnected ? 'Done' : 'Confirm'}
            backgroundStyle={CommonStyles.buttonBgStyle}
            textStyle={CommonStyles.buttonTextStyle}
            onpress={() => {
              isConnected ? handleExitConfig() : handleConfig();
            }}
          />
        )}
      </CustomWrapper>
    </CustomWrapper>
  );
};

const BottomSection = ({navigation, deviceDetails, isWifiUpdate}) => {
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
    if (isWifiUpdate) {
      getLocalDB('@customerDeviceManager', resDb => {
        const jsonValue = JSON.parse(resDb);
        setDeviceCommunicationDat(jsonValue);
      });
    } else {
      getLocalDB('@res_devCommunication_stage_1_customer', resDb => {
        const jsonValue = JSON.parse(resDb);
        if (jsonValue) {
          setDeviceCommunicationDat(jsonValue);
        }
      });
    }

    NativeModules.WifiConnectivity.onCreate(res => {
      if (res) NativeModules.WifiConnectivity.onPause();
      if (typeof res === 'string') {
        let jsonWifiList = JSON.parse(res);
        setWifiList(jsonWifiList);
      } else {
        setWifiList(res);
      }
    });

    console.log('isWifiUpdate', isWifiUpdate);
  }, []);

  const handleConfig = () => {
    setLoader(true);
    if (isWifiUpdate) {
      AsyncStorage.getItem('@customerDeviceManager').then(resDb => {
        const jsonValue = JSON.parse(resDb);
        console.log('isWifiUpdate', jsonValue);
        setTimeout(() => {
          DeviceCommunication_wifisetup(
            jsonValue.deviceType === 1 ||
              jsonValue.deviceType === 2 ||
              jsonValue.deviceType === 5 ||
              jsonValue.deviceType === 6
              ? 'LV'
              : 'HV',
            {
              sessionId: jsonValue.sessionId,
              wifiSSID: selectedWifi !== '' ? selectedWifi : ssid,
              wifiPassword: wifiPassword,
            },
            resWifi => {
              console.log('resWifi ===> ', resWifi);
              setConnection(true);
              if (isWifiUpdate) {
                navigation.navigate('customerDeviceConfigMenu');
              }
            },
          );
          setLoader(false);
        }, 5000);
      });
    } else {
      setTimeout(() => {
        getLocalDB('@res_devCommunication_stage_1_customer_main', resDb => {
          DeviceCommunication_wifisetup(
            resDb.deviceType === 1 || resDb.deviceType === 2 ? 'LV' : 'HV',
            {
              sessionId: resDb.sessionId,
              wifiSSID: selectedWifi !== '' ? selectedWifi : ssid,
              wifiPassword: wifiPassword,
            },
            resWifi => {
              console.log('resWifi ===> ', resWifi);
              setConnection(true);
            },
          );
        });
        setLoader(false);
      }, 5000);
    }
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
            <TouchableOpacity
              onPress={() => {
                setModal(false);
                setPopup(false);
              }}
              style={{
                flex: 1,
                backgroundColor: '#000000a6',
              }}></TouchableOpacity>
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
                      deviceDetails={deviceDetails}
                      isWifiUpdate={isWifiUpdate}
                      setModal={setModal}
                      isLoadingForExit={isLoading}
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
  const [isWifiUpdate, setWifiUpdate] = React.useState(false);
  React.useEffect(() => {
    if (route.params) {
      console.log('route.params', route.params.deviceDetails);
      setDeviceDetails(route.params.deviceDetails);
      if (route.params.wifiUpdate) {
        setWifiUpdate(route.params.wifiUpdate);
      }
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
            isWifiUpdate={isWifiUpdate}
          />
        }
      />
    </View>
  );
};

export default WifiSetupScreen;
