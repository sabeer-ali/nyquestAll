import React from 'react';
import {View, ScrollView} from 'react-native';
import Styles from './styles';
import {arrowBackIcon, infoIcon} from '../../assets';
import {CustomHeader} from '../../components';

export default PrimaryCommonLayout = (props) => {
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={Styles.container}>
        <View style={Styles.topSection}>
          <CustomHeader
            leftIcon={arrowBackIcon}
            leftIconAction={() =>
              props.leftIconAction ? props.leftIconAction() : goBack()
            }
            centerText={props.centerText && props.centerText}
            rightIcon={props.rightIcon && props.rightIcon}
            rightIconAction={() =>
              props.rightIconAction && props.rightIconAction()
            }
          />
        </View>

        <View style={Styles.bottomSection}>
          {props.children && props.children}
        </View>
      </View>
    </ScrollView>
  );
};
