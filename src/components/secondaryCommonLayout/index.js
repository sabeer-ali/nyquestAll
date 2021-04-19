import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import Styles from './styles';
import {arrowBackIcon, infoIcon} from '../../assets';
import {CustomHeader} from '../../components';

export default SecondaryCommonLayout = (props) => {
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={Styles.container}>
        <View style={Styles.topSection}>
          {props.topHeaderIcon && (
            <View style={Styles.topSectionImageWrapper}>
              <Image
                source={props.topHeaderIcon}
                style={{tintColor: '#E28534'}}
              />
            </View>
          )}
          <Text style={Styles.welcomeText}>
            {props.headerText && props.headerText}
          </Text>
          <Text style={Styles.descriptionText}>
            {props.headerDes && props.headerDes}
          </Text>
        </View>

        <View style={Styles.bottomSection}>
          {props.children && props.children}
        </View>
      </View>
    </ScrollView>
  );
};
