import React from 'react';
import {View, Text} from 'react-native';
import {TopBottomLayout, CustomInput, CustomButton} from '../../../components';
import {CommonStyles} from '../../../utils/CommonStyles';
import Styles from './styles';

const CustomerForm = () => {
  return (
    <View>
      <View>
        <Text style={Styles.header}>Customer Details</Text>
        <Text style={Styles.desc}>Enter customer details</Text>
      </View>
      <View style={Styles.inputContainer}>
        <CustomInput form placeholder="Name" />
      </View>
      <View style={Styles.inputContainer}>
        <CustomInput form placeholder="Mobile" />
      </View>
      <View style={Styles.inputContainer}>
        <CustomInput form placeholder="Email" />
      </View>
      <View style={Styles.inputContainer}>
        <CustomInput form placeholder="Location" />
      </View>
      <View style={CommonStyles.buttonWrapper}>
        <CustomButton
          text="Configure"
          backgroundStyle={CommonStyles.buttonBgStyle}
          textStyle={CommonStyles.buttonTextStyle}
          onpress={() => alert('pl')}
        />
      </View>
    </View>
  );
};

const deviceConfigCustomerDetailsScreen = () => {
  return (
    <View style={{flex: 1}}>
      <TopBottomLayout
        topHeight={0.1}
        bottomHeight={1}
        backButtonType="backArrow"
        topSection={null}
        bottomSection={<CustomerForm />}
      />
    </View>
  );
};

export default deviceConfigCustomerDetailsScreen;
