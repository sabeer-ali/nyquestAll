import React from 'react';
import {View, Text} from 'react-native';

export default function RowLine(props) {
  return (
    <View
      style={[
        {flexDirection: 'row', alignItems: 'center'},
        props.spaceBetween && {justifyContent: 'space-between'},
        props.mv1 && {marginVertical: 10},
        props.mv2 && {marginVertical: 20},
        props.mv3 && {marginVertical: 30},
        props.mb1 && {marginBottom: 10},
        props.mb2 && {marginBottom: 20},
        props.mb3 && {marginBottom: 30},
        props.pv2 && {paddingVertical: 20},
        props.ph0 && {paddingHorizontal: 0},
        props.ph2 && {paddingHorizontal: 20},
        props.center && {justifyContent: 'center'},
        props.spaceBetween && {justifyContent: 'space-between'},
        props.width && {width: props.width},
        props.bg && {backgroundColor: props.bg},
      ]}>
      {props.children}
    </View>
  );
}
