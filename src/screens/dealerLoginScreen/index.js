import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';

import Styles from './styles';
import {
  CustomButton,
  LogoWithTextComponent,
  CustomWrapper,
} from '../../components';
import {checkboxIcon, arrowBackIcon} from '../../assets';
import {Loader, showToaster, StoreLocalDB} from '../../utils/commonUtils';

import {
  MiddleWareForAuth,
  SEND_OTP,
  LOGIN_WITH_OTP,
} from '../../utils/apiServices';

const DealerLogin = ({setOtpPage, toaster, setDealerCodes}) => {
  const [dealerCode, setDealerCode] = useState('');
  const [isLoading, setLoader] = useState(false);

  const handleLoginAPI = () => {
    if (dealerCode === '') {
      Alert.alert('Warning', 'Plaese type deler code');
    } else {
      setLoader(true);
      setOtpPage(true);
      // MiddleWareForAuth(
      //   'POST',
      //   SEND_OTP,
      //   {usercode: dealerCode},
      //   (res, err) => {
      //     setLoader(false);
      //     if (err && res === null) {
      //       console.error('Error in OTP SEND Screen', err);
      //     } else {
      //       if (err === null) {
      //         console.log('Res OTP', res.data);
      //         if (
      //           res &&
      //           res.data &&
      //           res.data.code !== '' &&
      //           res.data.code &&
      //           res.data.code === '10'
      //         ) {
      //           setDealerCodes(dealerCode);
      //         } else {
      //           console.error('OTP Send Error', res.data.message);
      //           toaster('error', res.data.message);
      //         }
      //       }
      //     }
      //   },
      // );
    }
  };

  return (
    <View style={Styles.bottomSection}>
      <CustomWrapper mt3>
        <Text style={Styles.login}>Login</Text>
        <Text style={Styles.loginDescription}>Enter your code to continue</Text>
      </CustomWrapper>

      <View style={Styles.inputContainer}>
        <TextInput
          placeholder="Dealer Code"
          style={Styles.inputText}
          onChangeText={code => setDealerCode(code)}
        />
      </View>

      <Text style={Styles.inputDescription}>
        We will send an OTP to your registered mobile number for login.
      </Text>

      <View style={Styles.buttonWrapper}>
        {isLoading ? (
          <Loader />
        ) : (
          <CustomButton
            text="Get OTP"
            backgroundStyle={Styles.buttonBgStyle}
            textStyle={Styles.buttonTextStyle}
            onpress={() => handleLoginAPI()}
          />
        )}
      </View>
    </View>
  );
};

const DealerOTP = ({navigation, toaster, dealerCodes}) => {
  const [otp, setOTP] = useState('');
  const [isLoading, setLoader] = useState(false);

  const handleResendOPAPI = () => {
    setLoader(true);
    MiddleWareForAuth('POST', SEND_OTP, {usercode: dealerCodes}, (res, err) => {
      setLoader(false);
      if (err && res === null) {
        console.error('Error in OTP SEND Screen', err);
      } else {
        if (err === null) {
          console.log('Res OTP', res.data);
          if (
            res &&
            res.data &&
            res.data.code !== '' &&
            res.data.code &&
            res.data.code === '10'
          ) {
          } else {
            console.error('OTP Send Error', res.data.message);
            toaster('error', res.data.message);
          }
        }
      }
    });
  };

  const handleContinue = () => {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isInternetReachable);
      if (state.isInternetReachable) {
        setLoader(true);
        MiddleWareForAuth('POST', LOGIN_WITH_OTP, {n_otp: otp}, (res, err) => {
          setLoader(false);
          console.log('res, err', res.data, err);
          if (err === null) {
            if (res !== null && res.data) {
              if (res.data.code === '10') {
                setOTP('');
                StoreLocalDB('@delaerLoginDetails', res.data.msg, res => {
                  navigation();
                });
              } else {
                if (res.data && res.data.message && res.data.message) {
                  toaster('error', res.data.message);
                }
              }
            }
          } else {
            console.error('Login OTP Check Error', err);
            toaster('error', 'Something went wrong');
          }
        });
      } else {
        toaster('info', 'No Internet Conection');
      }
    });
  };

  return (
    <ScrollView style={Styles.bottomSection}>
      <CustomWrapper mt2>
        <Text style={Styles.login}>Login</Text>
        <Text style={Styles.loginDescription}>Enter your code to continue</Text>
      </CustomWrapper>
      <OTPInputView
        style={{
          width: '100%',
          height: 90,
        }}
        pinCount={4}
        code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        onCodeChanged={otp => {
          setOTP(otp);
        }}
        autoFocusOnLoad
        codeInputFieldStyle={Styles.underlineStyleBase}
        codeInputHighlightStyle={Styles.underlineStyleHighLighted}
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
          <TouchableOpacity onPress={() => handleResendOPAPI()}>
            <Text style={Styles.resendOtp}> Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={Styles.buttonWrapper}>
        {isLoading ? (
          <Loader />
        ) : (
          <CustomButton
            text="Login"
            backgroundStyle={Styles.buttonBgStyle}
            textStyle={Styles.buttonTextStyle}
            onpress={() => handleContinue()}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default DealerLoginScreen = ({navigation}) => {
  const [isOtpPage, setOtpPage] = useState(false);
  const [dealerCodes, setDealerCodes] = useState('');

  const showCustomToaster = (error, msg, callback) => {
    showToaster(error, msg, callback);
  };
  return (
    <View style={Styles.container}>
      <View style={Styles.topSection}>
        <Toast ref={ref => Toast.setRef(ref)} />
        <CustomHeader
          leftIcon={arrowBackIcon}
          leftIconAction={() => navigation.goBack()}
        />
        <CustomWrapper flex={1} bottom ph2>
          <LogoWithTextComponent />
        </CustomWrapper>
      </View>
      {isOtpPage ? (
        <DealerOTP
          navigation={() => navigation.navigate('dealerHome')}
          toaster={showCustomToaster}
          dealerCodes={dealerCodes}
        />
      ) : (
        <DealerLogin
          setOtpPage={setOtpPage}
          toaster={showCustomToaster}
          setDealerCodes={setDealerCodes}
        />
      )}
    </View>
  );
};
