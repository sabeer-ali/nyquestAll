import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Alert,
  BackHandler,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Toast from 'react-native-toast-message';
import sha512 from 'js-sha512';

import Styles from './styles';
import {
  CustomHeaderWithDesc,
  TopBottomLayout,
  CustomInput,
  RowLine,
  ColumnLine,
  CustomTopBottomModalLayout,
  CustomWrapper,
  CustomHeader,
} from '../../components';
import {closeIcon, logoIcon} from '../../assets';
import {color, CommonStyles} from '../../utils/CommonStyles';
import {StoreLocalDB, getLocalDB} from '../../utils/localDB';
import {MiddleWareForAuth, LOGINURL} from '../.././utils/apiServices';
import {Loader, showToaster} from '../../utils/commonUtils';

const ResetPassword = ({
  setForgotPasswdMode,
  setModal,
  setOtpMode,
  setResetPassword,
}) => {
  return (
    <CustomWrapper ph25 btrr25 btlr25 bg="#fff">
      <CustomHeader
        rightIcon={closeIcon}
        rightIconAction={() => {
          setForgotPasswdMode(false);
          setModal(false);
        }}
      />
      <CustomHeaderWithDesc
        headerText="Reset Password"
        descText="Enter new password"
      />

      <CustomWrapper h150 spaceEvently>
        <CustomInput form placeholder="New Password" />
        <CustomInput form placeholder="Confirm Password" />
      </CustomWrapper>

      <CustomWrapper pb2>
        <Button
          uppercase={false}
          mode="contained"
          style={[
            CommonStyles.buttonBgStyle,
            {
              backgroundColor: '#E28534',
              width: '100%',
              alignSelf: 'center',
              marginVertical: 30,
            },
          ]}
          labelStyle={Styles.modalButtonLabel}
          onPress={() => {
            setModal(false);
            setForgotPasswdMode(false);
            setOtpMode(false);
            setResetPassword(false);
            // navigation.navigate('deviceConfig');
          }}>
          Done
        </Button>
      </CustomWrapper>
    </CustomWrapper>
  );
};

const ForgotPasswordOtp = ({
  setForgotPasswdMode,
  setModal,
  setOtpMode,
  setResetPassword,
}) => {
  return (
    <CustomWrapper ph25 bg="#fff" btrr25 btlr25>
      <CustomHeader
        rightIcon={closeIcon}
        rightIconAction={() => {
          setForgotPasswdMode(false);
          setModal(false);
        }}
      />
      <CustomHeaderWithDesc
        headerText="Forgot Password"
        descText="Enter the OTP to continue"
      />
      <OTPInputView
        style={{width: '80%', height: 90}}
        pinCount={4}
        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged = {code => { this.setState({code})}}
        autoFocusOnLoad
        codeInputFieldStyle={Styles.underlineStyleBase}
        codeInputHighlightStyle={Styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />
      <Text style={[CommonStyles.primaryFontStyle, {color: color.grey}]}>
        We have sent an OTP to your registered mobile number & email. Enter the
        4 digit OTP to reset password.
      </Text>

      <CustomWrapper pv2 pt3>
        <Text style={[CommonStyles.primaryFontStyle, {color: color.orange}]}>
          Resend OTP
        </Text>
      </CustomWrapper>
      <CustomWrapper pb2>
        <Button
          uppercase={false}
          mode="contained"
          style={[
            CommonStyles.buttonBgStyle,
            {
              backgroundColor: '#E28534',
              width: '100%',
              alignSelf: 'center',
              marginVertical: 30,
            },
          ]}
          labelStyle={Styles.modalButtonLabel}
          onPress={() => {
            setForgotPasswdMode(false);
            setOtpMode(false);
            setResetPassword(true);
          }}>
          Reset
        </Button>
      </CustomWrapper>
    </CustomWrapper>
  );
};

const ForgotPassword = ({setForgotPasswdMode, setModal, setOtpMode}) => {
  const [usermailOrPass, setUserMailOrPassword] = React.useState('');
  return (
    <CustomWrapper ph25 pb1 btlr25 btrr25 bg="#fff">
      <CustomHeader
        rightIcon={closeIcon}
        rightIconAction={() => {
          setForgotPasswdMode(false);
          setModal(false);
        }}
      />
      <CustomHeaderWithDesc
        headerText="Forgot Password"
        descText="Enter your registered mobile number or email to continue"
      />
      <CustomWrapper ph2>
        <CustomWrapper pv2>
          <CustomInput
            form
            placeholder="Mobile/ Email"
            value={usermailOrPass}
            onChange={value => setUserMailOrPassword(value)}
          />
        </CustomWrapper>
        <CustomWrapper pv2>
          <Text
            style={[
              CommonStyles.primaryFontStyle,
              {
                color: color.grey,
                lineHeight: 20,
                fontSize: 12,
                paddingRight: 40,
              },
            ]}>
            We will send an OTP to your registered mobile number & email for
            password reset.
          </Text>
        </CustomWrapper>
        <Button
          uppercase={false}
          mode="contained"
          style={[
            CommonStyles.buttonBgStyle,
            {
              backgroundColor: '#E28534',
              width: '100%',
              alignSelf: 'center',
              marginBottom: 5,
            },
          ]}
          labelStyle={Styles.modalButtonLabel}
          onPress={() => {
            setForgotPasswdMode(false);
            setOtpMode(true);
            // navigation.navigate('deviceConfig');
          }}>
          Get OTP
        </Button>
      </CustomWrapper>
    </CustomWrapper>
  );
};

const LoginForm = ({setModal, setForgotPasswdMode, navigation}) => {
  const [isFocusedInput, setFocusedInput] = React.useState(false);
  const [isSecureInput, setSecureInput] = React.useState(true);
  const [isloggedIn, setloggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setLoader] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => {
      let data = await getLocalDB('@loginCred');
      if (data !== null && data.userName !== '' && data.password !== '') {
        setUserName(data.userName);
        setPassword(data.password);
      }
    };
    getData();
  }, []);

  const handleLoggedIn = () => {
    if (userName !== '' && password !== '') {
      setLoader(true);
      MiddleWareForAuth(
        'POST',
        LOGINURL,
        {
          user_name: userName,
          pwd: sha512(password),
          platform: 'app',
          version_code: 'v1',
        },
        (res, err) => {
          if (err !== null) {
            console.log('REs Login API Errr => ', err);
            setLoader(false);
          } else {
            console.log('REs Login API Success => ', res.data);
            let data = null;
            if (typeof res.data === 'string') {
              data = JSON.parse(res.data);
            } else {
              data = res.data;
            }

            if (res.data.code == 10) {
              if (data) {
                StoreLocalDB('@customerLoginDetails', data.msg);
                setLoader(false);
                navigation.navigate('CustomerBottomNavigator');
              }
            } else {
              setLoader(false);
              showToaster('error', data.msg);
            }
          }
        },
      );

      if (isloggedIn) {
        StoreLocalDB(
          '@loginCred',
          {
            userName: userName,
            password: password,
          },
          res => {
            // navigation.navigate('dashboard');
          },
        );
      }
    } else {
      if (userName === '' && password === '') {
        showToaster('error', 'User Name and Password cannot Empty');
      } else if (userName === '' && password !== '') {
        showToaster('error', 'User Name cannot Empty');
      } else if (userName !== '' && password === '') {
        showToaster('error', 'Password cannot Empty');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      {isLoading ? (
        <Loader />
      ) : (
        <CustomWrapper>
          <CustomWrapper pt1>
            <CustomHeaderWithDesc
              headerText="Login"
              descText="Please sign in to continue"
            />
          </CustomWrapper>
          <CustomWrapper h200 spaceEvently pv2>
            <CustomInput
              form
              placeholder="Mobile/ Email"
              value={userName}
              onChange={userName => setUserName(userName)}
            />
            <CustomInput
              form
              placeholder="Password"
              value={password}
              onChange={pass => setPassword(pass.trim())}
              showSecure
              secure={isSecureInput}
              handleSecure={() => setSecureInput(!isSecureInput)}
            />
          </CustomWrapper>

          <RowLine mv2>
            <CheckBox
              disabled={false}
              onTintColor="#51648B"
              onFillColor="#51648B"
              value={isloggedIn}
              onValueChange={newValue => setloggedIn(newValue)}
            />
            <Text style={Styles.keeploggedIn}>Keep me logged in.</Text>
          </RowLine>
        </CustomWrapper>
      )}

      <ColumnLine end>
        <Button
          uppercase={false}
          mode="contained"
          style={[
            CommonStyles.buttonBgStyle,
            {
              backgroundColor: '#E28534',
              width: '100%',
              alignSelf: 'center',
            },
          ]}
          labelStyle={Styles.modalButtonLabel}
          onPress={() => {
            handleLoggedIn();
          }}>
          Login
        </Button>

        <RowLine spaceBetween mv3>
          <TouchableOpacity
            onPress={() => {
              setModal(true);
              setForgotPasswdMode(true);
            }}>
            <Text style={CommonStyles.primaryFontStyle}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('customer register')}>
            <Text
              style={[CommonStyles.primaryFontStyle, {color: color.orange}]}>
              New Account
            </Text>
          </TouchableOpacity>
        </RowLine>
      </ColumnLine>
    </ScrollView>
  );
};

const TopSection = () => {
  return (
    <View style={{marginHorizontal: 20, marginVertical: 25}}>
      <Image source={logoIcon} />
    </View>
  );
};

export default CustomerLoginScreen = ({navigation}) => {
  const [isModal, setModal] = React.useState(false);
  const [isForgotPasswdMode, setForgotPasswdMode] = React.useState(false);
  const [isOtpMode, setOtpMode] = React.useState(false);
  const [isResetPassword, setResetPassword] = React.useState(false);
  console.log('isForgotPasswdMode', isForgotPasswdMode);
  return (
    <View style={{flex: 1}}>
      <TopBottomLayout
        topHeight={2}
        bottomHeight={10}
        backButtonType="backArrow"
        backButtonAction={() => navigation.goBack()}
        topSection={<TopSection />}
        bottomSection={
          <LoginForm
            setModal={setModal}
            setForgotPasswdMode={setForgotPasswdMode}
            navigation={navigation}
          />
        }
      />
      {isModal && (
        // <CustomTopBottomModalLayout
        //   topStyle={{flex: isOtpMode ? 2 : isResetPassword ? 2.4 : 1.8}}
        //   bottomStyle={{flex: 1}}>
        <Modal visible={isModal} animationType="slide" transparent={true}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#000000a6',
              }}
            />
            <View style={{backgroundColor: '#000000a6'}}>
              {isForgotPasswdMode && !isOtpMode && !isResetPassword && (
                <ForgotPassword
                  setForgotPasswdMode={setForgotPasswdMode}
                  setModal={setModal}
                  setOtpMode={setOtpMode}
                />
              )}
              {isOtpMode && (
                <ForgotPasswordOtp
                  setForgotPasswdMode={setForgotPasswdMode}
                  setModal={setModal}
                  setOtpMode={setOtpMode}
                  setResetPassword={setResetPassword}
                />
              )}
              {isResetPassword && (
                <ResetPassword
                  setForgotPasswdMode={setForgotPasswdMode}
                  setModal={setModal}
                  setOtpMode={setOtpMode}
                  setResetPassword={setResetPassword}
                />
              )}
            </View>
          </View>
        </Modal>
        // </CustomTopBottomModalLayout>
      )}

      <Toast ref={ref => Toast.setRef(ref)} style={{zIndex: 100}} />
    </View>
  );
};
