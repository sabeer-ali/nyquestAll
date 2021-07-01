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
  input: {
    marginLeft: 14,
  },
  formInput: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 14,
    color: color.black,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
    lineHeight: 17,
  },
  label: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 12,
    color: color.black,
  },
  validation: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 12,
    color: '#7F91BB',
    marginVertical: 16,
  },
});

export default Styles;
