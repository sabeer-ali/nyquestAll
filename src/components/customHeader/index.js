import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Styles from './styles';

export default CustomHeader = ({
  leftIcon,
  centerText,
  rightIcon,
  leftIconAction,
  rightIconAction,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View>
        {leftIcon && (
          <TouchableOpacity
            onPress={() => leftIconAction && leftIconAction()}
            style={Styles.iconStyle}>
            <Image source={leftIcon} />
          </TouchableOpacity>
        )}
      </View>
      <View>
        {centerText && <Text style={Styles.centerText}>{centerText}</Text>}
      </View>
      {/* <View>
        {rightIcon && !leftIcon && (
          <TouchableOpacity
            onPress={() => rightIconAction && rightIconAction()}
            style={Styles.iconStyle}>
            {rightIcon && <Image source={rightIcon} />}
          </TouchableOpacity>
        )}
      </View> */}
      <View>
        {rightIcon && (
          <TouchableOpacity
            onPress={() => rightIconAction && rightIconAction()}
            style={Styles.iconStyle}>
            {rightIcon && <Image source={rightIcon} />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
