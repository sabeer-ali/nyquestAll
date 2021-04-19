import React from 'react';
import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import {
  primaryColor,
  secondaryColor,
  primaryFont,
} from '../../utils/CommonStyles';

const Styles = StyleSheet.create({
  container: {
    width: 155,
    height: 97,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  text1: {
    fontFamily: primaryFont,
    fontSize: 12,
    fontWeight: '500',
    color: '#757575',
  },
  valueParamsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 10,
  },
  value: {
    fontFamily: primaryFont,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
    textAlignVertical: 'bottom',
  },
  params: {
    fontFamily: primaryFont,
    fontSize: 12,
    fontWeight: '400',
    color: '#212121',
    textAlignVertical: 'bottom',
  },
});

export default Styles;
