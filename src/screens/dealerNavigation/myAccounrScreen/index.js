import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sha512 from 'js-sha512';
import Styles from './styles';
import {
  CommonBottomNavigator,
  CustomList,
  CustomHeaderWithDesc,
  CustomInput,
  CustomWrapper,
  TopBottomLayout,
} from '../../../components';
import {
  editIcon,
  lockIcon,
  NQLogoIcon,
  logoutIcon,
  closeIcon,
  logoIcon,
  agentIcon,
} from '../../../assets';
import {CommonStyles} from '../../../utils/CommonStyles';
import {getLocalDB, Loader} from '../../../utils/commonUtils';
import {MiddleWareForAuth, CHANGE_PASSWORD} from '../../../utils/apiServices';

const Logout = ({setModal, navigation}) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@delaerLoginDetails');
      navigation.navigate('login');
    } catch (exception) {
      return false;
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: 'center',
      }}>
      <CustomHeaderWithDesc
        headerText="Logout"
        descText="Are you sure you want to logout?"
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 50,
          paddingHorizontal: 20,
        }}>
        <Button
          mode="contained"
          style={[Styles.halfmodalButton, {backgroundColor: '#7F91BB'}]}
          labelStyle={Styles.modalButtonLabel}
          onPress={() => setModal(false)}>
          No
        </Button>
        <Button
          mode="contained"
          style={Styles.halfmodalButton}
          labelStyle={Styles.modalButtonLabel}
          onPress={() => handleLogout()}>
          Yes
        </Button>
      </View>
    </View>
  );
};

const About = ({setModal}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}>
      <View
        style={{
          flex: 0.8,
        }}>
        <TouchableOpacity
          onPress={() => setModal(false)}
          style={CommonStyles.modalClose}>
          <Image source={closeIcon} />
        </TouchableOpacity>
      </View>

      <CustomHeaderWithDesc
        headerText="About"
        descText="Your app is up to date."
      />

      <View
        style={{
          flexDirection: 'row',
          marginVertical: 20,
          paddingHorizontal: 20,
        }}>
        <View>
          <Image source={logoIcon} />
        </View>
        <View style={{marginLeft: 15}}>
          <Text style={Styles.aboutVer}>Ver 1.0.0</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={Styles.aboutVer}>Updated on : </Text>
            <Text style={Styles.aboutVerDate}>10 Oct 2020</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 25,
          marginVertical: 20,
        }}>
        <Button
          mode="contained"
          style={Styles.modalButton}
          labelStyle={Styles.modalButtonLabel}
          onPress={() => console.log('Pressed')}>
          Update
        </Button>
      </View>
    </View>
  );
};

const PasswordComponent = ({navigation, setModal}) => {
  const [isLoading, setLoader] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [cPassword, setConfirmPassword] = React.useState('');

  const changePasswordApi = () => {
    if (password === cPassword) {
      getLocalDB('@delaerLoginDetails', resLocalData => {
        let params = {
          user_id: resLocalData.cust_id,
          password: sha512(password),
          token: resLocalData.token,
        };
        setLoader(true);
        console.log('resLocalData +>', params);
        MiddleWareForAuth('POST', CHANGE_PASSWORD, params, (res, err) => {
          setLoader(false);
          if (err === null) {
            console.log('res.data. change password', res.data);
            if (res !== null && err === null && res.data) {
              if (res.data && res.data.code === '10') {
                // showToaster('error', res.data.message);
                Alert.alert('Success', res.data.message, [
                  {text: 'OK', onPress: () => setModal(false)},
                ]);
              } else {
                Alert.alert('Success', res.data.message, [
                  {text: 'OK', onPress: () => setModal(false)},
                ]);
              }
            }
          } else {
            console.error('Device List in Home API Error', err);
            // showToaster('error', 'Somthing went wrong');
          }
        });
      });
    } else {
      Alert.alert(
        'Warning',
        "'New password' and 'Confirm password'  Dosn't not match",
      );
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CustomHeaderWithDesc
        headerText="Change Password"
        descText="Choose a unique password to protect your account"
      />
      <CustomWrapper ph25 mv2>
        <CustomInput form placeholder="Current Password" />
      </CustomWrapper>

      <CustomWrapper ph25 mv2>
        <CustomInput
          form
          placeholder="New Password"
          value={password}
          onChange={text => setPassword(text)}
        />
      </CustomWrapper>

      <CustomWrapper ph25 mv2>
        <CustomInput
          form
          placeholder="Confirm Password"
          value={cPassword}
          onChange={text => setConfirmPassword(text)}
        />
      </CustomWrapper>
      <CustomWrapper ph25 mv2>
        {isLoading ? (
          <Loader />
        ) : (
          <Button
            mode="contained"
            style={Styles.modalButton}
            labelStyle={Styles.modalButtonLabel}
            onPress={() => changePasswordApi()}>
            Done
          </Button>
        )}
      </CustomWrapper>
    </ScrollView>
  );
};

const Header = ({navigation}) => {
  const [loginData, setLoginData] = React.useState(null);

  React.useEffect(() => {
    getLocalDB('@delaerLoginDetails', resData => {
      console.log(resData);
      setLoginData(resData);
    });
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{}}>
        <Text style={Styles.userName}>
          {loginData !== null ? loginData.name : 'N.A'}
        </Text>
        <Text style={Styles.phNo}>
          {loginData !== null ? loginData.mob_no : 'N.A'}
        </Text>
        <Text style={Styles.mailId}>
          {loginData !== null ? loginData.email : 'N.A'}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('dealerMyAccountEdit')}
        style={{}}>
        <Image source={editIcon} />
      </TouchableOpacity>
    </View>
  );
};

const ModalContents = ({
  isModal,
  setModal,
  isAbout,
  isChangePasswd,
  isLogout,
  setAbout,
  setChangePasswd,
  setLogout,
  navigation,
}) => {
  return (
    <Modal visible={isModal} animationType="slide" transparent={true}>
      <View style={{flex: 1, backgroundColor: '#000000a6'}}>
        <View
          style={{
            flex: isAbout ? 7 : isLogout ? 8 : 2,
            backgroundColor: '#000000a6',
          }}></View>
        <View
          style={{
            flex: isAbout ? 5 : isLogout ? 4 : 10,
            backgroundColor: '#000000a6',
          }}>
          {isAbout ? (
            <About setModal={setModal} />
          ) : isLogout ? (
            <Logout setModal={setModal} navigation={navigation} />
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                paddingVertical: 10,
              }}>
              <View
                style={{
                  flex: 1,
                }}>
                <TouchableOpacity
                  onPress={() => setModal(false)}
                  style={CommonStyles.modalClose}>
                  <Image source={closeIcon} />
                </TouchableOpacity>
              </View>
              <View style={{flex: 11}}>
                {isChangePasswd && (
                  <PasswordComponent
                    navigation={navigation}
                    setModal={setModal}
                  />
                )}
                {/* <View
                  style={{
                    paddingHorizontal: 25,
                    marginVertical: 20,
                  }}>
                  <Button
                    mode="contained"
                    style={Styles.modalButton}
                    labelStyle={Styles.modalButtonLabel}
                    onPress={() => console.log('Pressed')}>
                    {isAbout ? 'Update' : 'Done'}
                  </Button>
                </View> */}
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const BottomSection = ({
  navigation,
  setModal,
  setChangePasswd,
  setAbout,
  setLogout,
}) => {
  return (
    <CustomWrapper>
      <Header navigation={navigation} />

      <CustomList
        defaultList
        onpress={() => {
          setModal(true);
          setAbout(false);
          setChangePasswd(true);
        }}
        navigateNext
        icon={lockIcon}
        defaultText="Change Password"
      />
      <CustomList
        defaultList
        onpress={() => {
          setModal(true);
          setChangePasswd(false);
          setAbout(true);
        }}
        navigateNext
        icon={NQLogoIcon}
        defaultText="About"
      />
      <CustomList
        defaultList
        onpress={() => {
          setModal(true);
          setChangePasswd(false);
          setAbout(false);
          setLogout(true);
        }}
        navigateNext
        icon={logoutIcon}
        defaultText="Logout"
      />
    </CustomWrapper>
  );
};

const TopSection = ({navigation}) => {
  return (
    <CustomWrapper>
      <CustomWrapper ml2 pv1>
        <Image source={agentIcon} style={{width: 45, height: 45}} />
      </CustomWrapper>
      <CustomHeaderWithDesc
        white
        headerText="My Account"
        descText="Manage your device & account here"
      />
    </CustomWrapper>
  );
};

export default function MyAccountScreen({navigation}) {
  const [isModal, setModal] = React.useState(false);
  const [isChangePasswd, setChangePasswd] = React.useState(false);
  const [isAbout, setAbout] = React.useState(false);
  const [isLogout, setLogout] = React.useState(false);
  return (
    <CustomWrapper flex={1}>
      <TopBottomLayout
        topHeight={3}
        bottomHeight={9}
        topSection={<TopSection navigation={navigation} />}
        bottomSection={
          <BottomSection
            navigation={navigation}
            setModal={setModal}
            setChangePasswd={setChangePasswd}
            setAbout={setAbout}
            setLogout={setLogout}
          />
        }
      />
      {isModal ? (
        <ModalContents
          isModal={isModal}
          setModal={setModal}
          isChangePasswd={isChangePasswd}
          isAbout={isAbout}
          isLogout={isLogout}
          setChangePasswd={setChangePasswd}
          setAbout={setAbout}
          setLogout={setLogout}
          navigation={navigation}
        />
      ) : null}

      <View style={{backgroundColor: '#F5F8FF'}}>
        <CommonBottomNavigator
          navigation={navigation}
          state="dealerMyAccount"
        />
      </View>
    </CustomWrapper>
  );
}
