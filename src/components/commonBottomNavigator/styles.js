import React from 'react';
import {StyleSheet} from 'react-native';
import {primaryColor, secondaryColor} from '../../utils/CommonStyles';

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 56,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  plusButtonStyle: {
    backgroundColor: '#E28534',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default Styles;
