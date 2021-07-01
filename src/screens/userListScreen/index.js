import React from 'react';
import {View, Text, StatusBar} from 'react-native';

import Styles from './styles';
import {
  CustomButton,
  CustomWrapper,
  LogoWithTextComponent,
} from '../../components';
import {customerIcon, dealerIcon} from '../../assets';
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
    <View style={[Styles.container]}>
      <StatusBar animated={true} backgroundColor={primaryColor} />

      <View style={[Styles.topSection]}>
        <LogoWithTextComponent />
      </View>

      <View style={[Styles.bottomSection]}>
        <CustomWrapper ph1>
          <Text style={Styles.login}>Login</Text>
          <Text style={Styles.loginDescription}>
            Select user type to continue
          </Text>
        </CustomWrapper>

        <CustomWrapper style={Styles.buttonContainer} mt3 ph1>
          <CustomButton
            width100
            text="Customer"
            icon={customerIcon}
            iconBg={'#7f91bb33'}
            onpress={() => handleCustomerLogin()}
          />
          <CustomButton
            width100
            text="Dealer"
            icon={dealerIcon}
            iconBg={'#7f91bb33'}
            onpress={() => handleDealerLogin()}
          />
        </CustomWrapper>
      </View>
    </View>
  );
};

export default UserListScreen;
