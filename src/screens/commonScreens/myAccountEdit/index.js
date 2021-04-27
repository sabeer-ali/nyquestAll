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
import Styles from './styles';
import {
  CommonBottomNavigator,
  SecondaryCommonLayout,
  CustomList,
  CustomHeaderWithDesc,
  CustomInput,
  TopBottomLayout,
  CustomWrapper,
  CustomHeader,
} from '../../../components';
import {
  customer2Icon,
  closeIcon,
  logoIcon,
  agentIcon,
  arrowBackIcon,
} from '../../../assets';
import {CommonStyles} from '../../../utils/CommonStyles';
import {getLocalDB, Loader} from '../../../utils/commonUtils';
import {MiddleWareForAuth, EDIT_ACCOUNT} from '../../../utils/apiServices';

const BottomSection = ({navigation, loginData}) => {
  const [isLoading, setLoader] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');

  React.useEffect(() => {
    getLocalDB('@customerLoginDetails', resLocalData => {
      setName(resLocalData.name);
      setEmail(resLocalData.email);
      setPhone(resLocalData.mob_no);
    });
  }, []);

  const editAccountApi = () => {
    getLocalDB('@customerLoginDetails', resLocalData => {
      let params = {
        user_id: resLocalData.cust_id,
        phoneno: phone,
        email: email,
        username: name,
        token: resLocalData.token,
      };
      setLoader(true);
      console.log('resLocalData +>', params);
      MiddleWareForAuth('POST', EDIT_ACCOUNT, params, (res, err) => {
        setLoader(false);
        if (err === null) {
          console.log('res.data.devlst', res.data);
          if (res !== null && err === null && res.data) {
            if (res.data && res.data.code === '10') {
              // showToaster('error', res.data.message);
              Alert.alert('Success', res.data.message, [
                {text: 'OK', onPress: () => navigation.goBack()},
              ]);
            } else {
              Alert.alert('Success', res.data.message, [
                {text: 'OK', onPress: () => navigation.goBack()},
              ]);
            }
          }
        } else {
          console.error('Device List in Home API Error', err);
          // showToaster('error', 'Somthing went wrong');
        }
      });
    });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CustomWrapper ph2 mt3>
        <CustomHeaderWithDesc
          noStyle
          headerText="Edit Account"
          descText="Edit your informations updated with your account"
        />
        <CustomWrapper vSpaceAround h400>
          <CustomInput
            form
            placeholder="Name"
            value={name}
            onChange={text => setName(text)}
          />
          <CustomInput
            form
            placeholder="Mobile"
            value={phone}
            onChange={text => setPhone(text)}
            keyboardType="number-pad"
          />
          <CustomInput
            form
            placeholder="Email"
            value={email}
            onChange={text => setEmail(text)}
          />
          {isLoading ? (
            <Loader />
          ) : (
            <Button
              mode="contained"
              style={Styles.modalButton}
              labelStyle={Styles.modalButtonLabel}
              onPress={() => editAccountApi()}>
              Done
            </Button>
          )}
        </CustomWrapper>
      </CustomWrapper>
    </ScrollView>
  );
};

const TopSection = ({navigation}) => {
  return (
    <CustomWrapper>
      <CustomHeader
        leftIcon={arrowBackIcon}
        leftIconAction={() => navigation.goBack()}
      />
      <CustomWrapper vCenter>
        <View
          style={{
            backgroundColor: 'rgba(127, 145, 187, 0.2);',
            width: 60,
            height: 60,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={customer2Icon} />
        </View>
      </CustomWrapper>
    </CustomWrapper>
  );
};

const MyAccountEditScreen = ({navigation, route}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <TopBottomLayout
        topHeight={3}
        bottomHeight={9}
        topSection={<TopSection navigation={navigation} />}
        bottomSection={<BottomSection navigation={navigation} />}
      />
    </View>
  );
};

export default MyAccountEditScreen;
