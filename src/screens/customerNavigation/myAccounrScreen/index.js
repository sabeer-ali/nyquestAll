import React from 'react';
import {View, Text, Image, TouchableOpacity, Modal} from 'react-native';
import {Button} from 'react-native-paper';
import Styles from './styles';
import {
  CommonBottomNavigator,
  SecondaryCommonLayout,
  CustomList,
  CustomHeaderWithDesc,
  CustomInput,
} from '../../../components';
import {
  contactSupportIcon,
  editIcon,
  lockIcon,
  NQLogoIcon,
  logoutIcon,
  closeIcon,
  logoIcon,
} from '../../../assets';
import {CommonStyles} from '../../../utils/CommonStyles';

const Logout = ({setModal}) => {
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
          onPress={() => setModal(false)}>
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

const PasswordComponent = () => {
  return (
    <>
      <CustomHeaderWithDesc
        headerText="Change Password"
        descText="Choose a unique password to protect your account"
      />
      <View
        style={{
          paddingHorizontal: 25,
          marginVertical: 20,
        }}>
        <CustomInput form placeholder="Current Password" />
      </View>

      <View
        style={{
          paddingHorizontal: 25,
          marginVertical: 20,
        }}>
        <CustomInput form placeholder="New Password" />
      </View>

      <View
        style={{
          paddingHorizontal: 25,
          marginVertical: 20,
        }}>
        <CustomInput form placeholder="Confirm Password" />
      </View>
    </>
  );
};

const Header = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{}}>
        <Text style={Styles.userName}>Username</Text>
        <Text style={Styles.phNo}>9012 345 678</Text>
        <Text style={Styles.mailId}>mail@gmail.com</Text>
      </View>
      <TouchableOpacity style={{}}>
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
}) => {
  return (
    <Modal visible={isModal} animationType="slide" transparent={true}>
      <View style={{flex: 1, backgroundColor: '#000000a6'}}>
        <View
          style={{
            flex: isAbout ? 7 : isLogout ? 8 : 4,
            backgroundColor: '#000000a6',
          }}></View>
        <View
          style={{
            flex: isAbout ? 5 : isLogout ? 4 : 8,
            backgroundColor: '#000000a6',
          }}>
          {isAbout ? (
            <About setModal={setModal} />
          ) : isLogout ? (
            <Logout setModal={setModal} />
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
                {isChangePasswd && <PasswordComponent />}
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
                    {isAbout ? 'Update' : 'Done'}
                  </Button>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default function MyAccountScreen({navigation}) {
  const [isModal, setModal] = React.useState(false);
  const [isChangePasswd, setChangePasswd] = React.useState(false);
  const [isAbout, setAbout] = React.useState(false);
  const [isLogout, setLogout] = React.useState(false);
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <SecondaryCommonLayout
        topHeaderIcon={contactSupportIcon}
        headerText="My Account"
        headerDes="Manage your device & account here">
        <Header />

        <CustomList
          defaultList
          onpress={() => {
            setModal(true);
            setChangePasswd(false);
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
      </SecondaryCommonLayout>
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
        />
      ) : null}

      <View style={{backgroundColor: '#F5F8FF'}}>
        <CommonBottomNavigator
          navigation={navigation}
          state="dealerMyAccount"
        />
      </View>
    </View>
  );
}
