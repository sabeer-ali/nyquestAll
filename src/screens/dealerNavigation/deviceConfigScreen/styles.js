import React from 'react';
import {StyleSheet} from 'react-native';
import {
  primaryColor,
  secondaryColor,
  primaryFont,
  color,
} from '../../../utils/CommonStyles';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  DeviceIDContainer: {
    backgroundColor: '#F5F8FF',
    marginTop: 20,
    paddingHorizontal: 24,
  },
  DeviceIDHeading: {
    color: '#757575',
  },
  DeviceIDInput: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
    color: color.black,
    marginTop: 56,
  },
  DeviceIDButton: {},
});

export default Styles;
