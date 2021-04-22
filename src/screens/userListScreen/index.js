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
  const [isDealerLogin, setDealerLogin] = React.useState(false);
  const [isCustomerLogin, setCustomerLogin] = React.useState(false);

  React.useEffect(() => {
    getLocalDB('@delaerLoginDetails', dealerLogin => {
      console.log('11111111111111111', dealerLogin);
      if (dealerLogin !== null) {
        setDealerLogin(true);
      } else {
        setDealerLogin(false);
      }
    });
    getLocalDB('@customerLoginDetails', customerLogin => {
      console.log('22222222222222', customerLogin);
      if (customerLogin !== null) {
        setCustomerLogin(true);
      } else {
        setCustomerLogin(false);
      }
    });
  }, []);
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
            onpress={() =>
              isDealerLogin
                ? navigation.navigate('dealerHome')
                : navigation.navigate('dealerlogin')
            }
          />

          <CustomButton
            text="Customer"
            icon={dealerIcon}
            onpress={() =>
              isCustomerLogin
                ? navigation.navigate('CustomerBottomNavigator')
                : navigation.navigate('customerLogin')
            }
          />
        </CustomWrapper>
      </View>
    </View>
  );
};

export default UserListScreen;
