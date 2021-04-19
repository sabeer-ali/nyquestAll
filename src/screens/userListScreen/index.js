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

const UserListScreen = ({navigation}) => {
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

        <CustomWrapper style={Styles.buttonContainer} mt3>
          <CustomButton
            text="Dealer"
            icon={dealerIcon}
            onpress={() => navigation.navigate('dealerLogin')}
          />

          <CustomButton
            text="Customer"
            icon={dealerIcon}
            onpress={() => navigation.navigate('dealerLogin')}
          />
        </CustomWrapper>
      </View>
    </View>
  );
};

export default UserListScreen;
