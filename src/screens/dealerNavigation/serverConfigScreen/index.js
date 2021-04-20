import React, {useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Menu, Divider, Provider} from 'react-native-paper';

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
} from '../../../components';
import {color, CommonStyles} from '../../../utils/CommonStyles';
import {
  processCompleteIcon,
  processCompletedBarIcon,
  processPendingIcon,
  processPendingBarIcon,
  inProgressIcon,
} from '../../../assets';
import {
  SERVER_IP,
  SERVER_PORT,
  SERVER_PORT_HV,
} from '../../../utils/deviceConfigs/constants';
import {
  Battery_Config_Stage_3,
  DeviceCommunication_Stage_2,
  UPS_Config_Stage_4,
  SOLAR_Config_Stage_5,
  THRESHOLD_Config_Stage_6,
} from '../../../utils/deviceConfigs/deviceConfig';
import {
  getLocalDB,
  getAllKeys,
  Loader,
  StoreLocalDB,
} from '../../../utils/commonUtils';

const StepsPreview = ({step}) => {
  const [stepHeaderValue, setstepHeaderValue] = useState([
    {
      header: 'Server Configuration',
      value: 'Enter server configuration details',
    },
    {
      header: 'Battery Configuration',
      value: 'Enter battery configuration details',
    },
    {header: 'UPS Configuration', value: 'Enter UPS configuration details'},
    {header: 'Solar Configuration', value: 'Enter solar configuration details'},
    {
      header: 'Threshold Configuration',
      value: 'Enter Threshold configuration details',
    },
  ]);

  const [stepProcess, setStepsProcess] = useState({
    1: [
      inProgressIcon,
      processPendingBarIcon,
      processPendingIcon,
      processPendingBarIcon,
      processPendingIcon,
      processPendingBarIcon,
      processPendingIcon,
      processPendingBarIcon,
      processPendingIcon,
    ],
    2: [
      processCompleteIcon,
      processCompletedBarIcon,
      inProgressIcon,
      processPendingBarIcon,
      processPendingIcon,
      processPendingBarIcon,
      processPendingIcon,
      processPendingBarIcon,
      processPendingIcon,
    ],
    3: [
      processCompleteIcon,
      processCompletedBarIcon,
      processCompleteIcon,
      processCompletedBarIcon,
      inProgressIcon,
      processPendingBarIcon,
      processPendingIcon,
      processPendingBarIcon,
      processPendingIcon,
    ],
    4: [
      processCompleteIcon,
      processCompletedBarIcon,
      processCompleteIcon,
      processCompletedBarIcon,
      processCompleteIcon,
      processCompletedBarIcon,
      inProgressIcon,
      processPendingBarIcon,
      processPendingIcon,
    ],
    5: [
      processCompleteIcon,
      processCompletedBarIcon,
      processCompleteIcon,
      processCompletedBarIcon,
      processCompleteIcon,
      processCompletedBarIcon,
      processCompleteIcon,
      processCompletedBarIcon,
      inProgressIcon,
    ],
  });

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 40,
        }}>
        {stepProcess[step].map((item, key) => {
          return <Image source={item} key={key} />;
        })}
      </View>
      <View>
        <CustomHeaderWithDesc
          white
          headerText={stepHeaderValue[step - 1].header}
          descText={stepHeaderValue[step - 1].value}
        />
      </View>
    </View>
  );
};

const Form5 = ({navigation, setStep, deviceCommData, deviceComServerData}) => {
  console.log('props in form 5', deviceCommData);

  const [equalizationIntervel, setEqualizationIntervel] = useState('30');
  const [equalizationDuration, setEqualizationDuration] = useState('6');
  const [absorptionIntervel, setAbsorptionIntervel] = useState('5');

  const [isLoading, setLoader] = useState(false);

  const handleValidation = callback => {
    let validate = {
      status: true,
      msg: '',
    };

    if (equalizationIntervel > 30 && equalizationIntervel < 7) {
      validate.status = false;
      validate.msg = 'Equalization Interval (In Days) Range Must be 7 - 30 ';
    } else if (equalizationDuration === '') {
      validate.status = false;
      validate.msg = 'Equalization Duration (In Hours) Range must be 1 - 12 ';
    } else if (absorptionIntervel === '') {
      validate.status = false;
      validate.msg = 'Absorption Interval (In Days) Range must be 1 - 7 ';
    }

    if (validate.status) {
      if (callback) callback(true);
    } else {
      alert(validate.msg);
    }
  };

  const handleContinue = () => {
    handleValidation(isValid => {
      if (isValid) setLoader(true);

      deviceComServerData.equalization_interval = equalizationIntervel;
      deviceComServerData.equalization_duration = equalizationDuration;
      deviceComServerData.absorption_interval = absorptionIntervel;

      console.log(
        'deviceComServerData in SOLAR ==>',
        deviceComServerData,
        equalizationIntervel,
        equalizationDuration,
        absorptionIntervel,
      );
      StoreLocalDB('@deviceComData', deviceComServerData, res => {
        if (deviceCommData.deviceType === 4) {
          setLoader(false);
          navigation.navigate('dealerDeviceConfigMenu');
        } else {
          setTimeout(() => {
            THRESHOLD_Config_Stage_6(
              'LV',
              {
                sessionId: deviceCommData.sessionId,
                equalizationIntervel,
                equalizationDuration,
                absorptionIntervel,
              },
              res => {
                console.log('REs stage 6 THRESHOLD', res);
                navigation.navigate('dealerDeviceConfigMenu');
              },
            );
            setLoader(false);
          }, 5000);
        }
      });
    });
  };

  return (
    <View style={Styles.InputContainer}>
      <ScrollView style={{flex: 1}}>
        <View style={Styles.wrappper}>
          <CustomInput
            form
            labelValuePair
            placeholder="Default Value 30"
            label="Equalization Interval (In Days)"
            validation="Valid entry between 7 to 30."
            value={equalizationIntervel}
            onChange={value => setEqualizationIntervel(value)}
            keyboardType={'number-pad'}
          />
        </View>
        <View style={Styles.wrappper}>
          <CustomInput
            form
            labelValuePair
            placeholder="Default Value 6"
            label="Equalization Duration (In Hours)"
            validation="Valid entry  between 1 to 12."
            value={equalizationDuration}
            onChange={value => setEqualizationDuration(value)}
            keyboardType={'number-pad'}
          />
        </View>
        <View style={Styles.wrappper}>
          <CustomInput
            form
            labelValuePair
            placeholder="Default Value 5"
            label="Absorption Interval (In Days)"
            validation="Valid entry  between 1 to 7."
            value={absorptionIntervel}
            onChange={value => setAbsorptionIntervel(value)}
            keyboardType={'number-pad'}
          />
        </View>
      </ScrollView>
      <View style={{flex: 0.25}}>
        <View style={CommonStyles.buttonWrapper}>
          {isLoading ? (
            <Loader />
          ) : (
            <CustomButton
              text="Done"
              backgroundStyle={CommonStyles.buttonBgStyle}
              textStyle={CommonStyles.buttonTextStyle}
              onpress={() => handleContinue()}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const Form4 = ({setStep, deviceCommData, deviceComServerData}) => {
  const [solarModuleMake, setSolarModuleMake] = useState('');
  const [solarModuleModel, setSolarModuleModel] = useState('');
  const [solarModuleWattage, setSolarModuleWattage] = useState('');
  const [modulesInSeries, setModulesInSeries] = useState(1);
  const [modulesInParelell, setModulesInParalell] = useState(1);
  const [totalSolarModuleWattage, setTotalSolarModuleWattage] = useState(0);
  const [isLoading, setLoader] = useState(false);

  const handleIncrSeries = async () => {
    setModulesInSeries(modulesInSeries + 1);
  };

  const handleDcrSeries = () => {
    if (modulesInSeries <= 1) {
      setModulesInSeries(1);
    } else {
      setModulesInSeries(modulesInSeries - 1);
    }
  };

  const handleIncrParelell = async () => {
    setModulesInParalell(modulesInParelell + 1);
  };

  const handleDcrParelell = () => {
    if (modulesInParelell <= 1) {
      setModulesInParalell(1);
    } else {
      setModulesInParalell(modulesInParelell - 1);
    }
  };

  React.useEffect(() => {
    setTotalSolarModuleWattage(
      Number(solarModuleWattage * modulesInSeries * modulesInParelell).toFixed(
        2,
      ),
    );
  }, [modulesInSeries]);

  React.useEffect(() => {
    setTotalSolarModuleWattage(
      Number(solarModuleWattage * modulesInSeries * modulesInParelell).toFixed(
        2,
      ),
    );
  }, [modulesInParelell]);

  React.useEffect(() => {
    setTotalSolarModuleWattage(
      Number(solarModuleWattage * modulesInSeries * modulesInParelell).toFixed(
        2,
      ),
    );
  }, [solarModuleWattage]);

  const handleValidation = callback => {
    let validate = {
      status: true,
      msg: '',
    };

    if (solarModuleMake === '') {
      validate.status = false;
      validate.msg = 'Solar Module Makes -> Field Cannot Be Empty';
    } else if (solarModuleModel === '') {
      validate.status = false;
      validate.msg = 'Solar Module Model -> Field Cannot Be Empty';
    } else if (solarModuleWattage === '') {
      validate.status = false;
      validate.msg = 'Solar Module Wattage -> Field Cannot Be Empty';
    }

    if (validate.status) {
      if (callback) callback(true);
    } else {
      alert(validate.msg);
    }
  };

  const handleContinue = () => {
    handleValidation(isValid => {
      if (isValid) setLoader(true);

      deviceComServerData.paneldesc = solarModuleMake + ',' + solarModuleModel;
      deviceComServerData.panelsinglecapa = solarModuleWattage;
      deviceComServerData.panelparallelnos = modulesInParelell;
      deviceComServerData.panelseriesnos = modulesInSeries;
      deviceComServerData.paneltotalcap = totalSolarModuleWattage;

      console.log(
        'deviceComServerData in SOLAR ==>',
        deviceComServerData,
        deviceCommData,
      );
      if (deviceCommData.deviceType === 4) {
        setLoader(false);
        setStep(5);
      } else {
        setTimeout(() => {
          SOLAR_Config_Stage_5(
            'LV',
            {
              sessionId: deviceCommData.sessionId,
              solarCapacity: totalSolarModuleWattage,
              mainChargeIN: deviceCommData.deviceType == 1 ? '11.2' : '22.4',
              mainChargeOUT: deviceCommData.deviceType == 1 ? '12' : '24',
            },
            res => {
              console.log('REs stage 5 IN SOLAR', res);
              setStep(5);
            },
          );
          setLoader(false);
        }, 5000);
      }
    });
  };

  return (
    <View style={Styles.InputContainer}>
      <ScrollView style={{flex: 1}}>
        <View style={Styles.wrappper}>
          <CustomInput
            form
            placeholder="Solar Module Make"
            value={solarModuleMake}
            onChange={value => setSolarModuleMake(value)}
          />
        </View>
        <View style={Styles.wrappper}>
          <CustomInput
            form
            placeholder="Solar Module Model"
            value={solarModuleModel}
            onChange={value => setSolarModuleModel(value)}
          />
        </View>
        <View style={Styles.wrappper}>
          <CustomInput
            form
            placeholder="Solar Module Wattage (kW)"
            value={solarModuleWattage.toString()}
            onChange={value => setSolarModuleWattage(value)}
            keyboardType={'number-pad'}
          />
        </View>

        <CustomCounter
          label="Modules in series"
          value={modulesInSeries + ' No'}
          handleIncr={() => handleDcrSeries()}
          handleDecr={() => handleIncrSeries()}
        />

        <CustomCounter
          label="Modules in paralell"
          value={modulesInParelell + ' No'}
          handleIncr={() => handleDcrParelell()}
          handleDecr={() => handleIncrParelell()}
        />

        <View style={Styles.wrappper}>
          <LabelValuePair
            label="Total Solar Capacity"
            value={totalSolarModuleWattage + ' kW'}
          />
        </View>
      </ScrollView>
      <View style={{flex: 0.4}}>
        <View style={CommonStyles.buttonWrapper}>
          {isLoading ? (
            <Loader />
          ) : (
            <CustomButton
              text="Continue"
              backgroundStyle={CommonStyles.buttonBgStyle}
              textStyle={CommonStyles.buttonTextStyle}
              onpress={() => handleContinue()}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const Form3 = ({setStep, deviceCommData, deviceComServerData}) => {
  console.log('props in form 3', deviceCommData);

  const [upsVA, setUpsVA] = useState('');
  const [upsMake, setUpsMake] = useState('');
  const [upsModel, setUpsModel] = useState('');

  const [isValid, setValidate] = useState(true);
  const [isLoading, setLoader] = useState(false);

  const handleValidation = callback => {
    let validate = {
      status: true,
      msg: '',
    };

    if (upsMake === '') {
      validate.status = false;
      validate.msg = 'UPS Makes -> Field Cannot Be Empty';
    } else if (upsModel === '') {
      validate.status = false;
      validate.msg = 'UPS Model -> Field Cannot Be Empty';
    }

    if (deviceCommData.deviceType !== 4) {
      if (upsVA === '') {
        validate.status = false;
        validate.msg = 'UPS VA -> Field Cannot Be Empty ';
      }
      // else if (upsVA > 600 && upsVA < 1100) {
      // } else {
      //   validate.status = false;
      //   validate.msg = 'UPS VA ->Please Check Range';
      // }
    }

    console.log('validate.status', validate, isValid);

    if (validate.status) {
      if (callback) callback(true);
    } else {
      alert(validate.msg);
    }
  };

  const handleContinue = () => {
    handleValidation(isValid => {
      if (isValid) {
        setLoader(true);

        if (deviceCommData.deviceType == 1) {
          if (upsVA >= 600 && upsVA <= 1100) {
            setValidate(true);
            if (isValid) {
              let dcOverload = DcOverload();
              let acOverload = AcOverload();
              console.log('AC = DC => ', dcOverload, acOverload);

              deviceComServerData.invdesc = upsMake + ',' + upsModel;
              deviceComServerData.invcap = upsVA;

              console.log(
                'deviceComServerData in UPS ==>',
                deviceComServerData,
                deviceCommData,
              );

              setTimeout(() => {
                UPS_Config_Stage_4(
                  'LV',
                  {
                    sessionId: deviceCommData.sessionId,
                    dcOverload,
                    acOverload,
                  },
                  res => {
                    console.log('res in dtg 4 UPS Config ', res);
                    setStep(4);
                  },
                );
                setLoader(false);
              }, 5000);
            }
          } else {
            setValidate(false);
          }
        } else if (deviceCommData.deviceType == 4) {
          deviceComServerData.invdesc = upsMake + ',' + upsModel;
          deviceComServerData.invcap = upsVA;
          setStep(4);
          setLoader(false);
        } else {
          if (upsVA >= 1200 && upsVA <= 2000) {
            setValidate(true);
          } else {
            setValidate(false);
          }
          setLoader(false);
        }
      } else {
        setLoader(false);
      }
    });
  };

  const DcOverload = () => {
    let result = (upsVA * 0.8) / deviceCommData.deviceType;
    return result;
  };

  const AcOverload = () => {
    let result = (upsVA * 0.8) / 230;
    return result;
  };

  return (
    <View style={Styles.InputContainer}>
      <View style={{flex: 1}}>
        <View style={Styles.wrappper}>
          <CustomInput
            form
            placeholder="UPS Make"
            value={upsMake}
            onChange={value => setUpsMake(value)}
          />
        </View>
        <View style={Styles.wrappper}>
          <CustomInput
            form
            placeholder="UPS Model"
            value={upsModel}
            onChange={value => setUpsModel(value)}
          />
        </View>
        <View style={Styles.wrappper}>
          <CustomInput
            form
            placeholder="UPS VA"
            value={upsVA.toString()}
            onChange={value => setUpsVA(value)}
            keyboardType={'number-pad'}
          />
        </View>
        <Text
          style={[
            Styles.form3desc,
            !isValid && {color: 'red', fontWeight: 'bold'},
          ]}>
          Value range for iCON 12V - 600 to 1100 & for iCON 24V - 1200 to 2000.
        </Text>
      </View>
      <View style={{flex: 0.4}}>
        <View style={CommonStyles.buttonWrapper}>
          {isLoading ? (
            <Loader />
          ) : (
            <CustomButton
              text="Continue"
              backgroundStyle={CommonStyles.buttonBgStyle}
              textStyle={CommonStyles.buttonTextStyle}
              onpress={() => handleContinue()}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const Form2 = ({setStep, deviceTypeApi, deviceComServerData}) => {
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

  React.useEffect(() => {
    console.log('FOrm 2 DATAS', deviceTypeApi, deviceComServerData);
    AsyncStorage.getItem('@res_devCommunication_stage_1').then(resDb => {
      const jsonValue = JSON.parse(resDb);
      setDeviceType(jsonValue.deviceType);
    });

    getLocalDB('@deviceDetailsFromQr', deviceDetailsFromQr => {
      setDeviceDetailsFromQr(deviceDetailsFromQr);
      console.log(' deviceDetailsFromQr => ', deviceDetailsFromQr);
    });
  }, []);

  const toggleVisible = () => {
    setVisible(!isVisible);
  };

  const onToggleSelect = selectedData => {
    setSelectedValue(selectedData);
    setMaxVolt(selectedData.value.maxVolt);
    setMinVolt(selectedData.value.minVolt);

    console.log('Dropdown =>', maxVolt, minVolt);
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
      setTotalBatteryCapacity(numberInParalell * deviceType * batteryCapacity);
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
      setTotalBatteryCapacity(numberInParalell * deviceType * batteryCapacity);
    }
  };

  const handleBatteryCapacity = async data => {
    setBatteryCapacity(data);

    if (deviceTypeApi === 'HV') {
      setTotalBatteryCapacity(numberInParalell * batteryCapacity);
    } else {
      setTotalBatteryCapacity(data * deviceType * batteryCapacity);
    }
  };

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

    console.log('deviceDetailsFromQr ====>', deviceDetailsFromQr.dev_category);
    if (deviceDetailsFromQr.dev_category === 'L') {
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
    } else if (deviceDetailsFromQr.dev_category === 'H') {
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
      if (isValid)
        AsyncStorage.getItem('@res_devCommunication_stage_1').then(resDb => {
          const jsonValue = JSON.parse(resDb);
          console.log('resDb from local ==> ', resDb);
          // storing data for Server
          deviceComServerData.batmake = batteryMake;
          deviceComServerData.batmodel = batteryModel;
          deviceComServerData.battype = selectedValue.name;
          deviceComServerData.batmaxvolt = maxVolt;
          deviceComServerData.batminvolt = minVolt;
          deviceComServerData.batage = year;
          deviceComServerData.batparallelnos = numberInParalell;
          deviceComServerData.battotalcap = totalBatteryCapacity;
          let datas =
            deviceTypeApi == 'HV'
              ? {
                  sessionId: jsonValue.sessionId,
                  batteryMaxVoltage: maxVolt,
                  batteryMinVoltage: minVolt,
                  batteryAh: Number(batteryCapacity) * numberInParalell,
                }
              : {
                  sessionId: jsonValue.sessionId,
                  batteryType: deviceType,
                  batteryMaxVoltage: maxVolt,
                  batteryAh: Number(batteryCapacity) * numberInParalell,
                  batteryAge: year,
                  forceTripExileVoltage: deviceType === 1 ? '12.0' : '24.0',
                  noOfFts: '03',
                };

          console.log(
            'BEFORE DEV Comm ===> DevCommSerrData',
            deviceComServerData,
          );
          setLoader(true);
          setTimeout(() => {
            setLoader(false);
            Battery_Config_Stage_3(
              deviceTypeApi, //!== '' ? deviceTypeApi : 'LV',
              datas,
              res => {
                console.log('Res success stage -- > 3', res);
                setStep(3);
              },
            );
          }, 5000);
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
            onChange={value => setBatteryModel(value)}
          />
        </View>

        {deviceTypeApi && deviceTypeApi === 'HV' ? null : (
          <View style={Styles.wrappper}>
            <CustomDropdown
              placeholder="Battery Model Battery Type"
              value={selectedValue.name}
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
                ? deviceDetailsFromQr.dev_category === 'L'
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
              text="Continue"
              backgroundStyle={CommonStyles.buttonBgStyle}
              textStyle={CommonStyles.buttonTextStyle}
              onpress={() => handleContinue()}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const Form1 = ({step, setStep, deviceCommData, deviceTypeApi}) => {
  console.log('deviceCommData in FORM 1 ==>  ', deviceCommData, deviceTypeApi);
  const [serverIp, setServerIp] = useState(SERVER_IP);
  const [serverPort, setServerPort] = useState(
    deviceTypeApi === 'HV' ? SERVER_PORT_HV : SERVER_PORT,
  );
  const [isLoading, setLoading] = useState(false);
  const [isDeviceConnected, setDeviceConnected] = useState(true);

  const handleContinue = () => {
    console.log('deviceTypeApi in Form 1', deviceTypeApi);
    setLoading(true);
    AsyncStorage.getItem('@res_devCommunication_stage_1').then(resDb => {
      const jsonValue = JSON.parse(resDb);

      if (deviceTypeApi !== '') {
        setTimeout(() => {
          setLoading(false);
          // deviceCommunicationStage2(deviceTypeApi, jsonValue);
          DeviceCommunication_Stage_2(
            deviceTypeApi,
            jsonValue.dev_stage_1,
            res => {
              if (res) {
                setDeviceConnected(true);
                setStep(2);
              } else {
                setDeviceConnected(false);
              }
            },
          );
        }, 5000);
      } else {
        setTimeout(() => {
          // deviceCommunicationStage2();
          DeviceCommunication_Stage_2(
            deviceTypeApi,
            jsonValue.dev_stage_1,
            res => {
              if (res) {
                setDeviceConnected(true);
                setStep(2);
              } else {
                setDeviceConnected(false);
              }
            },
          );
          setLoading(false);
        }, 5000);
      }
    });
  };

  return (
    <View style={Styles.InputContainer}>
      <View style={{flex: 1}}>
        <View style={Styles.wrappper}>
          <CustomInput form placeholder="IP Address" value={serverIp} />
        </View>
        <View style={Styles.wrappper}>
          <CustomInput
            form
            placeholder="Port Number"
            value={serverPort.toString()}
          />
        </View>
      </View>
      <View style={{flex: 0.4}}>
        <View style={CommonStyles.buttonWrapper}>
          {isLoading ? (
            <Loader />
          ) : (
            <CustomButton
              text={isDeviceConnected ? 'Continue' : 'Retry'}
              backgroundStyle={CommonStyles.buttonBgStyle}
              textStyle={CommonStyles.buttonTextStyle}
              onpress={() => handleContinue()}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const Forms = ({
  step,
  setStep,
  navigation,
  setLoader,
  deviceCommData,
  deviceTypeApi,
  deviceComServerData,
}) => {
  if (step === 1) {
    return (
      <Form1
        step={step}
        setStep={setStep}
        setLoader={setLoader}
        deviceCommData={deviceCommData}
        deviceTypeApi={deviceTypeApi}
      />
    );
  } else if (step === 2) {
    return (
      <Form2
        setStep={setStep}
        deviceCommData={deviceCommData}
        deviceTypeApi={deviceTypeApi}
        deviceComServerData={deviceComServerData}
      />
    );
  } else if (step === 3) {
    return (
      <Form3
        setStep={setStep}
        deviceCommData={deviceCommData}
        deviceComServerData={deviceComServerData}
      />
    );
  } else if (step === 4) {
    return (
      <Form4
        setStep={setStep}
        deviceCommData={deviceCommData}
        deviceComServerData={deviceComServerData}
      />
    );
  } else if (step === 5) {
    return (
      <Form5
        setStep={setStep}
        navigation={navigation}
        deviceCommData={deviceCommData}
        deviceComServerData={deviceComServerData}
      />
    );
  }
};

const serverConfigScreen = ({navigation, route}) => {
  const [step, setStep] = useState(1);
  const [isLoading, setLoader] = useState(false);
  const [deviceCommunicationData, setDeviceCommunicationDat] = useState('');
  const [deviceTypeApi, setDeviceTypeApi] = useState('');
  const [deviceComServerData, setDeviceComServerData] = useState(null);

  React.useEffect(() => {
    console.log('route --> in SERVER CONFIG', route.params.deviceTypeApi);
    if (route && route.params && route.params.deviceTypeApi) {
      setDeviceTypeApi(route.params.deviceTypeApi);
    }

    AsyncStorage.getItem('@res_devCommunication_stage_1').then(resDb => {
      const jsonValue = JSON.parse(resDb);
      if (jsonValue) {
        setDeviceCommunicationDat(jsonValue);
      }
    });

    getLocalDB('@deviceComData', localData => {
      console.log('localData in ServerConfig ', localData);
      setDeviceComServerData(localData);
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <TopBottomLayout
        topHeight={0.5}
        bottomHeight={1}
        backButtonType="backArrow"
        backButtonAction={() => {
          if (step === 1) {
            navigation.goBack();
          } else {
            setStep(step - 1);
          }
        }}
        topSection={<StepsPreview step={step} status={'completed'} />}
        bottomSection={
          <Forms
            step={step}
            setStep={setStep}
            navigation={navigation}
            setLoader={setLoader}
            deviceCommData={deviceCommunicationData}
            deviceTypeApi={deviceTypeApi}
            deviceComServerData={deviceComServerData}
          />
        }
      />
    </ScrollView>
  );
};

export default serverConfigScreen;
