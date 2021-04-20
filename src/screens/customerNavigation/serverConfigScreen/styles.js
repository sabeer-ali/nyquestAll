import React from 'react';
import {StyleSheet} from 'react-native';
import {
  primaryColor,
  secondaryColor,
  primaryFont,
  color,
} from '../../../utils/CommonStyles';

const Styles = StyleSheet.create({
  form3desc: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 12,
    color: color.grey,
    marginVertical: 10,
  },
  headerSection: {
    marginBottom: 16,
  },
  stepsContainer: {
    marginVertical: 15,
  },
  headerStep: {
    fontFamily: primaryFont,
    fontWeight: '400',
    fontSize: 14,
    color: '#E28534',
  },
  descStep: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 14,
    color: color.black,
    lineHeight: 22,
  },
  wrappper: {
    marginTop: 25,
  },
  InputContainer: {
    flex: 1,
  },
});

export default Styles;
