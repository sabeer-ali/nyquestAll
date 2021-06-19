import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
import Styles from './styles';
import {
  TopBottomLayout,
  CustomList,
  CustomHeaderWithDesc,
  CustomWrapper,
  CustomHeader,
  CustomInput,
} from '../../../components';
import {color, CommonStyles, primaryFont} from '../../../utils/CommonStyles';
import {
  settingsIcon,
  wifiSettingsIcon,
  iconLVIcon,
  deviceGreenIcon,
  deviceRedIcon,
  deviceBlueIcon,
  lockIcon,
  arrowBackIcon,
} from '../../../assets';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  getLocalDB,
  Loader,
  removeLocalDB,
  StoreLocalDB,
} from '../../../utils/commonUtils';
import {DeviceCommunication_ExitConfig} from '../../../utils/deviceConfigs/deviceConfig';
import NetInfo from '@react-native-community/netinfo';
import {
  MiddleWareForAuth,
  UPDATE_BATTERY,
  CHANGE_NICKNAME,
} from '../../../utils/apiServices';

const ChangeNickName = ({
  setModal,
  choosedDeviceDetails,
  setChangeNickName,
}) => {
  const [nickName, setNickName] = React.useState('');
  const [isLoading, setLoader] = React.useState(false);

  const handleSave = () => {
    // setLoader(true);
    getLocalDB('@customerLoginDetails', resCustData => {
      let nicknamePayload = {
        user_id: choosedDeviceDetails.cust_id,
        nickname: nickName,
        devid: choosedDeviceDetails.dev_id,
        token: resCustData.token,
      };
      StoreLocalDB('@nickName', nicknamePayload, res => {
        setLoader(false);
        setChangeNickName(false);
        setModal(false);
      });
    });
  };

  return (
    <CustomWrapper ph25 pv3>
      <CustomHeaderWithDesc
        noStyle
        descText="Enter new nickname for your device"
        headerText="Change Nickname"
      />
      <CustomWrapper pt2>
        <CustomInput
          form
          placeholder="Nickname"
          onChange={value => setNickName(value)}
          value={nickName}
        />
        <CustomWrapper vCenter>
          {isLoading ? (
            <Loader />
          ) : (
            <Button
              compact={true}
              uppercase={false}
              mode="contained"
              style={{
                ackgroundColor: 'red',
                width: '49%',
                borderRadius: 10,
                height: 44,
                marginTop: 40,
              }}
              onPress={() => handleSave()}>
              Save
            </Button>
          )}
        </CustomWrapper>
      </CustomWrapper>
    </CustomWrapper>
  );
};

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

const ConfirmPopUp = ({
  setExitConfig,
  setconfigStatus,
  setModal,
  choosedDeviceDetails,
}) => {
  const [isLoading, setLoader] = React.useState(false);
  const [exitDone, setExitDone] = React.useState(false);
  const [nickNameApi, setNickNameApi] = React.useState(false);
  const [bateryUpdate, setBatteryUpdateApi] = React.useState(false);

  const batterUpdateApi = (payload, cb) => {
    MiddleWareForAuth('POST', UPDATE_BATTERY, payload, (res, err) => {
      setLoader(false);
      if (err === null) {
        if (res !== null && res.data) {
          if (res.data.code == '10') {
            console.log('customerUPDATE_BATTERY RES=>', res.data);
            // navigation.navigate('customerMyAccount');
            if (cb) cb(true);
          } else {
            if (res.data && res.data.message) {
              // showToaster('error', res.data.message);
              if (cb) cb(false);
            }
          }
        }
      } else {
        console.error('Device Connection Csutomer Details Save  Error', err);
        // showToaster('error', 'Something went wrong');
        if (cb) cb(false);
      }
    });
  };

  const handleNickNameChangeApi = (resNickName, cb) => {
    MiddleWareForAuth('POST', CHANGE_NICKNAME, resNickName, (res, err) => {
      setLoader(false);
      if (err === null) {
        if (res !== null && res.data) {
          if (res.data.code == '10') {
            console.log('customer CHANGE_NICKNAME RES=>', res.data);
            if (cb) cb(true);
            // navigation.navigate('customerMyAccount');
          } else {
            if (res.data && res.data.message) {
              console.error(res.data.message);
              if (cb) cb(false);
            }
          }
        }
      } else {
        console.error('Device Connection Csutomer Details Save  Error', err);
        // showToaster('error', 'Something went wrong');
        if (cb) cb(false);
      }
    });
  };

  const handelBatteryUpdate = () => {
    setLoader(true);
    if (bateryUpdate) {
      getLocalDB('@customerUpdateBatter', resBatteryData => {
        if (resBatteryData !== null) {
          batterUpdateApi(resBatteryData, resBattery => {
            setLoader(false);
            console.log('resBattery ==>', resBattery);
            if (resBattery) {
              Alert.alert('Battery Details is Updated');
              setBatteryUpdateApi(false);
            } else {
              Alert.alert('Battery Details NOT  Updated');
              setBatteryUpdateApi(false);
            }
          });
        } else {
          console.log('NO BAt Values To Updated');
          setBatteryUpdateApi(false);
        }
      });
    }

    setTimeout(() => {
      setLoader(false);
      console.log('batterUpdateApi -- nickNameApi', bateryUpdate, nickNameApi);

      setconfigStatus(true);
    }, 2000);
  };

  const handelNickNameUpdate = () => {
    NetInfo.fetch()
      .then(state => {
        if (state.isInternetReachable) {
          setLoader(true);
          getLocalDB('@nickName', resNickName => {
            if (resNickName !== null) {
              handleNickNameChangeApi(resNickName, nickNameStatus => {
                setLoader(false);
                console.log('resNick', nickNameStatus);
                if (nickNameStatus) {
                  Alert.alert('Nick Name is Updated');
                  setNickNameApi(false);
                  setBatteryUpdateApi(true);
                } else {
                  Alert.alert('Nick Name NOT  Updated');
                  setNickNameApi(false);
                  setBatteryUpdateApi(true);
                }
              });
            } else {
              console.log('NO Nickname Values To Updated');
              setLoader(false);
              setNickNameApi(false);
              setBatteryUpdateApi(true);
            }
          });
        } else {
          Alert.alert('Warning', 'No Internet Connection');
        }
      })
      .finally(() => {
        console.log('ALL Reeee Doneee.........', bateryUpdate);
      });
  };

  const handleExitConfig = () => {
    setLoader(true);
    AsyncStorage.getItem('@customerDeviceManager').then(resDb => {
      const jsonValue = JSON.parse(resDb);
      console.log('isWifiUpdate', jsonValue);
      setTimeout(() => {
        DeviceCommunication_ExitConfig(
          jsonValue.deviceType === 1 ||
            jsonValue.deviceType === 2 ||
            jsonValue.deviceType === 5 ||
            jsonValue.deviceType === 6
            ? 'LV'
            : 'HV',
          {
            sessionId: jsonValue.sessionId,
          },
          resWifi => {
            console.log('res EXIT Config ===> ', resWifi);
            // setExitConfig(false);
            // setconfigStatus(true);
            setNickNameApi(true);
            setExitDone(true);
          },
        );
        setLoader(false);
      }, 5000);
    });
  };

  return (
    <View style={{marginVertical: 40}}>
      {nickNameApi ? (
        <CustomHeaderWithDesc
          headerText="Exit Configuration"
          descText="Nick Name Update in SERVER"
        />
      ) : bateryUpdate ? (
        <CustomHeaderWithDesc
          headerText="Exit Configuration"
          descText="Battery Update in SERVER"
        />
      ) : (
        <CustomHeaderWithDesc
          headerText="Exit Configuration"
          descText="Are you sure? Do you want to disconnect from device hotspot ‘SOLICON’?"
        />
      )}
      {isLoading ? (
        <Loader />
      ) : (
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
            onPress={() => {
              setModal(false);
              setExitConfig(false);
            }}>
            No
          </Button>
          <Button
            compact={true}
            uppercase={false}
            mode="contained"
            onPress={() => {
              exitDone && nickNameApi
                ? handelNickNameUpdate()
                : exitDone && bateryUpdate
                ? handelBatteryUpdate()
                : handleExitConfig();
            }}
            style={{
              backgroundColor: '#E28534',
              width: '49%',
              borderRadius: 10,
              height: 44,
            }}>
            {exitDone && nickNameApi
              ? 'Nick Name Update'
              : exitDone && bateryUpdate
              ? 'Battery Update'
              : 'Yes'}
          </Button>
        </View>
      )}
    </View>
  );
};

const ConfigStatusPopUp = ({navigation, choosedDeviceDetails}) => {
  const batterUpdateApi = payload => {
    MiddleWareForAuth('POST', UPDATE_BATTERY, payload, (res, err) => {
      setLoader(false);
      if (err === null) {
        if (res !== null && res.data) {
          if (res.data.status === 'Success') {
            console.log('customerUPDATE_BATTERY RES=>', res.data);
            // navigation.navigate('customerMyAccount');
          } else {
            if (res.data && res.data.message) {
              // showToaster('error', res.data.message);
            }
          }
        }
      } else {
        console.error('Device Connection Csutomer Details Save  Error', err);
        // showToaster('error', 'Something went wrong');
      }
      return true;
    });
  };

  const handleNickNameChangeApi = resNickName => {
    MiddleWareForAuth('POST', CHANGE_NICKNAME, resNickName, (res, err) => {
      setLoader(false);
      if (err === null) {
        if (res !== null && res.data) {
          if (res.data.status === 'Success') {
            console.log('customerUPDATE_BATTERY RES=>', res.data);
            // navigation.navigate('customerMyAccount');
          } else {
            if (res.data && res.data.message) {
              // showToaster('error', res.data.message);
            }
          }
        }
      } else {
        console.error('Device Connection Csutomer Details Save  Error', err);
        // showToaster('error', 'Something went wrong');
      }
      return true;
    });
  };

  const handleContinue = () => {
    // getLocalDB('@customerUpdateBatter', resBatteryData => {
    //   getLocalDB('@nickName', resNickName => {
    //     NetInfo.fetch()
    //       .then(state => {
    //         if (state.isInternetReachable) {
    //           setLoader(true);
    //           console.log(
    //             '001 API CALLS ===========================> ',
    //             resBatteryData,
    //             resNickName,
    //           );
    //           // if (resBatteryData && resNickName) {
    //           //   if (resBatteryData) {
    //           //     let payload = resBatteryData;
    //           //     batterUpdateApi(payload);
    //           //   }
    //           //   if (resNickName) {
    //           //     handleNickNameChangeApi(resNickName);
    //           //   }
    //           // } else if (resBatteryData && !resNickName) {
    //           //   batterUpdateApi(payload);
    //           // } else if (!resBatteryData && resNickName) {
    //           //   handleNickNameChangeApi(resNickName);
    //           // }
    //         } else {
    //           Alert.alert('Warning', 'No Internet Connection');
    //         }
    //       })
    //       .finally(() => {
    //         console.log('FIMNALLLLllllllllllllllllllllllllllllllllllllllll');
    removeLocalDB('@customerUpdateBatter', res => {
      removeLocalDB('@nickName', res1 => {
        navigation.navigate('customerMyAccount');
      });
    });
    //       });
    //   });
    // });
  };

  const [isLoading, setLoader] = React.useState(false);

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

        {isLoading ? (
          <Loader />
        ) : (
          <Button
            uppercase={false}
            mode="contained"
            onPress={() => handleContinue()}
            style={{
              backgroundColor: '#E28534',
              width: '100%',
              borderRadius: 10,
              height: 44,
            }}>
            Done
          </Button>
        )}
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

const TopSection = ({navigation}) => {
  return (
    <CustomWrapper>
      <CustomHeader
        leftIcon={arrowBackIcon}
        leftIconAction={() => navigation.goBack()}
        centerText="Update Parameters"
      />
    </CustomWrapper>
  );
};

const BottomSection = ({
  navigation,
  setModal,
  setExitConfig,
  choosedDeviceDetails,
  setChangeNickName,
}) => {
  const handelWifiNavigation = () => {
    console.log('choosedDeviceDetails', choosedDeviceDetails);
    navigation.navigate('wifiSetup', {
      deviceDetails: choosedDeviceDetails,
      wifiUpdate: true,
    });

    // getLocalDB('@customerDeviceDetailsFromQr', res => {
    //   if (choosedDeviceDetails) {
    //     res.choosedDeviceDetails = choosedDeviceDetails;
    //   }
    // });
  };
  return (
    <CustomWrapper flex={1}>
      <CustomWrapper flex={0.9}>
        <CustomList
          defaultList
          onpress={() => {
            setModal(true);
            setChangeNickName(true);
          }}
          navigateNext
          icon={lockIcon}
          defaultText="Change Nickname"
        />
        <CustomList
          defaultList
          onpress={() => handelWifiNavigation()}
          navigateNext
          icon={lockIcon}
          defaultText="Wifi Setup"
        />
        <CustomList
          defaultList
          onpress={() =>
            navigation.navigate('customerBatteryUpdate', {
              deviceTypeApi: choosedDeviceDetails,
            })
          }
          navigateNext
          icon={lockIcon}
          defaultText="Battery Update"
        />
      </CustomWrapper>
      <CustomWrapper>
        <View style={CommonStyles.buttonWrapper}>
          <CustomButton
            text="Exit Configuration"
            backgroundStyle={[
              CommonStyles.buttonBgStyle,
              {backgroundColor: '#F3937E'},
            ]}
            textStyle={CommonStyles.buttonTextStyle}
            onpress={() => setExitConfig(true)}
          />
        </View>
      </CustomWrapper>
    </CustomWrapper>
  );
};

const customerDeviceConfigMenuScreen = ({navigation, route}) => {
  const [exitConfig, setExitConfig] = useState(false);
  const [configStatus, setconfigStatus] = useState(false);
  const [isModal, setModal] = useState(false);
  const [choosedDeviceDetails, setChoosedDeviceDetails] = useState(null);
  const [changeNickName, setChangeNickName] = useState(false);

  useEffect(() => {
    if (route.params.choosedDeviceDetails) {
      setChoosedDeviceDetails(route.params.choosedDeviceDetails);
    }
  }, []);

  useEffect(() => {
    if (exitConfig || configStatus) {
      setModal(true);
    }

    return () => {
      console.log('Um Mounted');
    };
  }, [exitConfig, configStatus]);

  const setNavTohome = () => {
    setExitConfig(false);
    setconfigStatus(false);
    setModal(false);
    console.log('exitConfig', exitConfig);
    console.log('setconfigStatus', configStatus);

    navigation.navigate('home');
  };

  return (
    <View style={{flex: 1}}>
      <TopBottomLayout
        topHeight={1}
        bottomHeight={11}
        backButtonAction={() => navigation.goBack()}
        topSection={<TopSection navigation={navigation} />}
        bottomSection={
          // <DeviceInfo navigation={navigation} setExitConfig={setExitConfig} />
          <BottomSection
            navigation={navigation}
            setModal={setModal}
            choosedDeviceDetails={choosedDeviceDetails}
            setExitConfig={setExitConfig}
            route={route}
            setChangeNickName={setChangeNickName}
          />
        }
      />
      {isModal && (
        <Modal visible={true} animationType="fade" transparent={true}>
          <View style={{flex: 1, backgroundColor: '#000000a6'}}>
            <TouchableOpacity
              onPress={() => setModal(false)}
              style={{
                flex: configStatus ? 0.2 : 1,
                backgroundColor: '#000000a6',
              }}></TouchableOpacity>
            <View
              style={{
                flex: configStatus ? 1 : 0.5,
                backgroundColor: '#000000a6',
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                }}>
                {configStatus ? (
                  <ConfigStatusPopUp
                    navigation={navigation}
                    setNavTohome={setNavTohome}
                    choosedDeviceDetails={choosedDeviceDetails}
                  />
                ) : changeNickName ? (
                  <ChangeNickName
                    setModal={setModal}
                    choosedDeviceDetails={choosedDeviceDetails}
                    setChangeNickName={setChangeNickName}
                  />
                ) : changeNickName ? (
                  <ChangeNickName
                    setModal={setModal}
                    choosedDeviceDetails={choosedDeviceDetails}
                    setChangeNickName={setChangeNickName}
                  />
                ) : (
                  <ConfirmPopUp
                    setExitConfig={setExitConfig}
                    setconfigStatus={setconfigStatus}
                    setModal={setModal}
                    choosedDeviceDetails={choosedDeviceDetails}
                  />
                )}
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default customerDeviceConfigMenuScreen;
