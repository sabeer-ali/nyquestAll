import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Styles from './styles';
import {CustomButton, LogoWithTextComponent} from '../../../components';
import {checkboxIcon} from '../../../assets';

import OTPInputView from '@twotalltotems/react-native-otp-input';

export default DealerLoginScreen = ({navigation}) => {
  const [isOtpPage, setOtpPage] = useState(false);
  return (
    <View style={Styles.container}>
      <View style={Styles.topSection}>
        <LogoWithTextComponent />
      </View>
      {isOtpPage ? (
        <DealerOTP navigation={() => navigation.navigate('home')} />
      ) : (
        <DealerLogin setOtpPage={setOtpPage} />
      )}
    </View>
  );
};

const DealerLogin = ({setOtpPage}) => {
  return (
    <View style={Styles.bottomSection}>
      <View>
        <Text style={Styles.login}>Login</Text>
        <Text style={Styles.loginDescription}>Enter your code to continue</Text>
      </View>

      <View style={Styles.inputContainer}>
        <TextInput placeholder="Dealer Code" style={Styles.inputText} />
      </View>

      <Text style={Styles.inputDescription}>
        We will send an OTP to your registered mobile number for login.
      </Text>

      <View style={Styles.buttonWrapper}>
        <CustomButton
          text="Get OTP"
          backgroundStyle={Styles.buttonBgStyle}
          textStyle={Styles.buttonTextStyle}
          onpress={() => setOtpPage(true)}
        />
      </View>
    </View>
  );
};

const DealerOTP = ({navigation}) => {
  return (
    <View style={Styles.bottomSection}>
      <View>
        <Text style={Styles.login}>Login</Text>
        <Text style={Styles.loginDescription}>Enter your code to continue</Text>
      </View>

      {/* <View style={Styles.inputContainer}>
        <TextInput placeholder="Dealer Code" style={Styles.inputText} />
      </View> */}

      <Text style={Styles.inputDescription}>Enter the OTP to continue</Text>
      <OTPInputView
        style={{width: '80%', height: 90}}
        pinCount={4}
        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged = {code => { this.setState({code})}}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />

      <Text style={Styles.otpDesciption}>
        We have sent an OTP to your registered mobile number. Enter the 4 digit
        OTP to login.
      </Text>

      <View style={Styles.loggedInOtpResendContainer}>
        <View style={Styles.checkedBoxContainer}>
          <TouchableOpacity>
            <Image source={checkboxIcon} />
          </TouchableOpacity>
          <Text style={Styles.loggedInText}>Keep me logged in.</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Text style={Styles.resendOtp}> Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={Styles.buttonWrapper}>
        <CustomButton
          text="Login"
          backgroundStyle={Styles.buttonBgStyle}
          textStyle={Styles.buttonTextStyle}
          onpress={() => navigation()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#BDBDBD',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#BDBDBD',
  },

  underlineStyleHighLighted: {
    borderColor: '#000',
  },
});
