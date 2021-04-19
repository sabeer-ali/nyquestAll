import React from 'react';
import {View} from 'react-native';

export default function CustomWrapper(props) {
  return (
    <View
      style={[
        props.pv1 && {paddingVertical: 10},
        props.pv2 && {paddingVertical: 20},
        props.pv3 && {paddingVertical: 30},
        props.pv4 && {paddingVertical: 40},
        props.pv5 && {paddingVertical: 50},
        props.mv1 && {marginVertical: 10},
        props.mv2 && {marginVertical: 20},
        props.mv3 && {marginVertical: 30},
        props.mv4 && {marginVertical: 40},
        props.mv5 && {marginVertical: 50},
        props.ph1 && {paddingHorizontal: 10},
        props.ph2 && {paddingHorizontal: 20},
        props.ph3 && {paddingHorizontal: 30},
        props.ph25 && {paddingHorizontal: 25},
        props.pt1 && {paddingTop: 10},
        props.pt2 && {paddingTop: 20},
        props.pt3 && {paddingTop: 30},
        props.pt4 && {paddingTop: 40},
        props.pt5 && {paddingTop: 50},
        props.mt1 && {marginTop: 10},
        props.mt2 && {marginTop: 20},
        props.mt3 && {marginTop: 30},
        props.mt4 && {marginTop: 30},
        props.mt5 && {marginTop: 30},
        props.h150 && {height: 150},
        props.h200 && {height: 200},
        props.h300 && {height: 300},
        props.h400 && {height: 400},
        props.spaceEvently && {justifyContent: 'space-evenly'},
        props.center && {justifyContent: 'center'},
        props.vCenter && {alignItems: 'center'},
        props.vBottom && {alignItems: 'flex-end'},
        props.flex && {flex: props.flex},
        props.bg && {backgroundColor: props.bg},
        props.styles && {...props.styles},
        props.btlr25 && {borderTopLeftRadius: 25},
        props.btrr25 && {borderTopRightRadius: 25},
      ]}>
      {props.children}
    </View>
  );
}
