import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-paper';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';

import Styles from './styles';
import {
  TopBottomLayout,
  CustomList,
  CustomHeaderWithDesc,
  CustomHeader,
  CustomInput,
  CustomWrapper,
  CustomButton,
} from '../../../components';
import {color, CommonStyles} from '../../../utils/CommonStyles';
import {iconLVIcon, closeIcon, successCircleIcon} from '../../../assets';
import {ConnectDevice_Stage_1} from '../../../utils/deviceConfigs/deviceConfig';
import {
  getLocalDB,
  Loader,
  showToaster,
  StoreLocalDB,
} from '../../../utils/commonUtils';

import {
  MiddleWareForAuth,
  SAVED_DEALER_CUSTOMER,
  ADD_CUSTOMER_DEVICE,
} from '../../../utils/apiServices';

const ReconfigRedeployComponent = ({
  setModal,
  setReConfig,
  setStepsDetsils,
  isReDeploy,
  navigation,
}) => {
  const [isReDeployConfirm, setReDeployConfirm] = useState(false);
  return (
    <View style={{flex: 1, marginTop: 40}}>
      <CustomHeaderWithDesc
        headerText={isReDeploy ? 'Redeploy' : 'Reconfigure'}
        descText={
          isReDeployConfirm
            ? 'Scan the QR Code of the new device to continue '
            : isReDeploy
            ? 'Are you sure? Do you want to redeploy this device ?'
            : 'Are you sure? Do you want to reconfigure this device ?'
        }
      />

      {isReDeployConfirm ? (
        <View style={{paddingTop: 35}}>
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
            labelStyle={Styles.modalButtonLabel}
            onPress={() => {
              setModal(false);
              navigation.navigate('dealerDeviceConfig');
            }}>
            Scan QR Code
          </Button>
        </View>
      ) : (
        <View style={[CommonStyles.buttonWrapperWithtwo, {marginTop: 25}]}>
          <Button
            uppercase={false}
            mode="contained"
            style={[CommonStyles.halfmodalButton, {backgroundColor: '#7F91BB'}]}
            labelStyle={Styles.modalButtonLabel}
            onPress={() => {
              setModal(false);
            }}>
            No
          </Button>

          <Button
            uppercase={false}
            mode="contained"
            style={[CommonStyles.halfmodalButton, {backgroundColor: '#E28534'}]}
            labelStyle={Styles.modalButtonLabel}
            onPress={() => {
              if (isReDeploy) {
                setReDeployConfirm(true);
              } else {
                setReConfig(false);
                setStepsDetsils(true);
              }
            }}>
            Yes
          </Button>
        </View>
      )}
    </View>
  );
};

const CustomerForm = ({
  setCustomerDetails,
  setStepsDetsils,
  deviceDetails,
  toaster,
}) => {
  const [name, setName] = React.useState('');
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isLoading, setLoader] = React.useState(false);
  const [isLocationAdd, setLocationAdd] = React.useState(false);
  const [geoLocationDetails, setGeoLocationDetails] = React.useState(null);

  React.useEffect(() => {
    requestGpsPermission();
  }, []);

  const requestGpsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Access Your Location using GPS',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log(
        'PermissionsAndroid.RESULTS.GRANTED',
        PermissionsAndroid.RESULTS.GRANTED,
        granted,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the GPS', PermissionsAndroid.RESULTS.GRANTED);
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setGeoLocationDetails(position.coords);
            setLocationAdd(true);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocationAdd(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
        // Geolocation.getCurrentPosition((info) =>
        // );
      } else {
        Alert.alert('Warning', 'GPS permission denied');
        console.log('GPS permission denied');
      }
    } catch (err) {
      console.warn('Permissions ', err);
    }
  };

  const saveDeviceComDatas = (localdata, callback) => {
    let data = {
      nickname: name,
      batage: '',
      battype: '',
      battotalcap: '',
      batmake: '',
      batmodel: '',
      batparallelnos: '',
      batmaxvolt: '',
      batminvolt: '',
      invcap: '',
      invdesc: '',
      userid: localdata.cust_id,
      devid: deviceDetails.deviceId,
      paneldesc: '',
      paneltotalcap: '',
      panelsinglecapa: '',
      panelparallelnos: '',
      panelseriesnos: '',
      paneltilt: '13',
      panelorien: 'South',
      equalization_interval: '10',
      absorption_interval: '30',
      absorption_duration: '5',
      depl_gps_lat:
        geoLocationDetails !== null ? geoLocationDetails.latitude : '',
      depl_gps_long:
        geoLocationDetails !== null ? geoLocationDetails.longitude : '',
      custid: '-1',
      replace: '0',
      olddevid: '',
      token: localdata.token,
    };

    StoreLocalDB('@deviceComData', data, res => {
      if (callback) callback();
    });
  };

  const handleConfig = () => {
    let isValid = false;
    if (isLocationAdd) {
      if (mobileNumber.length === 0 && email.length === 0) {
        isValid = true;
      } else {
        if (mobileNumber.length < 10 || mobileNumber.length > 10) {
          // toaster('error', 'Invalid mobile number');
          alert('Invalid mobile number');
        } else {
          if (email.length === 0) {
            isValid = true;
          } else {
            if (
              !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                email,
              )
            ) {
              // toaster('error', 'Invalid Email Id');
              alert('Invalid Email ID');
            } else {
              isValid = true;
            }
          }
        }
      }

      if (isValid) {
        getLocalDB('@delaerLoginDetails', localData => {
          const payload = {
            devid: deviceDetails.deviceId,
            email: email,
            custname: name,
            mobno: mobileNumber,
            dealerid: localData.cust_id,
            token: localData.token,
          };
          console.log('Payload ==>', payload);

          NetInfo.fetch().then(state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isInternetReachable);
            if (state.isInternetReachable) {
              setLoader(true);
              MiddleWareForAuth(
                'POST',
                SAVED_DEALER_CUSTOMER,
                payload,
                (res, err) => {
                  setLoader(false);
                  setLoader(false);
                  if (err === null) {
                    if (res !== null && res.data) {
                      if (res.data.status === 'success') {
                        console.log(
                          'customer details submit RES=>',
                          res.data,
                          err,
                        );
                        saveDeviceComDatas(localData, () => {
                          setCustomerDetails(false);
                          setStepsDetsils(true);
                        });
                      } else {
                        if (res.data && res.data.message) {
                          showToaster('error', res.data.message);
                        }
                      }
                    }
                  } else {
                    console.error(
                      'Device Connection Csutomer Details Save  Error',
                      err,
                    );
                    showToaster('error', 'Something went wrong');
                  }
                },
              );
            } else {
              Alert.alert('Warning', 'No Internet Connection');
            }
          });
        });
      }
    } else {
      Alert.alert(
        'Warning',
        'Please Give permission to Access Location and Make sure Location is Enabled',
        [
          {
            text: 'Ok',
            onPress: () => requestGpsPermission(),
          },
        ],
      );
    }
  };

  return (
    <ScrollView style={{paddingHorizontal: 25, marginTop: 40}}>
      <View>
        <CustomHeaderWithDesc
          headerText="Customer Details"
          descText="Enter customer details"
        />
      </View>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <View style={Styles.inputContainer}>
            <CustomInput
              form
              placeholder="Name"
              onChange={value => setName(value)}
            />
          </View>
          <View style={Styles.inputContainer}>
            <CustomInput
              form
              placeholder="Mobile"
              onChange={value => setMobileNumber(value)}
              keyboardType={'number-pad'}
            />
          </View>
          <View style={Styles.inputContainer}>
            <CustomInput
              form
              placeholder="Email"
              onChange={value => setEmail(value)}
            />
          </View>

          <View style={CommonStyles.buttonWrapper}>
            <CustomButton
              text="Configure"
              width100
              backgroundStyle={[{width: '100%'}, CommonStyles.buttonBgStyle]}
              textStyle={CommonStyles.buttonTextStyle}
              onpress={() => handleConfig()}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};

const ConnectionStatus = ({
  setCustomerDetails,
  setStepsDetsils,
  setConnectionStatus,
  setModal,
  navigation,
  deviceDetails,
}) => {
  const [isConnectionConfirm, setConnectionConfirm] = React.useState(false);
  const [isResponse, setResponse] = React.useState(false);
  const [deviceTypeApi, setDeviceType] = useState(
    deviceDetails.dev_category === 'L' ? 'LV' : 'HV',
  );
  useEffect(() => {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isInternetReachable);
      Alert.alert(
        'WArning',
        'Are You Sure Device is Connected (Please check the Wifi) If not Connected please click "No" and go to wifi settings then selected after that click again config button. Then select "Yes". Want to Continue?',
        [
          {
            text: 'No',
            onPress: () => {
              setStepsDetsils(true);
              setConnectionStatus(false);
              setConnectionConfirm(false);
            },
          },
          {
            text: 'Yes',
            onPress: () => connectionSetup(),
          },
        ],
      );
    });
  }, []);

  const connectionSetup = () => {
    StoreLocalDB('@customerDeviceDetailsFromQr', deviceDetails, res => {
      ConnectDevice_Stage_1(deviceTypeApi, res => {
        if (res && res !== null) {
          setConnectionConfirm(true);
          setResponse(true);
          StoreLocalDB('@res_devCommunication_stage_1_customer_main', res);
          setCustomerDetails(false);
          setStepsDetsils(false);
          setConnectionStatus(false);
          setModal(false);
          navigation.navigate('wifiSetup', {
            deviceDetails: deviceDetails,
          });
        } else {
          Alert.alert(
            'Warning',
            'Connection Could not Established. Please Try Again',
            [
              {
                text: 'OK',
                onPress: () => {
                  setConnectionConfirm(true);
                  setConnectionStatus(false);
                  setStepsDetsils(true);
                },
              },
            ],
          );
        }
      });
    });
  };

  return (
    <>
      <View>
        <CustomHeader
          rightIcon={closeIcon}
          rightIconAction={() => setConnectionStatus(false)}
        />
        <CustomHeaderWithDesc
          headerText="Steps to follow"
          descText="Waiting for connection"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
            marginLeft: 10,
          }}>
          {isConnectionConfirm ? (
            <>
              <Image source={successCircleIcon} />
              <Text>Connected</Text>
            </>
          ) : (
            <Loader />
          )}
        </View>
      </View>
    </>
  );
};

const Steps = ({
  setCustomerDetails,
  setStepsDetsils,
  setConnectionStatus,
  setModal,
}) => {
  return (
    <ScrollView>
      <CustomWrapper ph25 pv2>
        <CustomHeader
          rightIcon={closeIcon}
          rightIconAction={() => {
            setCustomerDetails(false);
            setStepsDetsils(false);
            setModal(false);
          }}
        />
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

        <View style={CommonStyles.buttonWrapper}>
          <CustomButton
            text="Configure"
            backgroundStyle={CommonStyles.buttonBgStyle}
            textStyle={CommonStyles.buttonTextStyle}
            onpress={() => {
              setCustomerDetails(false);
              setStepsDetsils(false);
              setConnectionStatus(true);
            }}
          />
        </View>
      </CustomWrapper>
    </ScrollView>
  );
};

const CustomSteps = ({header, desc}) => {
  return (
    <View style={Styles.stepsContainer}>
      <Text style={Styles.headerStep}>{header}</Text>
      <Text style={Styles.descStep}>{desc}</Text>
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

const DeviceInfo = ({
  setCustomerDetails,
  setModal,
  isData,
  setReConfig,
  setReDeploy,
  deviceDetails,
  setStepsDetsils,
}) => {
  const [geoLocationDetails, setGeoLocationDetails] = React.useState('');
  const [locationAdd, setLocationAdd] = React.useState(false);
  const [nickname, setNickName] = React.useState('');
  const [isLoading, setLoader] = React.useState(false);

  const requestGpsPermission = async callback => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Access Your Location using GPS',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log(
        'PermissionsAndroid.RESULTS.GRANTED',
        PermissionsAndroid.RESULTS.GRANTED,
        granted,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the GPS', PermissionsAndroid.RESULTS.GRANTED);
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setGeoLocationDetails(position.coords);
            if (callback) callback(position.coords);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocationAdd(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
        // Geolocation.getCurrentPosition((info) =>
        // );
      } else {
        Alert.alert('Warning', 'GPS permission denied');
        console.log('GPS permission denied');
      }
    } catch (err) {
      console.warn('Permissions ', err);
    }
  };

  const handleconfigApi = () => {
    requestGpsPermission(gpsdata => {
      getLocalDB('@customerLoginDetails', localData => {
        console.log('1110000', gpsdata);
        const payload = {
          userid: localData.cust_id,
          deviceid: deviceDetails.deviceId,
          nickname: nickname,
          depl_gps_lat: gpsdata.latitude,
          depl_gps_long: gpsdata.longitude,
          token: localData.token,
        };

        console.log('Payload ==>', payload);

        NetInfo.fetch().then(state => {
          console.log('Connection type', state.type);
          console.log('Is connected?', state.isInternetReachable);
          if (state.isInternetReachable) {
            setLoader(true);
            MiddleWareForAuth(
              'POST',
              ADD_CUSTOMER_DEVICE,
              payload,
              (res, err) => {
                setLoader(false);
                if (err === null) {
                  if (res !== null && res.data) {
                    console.log('customer details submit RES=>', res.data);
                    if (res.data.code == 10) {
                      setLocationAdd(true);
                      setStepsDetsils(true);
                      setModal(true);
                    } else {
                      if (res.data && res.data.message) {
                        Alert.alert('Warning', res.data.message);
                        // showToaster('error', res.data.message);
                      }
                    }
                  }
                } else {
                  console.error(
                    'Device Connection Csutomer Details Save  Error',
                    err,
                  );
                  showToaster('error', 'Something went wrong');
                }
              },
            );
          } else {
            Alert.alert('Warning', 'No Internet Connection');
          }
        });
      });
    });
  };

  return (
    <ScrollView>
      <View style={Styles.deviceInfoContainer}>
        <Text style={Styles.heading}>Device Info</Text>
        <Text style={Styles.desc}>
          {isData
            ? 'Device is already configured'
            : 'Device need to be configured'}
        </Text>
      </View>
      <View style={Styles.deviceDetailsContainer}>
        <CustomList
          deviceInfo
          deviceName={deviceDetails !== null ? deviceDetails.devicetype : 'NA'}
          deviceId={deviceDetails !== null ? deviceDetails.deviceId : 'NA'}
          deviceConfigStatus={isData ? 'CONFIGURED' : 'NOT CONFIGURED'}
          colorChanged="#7AB78C"
          // onpress={() => navigation.navigate('deviceInfo')}
          icon={iconLVIcon}
          iconBgColor={
            deviceDetails !== null
              ? deviceDetails.dev_category === 'H' && '#e746451a'
              : '#C4C4C4'
          }
        />
      </View>
      <CustomInput
        form
        placeholder="Nick Name"
        value={nickname}
        onChange={text => setNickName(text)}
      />

      <View
        style={
          isData
            ? CommonStyles.buttonWrapperWithtwo
            : CommonStyles.buttonWrapper
        }>
        {isLoading ? (
          <Loader />
        ) : (
          <CustomButton
            text="Configure"
            backgroundStyle={CommonStyles.buttonBgStyle}
            textStyle={CommonStyles.buttonTextStyle}
            onpress={() => handleconfigApi()}
          />
        )}
      </View>
    </ScrollView>
  );
};

const DeviceConfigDeviceInfoScreen = ({navigation, route}) => {
  const [isModal, setModal] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(false);
  const [stepsDetsils, setStepsDetsils] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [isData, setDataLocal] = useState(false);

  const [isReConfig, setReConfig] = useState(false);
  const [isReDeploy, setReDeploy] = useState(false);

  const [deviceDetails, setDeviceDetails] = useState(null);

  React.useEffect(() => {
    console.log('route ==>', route.params.deviceDetails);
    if (route && route.params && route.params.deviceDetails)
      setDeviceDetails(route.params.deviceDetails);

    if (route.params.deviceDetails.deployed == 0) {
      setDataLocal(false);
    } else {
      setDataLocal(true);
    }
  }, []);

  const customToasterShow = (err, msg) => {
    showToaster(err, msg);
  };

  return (
    <View style={{flex: 1}}>
      <Toast ref={ref => Toast.setRef(ref)} />
      <TopBottomLayout
        topHeight={0.6}
        bottomHeight={1}
        backButtonType="backArrow"
        backButtonAction={() => navigation.goBack()}
        topSection={<ImagePreview />}
        bottomSection={
          <DeviceInfo
            setCustomerDetails={setCustomerDetails}
            setStepsDetsils={setStepsDetsils}
            setModal={setModal}
            isData={isData}
            setReConfig={setReConfig}
            setReDeploy={setReDeploy}
            deviceDetails={deviceDetails}
          />
        }
      />
      {isModal && (
        <Modal visible={true} animationType="fade" transparent={true}>
          <View style={{flex: 1, backgroundColor: '#000000a6'}}>
            <TouchableOpacity
              onPress={() => {
                setModal(false);
                setCustomerDetails(false);
                setStepsDetsils(false);
                setConnectionStatus(false);
              }}
              style={{
                flex: customerDetails ? 0.5 : stepsDetsils ? 0.4 : 1,
                backgroundColor: '#000000a6',
              }}></TouchableOpacity>
            <View
              style={{
                flex: customerDetails ? 0.8 : stepsDetsils ? 1 : 0.5,
                backgroundColor: '#000000a6',
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                }}>
                {customerDetails && (
                  <CustomerForm
                    setCustomerDetails={setCustomerDetails}
                    setStepsDetsils={setStepsDetsils}
                    deviceDetails={deviceDetails}
                    toaster={customToasterShow}
                  />
                )}
                {stepsDetsils && (
                  <Steps
                    setCustomerDetails={setCustomerDetails}
                    setStepsDetsils={setStepsDetsils}
                    setConnectionStatus={setConnectionStatus}
                    setModal={setModal}
                  />
                )}
                {connectionStatus && (
                  <ConnectionStatus
                    setCustomerDetails={setCustomerDetails}
                    setStepsDetsils={setStepsDetsils}
                    setConnectionStatus={setConnectionStatus}
                    setModal={setModal}
                    navigation={navigation}
                    deviceDetails={deviceDetails}
                  />
                )}
                {isReConfig ||
                  (isReDeploy && (
                    <ReconfigRedeployComponent
                      setModal={setModal}
                      setReConfig={setReConfig}
                      setStepsDetsils={setStepsDetsils}
                      isReDeploy={isReDeploy}
                      navigation={navigation}
                    />
                  ))}
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default DeviceConfigDeviceInfoScreen;
