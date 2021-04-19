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
}) => {
  return (
    <View style={Styles.container}>
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
