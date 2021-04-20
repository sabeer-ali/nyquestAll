import React from 'react';
import {StyleSheet} from 'react-native';
import {
  primaryColor,
  secondaryColor,
  primaryFont,
  color,
} from '../../../utils/CommonStyles';

const Styles = StyleSheet.create({
  header: {
    fontFamily: primaryFont,
    fontWeight: 'bold',
    fontSize: 22,
    color: color.black,
  },
  desc: {
    fontFamily: primaryFont,
    fontWeight: 'bold',
    fontSize: 15,
    color: color.grey,
    marginTop: 8,
  },
  inputContainer: {
    marginTop: 56,
  },
});

export default Styles;
