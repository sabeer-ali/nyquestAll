import React from 'react';
import {StyleSheet} from 'react-native';
import {
  primaryColor,
  secondaryColor,
  primaryFont,
  color,
} from '../../utils/CommonStyles';

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingLeft: 13,
  },
  header: {
    fontFamily: primaryFont,
    fontWeight: 'bold',
    fontSize: 22,
    color: color.black,
  },
  desc: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 15,
    color: color.grey,
    marginTop: 8,
  },
});

export default Styles;
