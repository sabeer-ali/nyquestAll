import React from 'react';
import {StyleSheet} from 'react-native';
import {
  primaryColor,
  secondaryColor,
  primaryFont,
  color,
} from '../../../utils/CommonStyles';

const Styles = StyleSheet.create({
  accordionTitle: {
    fontFamily: primaryFont,
    fontSize: 15,
    fontWeight: '500',
    color: color.black,
    lineHeight: 18,
  },
  accordionDesc: {
    fontFamily: primaryFont,
    fontSize: 14,
    fontWeight: '500',
    color: color.grey,
    lineHeight: 24,
  },
  focusedView: {
    backgroundColor: '#fff',
    marginVertical: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,

    elevation: 6,
  },
});

export default Styles;
