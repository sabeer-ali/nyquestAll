import React from 'react';
import {View, Text} from 'react-native';
import Styles from './styles';

const CustomHeaderWithDesc = ({headerText, descText, white, noStyle}) => {
  return (
    <View style={noStyle ? {} : {paddingHorizontal: 25}}>
      {headerText && (
        <Text style={[Styles.header, white && {color: '#fff'}]}>
          {headerText}
        </Text>
      )}
      {descText && (
        <Text style={[Styles.desc, white && {color: '#fff'}]}>{descText}</Text>
      )}
    </View>
  );
};

export default CustomHeaderWithDesc;
