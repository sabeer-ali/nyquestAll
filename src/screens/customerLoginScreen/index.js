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
import NetInfo from '@react-native-community/netinfo';

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
import {closeIcon, eyeIcon, logoIcon} from '../../assets';
import {color, CommonStyles} from '../../utils/CommonStyles';
import {StoreLocalDB, getLocalDB} from '../../utils/localDB';
import {
  MiddleWareForAuth,
  LOGINURL,
  REGISTER_URL,
  FORGOT_PASSWORD_OTP,
  VALIDATE_FORGOT_PASSWORD_OTP,
  CHANGE_PASSWORD,
} from '../.././utils/apiServices';
import {Loader, showToaster} from '../../utils/commonUtils';

const ResetPassword = ({
  setForgotPasswdMode,
  setModal,
  setOtpMode,
  setResetPassword,
  resetPasswordData,
}) => {
  const [newPassword, setNewPassword] = React.useState('');
  const [cPassword, setConfirmNewPassword] = React.useState('');
  const [isLoading, setLoader] = React.useState(false);

  const handleSubmit = () => {
    if (resetPasswordData !== '') {
      if (newPassword !== cPassword) {
        Alert.alert(
          'Warning',
          'New Password and Confirm Password didnot match.',
        );
      } else {
        handleResetPassword(() => {
          setModal(false);
          setForgotPasswdMode(false);
          setOtpMode(false);
          setResetPassword(false);
        });
      }
    } else {
      Alert.alert('Warning', 'User Id didnot Get');
    }
  };

  const handleResetPassword = callback => {
    NetInfo.fetch().then(state => {
      let payload = {user_id: resetPasswordData, password: sha512(newPassword)};

      if (state.isInternetReachable) {
        console.log('payload', payload);
        setLoader(true);
        MiddleWareForAuth('POST', CHANGE_PASSWORD, payload, (res, err) => {
          setLoader(false);
          if (err !== null) {
            console.log('REs CHANGE_PASSWORD API Errr => ', err);
            Alert.alert('Warning', err.text);
          } else {
            console.log('REs CHANGE_PASSWORD Success => ', res.data);
            if (res.data.status === 'error') {
              Alert.alert('Warning', res.data.text);
            } else {
              // Alert.alert('Code ', res.data.code);
              if (callback) callback();
              // showToaster('error', data.msg);
            }
          }
        });
      } else {
        Alert.alert('Warning', 'No Internet Connection');
      }
    });
  };

  return (
    <CustomWrapper btrr25 btlr25 bg="#fff">
      <CustomHeader
        rightIcon={closeIcon}
        rightIconAction={() => {
          setModal(false);
          setForgotPasswdMode(false);
          setOtpMode(false);
          setResetPassword(false);
        }}
      />
      <CustomWrapper ph25>
        <CustomHeaderWithDesc
          noStyle
          headerText="Reset Password"
          descText="Enter new password"
        />

        <CustomWrapper h200 spaceEvently>
          <CustomInput
            form
            placeholder="New Password"
            value={newPassword}
            onChange={passwd => setNewPassword(passwd)}
          />
          <CustomInput
            form
            placeholder="Confirm Password"
            value={cPassword}
            onChange={cPasswd => setConfirmNewPassword(cPasswd)}
          />
        </CustomWrapper>

        <CustomWrapper pb2>
          {isLoading ? (
            <Loader />
          ) : (
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
              labelStyle={CommonStyles.secondaryFontStyle}
              onPress={() => handleSubmit()}>
              Done
            </Button>
          )}
        </CustomWrapper>
      </CustomWrapper>
    </CustomWrapper>
  );
};

const ForgotPasswordOtp = ({
  setForgotPasswdMode,
  setModal,
  setOtpMode,
  setResetPassword,
  setResetPasswordData,
}) => {
  const [otp, setOtp] = React.useState('');
  const [isLoading, setLoader] = React.useState(false);
  const [isValid, setValidation] = React.useState(true);

  const handleSubmit = () => {
    handleValidateOTP(data => {
      setForgotPasswdMode(false);
      setOtpMode(false);
      setResetPassword(true);
      setResetPasswordData(data);
    });
  };

  const handleValidateOTP = callback => {
    NetInfo.fetch().then(state => {
      let payload = {otp: otp};

      if (otp !== '') {
        if (state.isInternetReachable) {
          setLoader(true);
          MiddleWareForAuth(
            'POST',
            VALIDATE_FORGOT_PASSWORD_OTP,
            payload,
            (res, err) => {
              setLoader(false);
              if (err !== null) {
                console.log(
                  'REs VALIDATE_FORGOT_PASSWORD_OTP API Errr => ',
                  err,
                );
                Alert.alert('Warning', err.text);
              } else {
                console.log(
                  'REs VALIDATE_FORGOT_PASSWORD_OTP Success => ',
                  res.data,
                );
                if (res.data.status === 'error') {
                  Alert.alert('Warning', res.data.text);
                } else {
                  if (res.data.code === 10 && res.data.status === 'valid') {
                    if (callback) callback(res.data.userid);
                  } else {
                    // Alert.alert('Warning', 'Please Retry Again');
                    setValidation(false);
                  }
                }
              }
            },
          );
        } else {
          Alert.alert('Warning', 'No Internet Connection');
        }
      } else {
        setValidation(false);
      }
    });
  };
  return (
    <CustomWrapper bg="#fff" btrr25 btlr25>
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
      <RowLine center>
        <OTPInputView
          style={{width: '85%', height: 90}}
          pinCount={4}
          code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={code => {
            setOtp(code);
            setValidation(true);
          }}
          autoFocusOnLoad
          codeInputFieldStyle={Styles.underlineStyleBase}
          codeInputHighlightStyle={Styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
          editable={true}
        />
      </RowLine>
      <CustomWrapper ph3>
        {!isValid && (
          <Text
            style={[
              CommonStyles.secondaryFontStyle,
              {color: 'red', fontSize: 12},
            ]}>
            Invalid OTP
          </Text>
        )}
      </CustomWrapper>
      <CustomWrapper ph3 pt2>
        <Text style={[CommonStyles.primaryFontStyle, {color: color.grey}]}>
          We have sent an OTP to your registered mobile number & email. Enter
          the 4 digit OTP to reset password.
        </Text>
        <CustomWrapper pv2>
          <Text style={[CommonStyles.primaryFontStyle, {color: color.orange}]}>
            Resend OTP
          </Text>
        </CustomWrapper>
        <CustomWrapper pb2>
          {isLoading ? (
            <Loader />
          ) : (
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
              labelStyle={CommonStyles.secondaryFontStyle}
              onPress={() => handleSubmit()}>
              Reset
            </Button>
          )}
        </CustomWrapper>
      </CustomWrapper>
    </CustomWrapper>
  );
};

const ForgotPassword = ({
  setForgotPasswdMode,
  setModal,
  setOtpMode,
  setResetPassword,
}) => {
  const [usermailOrPass, setUserMailOrPassword] = React.useState('');
  const [isLoading, setLoader] = React.useState(false);

  const handleSubmit = () => {
    handleForgotPasswordOTP(() => {
      setForgotPasswdMode(false);
      setOtpMode(true);
      setResetPassword(false);
    });
  };

  const handleForgotPasswordOTP = callback => {
    NetInfo.fetch().then(state => {
      let payload = {username: usermailOrPass};
      if (state.isInternetReachable) {
        setLoader(true);
        MiddleWareForAuth(
          'POST',
          FORGOT_PASSWORD_OTP,
          payload,
          (res, err) => {
            setLoader(false);
            if (err !== null) {
              console.log('REs FORGOT_PASSWORD_OTP API Errr => ', err);
              Alert.alert('Warning', err.text);
            } else {
              console.log('REs FORGOT_PASSWORD_OTP Success => ', res.data);
              if (res.data.status === 'error') {
                Alert.alert('Warning', res.data.text);
              } else {
                // Alert.alert('Code ', res.data.code);
                if (callback) callback();
                // showToaster('error', data.msg);
              }
            }
          },
          true,
        );
      } else {
        Alert.alert('Warning', 'No Internet Connection');
      }
    });
  };
  return (
    <CustomWrapper pb1 btlr25 btrr25 bg="#fff">
      <CustomHeader
        rightIcon={closeIcon}
        rightIconAction={() => {
          setForgotPasswdMode(false);
          setModal(false);
          setResetPassword(false);
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
        {isLoading ? (
          <Loader />
        ) : (
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
            onPress={() => handleSubmit()}>
            Get OTP
          </Button>
        )}
      </CustomWrapper>
    </CustomWrapper>
  );
};

const NewAccount = ({setForgotPasswdMode, setModal, setOtpMode}) => {
  const [isLoading, setLoader] = React.useState(false);
  const [name, setName] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [cPassword, setCPassword] = React.useState('');

  const handleValidate = callback => {
    let validation = {
      msg: '',
      isValid: true,
    };
    if (name === '') {
      validation.msg = 'Name is required';
      validation.isValid = false;
    }
    if (mobile === '' || mobile.length !== 10) {
      validation.msg = 'please check Mobile Number';
      validation.isValid = false;
    }

    if (email === '') {
      validation.msg = 'Email is required';
      validation.isValid = false;
    }
    if (password === '') {
      validation.msg = 'Password is required';
      validation.isValid = false;
    }

    if (cPassword === '') {
      validation.msg = 'Confirm Password is required';
      validation.isValid = false;
    }

    if (password !== cPassword) {
      validation.msg = 'Password and Confirm Password is not matched';
      validation.isValid = false;
    }
    if (validation.isValid) {
      if (callback) callback(true);
    } else {
      Alert.alert('Warning', validation.msg);
    }
  };
  const handleSubmitApi = () => {
    handleValidate(isvalid => {
      if (isvalid) {
        let payload = {
          user_id: -1,
          parent_id: '-1',
          usertype: 'C',
          email: email,
          password: sha512(password),
          username: name,
          mobno: mobile,
        };
        NetInfo.fetch().then(state => {
          console.log('Connection type', state.type);
          console.log('Is connected?', state.isInternetReachable);
          if (state.isInternetReachable) {
            setLoader(true);
            MiddleWareForAuth('POST', REGISTER_URL, payload, (res, err) => {
              setLoader(false);
              if (err !== null) {
                console.log('REs Login API Errr => ', err);
                Alert.alert('Warning', err.text);
              } else {
                console.log('REs Register API Success => ', res.data);
                if (res.data.status === 'error') {
                  Alert.alert('Warning', res.data.text);
                } else {
                  Alert.alert('Code ', res.data.code);
                  setModal(false);
                  // showToaster('error', data.msg);
                }
              }
            });
          } else {
            Alert.alert('Warning', 'No Internet Connection');
          }
        });
      }
    });
  };

  return (
    <ScrollView>
      <CustomWrapper pb1 btlr25 btrr25 bg="#fff">
        <CustomWrapper mv3>
          <CustomHeaderWithDesc
            descText="Enter details to continue"
            headerText="Create Account"
          />
        </CustomWrapper>

        <View style={{position: 'absolute', right: 10, top: 10}}>
          <CustomHeader
            rightIcon={closeIcon}
            rightIconAction={() => {
              setModal(false);
            }}
          />
        </View>

        <CustomWrapper ph2>
          <CustomWrapper pv3 h450 vSpaceBetween>
            <CustomInput
              form
              placeholder="Name"
              value={name}
              onChange={value => setName(value)}
            />
            <CustomInput
              form
              placeholder="Mobile"
              value={mobile}
              onChange={value => setMobile(value)}
            />
            <CustomInput
              form
              placeholder="Email"
              value={email}
              onChange={value => setEmail(value)}
            />
            <CustomInput
              form
              placeholder="Password"
              value={password}
              onChange={value => setPassword(value)}
            />
            <CustomInput
              form
              placeholder="Confirm Password"
              value={cPassword}
              onChange={value => setCPassword(value)}
            />
          </CustomWrapper>
          {/* <CustomWrapper pv2 bg="red">
            <Text
              style={[
                CommonStyles.primaryFontStyle,
                {
                  color: color.grey,
                  lineHeight: 20,
                  fontSize: 12,
                  paddingRight: 40,
                },
              ]}></Text>
          </CustomWrapper> */}
          {isLoading ? (
            <Loader />
          ) : (
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
                handleSubmitApi();
              }}>
              Register
            </Button>
          )}
          <CustomWrapper flexDirectionRow pv2 center>
            <Text
              style={[
                CommonStyles.primaryFontStyle,
                {color: color.grey, paddingRight: 15},
              ]}>
              Already have an acoount?
            </Text>
            <TouchableOpacity onPress={() => setModal(false)}>
              <Text
                style={[CommonStyles.primaryFontStyle, {color: color.orange}]}>
                Login
              </Text>
            </TouchableOpacity>
          </CustomWrapper>
        </CustomWrapper>
      </CustomWrapper>
    </ScrollView>
  );
};

const LoginForm = ({
  setModal,
  setForgotPasswdMode,
  navigation,
  setNewAccount,
}) => {
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
    <ScrollView contentContainerStyle={{}}>
      {isLoading ? (
        <Loader />
      ) : (
        <CustomWrapper>
          <CustomWrapper pt1>
            <CustomHeaderWithDesc
              noStyle
              headerText="Login"
              descText="Please sign in to continue"
            />
          </CustomWrapper>
          <CustomWrapper h200 spaceEvently>
            <CustomInput
              form
              placeholder="Mobile/ Email"
              value={userName}
              onChange={userName => setUserName(userName)}
            />
            <CustomWrapper>
              <RowLine>
                <View style={{width: '100%'}}>
                  <CustomInput
                    form
                    placeholder="Password"
                    value={password}
                    onChange={pass => setPassword(pass.trim())}
                    showSecure
                    secure={isSecureInput}
                  />
                </View>
                <TouchableOpacity
                  style={{position: 'absolute', right: 0}}
                  onPress={() => setSecureInput(!isSecureInput)}>
                  <Image source={eyeIcon} />
                </TouchableOpacity>
              </RowLine>
            </CustomWrapper>
          </CustomWrapper>

          <RowLine mb3>
            <CheckBox
              disabled={false}
              onTintColor="#51648B"
              onFillColor="#51648B"
              value={isloggedIn}
              onValueChange={newValue => setloggedIn(newValue)}
              style={{marginLeft: -5}}
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
          labelStyle={Styles.loginBtn}
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
              setNewAccount(false);
            }}>
            <Text
              style={[CommonStyles.primaryFontStyle, {color: color.darkBlue}]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setModal(true);
              setNewAccount(true);
              setForgotPasswdMode(false);
            }}>
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
      <Image source={logoIcon} style={{width: 60, height: 60}} />
    </View>
  );
};

export default CustomerLoginScreen = ({navigation}) => {
  const [isModal, setModal] = React.useState(false);
  const [isForgotPasswdMode, setForgotPasswdMode] = React.useState(false);
  const [isOtpMode, setOtpMode] = React.useState(false);
  const [isResetPassword, setResetPassword] = React.useState(false);
  const [isNewAccount, setNewAccount] = React.useState(false);
  const [resetPasswordData, setResetPasswordData] = React.useState('');

  return (
    <View style={{flex: 1}}>
      <TopBottomLayout
        topHeight={2}
        bottomHeight={8}
        backButtonType="backArrow"
        backButtonAction={() => navigation.goBack()}
        topSection={<TopSection />}
        bottomSection={
          <LoginForm
            setModal={setModal}
            setForgotPasswdMode={setForgotPasswdMode}
            navigation={navigation}
            setNewAccount={setNewAccount}
          />
        }
      />
      {isModal && (
        <Modal visible={isModal} animationType="slide" transparent={true}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => setModal(false)}
              style={{
                flex: 1,
                backgroundColor: '#000000a6',
              }}
            />
            <View
              style={{
                backgroundColor: '#000000a6',
              }}>
              {isForgotPasswdMode && !isOtpMode && !isResetPassword ? (
                <ForgotPassword
                  setForgotPasswdMode={setForgotPasswdMode}
                  setModal={setModal}
                  setOtpMode={setOtpMode}
                  setResetPassword={setResetPassword}
                />
              ) : null}
              {isOtpMode && !isNewAccount ? (
                <ForgotPasswordOtp
                  setForgotPasswdMode={setForgotPasswdMode}
                  setModal={setModal}
                  setOtpMode={setOtpMode}
                  setResetPassword={setResetPassword}
                  setResetPasswordData={setResetPasswordData}
                />
              ) : null}
              {isResetPassword && (
                <ResetPassword
                  setForgotPasswdMode={setForgotPasswdMode}
                  setModal={setModal}
                  setOtpMode={setOtpMode}
                  setResetPassword={setResetPassword}
                  resetPasswordData={resetPasswordData}
                />
              )}

              {isNewAccount && (
                <NewAccount
                  setModal={setModal}
                  setResetPassword={setResetPassword}
                />
              )}
            </View>
          </View>
        </Modal>
      )}

      <Toast ref={ref => Toast.setRef(ref)} style={{zIndex: 100}} />
    </View>
  );
};
