import React from 'react';
import {View, Text, Image} from 'react-native';
import Styles from './styles';

export default CustomSecondaryList = ({
  text1,
  text2,
  image,
  bgColor,
  value,
  params,
  time,
  date,
  bg,
  width50,
}) => {
  return (
    <View
      style={[
        Styles.container,
        bg && {backgroundColor: bg},
        width50 && {width: '48%'},
      ]}>
      <View style={Styles.topSection}>
        <View>
          <Text style={Styles.text1}>{text1}</Text>
          <Text style={Styles.text1}>{text2}</Text>
        </View>
        <View
          style={{
            backgroundColor: bgColor,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
          }}>
          <Image source={image} />
        </View>
      </View>
      {value && params && (
        <View style={Styles.valueParamsContainer}>
          <Text style={Styles.value}>{value}</Text>
          <Text style={Styles.params}> {params}</Text>
        </View>
      )}
      {value && !params && (
        <View style={Styles.valueParamsContainer}>
          <Text style={Styles.value}>{value}</Text>
        </View>
      )}
      {time && date && (
        <View style={Styles.valueParamsContainer}>
          <Text style={Styles.value}>{time} | </Text>
          <Text style={Styles.params}>{date}</Text>
        </View>
      )}
    </View>
  );
};
