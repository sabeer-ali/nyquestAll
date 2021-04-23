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

const BottomSection = ({navigation}) => {
  const [isLoading, setLoader] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');

  React.useEffect(() => {}, []);

  const editAccountApi = () => {
    getLocalDB('@delaerLoginDetails', resLocalData => {
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
      <CustomWrapper flex={1} vCenter>
        <Text>No Data Available</Text>
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
        centerText="Notifications"
      />
    </CustomWrapper>
  );
};

const NotificationScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <TopBottomLayout
        topHeight={1}
        bottomHeight={11}
        topSection={<TopSection navigation={navigation} />}
        bottomSection={<BottomSection navigation={navigation} />}
      />
    </View>
  );
};

export default NotificationScreen;
