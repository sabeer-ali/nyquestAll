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
        props.ph1 && {paddingHorizontal: 10},
        props.ph2 && {paddingHorizontal: 20},
        props.ph3 && {paddingHorizontal: 30},
        props.pb1 && {paddingBottom: 10},
        props.pb2 && {paddingBottom: 20},
        props.pb3 && {paddingBottom: 30},
        props.pb4 && {paddingBottom: 40},
        props.pb5 && {paddingBottom: 50},
        props.pt1 && {paddingBottom: 10},
        props.pt2 && {paddingBottom: 20},
        props.pt3 && {paddingBottom: 30},
        props.pt4 && {paddingBottom: 40},
        props.pt5 && {paddingBottom: 50},
        props.pl1 && {paddingLeft: 10},
        props.pl15 && {paddingLeft: 15},
        props.pl2 && {paddingLeft: 20},
        props.pl3 && {paddingLeft: 30},
        props.pl4 && {paddingLeft: 40},
        props.pl5 && {paddingLeft: 50},
        props.mv1 && {marginVertical: 10},
        props.mv2 && {marginVertical: 20},
        props.mv3 && {marginVertical: 30},
        props.mv4 && {marginVertical: 40},
        props.mv5 && {marginVertical: 50},
        props.ml1 && {marginLeft: 10},
        props.ml2 && {marginLeft: 20},
        props.ml3 && {marginLeft: 30},
        props.ml4 && {marginLeft: 40},
        props.ml5 && {marginLeft: 50},
        props.mb1 && {marginBottom: 10},
        props.mb2 && {marginBottom: 20},
        props.mb3 && {marginBottom: 30},
        props.mb4 && {marginBottom: 40},
        props.mb5 && {marginBottom: 50},
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
        props.h450 && {height: 450},
        props.h500 && {height: 500},
        props.spaceEvently && {justifyContent: 'space-evenly'},
        props.center && {justifyContent: 'center'},
        props.vCenter && {alignItems: 'center'},
        props.vBottom && {alignItems: 'flex-end'},
        props.vSpaceBetween && {justifyContent: 'space-between'},
        props.vSpaceAround && {justifyContent: 'space-around'},
        props.bottom && {justifyContent: 'flex-end'},
        props.flex && {flex: props.flex},
        props.bg && {backgroundColor: props.bg},
        props.styles && {...props.styles},
        props.btlr25 && {borderTopLeftRadius: 25},
        props.btrr25 && {borderTopRightRadius: 25},
        props.flexDirectionRow && {flexDirection: 'row'},
      ]}>
      {props.children}
    </View>
  );
}
