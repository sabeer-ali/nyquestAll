import React from 'react';
import {StyleSheet} from 'react-native';
import {
  primaryColor,
  secondaryColor,
  primaryFont,
} from '../../utils/CommonStyles';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  topSection: {
    // flex: 1,
    backgroundColor: primaryColor,
    paddingHorizontal: 20,
    minHeight: 76,
    justifyContent: 'center',
  },
  bottomSection: {
    flex: 12,
    backgroundColor: secondaryColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default Styles;
