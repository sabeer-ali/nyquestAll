import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import Styles from './styles';
import {CustomButton, LogoWithTextComponent} from '../../../components';
import {customerIcon, dealerIcon} from '../../../assets';

export default function LoginScreen({navigation}) {
  return (
    <View style={Styles.container}>
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
