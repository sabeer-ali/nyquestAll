import React from 'react';
import {View, Text} from 'react-native';
import Styles from './styles';
const LabelValuePair = ({label, value}) => {
  return (
    <View>
      <Text style={Styles.label}>{label}</Text>
      <Text style={Styles.value}>{value}</Text>
    </View>
  );
};

export default LabelValuePair;
