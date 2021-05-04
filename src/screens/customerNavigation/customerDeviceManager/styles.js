import React from 'react';
import {StyleSheet} from 'react-native';
import {
  primaryColor,
  secondaryColor,
  primaryFont,
  color,
} from '../../../utils/CommonStyles';

const Styles = StyleSheet.create({
  headerSection: {
    marginBottom: 16,
    marginTop: 30,
  },
  deviceInfoContainer: {
    marginTop: 40,
  },
  heading: {
    fontFamily: primaryFont,
    fontWeight: 'bold',
    fontSize: 22,
    color: color.black,
  },
  desc: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 15,
    color: '#757575',
    marginTop: 8,
  },
  deviceDetailsContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  header: {
    fontFamily: primaryFont,
    fontWeight: 'bold',
    fontSize: 22,
    color: color.black,
  },
  desc1: {
    fontFamily: primaryFont,
    fontWeight: 'bold',
    fontSize: 15,
    color: color.grey,
    marginTop: 8,
  },
  inputContainer: {
    marginTop: 35,
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
});

export default Styles;
