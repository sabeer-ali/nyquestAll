import React from 'react';
import {View, Text, StatusBar} from 'react-native';

import Styles from './styles';
import {
  CustomButton,
  CustomWrapper,
  LogoWithTextComponent,
} from '../../components';
import {dealerIcon} from '../../assets';
import {primaryColor} from '../../utils/CommonStyles';
import {getLocalDB} from '../../utils/commonUtils';

const UserListScreen = ({navigation}) => {
  const handleDealerLogin = () => {
    getLocalDB('@delaerLoginDetails', dealerLogin => {
      if (dealerLogin !== null) {
        navigation.navigate('dealerHome');
      } else {
        navigation.navigate('dealerlogin');
      }
    });
  };

  const handleCustomerLogin = () => {
    getLocalDB('@customerLoginDetails', customerLogin => {
      if (customerLogin !== null) {
        navigation.navigate('CustomerBottomNavigator');
      } else {
        navigation.navigate('customerLogin');
      }
    });
  };

  return (
    <View style={Styles.container}>
      <StatusBar animated={true} backgroundColor={primaryColor} />

      <View style={Styles.topSection}>
        <LogoWithTextComponent />
      </View>

      <View style={Styles.bottomSection}>
        <CustomWrapper ph2>
          <Text style={Styles.login}>Login</Text>
          <Text style={Styles.loginDescription}>
            Select user type to continue
          </Text>
        </CustomWrapper>

        <CustomWrapper
          style={[Styles.buttonContainer, {backgroundColor: 'red'}]}
          mt3>
          <CustomButton
            text="Dealer"
            icon={dealerIcon}
            onpress={() => handleDealerLogin()}
          />

          <CustomButton
            text="Customer"
            icon={dealerIcon}
            onpress={() => handleCustomerLogin()}
          />
        </CustomWrapper>
      </View>
    </View>
  );
};

export default UserListScreen;
