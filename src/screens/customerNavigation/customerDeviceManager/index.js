import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sha512 from 'js-sha512';
import NetInfo from '@react-native-community/netinfo';
import Styles from './styles';
import {
  CommonBottomNavigator,
  CustomList,
  CustomHeaderWithDesc,
  CustomInput,
  CustomWrapper,
  TopBottomLayout,
  CustomHeader,
  CustomButton,
} from '../../../components';
import {
  editIcon,
  lockIcon,
  NQLogoIcon,
  logoutIcon,
  closeIcon,
  logoIcon,
  agentIcon,
  arrowBackIcon,
  iconLVIcon,
} from '../../../assets';
import {CommonStyles} from '../../../utils/CommonStyles';
import {getLocalDB, Loader, StoreLocalDB} from '../../../utils/commonUtils';
import {
  MiddleWareForAuth,
  GET_DEVICE_FOR_CUSTOMER,
  CHANGE_PASSWORD,
} from '../../../utils/apiServices';
import {ConnectDevice_Stage_1} from '../../../utils/deviceConfigs/deviceConfig';

const CustomSteps = ({header, desc}) => {
  return (
    <View style={Styles.stepsContainer}>
      <Text style={Styles.headerStep}>{header}</Text>
      <Text style={Styles.descStep}>{desc}</Text>
    </View>
  );
};

const StepsComponent = ({navigation, setModal, selectedDevice}) => {
  const [isConnectionConfirm, setConnectionConfirm] = React.useState(false);
  const handleConfig = () => {
    console.log('selectedDevice 222', selectedDevice);
    Alert.alert(
      'Warning',
      'Are You sure device is connected ? please make sure.',
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: () => connectionSetup(),
        },
      ],
    );
  };

  const connectionSetup = async () => {
    getLocalDB('@customerDeviceDetailsFromQr', res => {
      console.log('res ---->', res);
      let deviceTypeApi =
        selectedDevice.dev_category == 'iCON 12 V' ||
        selectedDevice.dev_category == 'iCON 24 V'
          ? 'LV'
          : selectedDevice.dev_category == 'iCON 240 V'
          ? 'HV'
          : 'LV';
      if (deviceTypeApi) console.log('deviceTypeApi', deviceTypeApi);
      if (res !== null) {
        ConnectDevice_Stage_1(deviceTypeApi, res => {
          if (res && res !== null) {
            StoreLocalDB('@customerDeviceManager', res, callback => {
              setModal(false);
              navigation.navigate('customerDeviceConfigMenu', {
                deviceTypeApi: deviceTypeApi,
                choosedDeviceDetails: selectedDevice,
              });
            });
          } else {
            Alert.alert(
              'Warning',
              'Connection Could not Established. Please Try Again',
              [
                {
                  text: 'OK',
                  onPress: () => {},
                },
              ],
            );
          }
        });
      } else {
        Alert.alert('No Data Available.');
      }
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}>
      <View style={Styles.headerSection}>
        <CustomHeaderWithDesc headerText="Steps to follow" />
      </View>
      <View style={{paddingHorizontal: 25}}>
        <CustomSteps
          header="Step 01"
          desc="Double press on the pushbutton inside the LED ring."
        />
        <CustomSteps
          header="Step 02"
          desc="LED start flashes magenta followed by a beep sound. LED colour become stable magenta after a few seconds. Now iCON becomes a master & created a hotspot."
        />
        <CustomSteps
          header="Step 03"
          desc="Go to Phone Settings > WiFi & connect to Wi-Fi network SOLICON. (Password - solicon123 )"
        />
        <CustomSteps
          header="Step 04"
          desc="Return to app for configuring your device."
        />
      </View>
      <CustomWrapper ph3 pv3>
        <CustomButton
          text="Configure"
          backgroundStyle={CommonStyles.buttonBgStyle}
          textStyle={CommonStyles.buttonTextStyle}
          onpress={() => handleConfig()}
        />
      </CustomWrapper>
    </ScrollView>
  );
};

const ModalContents = ({
  isModal,
  setModal,
  navigation,
  isSteps,
  selectedDevice,
}) => {
  return (
    <Modal visible={isModal} animationType="slide" transparent={true}>
      <View style={{flex: 1, backgroundColor: '#000000a6'}}>
        <TouchableOpacity
          onPress={() => setModal(false)}
          style={{
            flex: 4,
            backgroundColor: '#000000a6',
          }}></TouchableOpacity>
        <View
          style={{
            flex: 8,
            backgroundColor: '#000000a6',
          }}>
          {isSteps && (
            <StepsComponent
              navigation={navigation}
              setModal={setModal}
              selectedDevice={selectedDevice}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const BottomSection = ({navigation, setModal, setSteps, setSelectedDevice}) => {
  const [deviceLists, setDeviceList] = React.useState([]);
  const [isLoading, setLoader] = React.useState(false);

  React.useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isInternetReachable) {
        getDeviceListApi();
      } else {
        Alert.alert('Warning', 'Sorry. No Internet Connection Available', [
          {text: 'Ok', onPress: () => navigation.goBack()},
        ]);
      }
    });
  }, []);

  const getDeviceListApi = () => {
    getLocalDB('@customerLoginDetails', resLogin => {
      console.log('resLogin ====> ', resLogin);
      const endPoints = `${GET_DEVICE_FOR_CUSTOMER}${'/'}${
        resLogin.cust_id
      }${'/'}${resLogin.token}`;

      setLoader(true);
      MiddleWareForAuth('GET', endPoints, null, (res, err) => {
        setLoader(false);
        if (err === null) {
          console.log('res.data', res.data);
          console.log('res.data.devlst', res.data);
          if (res !== null && err === null && res.data) {
            if (res && res.data && res.data.data) {
              setDeviceList(res.data.data);
            }
          }
        } else {
          console.error('Device List in Home API Error', err);
          // showToaster('error', 'Somthing went wrong');
        }
      });
    });
  };

  return (
    <CustomWrapper>
      {isLoading ? (
        <Loader />
      ) : deviceLists && deviceLists.length ? (
        deviceLists.map((item, index) => {
          console.log('item 1201', item);
          return (
            <CustomList
              key={index}
              customerName={item.nick_name}
              deviceName={item.dev_category}
              deviceId={item.dev_id}
              onpress={() => {
                setSelectedDevice(item);
                setSteps(true);
                setModal(true);
              }}
              //   navigation.push('dealerDeviceInfo', {deviceDetails: item})
              navigateNext
              icon={iconLVIcon}
              iconBgColor={'#C4C4C4'}
              // item.dev_category === 'L' ? '#DBD3EB' : '#C4C4C4'}
            />
          );
        })
      ) : null}
    </CustomWrapper>
  );
};

const TopSection = ({navigation}) => {
  return (
    <CustomWrapper ph1>
      <CustomWrapper ph1 mb1>
        <CustomHeader
          leftIcon={arrowBackIcon}
          leftIconAction={() => navigation.goBack()}
        />
      </CustomWrapper>
      <CustomHeaderWithDesc
        white
        headerText="My Account"
        descText="Manage your device & account here"
      />
    </CustomWrapper>
  );
};

export default function CustomerDeviceManager({navigation}) {
  const [isModal, setModal] = React.useState(false);
  const [isSteps, setSteps] = React.useState(false);
  const [selectedDevice, setSelectedDevice] = React.useState(null);

  console.log('selectedDevice', selectedDevice);
  return (
    <CustomWrapper flex={1}>
      <TopBottomLayout
        topHeight={3}
        bottomHeight={9}
        topSection={<TopSection navigation={navigation} />}
        bottomSection={
          <BottomSection
            navigation={navigation}
            setModal={setModal}
            setSteps={setSteps}
            setSelectedDevice={setSelectedDevice}
          />
        }
      />
      {isModal ? (
        <ModalContents
          isModal={isModal}
          setModal={setModal}
          navigation={navigation}
          isSteps={isSteps}
          selectedDevice={selectedDevice}
        />
      ) : null}
    </CustomWrapper>
  );
}
