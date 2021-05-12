import React, {useState} from 'react';
import {View, Text, Image, ScrollView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Menu, Divider, Provider} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';

import Styles from './styles';
import {
  TopBottomLayout,
  CustomList,
  CustomHeaderWithDesc,
  CustomInput,
  LabelValuePair,
  CustomCounter,
  CustomDropdown,
  CustomWrapper,
  CustomHeader,
} from '../../../components';
import {color, CommonStyles} from '../../../utils/CommonStyles';
import {
  processCompleteIcon,
  processCompletedBarIcon,
  processPendingIcon,
  processPendingBarIcon,
  inProgressIcon,
  arrowBackIcon,
} from '../../../assets';
import {
  SERVER_IP,
  SERVER_PORT,
  SERVER_PORT_HV,
} from '../../../utils/deviceConfigs/constants';
import {Battery_Config_Stage_3} from '../../../utils/deviceConfigs/deviceConfig';
import {
  getLocalDB,
  getAllKeys,
  Loader,
  StoreLocalDB,
} from '../../../utils/commonUtils';
import {MiddleWareForAuth, UPDATE_BATTERY} from '../../../utils/apiServices';

const Form2 = ({
  deviceTypeApi,
  deviceCommData,
  deviceHwType,
  allData,
  navigation,
}) => {
  const deviceList = {
    iconLv12: [
      {
        name: 'FLOODED',
        value: {maxVolt: 14.4, minVolt: 12.0},
        ranges: {maxVolt: {max: 14.4, min: 14}, minVolt: {max: 12.5, min: 12}},
      },
      {
        name: 'SEALED',
        value: {maxVolt: 14.15, minVolt: 12.0},
        ranges: {
          maxVolt: {max: 14.15, min: 13.18},
          minVolt: {max: 12.5, min: 12},
        },
      },
      {
        name: 'GEL',
        value: {maxVolt: 14.0, minVolt: 12.0},
        ranges: {maxVolt: {max: 14, min: 13.6}, minVolt: {max: 12.5, min: 12}},
      },
    ],
    iconLv24: [
      {
        name: 'FLOODED',
        value: {maxVolt: 28.8, minVolt: 24.0},
        ranges: {maxVolt: {max: 28.8, min: 28}, minVolt: {max: 25, min: 24}},
      },
      {
        name: 'SEALED',
        value: {maxVolt: 28.3, minVolt: 24.0},
        ranges: {maxVolt: {max: 28.3, min: 27.6}, minVolt: {max: 25, min: 24}},
      },
      {
        name: 'GEL',
        value: {maxVolt: 28.0, minVolt: 24.0},
        ranges: {maxVolt: {max: 28, min: 27.2}, minVolt: {max: 25, min: 24}},
      },
    ],
  };
  const listHV = [
    {
      name: '48V',
      minVoltage: 48,
      maxVoltage: 54.96,
      ranges: {maxVolt: {max: 55, min: 54}, minVolt: {max: 50, min: 48}},
    },
    {
      name: '72V',
      minVoltage: 72,
      maxVoltage: 82.44,
      ranges: {maxVolt: {max: 82.5, min: 81}, minVolt: {max: 75, min: 72}},
    },
    {
      name: '96V',
      minVoltage: 96,
      maxVoltage: 109.92,
      ranges: {maxVolt: {max: 110, min: 108}, minVolt: {max: 100, min: 96}},
    },
    {
      name: '120V',
      minVoltage: 120,
      maxVoltage: 137.4,
      ranges: {maxVolt: {max: 137.5, min: 135}, minVolt: {max: 125, min: 120}},
    },
    {
      name: '144V',
      minVoltage: 144,
      maxVoltage: 164.88,
      ranges: {maxVolt: {max: 165, min: 162}, minVolt: {max: 150, min: 144}},
    },
    {
      name: '192V',
      minVoltage: 192,
      maxVoltage: 219.84,
      ranges: {maxVolt: {max: 220, min: 216}, minVolt: {max: 200, min: 192}},
    },
    {
      name: '240V',
      minVoltage: 240,
      maxVoltage: 274.8,
      ranges: {maxVolt: {max: 275, min: 270}, minVolt: {max: 250, min: 240}},
    },
    {
      name: '288V',
      minVoltage: 288,
      maxVoltage: 329.76,
      ranges: {maxVolt: {max: 330, min: 324}, minVolt: {max: 300, min: 288}},
    },
  ];

  const [isVisible, setVisible] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const [isVisible1, setVisible1] = React.useState(false);
  const [selectedValue1, setSelectedValue1] = React.useState('');

  const [maxVolt, setMaxVolt] = React.useState(0.0);
  const [minVolt, setMinVolt] = React.useState(0.0);

  const [deviceType, setDeviceType] = React.useState(1);
  const [year, setYear] = React.useState(1);
  const [numberInParalell, setNumberInParalell] = React.useState(1);

  const [batteryCapacity, setBatteryCapacity] = React.useState('');
  const [totalBatteryCapacity, setTotalBatteryCapacity] = React.useState(0.0);

  const [batteryMake, setBatteryMake] = React.useState('');
  const [batteryModel, setBatteryModel] = React.useState('');

  const [deviceDetailsFromQr, setDeviceDetailsFromQr] = React.useState(null);

  const [isLoading, setLoader] = React.useState(false);
  const [sessionId, setSessionId] = React.useState('');
  const [
    completedDeviceConnection,
    setCompletedDeviceConnection,
  ] = React.useState(false);

  React.useEffect(() => {
    getLocalDB('@customerDeviceManager', resCustomerDevData => {
      console.log('@customerDeviceManager', resCustomerDevData);
      setSessionId(resCustomerDevData.sessionId);
      setDeviceType(resCustomerDevData.deviceType);
      setDeviceDetailsFromQr({
        dev_category: deviceTypeApi,
        devicetype: deviceHwType,
      });
    });
  }, []);

  const toggleVisible = () => {
    setVisible(!isVisible);
  };

  const onToggleSelect = selectedData => {
    setSelectedValue(selectedData);
    setMaxVolt(selectedData.value.maxVolt);
    setMinVolt(selectedData.value.minVolt);
    toggleVisible();
  };

  const toggleVisible1 = () => {
    setVisible1(!isVisible1);
  };

  const onToggleSelect1 = selectedData => {
    setSelectedValue1(selectedData);
    setMaxVolt(selectedData.maxVoltage);
    setMinVolt(selectedData.minVoltage);
    toggleVisible1();
  };

  const handleIncr = () => {
    if (year === 10 || year > 10) {
      setYear(10);
    } else {
      setYear(year + 1);
    }
  };

  const handleDcr = () => {
    if (year <= 1) {
      setYear(1);
    } else {
      setYear(year - 1);
    }
  };

  const handleIncrNum = async () => {
    setNumberInParalell(numberInParalell + 1);
  };

  React.useEffect(() => {
    if (deviceTypeApi === 'HV') {
      setTotalBatteryCapacity(numberInParalell * batteryCapacity);
    } else {
      setTotalBatteryCapacity(batteryCapacity * numberInParalell);
    }
  }, [numberInParalell]);

  const handleDcrNum = () => {
    if (numberInParalell <= 1) {
      setNumberInParalell(1);
    } else {
      setNumberInParalell(numberInParalell - 1);
    }

    if (deviceTypeApi === 'HV') {
      setTotalBatteryCapacity(numberInParalell * batteryCapacity);
    } else {
      setTotalBatteryCapacity(batteryCapacity * numberInParalell);
    }
  };

  const handleBatteryCapacity = async data => {
    setBatteryCapacity(data);
  };

  React.useEffect(() => {
    if (deviceTypeApi === 'HV') {
      setTotalBatteryCapacity(numberInParalell * batteryCapacity);
    } else {
      setTotalBatteryCapacity(batteryCapacity * numberInParalell);
    }
  }, [batteryCapacity]);

  const handleValidation = callback => {
    let validate = {
      status: true,
      msg: '',
    };

    if (batteryMake === '') {
      validate.status = false;
      validate.msg = 'Battery Make -> Field Cannot Be Empty';
    } else if (batteryModel === '') {
      validate.status = false;
      validate.msg = 'Battery Model -> Field Cannot Be Empty';
    } else if (batteryCapacity === '') {
      validate.status = false;
      validate.msg = 'Battery Capacity Cannot be Empty';
    }

    // console.log('deviceDetailsFromQr ====>', deviceDetailsFromQr.dev_category);
    if (deviceDetailsFromQr && deviceDetailsFromQr.dev_category === 'L') {
      if (selectedValue === '') {
        validate.status = false;
        validate.msg = 'Must choose Battery Type in LV';
      }
      if (selectedValue !== '') {
        if (
          maxVolt > selectedValue.ranges.maxVolt.max ||
          maxVolt < selectedValue.ranges.maxVolt.min
        ) {
          validate.status = false;
          validate.msg = `In MAX VOLT -> Min Voltage is ${selectedValue.ranges.maxVolt.min} and Max Voltage ${selectedValue.ranges.maxVolt.max}`;
        }

        if (
          minVolt > selectedValue.ranges.minVolt.max ||
          minVolt < selectedValue.ranges.minVolt.min
        ) {
          validate.status = false;
          validate.msg = `In MIN VOLT -> Min Voltage is ${selectedValue.ranges.minVolt.min} and Max Voltage ${selectedValue.ranges.minVolt.max}`;
        }
      } else {
        validate.status = false;
        validate.msg = 'Must choose Battery Type';
      }
    } else if (
      deviceDetailsFromQr &&
      deviceDetailsFromQr.dev_category === 'H'
    ) {
      if (selectedValue1 === '') {
        validate.status = false;
        validate.msg = 'Must choose Battery Type in HV';
      }

      if (selectedValue1 !== '') {
        if (
          maxVolt > selectedValue1.ranges.maxVolt.max ||
          maxVolt < selectedValue1.ranges.maxVolt.min
        ) {
          validate.status = false;
          validate.msg = `In MAX VOLT -> Min Voltage is ${selectedValue1.ranges.maxVolt.min} and Max Voltage ${selectedValue1.ranges.maxVolt.max}`;
        }
        if (
          minVolt > selectedValue1.ranges.minVolt.max ||
          minVolt < selectedValue1.ranges.minVolt.min
        ) {
          validate.status = false;
          validate.msg = `In MIN VOLT -> Min Voltage is ${selectedValue1.ranges.minVolt.min} and Max Voltage ${selectedValue1.ranges.minVolt.max}`;
        }
      } else {
        validate.status = false;
        validate.msg = 'Must choose Battery Type in HV';
      }
    }

    if (validate.status) {
      if (callback) callback(true);
    } else {
      alert(validate.msg);
    }
  };

  const handleContinue = () => {
    handleValidation(isValid => {
      if (isValid) {
        let datas =
          deviceTypeApi == 'HV'
            ? {
                sessionId: sessionId,
                batteryMaxVoltage: maxVolt,
                batteryMinVoltage: minVolt,
                batteryAh: Number(batteryCapacity) * numberInParalell,
              }
            : {
                sessionId: sessionId,
                batteryType: deviceType,
                batteryMaxVoltage: maxVolt,
                batteryAh: Number(batteryCapacity) * numberInParalell,
                batteryAge: year,
                forceTripExileVoltage: deviceType === 1 ? '12.0' : '24.0',
                noOfFts: '03',
              };

        setLoader(true);
        setTimeout(() => {
          setLoader(false);
          Battery_Config_Stage_3(deviceTypeApi, datas, res => {
            console.log('Res success stage -- > Battery Update', res);
            // batteryUpdateApi();
            setCompletedDeviceConnection(true);
          });
          setCompletedDeviceConnection(false);
        }, 5000);
      }
    });
  };

  const batteryUpdateApi = () => {
    getLocalDB('@customerLoginDetails', custLoginData => {
      let payload = {
        user_id: allData.cust_id,
        devid: allData.dev_id,
        singlecapa: batteryCapacity,
        make: batteryMake,
        model: batteryModel,
        parallelnos: numberInParalell,
        totalcap: totalBatteryCapacity,
        battype: selectedValue.name,
        batage: year,
        maxvolt: maxVolt,
        minvolt: minVolt,
        token: custLoginData.token,
      };
      console.log('custLoginData', payload);
      NetInfo.fetch().then(state => {
        if (state.isInternetReachable) {
          setLoader(true);
          MiddleWareForAuth('POST', UPDATE_BATTERY, payload, (res, err) => {
            setLoader(false);
            setLoader(false);
            if (err === null) {
              if (res !== null && res.data) {
                if (res.data.status === 'Success') {
                  console.log('customerUPDATE_BATTERY RES=>', res.data);
                  navigation.goBack();
                } else {
                  if (res.data && res.data.message) {
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
          });
        } else {
          Alert.alert('Warning', 'No Internet Connection');
        }
      });
    });
  };

  const handleMaxVolt = data => {
    setMaxVolt(data);
  };

  const handleMinVolt = data => {
    setMinVolt(data);
  };

  return (
    <View style={Styles.InputContainer}>
      <ScrollView style={{flex: 1}}>
        <View style={Styles.wrappper}>
          <CustomInput
            form
            placeholder="Battery Make"
            onChange={value => setBatteryMake(value)}
            value={batteryMake}
          />
        </View>
        <View style={Styles.wrappper}>
          <CustomInput
            form
            placeholder="Battery Model"
            value={batteryModel}
            onChange={value => setBatteryModel(value)}
          />
        </View>

        {deviceTypeApi && deviceTypeApi === 'HV' ? null : (
          <View style={Styles.wrappper}>
            <CustomDropdown
              placeholder="Battery Model Battery Type"
              value={
                selectedValue
                  ? selectedValue.name
                    ? selectedValue.name
                    : ''
                  : ''
              }
              isVisible={isVisible}
              toggleVisible={toggleVisible}
              onToggleSelect={onToggleSelect}
              list={deviceType == 1 ? deviceList.iconLv12 : deviceList.iconLv24}
            />
          </View>
        )}

        <View style={Styles.wrappper}>
          <CustomDropdown
            isDisable={deviceType === 1 || deviceType === 2 ? true : false}
            placeholder="Battery Volt"
            value={
              deviceDetailsFromQr !== null
                ? deviceDetailsFromQr.dev_category === 'LV' ||
                  deviceDetailsFromQr.dev_category === 'L'
                  ? deviceDetailsFromQr.devicetype
                  : selectedValue1.minVoltage
                  ? selectedValue1.minVoltage + 'V'
                  : ''
                : selectedValue1.minVoltage + 'V'
            }
            isVisible={isVisible1}
            toggleVisible={toggleVisible1}
            onToggleSelect={onToggleSelect1}
            list={deviceTypeApi === 'HV' && listHV}
          />
        </View>

        <CustomWrapper pv2>
          <CustomInput
            form
            placeholder="Max Volt"
            value={maxVolt !== '' ? maxVolt.toString() : maxVolt}
            onChange={value => handleMaxVolt(value)}
            keyboardType={'number-pad'}
          />
        </CustomWrapper>

        <CustomWrapper>
          <CustomInput
            form
            placeholder="Min Volt"
            value={minVolt !== '' ? minVolt.toString() : minVolt}
            onChange={value => handleMinVolt(value)}
            keyboardType="number-pad"
          />
        </CustomWrapper>

        <CustomCounter
          label="Battery Age"
          value={year + ' Year'}
          handleIncr={() => handleDcr()}
          handleDecr={() => handleIncr()}
        />

        <View style={Styles.wrappper}>
          <CustomInput
            form
            placeholder="Battery Capacity (Ah)"
            value={batteryCapacity}
            onChange={data => handleBatteryCapacity(data)}
            keyboardType={'number-pad'}
          />
        </View>
        <CustomCounter
          label="Numbers in paralell"
          value={numberInParalell + ' No'}
          handleIncr={() => handleDcrNum()}
          handleDecr={() => handleIncrNum()}
        />
        <View style={Styles.wrappper}>
          <LabelValuePair
            label="Total Battery Capacity"
            value={totalBatteryCapacity + ' Ah'}
          />
        </View>
      </ScrollView>

      <View style={{flex: 0.3}}>
        <View style={CommonStyles.buttonWrapper}>
          {isLoading ? (
            <Loader />
          ) : (
            <CustomButton
              text={completedDeviceConnection ? 'Continue' : 'Config Device'}
              backgroundStyle={CommonStyles.buttonBgStyle}
              textStyle={CommonStyles.buttonTextStyle}
              onpress={() => {
                completedDeviceConnection
                  ? batteryUpdateApi()
                  : handleContinue();
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const TopSection = ({navigation}) => {
  return (
    <CustomHeader
      leftIcon={arrowBackIcon}
      leftIconAction={() => navigation.goBack()}
      centerText="Battery Update"
    />
  );
};

const CustomerBatteryUpdateScreen = ({navigation, route}) => {
  const [step, setStep] = useState(1);
  const [isLoading, setLoader] = useState(false);
  const [deviceCommunicationData, setDeviceCommunicationDat] = useState('');
  const [deviceTypeApi, setDeviceTypeApi] = useState('');
  const [deviceHwType, setDeviceHwType] = useState('');
  const [allData, setAllData] = useState('');

  React.useEffect(() => {
    console.log('route --> in SERVER CONFIG', route.params);
    if (route && route.params && route.params.deviceTypeApi) {
      if (
        route.params.deviceTypeApi.dev_category == 'iCON 12 V' ||
        route.params.deviceTypeApi.dev_category == 'iCON 24 V'
      ) {
        setDeviceTypeApi('LV');
      } else if (route.params.deviceTypeApi.dev_category == 'iCON 240 V') {
        setDeviceTypeApi('HV');
      }
      setDeviceHwType(route.params.deviceTypeApi.dev_category);
      setAllData(route.params.deviceTypeApi);
    }

    AsyncStorage.getItem('@res_devCommunication_stage_1').then(resDb => {
      const jsonValue = JSON.parse(resDb);
      if (jsonValue) {
        setDeviceCommunicationDat(jsonValue);
      }
    });

    // getLocalDB('@deviceComData', localData => {
    //   setDeviceComServerData(localData);
    // });
  }, []);

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <TopBottomLayout
        topHeight={1}
        bottomHeight={11}
        topSection={<TopSection navigation={navigation} />}
        bottomSection={
          <Form2
            step={step}
            navigation={navigation}
            setLoader={setLoader}
            deviceCommData={deviceCommunicationData}
            deviceTypeApi={deviceTypeApi}
            deviceHwType={deviceHwType}
            allData={allData}
          />
        }
      />
    </ScrollView>
  );
};

export default CustomerBatteryUpdateScreen;
