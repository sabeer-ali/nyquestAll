import React, {useState, useEffect} from 'react';
import {View, Text, Image, Modal, Dimensions, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
import Styles from './styles';
import {
  TopBottomLayout,
  CustomList,
  CustomHeaderWithDesc,
  CustomWrapper,
  CustomHeader,
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
import {getLocalDB, Loader} from '../../../utils/commonUtils';
import {DeviceCommunication_ExitConfig} from '../../../utils/deviceConfigs/deviceConfig';

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

const ConfirmPopUp = ({setExitConfig, setconfigStatus}) => {
  const [isLoading, setLoader] = React.useState(false);
  const handleExitConfig = () => {
    // console.log('200', deviceCommunicationData);
    setLoader(true);
    AsyncStorage.getItem('@customerDeviceManager').then(resDb => {
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
            setconfigStatus(true);
          },
        );
        setLoader(false);
      }, 5000);
    });
  };
  return (
    <View style={{marginVertical: 40}}>
      <CustomHeaderWithDesc
        headerText="Exit Configuration"
        descText="Are you sure? Do you want to disconnect from device hotspot ‘SOLICON’?"
      />
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
            onPress={() => setExitConfig(false)}>
            No
          </Button>
          <Button
            compact={true}
            uppercase={false}
            mode="contained"
            onPress={() => {
              handleExitConfig();
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
      )}
    </View>
  );
};

const ConfigStatusPopUp = ({navigation}) => {
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
          onPress={() => navigation.navigate('customerMyAccount')}
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
}) => {
  const handelWifiNavigation = () => {
    getLocalDB('@customerDeviceDetailsFromQr', res => {
      if (choosedDeviceDetails) {
        res.choosedDeviceDetails = choosedDeviceDetails;
      }

      navigation.navigate('wifiSetup', {
        deviceDetails: res,
        wifiUpdate: true,
      });
    });
  };
  return (
    <CustomWrapper flex={1}>
      <CustomWrapper flex={0.9}>
        <CustomList
          defaultList
          // onpress={() => navigation.navigate('customerDeviceManager')}
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
          // onpress={() => navigation.navigate('customerDeviceManager')}
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
          />
        }
      />
      {isModal && (
        <Modal visible={true} animationType="fade" transparent={true}>
          <View style={{flex: 1, backgroundColor: '#000000a6'}}>
            <View
              style={{
                flex: configStatus ? 0.2 : 1,
                backgroundColor: '#000000a6',
              }}></View>
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
                  />
                ) : (
                  <ConfirmPopUp
                    setExitConfig={setExitConfig}
                    setconfigStatus={setconfigStatus}
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
