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

export default InstallationDetailsScreen = ({navigation: {goBack}}) => {
  const data = [
    {
      dataName: 'User Info',
      dataSet: [
        {name: 'User', value: 'Username'},
        {name: 'Mobile', value: '9012 345 678'},
        {name: 'Email', value: 'mail@gmail.com'},
      ],
      icon: customerIcon,
    },
    {
      dataName: 'Deployment Info',
      dataSet: [
        {name: 'Deployment Date', value: '2019-06-08 '},
        {name: 'GPS Latitude', value: '10.0083'},
        {name: 'GPS Longitude', value: '76.6241'},
        {name: 'Device Id', value: 'A12XA1000005'},
      ],
      icon: locationIcon,
    },
    {
      dataName: 'Battery Info',
      dataSet: [
        {name: 'Manufacturer', value: 'Exide solar tubular '},
        {name: 'Capacity', value: '150Ah'},
        {name: 'Age', value: '01 Years'},
      ],
      icon: batteryInfoIcon,
    },
    {
      dataName: 'UPS Info',
      dataSet: [
        {name: 'Manufacturer', value: 'Power Station'},
        {name: 'Capacity', value: '1000VA'},
      ],
      icon: upsInfoIcon,
    },
    {
      dataName: 'Solar Module Info',
      dataSet: [
        {name: 'Manufacturer', value: 'Kirloskar'},
        {name: 'Capacity', value: '0.3 kW'},
        {name: 'Panel Tilt', value: '13 degree'},
        {name: 'Panel Orientation', value: 'South'},
      ],
      icon: solarModuleIcon,
    },
  ];
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={Styles.scrollContainer}>
      <View style={Styles.container}>
        <View style={Styles.topSection}>
          <CustomHeader
            leftIcon={arrowBackIcon}
            leftIconAction={() => goBack()}
            centerText="Installation Details"
          />
        </View>

        <View style={Styles.bottomSection}>
          {data && data.length
            ? data.map((item, index) => (
                <CollapsableComponent
                  key={index}
                  icon={item.icon}
                  text={item.dataName}
                  data={item.dataSet}
                />
              ))
            : null}
        </View>
      </View>
    </ScrollView>
  );
};
