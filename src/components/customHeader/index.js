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
            style={[Styles.leftIconStyle]}>
            <Image source={leftIcon} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{}}>
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
      <View style={{top: 10, right: 10}}>
        {rightIcon && (
          <TouchableOpacity
            onPress={() => rightIconAction && rightIconAction()}
            style={rightIcon && leftIcon ? Styles.rightIconStyle : leftIcon}>
            {rightIcon && <Image source={rightIcon} />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
