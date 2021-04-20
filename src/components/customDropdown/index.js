import React from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import Styles from './styles';
import {searchIcon, arrowDownIcon, arrowUpIcon} from '../../assets';
import {color} from '../../utils/CommonStyles';

export default CustomDropdown = props => {
  return (
    <View style={{}}>
      <Text style={Styles.label}> {props.label && props.label} </Text>

      <TouchableOpacity
        // activeOpacity={!props.isDisable ? 1 : 0}
        onPress={() =>
          !props.isDisable && props.toggleVisible && props.toggleVisible()
        }
        style={[
          Styles.formInput,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 5,
          },
        ]}>
        <Text>{props.value ? props.value : props.placeholder}</Text>
        {!props.isDisable && <Image source={arrowDownIcon} />}
      </TouchableOpacity>

      {props.isVisible && props.list && props.list.length
        ? props.list.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  props.onToggleSelect & props.onToggleSelect(item)
                }
                style={{paddingVertical: 15}}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          })
        : null}
    </View>
  );
};
