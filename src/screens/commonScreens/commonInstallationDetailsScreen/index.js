import React, {useState} from 'react';
import {View, Text, Image, Dimensions, Modal, ScrollView} from 'react-native';
import Styles from './styles';
import {CustomHeader, CollapsableComponent} from '../../../components';
import {
  arrowBackIcon,
  customerIcon,
  locationIcon,
  batteryInfoIcon,
  upsInfoIcon,
  solarModuleIcon,
} from '../../../assets';
import {getLocalDB, Loader} from '../../../utils/commonUtils';
import {MiddleWareForAuth} from '../../../utils/apiServices';

export default InstallationDetailsScreen = ({route, navigation}) => {
  const [deviceDetails, setDeviceDetails] = React.useState([]);
  const [deviceData, setDeviceData] = React.useState([]);
  const [isLoading, setLoader] = React.useState(false);

  React.useEffect(() => {
    deviceDetailsApi(data => {
      manageData(data);
    });
  }, []);

  const deviceDetailsApi = callback => {
    setLoader(true);
    let deviceId = route.params.deviceDetails.deviceDetails.dev_id;

    getLocalDB('@customerLoginDetails', res => {
      console.log('res CUSTTTTTTTT', res);
      let endPoints =
        '/getdevicestatusdtls/' +
        res.cust_id +
        '/' +
        deviceId +
        '/' +
        res.token;
      console.log('END Points', endPoints);

      MiddleWareForAuth('GET', endPoints, null, (res, err) => {
        if (err === null) {
          if (res !== null && res.data) {
            setLoader(false);
            if (res.data.code == '10') {
              console.log('res.data', res.data.data);
              setDeviceDetails(res.data.data[0]);
              if (callback) callback(res.data.data[0]);
            } else {
              if (res.data && res.data.message) {
                // showToaster('error', res.data.message);
                Alert.alert('Warning', res.data.message);
              }
            }
          }
        } else {
          setLoader(false);
          console.error('Device VAlidation API  Error', err);
          Alert.alert('Warning', 'Something went wrong');
          // showToaster('error', 'Something went wrong');
        }
      });
    });
  };

  const manageData = async tempData => {
    const {
      username,
      mobilno,
      email,
      deploy_date,
      depl_gps_long,
      depl_gps_lat,
      dev_id,
      bat_desc,
      bat_capa,
      bat_age,
      inverter_desc,
      inverter_capa,
      panel_desc,
      panel_capa,
      panel_tilt,
      panel_orient,
    } = tempData;
    const data = await [
      {
        dataName: 'User Info',
        dataSet: [
          {name: 'User', value: username},
          {name: 'Mobile', value: mobilno},
          {name: 'Email', value: email},
        ],
        icon: customerIcon,
      },
      {
        dataName: 'Deployment Info',
        dataSet: [
          {name: 'Deployment Date', value: deploy_date},
          {name: 'GPS Latitude', value: depl_gps_long},
          {name: 'GPS Longitude', value: depl_gps_lat},
          {name: 'Device Id', value: dev_id},
        ],
        icon: locationIcon,
      },
      {
        dataName: 'Battery Info',
        dataSet: [
          {name: 'Manufacturer', value: bat_desc},
          {name: 'Capacity', value: bat_capa},
          {name: 'Age', value: bat_age},
        ],
        icon: batteryInfoIcon,
      },
      {
        dataName: 'UPS Info',
        dataSet: [
          {name: 'Manufacturer', value: inverter_desc},
          {name: 'Capacity', value: inverter_capa},
        ],
        icon: upsInfoIcon,
      },
      {
        dataName: 'Solar Module Info',
        dataSet: [
          {name: 'Manufacturer', value: panel_desc},
          {name: 'Capacity', value: panel_capa},
          {name: 'Panel Tilt', value: panel_tilt},
          {name: 'Panel Orientation', value: panel_orient},
        ],
        icon: solarModuleIcon,
      },
    ];

    setDeviceData(data);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={Styles.scrollContainer}>
      <View style={Styles.container}>
        <View style={Styles.topSection}>
          <CustomHeader
            leftIcon={arrowBackIcon}
            leftIconAction={() => navigation.goBack()}
            centerText="Installation Details"
          />
        </View>

        {isLoading ? (
          <Loader />
        ) : (
          <View style={Styles.bottomSection}>
            {deviceData && deviceData.length
              ? deviceData.map((item, index) => (
                  <CollapsableComponent
                    key={index}
                    icon={item.icon}
                    text={item.dataName}
                    data={item.dataSet}
                  />
                ))
              : null}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
