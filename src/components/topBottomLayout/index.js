import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import Styles from './styles';
import {arrowBackIcon} from '../../assets';

export default function topBottomLayout(props) {
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={Styles.container}>
        {props.backButtonType === 'backArrow' && (
          <View style={Styles.headerSection}>
            <TouchableOpacity
              onPress={() =>
                props.backButtonAction && props.backButtonAction()
              }>
              <Image source={arrowBackIcon} />
            </TouchableOpacity>
          </View>
        )}
        <View
          style={[
            Styles.topSection,
            {flex: props.topHeight ? props.topHeight : 1},
          ]}>
          {props.topSection && props.topSection}
        </View>

        <View
          style={[
            Styles.bottomSection,
            {flex: props.bottomHeight ? props.bottomHeight : 1},
          ]}>
          {props.bottomSection && props.bottomSection}
        </View>
      </View>
    </ScrollView>
  );
}
