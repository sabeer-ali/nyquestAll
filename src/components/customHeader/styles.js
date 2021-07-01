import React from 'react';
import {StyleSheet} from 'react-native';
import {primaryFont} from '../../utils/CommonStyles';

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  centerText: {
    fontFamily: primaryFont,
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    lineHeight: 20,
  },
  leftIconStyle: {},
  rightIconStyle: {},
  iconStyle: {
    padding: 10,
    // paddingVertical: 10,
    // paddingLeft: 10,
    right: 15,
    top: 20,
  },
});

export default Styles;
