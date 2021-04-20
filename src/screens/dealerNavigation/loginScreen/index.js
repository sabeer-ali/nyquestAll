import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import Styles from './styles';
import {CustomButton, LogoWithTextComponent} from '../../../../components';
import {dealerIcon} from '../../../../assets';
import {primaryColor} from '../../../../utils/CommonStyles';

export default function LoginScreen({navigation}) {
  return (
    <View style={Styles.container}>
      <StatusBar animated={true} backgroundColor={primaryColor} />
      <View style={Styles.topSection}>
        <LogoWithTextComponent />
      </View>
      <View style={Styles.bottomSection}>
        <View>
          <Text style={Styles.login}>Login</Text>
          <Text style={Styles.loginDescription}>
            Select user type to continue
          </Text>
        </View>

        <View style={Styles.buttonContainer}>
          <CustomButton
            text="Dealer"
            icon={dealerIcon}
            onpress={() => navigation.navigate('dealerLogin')}
          />
        </View>
      </View>
    </View>
  );
}
