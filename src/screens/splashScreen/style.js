import React from 'react';
import {StyleSheet} from 'react-native';
import {primaryColor, primaryFont} from '../../utils/CommonStyles';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusbarBgColor: {
    backgroundColor: primaryColor,
  },
});

export default Styles;
