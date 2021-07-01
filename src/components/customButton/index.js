import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Styles from './styles';

export default CustomButton = ({
  text,
  icon,
  iconBg,
  onpress,
  backgroundStyle,
  textStyle,
  width100,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={
        backgroundStyle
          ? backgroundStyle
          : [Styles.buttonBackground, width100 && {width: '100%'}]
      }
      onPress={() => onpress && onpress()}>
      {icon && (
        <View>
          <View
            style={[Styles.iconContainer, iconBg && {backgroundColor: iconBg}]}>
            <Image source={icon} />
          </View>
        </View>
      )}
      <Text style={textStyle ? textStyle : Styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
