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
  },
  iconStyle: {
    padding: 10,
  },
});

export default Styles;
