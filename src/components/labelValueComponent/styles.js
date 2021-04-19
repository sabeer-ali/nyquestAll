import React from 'react';
import {StyleSheet} from 'react-native';
import {
  primaryColor,
  secondaryColor,
  primaryFont,
  color,
} from '../../utils/CommonStyles';

const Styles = StyleSheet.create({
  label: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 14,
    color: color.grey,
  },
  value: {
    fontFamily: primaryFont,
    fontWeight: '600',
    fontSize: 14,
    color: color.black,
    marginTop: 8,
  },
});

export default Styles;
