import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import NetInfo from '@react-native-community/netinfo';

import Styles from './styles';
import {
  TopBottomLayout,
  CustomList,
  CustomHeaderWithDesc,
} from '../../../components';
import {color, CommonStyles, primaryFont} from '../../../utils/CommonStyles';
import {
  settingsIcon,
  wifiSettingsIcon,
  iconLVIcon,
  deviceGreenIcon,
  deviceRedIcon,
  deviceBlueIcon,
} from '../../../assets';
import {
  MiddleWareForAuth,
  SAVED_DEVICE_DEPLOY,
} from '../../../utils/apiServices';
import {
  getLocalDB,
  Loader,
  removeLocalDB,
  toaster,
} from '../../../utils/commonUtils';
import {DeviceCommunication_ExitConfig} from '../../../utils/deviceConfigs/deviceConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImagePreview = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={require('../../../assets/demo/iCONprecise1.png')} />
    </View>
  );
};

const DeviceInfo = ({navigation, setExitConfig, deviceTypeApi}) => {
  const [deviceCommunicationData, setDeviceCommunicationDat] = React.useState(
    '',
  );
  const [isLoading, setLoader] = React.useState(false);
  const [exitDevice, setExitDevice] = React.useState(false);
  React.useEffect(() => {
    getLocalDB('@res_devCommunication_stage_1').then(resDb => {
      console.log('11 00 22', resDb);
      setDeviceCommunicationDat(resDb);
    });
  }, []);

  const handleExitConfig = () => {
    // getLocalDB('@deviceComData', res => {
    //   console.log('Server Data', res);
    //   getLocalDB('@replaceDvice', resReplaceDev => {
    //     console.log('resReplaceDev', resReplaceDev);
    //   });
    // });
    setLoader(true);
    setTimeout(() => {
      getLocalDB('@res_devCommunication_stage_1').then(resDb => {
        console.log('11 00 22', resDb);
        DeviceCommunication_ExitConfig(
          resDb.deviceType === 1 ||
            resDb.deviceType === 2 ||
            resDb.deviceType === 5 ||
            resDb.deviceType === 6
            ? 'LV'
            : 'HV',
          {
            sessionId: resDb.sessionId,
          },
          resWifi => {
            console.log('res EXIT Config ===> ', resWifi);
            setExitDevice(true);
          },
        );
      });
      setLoader(false);
    }, 5000);
  };

  const deviceDataApi = () => {
    NetInfo.fetch().then(state => {
      if (state.isInternetReachable) {
        getLocalDB('@ReconfigData', resReconfig => {
          if (resReconfig) {
            getLocalDB('@deviceComData', resCommonServerData => {
              resCommonServerData.reconfigure = '1';
              console.log('Reconfigure Data=== >', resCommonServerData);
              if (
                resCommonServerData.batage !== '' &&
                resCommonServerData.batmake !== '' &&
                resCommonServerData.batmaxvolt !== '' &&
                resCommonServerData.batmodel !== ''
              ) {
                MiddleWareForAuth(
                  'POST',
                  SAVED_DEVICE_DEPLOY,
                  resCommonServerData,
                  (res, err) => {
                    if (err === null) {
                      if (res !== null && res.data) {
                        if (res.data.code == '10') {
                          console.log('res.data in EXit Config', res.data);
                          AsyncStorage.removeItem('@ReconfigData').then(
                            res1 => {
                              console.log('res.data in EXit Config res1', res1);
                              AsyncStorage.removeItem('@deviceComData').then(
                                res2 => {
                                  console.log(
                                    'res.data in EXit Config res2',
                                    res2,
                                  );
                                },
                              );
                            },
                          );

                          setExitConfig(true);
                        } else {
                          if (res.data && res.data.msg && res.data.msg) {
                            // toaster('error', res.data.msg);
                            console.error(res.data.msg);
                          }
                        }
                      }
                    } else {
                      console.error('Login OTP Check Error', err);
                      // toaster('error', 'Something went wrong');
                    }
                  },
                );
              } else {
                Alert.alert(
                  'Warning',
                  'No Data Available For Sync. Are You Sure You Want to Exit ?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        setExitDevice(true);
                        setExitConfig(true);
                      },
                    },
                  ],
                );
              }
            });
          } else {
            console.log('May be replacement or normal');
            getLocalDB('@deviceComData', res => {
              // console.log('Server Data', res);
              getLocalDB('@replaceDvice', resReplaceDev => {
                console.log('resReplaceDev', resReplaceDev);
                if (
                  resReplaceDev !== null &&
                  resReplaceDev &&
                  resReplaceDev.isReplace
                ) {
                  res.replace = '1';
                  res.reconfigure = '0';
                  res.olddevid = resReplaceDev.customerData.deviceId;
                  res.custid = resReplaceDev.customerData.customerid;
                  if (res.invcap == '' && res.invdesc == '') {
                    console.log('Data is Empty FUNDED');
                    res.invcap = resReplaceDev.invcap;
                    res.invdesc = resReplaceDev.invdesc;
                  }
                }
                console.log('Final Data Server Data ==> ', res);
                if (
                  res.batage !== '' &&
                  res.batmake !== '' &&
                  res.batmaxvolt !== '' &&
                  res.batmodel !== ''
                ) {
                  MiddleWareForAuth(
                    'POST',
                    SAVED_DEVICE_DEPLOY,
                    res,
                    (res, err) => {
                      if (err === null) {
                        if (res !== null && res.data) {
                          if (res.data.code == '10') {
                            console.log('res.data in EXit Config', res.data);
                            AsyncStorage.removeItem('@replaceDvice').then(
                              res3 => {
                                console.log(
                                  'res.data in @replaceDvice res3',
                                  res3,
                                );
                                AsyncStorage.removeItem('@deviceComData').then(
                                  res4 => {
                                    console.log(
                                      'res.data in @deviceComData res4',
                                      res4,
                                    );
                                  },
                                );
                              },
                            );
                            setExitConfig(true);
                          } else {
                            if (res.data && res.data.msg && res.data.msg) {
                              // toaster('error', res.data.msg);
                              console.error(res.data.msg);
                            }
                          }
                        }
                      } else {
                        console.error('Login OTP Check Error', err);
                        // toaster('error', 'Something went wrong');
                      }
                    },
                  );
                } else {
                  Alert.alert(
                    'Warning',
                    'No Data Available For Sync. Are You Sure You Want to Exit ?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => {
                          setExitDevice(true);
                          setExitConfig(true);
                        },
                      },
                    ],
                  );
                }
              });
            });
          }
        });
        // .finally(() => {
        //   removeLocalDB('@ReconfigData', res => {
        //     console.log('Removed @ReconfigData');
        //     removeLocalDB('@deviceComData', res1 => {
        //       console.log('Removed @deviceComData');
        //     });
        //   });
        // });
      } else {
        alert('No Internet Connection');
      }
    });
  };

  return (
    <View>
      <View style={Styles.deviceInfoContainer}>
        <CustomHeaderWithDesc
          headerText="Configuration Menu"
          descText="Configuration settings of the device"
        />
      </View>
      <View style={Styles.deviceDetailsContainer}>
        <CustomList
          config
          navigateNext
          deviceName="Configure Device"
          deviceId="Configure or reconfigure your device"
          onpress={() =>
            navigation.navigate('dealerServerConfig', {
              deviceTypeApi,
            })
          }
          icon={settingsIcon}
          iconBgColor="#7f91bb33"
        />
        <CustomList
          config
          navigateNext
          deviceName="Wifi Setup"
          deviceId="Setup a wifi connection for the device"
          onpress={() => navigation.navigate('dealerWifiSetup')}
          icon={wifiSettingsIcon}
          iconBgColor="#7f91bb33"
        />
      </View>
      <View style={CommonStyles.buttonWrapper}>
        {isLoading ? (
          <Loader />
        ) : (
          <CustomButton
            text={exitDevice ? 'Sync Data' : 'Exit Configuration'}
            backgroundStyle={[
              CommonStyles.buttonBgStyle,
              {backgroundColor: '#F3937E'},
            ]}
            textStyle={CommonStyles.buttonTextStyle}
            onpress={() => (exitDevice ? deviceDataApi() : handleExitConfig())}
          />
        )}
      </View>
    </View>
  );
};

const ConfirmPopUp = ({setExitConfig, setconfigStatus}) => {
  return (
    <View style={{marginVertical: 40}}>
      <CustomHeaderWithDesc
        headerText="Exit Configuration"
        descText="Are you sure? Do you want to disconnect from device hotspot ‘SOLICON’?"
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 25,
          marginTop: 50,
        }}>
        <Button
          compact={true}
          uppercase={false}
          mode="contained"
          style={{
            backgroundColor: '#7F91BB',
            width: '49%',
            borderRadius: 10,
            height: 44,
          }}
          onPress={() => setExitConfig(false)}>
          No
        </Button>
        <Button
          compact={true}
          uppercase={false}
          mode="contained"
          onPress={() => {
            setExitConfig(false);
            setconfigStatus(true);
          }}
          style={{
            backgroundColor: '#E28534',
            width: '49%',
            borderRadius: 10,
            height: 44,
          }}>
          Yes
        </Button>
      </View>
    </View>
  );
};

const ConfigStatusPopUp = ({setNavTohome}) => {
  return (
    <ScrollView contentContainerStyle={{marginVertical: 40}}>
      <CustomHeaderWithDesc
        headerText="Configuration Status"
        descText="Check your device LED color for configuration status"
      />
      <View
        style={{
          justifyContent: 'space-between',
          paddingHorizontal: 25,
          marginTop: 50,
        }}>
        <CarouselCards />

        <Button
          uppercase={false}
          mode="contained"
          onPress={() => setNavTohome()}
          style={{
            backgroundColor: '#E28534',
            width: '100%',
            borderRadius: 10,
            height: 44,
          }}>
          Done
        </Button>
      </View>
    </ScrollView>
  );
};

const data = [
  {
    body:
      'If the device LED becomes steady Green, then the connections from both the device to wifi router & router to server is a success.',
    imgUrl: deviceGreenIcon,
  },
  {
    body:
      'If the LED color becomes steady Blue, then the connection from the device to wifi router is a success & router to server is a failure',
    imgUrl: deviceBlueIcon,
  },
  {
    body:
      'If the LED color becomes steady Red, then the connections from both the device to wifi router & router to the server is a failure. Please retry by configuring wifi again.',
    imgUrl: deviceRedIcon,
  },
];

const CarouselCardItem = ({item, index}) => {
  return (
    <View
      style={{
        borderRadius: 8,
        width: '95%',
        height: 330,
        paddingBottom: 40,
        backgroundColor: '#fff',
      }}
      key={index}>
      <View
        style={{
          backgroundColor: '#7f91bb33',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          minHeight: 180,
        }}>
        <Image source={item.imgUrl} />
      </View>
      <Text
        style={{
          fontFamily: primaryFont,
          fontWeight: '500',
          fontSize: 14,
          color: color.black,
          lineHeight: 25,
          marginTop: 30,
        }}>
        {item.body}
      </Text>
    </View>
  );
};

const CarouselCards = () => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    <View style={{}}>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={Dimensions.get('screen').width - 50}
        itemWidth={Dimensions.get('screen').width - 30}
        onSnapToItem={index => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
};

const deviceConfigMenuScreen = ({route, navigation}) => {
  const [exitConfig, setExitConfig] = useState(false);
  const [configStatus, setconfigStatus] = useState(false);
  const [isModal, setModal] = useState(false);
  const [deviceTypeApi, setDeviceTypeApi] = useState('');

  useEffect(() => {
    if (route && route.params && route.params.deviceTypeApi) {
      setDeviceTypeApi(route.params.deviceTypeApi);
    }
  }, []);

  useEffect(() => {
    if (exitConfig) setModal(true);

    return () => {
      console.log('Um Mounted');
    };
  }, [exitConfig]);

  const setNavTohome = () => {
    setExitConfig(false);
    setconfigStatus(false);
    setModal(false);
    console.log('exitConfig', exitConfig);
    console.log('setconfigStatus', configStatus);

    navigation.navigate('dealerHome');
  };

  return (
    <View style={{flex: 1}}>
      <TopBottomLayout
        topHeight={0.5}
        bottomHeight={1}
        backButtonAction={() => navigation.goBack()}
        topSection={<ImagePreview />}
        bottomSection={
          <DeviceInfo
            navigation={navigation}
            setExitConfig={setExitConfig}
            deviceTypeApi={deviceTypeApi}
          />
        }
      />
      {isModal && (
        <Modal visible={true} animationType="fade" transparent={true}>
          <View style={{flex: 1, backgroundColor: '#000000a6'}}>
            <View
              style={{
                flex: exitConfig ? 0.2 : 1,
                backgroundColor: '#000000a6',
              }}></View>
            <View
              style={{
                flex: exitConfig ? 1 : 0.5,
                backgroundColor: '#000000a6',
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                }}>
                {
                  exitConfig && (
                    <ConfigStatusPopUp setNavTohome={setNavTohome} />
                  )
                  // : (
                  //   <ConfirmPopUp
                  //     setExitConfig={setExitConfig}
                  //     setconfigStatus={setconfigStatus}
                  //   />
                  // )
                }
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default deviceConfigMenuScreen;
