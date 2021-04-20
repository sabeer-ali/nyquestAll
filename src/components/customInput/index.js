import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import Styles from './styles';
import {searchIcon} from '../../assets';
import {color} from '../../utils/CommonStyles';

export default CustomInput = props => {
  return (
    <View style={{}}>
      {props.form && props.labelValuePair ? (
        <>
          <Text style={Styles.label}> {props.label && props.label} </Text>
          <TextInput
            placeholder={props.placeholder}
            style={Styles.formInput}
            placeholderTextColor={color.black}
            value={props.value && props.value}
            onChangeText={text => props.onChange && props.onChange(text)}
          />
          <Text style={Styles.validation}>
            {props.validation && props.validation}
          </Text>
        </>
      ) : props.form && !props.labelValuePair ? (
        <TextInput
          placeholder={props.placeholder}
          style={Styles.formInput}
          placeholderTextColor={color.black}
          value={props.value && props.value}
          onChangeText={text => props.onChange && props.onChange(text)}
          keyboardType={props.keyboardType && props.keyboardType}
        />
      ) : (
        <View style={Styles.container}>
          <Image source={searchIcon} />
          <TextInput
            placeholder="Search by Name, Mobile & Device ID"
            style={Styles.input}
            editable={false}
            value={props.value && props.value}
            onChangeText={text => props.onChange && props.onChange(text)}
          />
        </View>
      )}
    </View>
  );
};
