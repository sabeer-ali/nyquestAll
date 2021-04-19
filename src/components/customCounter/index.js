import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {minusWithCircleIcon, plusWithCircleIcon} from '../../assets';
const CustomCounter = ({label, value, handleIncr, handleDecr}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 25,
      }}>
      <View style={{width: '50%'}}>
        <Text>{label}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '35%',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => handleIncr && handleIncr(value + 1)}>
          <Image source={minusWithCircleIcon} />
        </TouchableOpacity>

        <Text>{value}</Text>

        <TouchableOpacity onPress={() => handleDecr && handleDecr(value - 1)}>
          <Image source={plusWithCircleIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomCounter;
