import React from 'react';
import {View, Text, Image} from 'react-native';
import {
  TopBottomLayout,
  CustomInput,
  CustomButton,
  CustomHeaderWithDesc,
  CustomHeader,
} from '../../../components';
import {CommonStyles} from '../../../utils/CommonStyles';
import Styles from './styles';
import {closeIcon, successCircleIcon} from '../../../assets';

const CustomSteps = ({header, desc}) => {
  return (
    <View style={Styles.stepsContainer}>
      <Text style={Styles.headerStep}>{header}</Text>
      <Text style={Styles.descStep}>{desc}</Text>
    </View>
  );
};

const Steps = () => {
  return (
    <View>
      <CustomHeader rightIcon={closeIcon} />
      <View style={Styles.headerSection}>
        <CustomHeaderWithDesc headerText="Steps to follow" />
      </View>
      <View>
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
          onpress={() => alert('pl')}
        />
      </View>
    </View>
  );
};

const ConnectionStatus = () => {
  return (
    <View>
      <CustomHeader rightIcon={closeIcon} />
      <CustomHeaderWithDesc
        headerText="Steps to follow"
        descText="Waiting for connection"
      />
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
        <Image source={successCircleIcon} />
        <Text>Connected</Text>
      </View>
    </View>
  );
};

const deviceConfigStepsScreen = () => {
  return (
    <View style={{flex: 1}}>
      <TopBottomLayout
        topHeight={0.8}
        bottomHeight={0.4}
        backButtonType="backArrow"
        topSection={null}
        bottomSection={<ConnectionStatus />}
      />
    </View>
  );
};

export default deviceConfigStepsScreen;
