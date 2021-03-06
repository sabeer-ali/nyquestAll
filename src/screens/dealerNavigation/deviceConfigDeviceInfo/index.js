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
} from '../../../components';
import {color, CommonStyles} from '../../../utils/CommonStyles';
import {
  iconLVIcon,
  closeIcon,
  successCircleIcon,
  checkboxIcon,
  checkboxBlankIcon,
  icubeConfigIcon,
  icubeUnconfigIcon,
  icubeStepsImage,
} from '../../../assets';
import {ConnectDevice_Stage_1} from '../../../utils/deviceConfigs/deviceConfig';
import {
  getLocalDB,
  Loader,
  showToaster,
  StoreLocalDB,
} from '../../../utils/commonUtils';

import {
  DEALER_RECONFIG,
  MiddleWareForAuth,
  SAVED_DEALER_CUSTOMER,
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
                height: 35,
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
            style={[
              CommonStyles.halfmodalButton,
              {backgroundColor: '#7F91BB', height: 40},
            ]}
            labelStyle={Styles.modalButtonLabel}
            onPress={() => {
              setModal(false);
            }}>
            No
          </Button>

          <Button
            uppercase={false}
            mode="contained"
            style={[
              CommonStyles.halfmodalButton,
              {backgroundColor: '#E28534', height: 40},
            ]}
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
  const [isEditMode, setEditMode] = React.useState(false);

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
      email: email,
      custname: name,
      mobno: mobileNumber,
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
      nickname: '',
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

          saveDeviceComDatas(localData, () => {
            setCustomerDetails(false);
            setStepsDetsils(true);
          });

          NetInfo.fetch().then(state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isInternetReachable);
            if (state.isInternetReachable) {
              setLoader(true);
              // MiddleWareForAuth(
              //   'POST',
              //   SAVED_DEALER_CUSTOMER,
              //   payload,
              //   (res, err) => {
              //     setLoader(false);
              //     setLoader(false);
              //     if (err === null) {
              //       if (res !== null && res.data) {
              //         if (res.data.status === 'success') {
              //           console.log(
              //             'customer details submit RES=>',
              //             res.data,
              //             err,
              //           );
              //           saveDeviceComDatas(localData, () => {
              //             setCustomerDetails(false);
              //             setStepsDetsils(true);
              //           });
              //         } else {
              //           if (res.data && res.data.message) {
              //             showToaster('error', res.data.message);
              //           }
              //         }
              //       }
              //     } else {
              //       console.error(
              //         'Device Connection Csutomer Details Save  Error',
              //         err,
              //       );
              //       showToaster('error', 'Something went wrong');
              //     }
              //   },
              // );
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
    <ScrollView style={{paddingHorizontal: 25, marginTop: 10}}>
      <CustomWrapper mv3>
        <CustomWrapper flexDirectionRow vCenter>
          <TouchableOpacity onPress={() => setEditMode(!isEditMode)}>
            {isEditMode ? (
              <Image source={checkboxIcon} />
            ) : (
              <Image source={checkboxBlankIcon} />
            )}
          </TouchableOpacity>
          <CustomWrapper ml1>
            <Text>Enable access to customer registration.</Text>
          </CustomWrapper>
        </CustomWrapper>
      </CustomWrapper>
      <View>
        <CustomHeaderWithDesc
          noStyle
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
              editable={isEditMode}
            />
          </View>
          <View style={Styles.inputContainer}>
            <CustomInput
              form
              placeholder="Mobile"
              onChange={value => setMobileNumber(value)}
              keyboardType={'number-pad'}
              editable={isEditMode}
            />
          </View>
          <View style={Styles.inputContainer}>
            <CustomInput
              form
              placeholder="Email"
              onChange={value => setEmail(value)}
              editable={isEditMode}
            />
          </View>

          <View style={CommonStyles.buttonWrapper}>
            <CustomButton
              text="Configure"
              backgroundStyle={CommonStyles.buttonBgStyle}
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
    deviceDetails.dev_category === 'L'
      ? 'LV'
      : deviceDetails.dev_category === 'iCUBE 2000' ||
        deviceDetails.dev_category === 'iCUBE 1000' ||
        deviceDetails.dev_category === 'iCON 24 V' ||
        deviceDetails.dev_category === 'iCON 12 V'
      ? 'LV'
      : 'HV',
  );
  console.log('deviceDetails', deviceDetails);
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
    StoreLocalDB('@deviceDetailsFromQr', deviceDetails, res => {
      console.log('deviceDetails', deviceTypeApi, deviceDetails);
      ConnectDevice_Stage_1(deviceTypeApi, res => {
        if (res && res !== null) {
          Alert.alert('Device Response', JSON.stringify(res));
          setConnectionConfirm(true);
          setResponse(true);
          StoreLocalDB('@res_devCommunication_stage_1', res);
          setCustomerDetails(false);
          setStepsDetsils(false);
          setConnectionStatus(false);
          setModal(false);
          navigation.navigate('dealerDeviceConfigMenu', {
            deviceTypeApi: deviceTypeApi,
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
                  setModal(false);
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
  deviceDetails,
}) => {
  const handleConfig = () => {
    getLocalDB('@deviceComData', res => {
      console.log('res @deviceComData in FORM 2', res);
      if (res == null) {
        saveDeviceComDatas();
      }
      setCustomerDetails(false);
      setStepsDetsils(false);
      setConnectionStatus(true);
    });
  };

  const saveDeviceComDatas = callback => {
    getLocalDB('@ReconfigData', localdata => {
      console.log('@delaerLoginDetails ==> ', localdata);
      let data = {
        email: '',
        custname: '',
        mobno: '',
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
        userid: localdata.userid,
        devid: localdata.devid,
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
        depl_gps_lat: '',
        depl_gps_long: '',
        custid: '-1',
        replace: '0',
        olddevid: '',
        token: localdata.token,
        nickname: '',
      };

      console.log('data in 000003', data);

      StoreLocalDB('@deviceComData', data, res => {
        if (callback) callback();
      });
    });
  };

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
          <CustomHeaderWithDesc
            headerText={
              deviceDetails.dev_category === 'iCUBE 2000' ||
              deviceDetails.dev_category === 'iCUBE 1000'
                ? 'Steps to follow ??? iCUBE'
                : 'Steps to follow'
            }
          />
        </View>

        {deviceDetails.dev_category === 'iCUBE 2000' ||
        deviceDetails.dev_category === 'iCUBE 1000' ? (
          <View style={{paddingHorizontal: 25}}>
            <CustomSteps
              header="Step 01"
              desc="Double press on the pushbutton in the back side of the iCUBE.."
            />
            <Image source={icubeStepsImage} />
            <CustomSteps
              header="Step 02"
              desc="LED ring on the front side starts flashes magenta followed by a beep sound.LED ring colour becomes stable magenta after a few seconds. Now iCON becomes a master & created a hotspot."
            />
            <CustomSteps
              header="Step 03"
              desc="Go to Phone Settings > WiFi & connect to WiFi network ???iCUBE-XXXXX???.(Password ??? icube1234)"
            />
            <CustomSteps
              header="Step 04"
              desc="Return to App for configuring your device."
            />
          </View>
        ) : (
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
        )}

        <View style={CommonStyles.buttonWrapper}>
          <CustomButton
            text="Configure"
            backgroundStyle={CommonStyles.buttonBgStyle}
            textStyle={CommonStyles.buttonTextStyle}
            onpress={() => handleConfig()}
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

const ImagePreview = ({deviceDetails}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {deviceDetails !== null && (
        <Image
          source={
            deviceDetails.dev_category === 'iCUBE 2000' ||
            deviceDetails.dev_category === 'iCUBE 1000'
              ? require('../../../assets/icubeHeaderIcons/Group155.png')
              : require('../../../assets/demo/iCONprecise1.png')
          }
        />
      )}
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
}) => {
  const [isReplace, setReplace] = React.useState(false);
  const [isLoading, setLoader] = React.useState(false);

  React.useEffect(() => {
    console.log('deviceDetails for replace ', deviceDetails);
  }, []);

  const replaceDevice = () => {
    console.log(
      'deviceDetails customerid',
      deviceDetails,
      deviceDetails.customerid,
    );
    if (deviceDetails.customerid != -1) {
      StoreLocalDB(
        '@replaceDvice',
        {isReplace: true, customerData: deviceDetails},
        res => {
          if (res !== null) {
          } else {
            setModal(true);
            setReConfig(false);
            setReDeploy(true);
          }
        },
      );
    } else {
      Alert.alert('Warning', 'No Customer ID Found');
    }
  };

  const handleconfig = () => {
    setCustomerDetails(true);
    setModal(true);
  };

  const reconfigApi = data => {
    NetInfo.fetch().then(state => {
      if (state.isInternetReachable) {
        setLoader(true);
        let url =
          DEALER_RECONFIG +
          '/' +
          data.dev_id +
          '/' +
          data.cust_id +
          '/' +
          data.token;
        console.log(url + '/');
        MiddleWareForAuth('GET', url, null, (res, err) => {
          setLoader(false);
          if (err === null) {
            if (res !== null && res.data) {
              if (res.data.code == 10) {
                console.log('dealer DEALER_RECONFIG RES=>', res.data);
                const resData = res.data.data[0];
                let payloads = {
                  absorption_interval: resData.absorption_interval,
                  batage: resData.batage,
                  batmake: resData.batmake,
                  batmaxvolt: resData.batmaxvolt,
                  batminvolt: resData.batminvolt,
                  batmodel: resData.batmodel,
                  batparallelnos: resData.batparallelnos,
                  battotalcap: resData.battotalcap,
                  battype: resData.battype,
                  custid: '-1',
                  depl_gps_lat: '',
                  depl_gps_long: '',
                  devid: data.dev_id,
                  equalization_duration: resData.equalization_duration,
                  equalization_interval: resData.equalization_interval,
                  invcap: resData.invcap,
                  invdesc: resData.invdesc,
                  nickname: '',
                  olddevid: '',
                  paneldesc: resData.paneldesc,
                  panelorien: 'South',
                  panelparallelnos: resData.panelparallelnos,
                  panelseriesnos: resData.panelseriesnos,
                  panelsinglecapa: resData.panelsinglecapa,
                  paneltilt: resData.paneltilt,
                  paneltotalcap: resData.paneltotalcap,
                  replace: '0',
                  token: data.token,
                  userid: data.cust_id,
                  email: '',
                  custname: '',
                  mobno: '',
                  reconfigure: 1,
                };
                StoreLocalDB('@ReconfigData', payloads, res => {
                  setModal(true);
                  setReConfig(true);
                });
              } else {
                if (res.data && res.data.message) {
                  // showToaster('error', res.data.message);
                  Alert.alert('WArning', res.data.message);
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
        });
      } else {
        Alert.alert('Warning', 'No Internet Connection');
      }
    });
  };

  const handleReConfig = () => {
    setReDeploy(false);
    getLocalDB('@delaerLoginDetails', localData => {
      console.log('localData ==> Reconfig ', localData);
      console.log('deviceDetails in Reconfig', deviceDetails);
      reconfigApi({
        cust_id: localData.cust_id,
        dev_id: deviceDetails.deviceId,
        token: localData.token,
      });
    });
  };
  return (
    <View>
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
          deviceName={
            deviceDetails !== null ? deviceDetails.dev_category : 'NA'
          }
          deviceId={deviceDetails !== null ? deviceDetails.deviceId : 'NA'}
          deviceConfigStatus={isData ? 'CONFIGURED' : 'NOT CONFIGURED'}
          colorChanged="#7AB78C"
          // onpress={() => navigation.navigate('deviceInfo')}
          icon={
            deviceDetails.dev_category === 'iCUBE 2000' ||
            deviceDetails.dev_category === 'iCUBE 1000'
              ? deviceDetails.deployed === '1'
                ? icubeConfigIcon
                : icubeUnconfigIcon
              : iconLVIcon
          }
          iconBgColor={
            deviceDetails !== null
              ? deviceDetails.dev_category === 'H' && '#e746451a'
              : '#C4C4C4'
          }
        />
      </View>

      <View
        style={
          isData
            ? CommonStyles.buttonWrapperWithtwo
            : CommonStyles.buttonWrapper
        }>
        {isLoading ? (
          <Loader />
        ) : isData ? (
          <>
            <Button
              uppercase={false}
              mode="contained"
              style={[
                CommonStyles.halfmodalButton,
                {backgroundColor: '#7F91BB', height: 40},
              ]}
              labelStyle={Styles.modalButtonLabel}
              onPress={() => replaceDevice()}>
              Replace
            </Button>

            <Button
              uppercase={false}
              mode="contained"
              style={[
                CommonStyles.halfmodalButton,
                {backgroundColor: '#E28534', height: 40},
              ]}
              labelStyle={Styles.modalButtonLabel}
              onPress={() => handleReConfig()}>
              Reconfigure
            </Button>
          </>
        ) : (
          <CustomButton
            text="Configure"
            backgroundStyle={CommonStyles.buttonBgStyle}
            textStyle={CommonStyles.buttonTextStyle}
            onpress={() => handleconfig()}
          />
        )}
      </View>
    </View>
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
        topSection={<ImagePreview deviceDetails={deviceDetails} />}
        bottomSection={
          <DeviceInfo
            setCustomerDetails={setCustomerDetails}
            setModal={setModal}
            isData={isData}
            setReConfig={setReConfig}
            setReDeploy={setReDeploy}
            deviceDetails={route && route.params && route.params.deviceDetails}
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
                    deviceDetails={route.params.deviceDetails}
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
                {isReDeploy && (
                  <ReconfigRedeployComponent
                    setModal={setModal}
                    setReConfig={setReConfig}
                    setStepsDetsils={setStepsDetsils}
                    isReDeploy={isReDeploy}
                    navigation={navigation}
                  />
                )}
                {isReConfig && (
                  <ReconfigRedeployComponent
                    setModal={setModal}
                    setReConfig={setReConfig}
                    setStepsDetsils={setStepsDetsils}
                    isReDeploy={isReDeploy}
                    navigation={navigation}
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

export default DeviceConfigDeviceInfoScreen;
