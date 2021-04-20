import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Styles from './styles';
import {TopBottomLayout, CustomButton, CustomHeader} from '../../../components';
import {color, CommonStyles} from '../../../utils/CommonStyles';
import {qrCodeFrameIcon, closeIcon} from '../../../assets';

const QrCode = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <CustomHeader
        leftIcon={closeIcon}
        leftIconAction={() => navigation.goBack()}
        // centerText="Scan QR Code"
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={qrCodeFrameIcon} />
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            textAlign: 'center',
            width: 150,
          }}>
          Place QR Code inside this area to scan
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            textAlign: 'center',
            width: 150,
          }}>
          OR
        </Text>
      </View>
    </View>
  );
};

const DeviceID = ({navigation}) => {
  return (
    <View style={Styles.DeviceIDContainer}>
      <Text style={Styles.DeviceIDHeading}>Enter the device ID manually</Text>
      <TextInput
        placeholder="Device ID"
        style={Styles.DeviceIDInput}
        placeholderTextColor={color.black}
      />
      <View style={CommonStyles.buttonWrapper}>
        <CustomButton
          text="Get OTP"
          backgroundStyle={CommonStyles.buttonBgStyle}
          textStyle={CommonStyles.buttonTextStyle}
          onpress={() => navigation.navigate('dealerDeviceConfigDeviceInfo')}
        />
      </View>
    </View>
  );
};

const DeviceConfigScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <TopBottomLayout
        topHeight={1}
        bottomHeight={0.7}
        backButtonAction={() => navigation.goBack()}
        topSection={<QrCode />}
        bottomSection={<DeviceID navigation={navigation} />}
      />
    </View>
  );
};

export default DeviceConfigScreen;
