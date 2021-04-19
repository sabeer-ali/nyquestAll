import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Styles from './styles';

export default CustomButton = ({
  text,
  icon,
  onpress,
  backgroundStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={backgroundStyle ? backgroundStyle : Styles.buttonBackground}
      onPress={() => onpress && onpress()}>
      {icon && (
        <View>
          <View style={Styles.iconContainer}>
            <Image source={icon} />
          </View>
        </View>
      )}
      <Text style={textStyle ? textStyle : Styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
