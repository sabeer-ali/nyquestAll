import React from 'react';
import {StyleSheet} from 'react-native';
import {
  primaryColor,
  secondaryColor,
  primaryFont,
  color,
} from '../../../utils/CommonStyles';

const Styles = StyleSheet.create({
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
});

export default Styles;
