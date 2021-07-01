import React from 'react';
import {StyleSheet} from 'react-native';
import {
  primaryColor,
  primaryFont,
  secondaryColor,
} from '../../utils/CommonStyles';

const Styles = StyleSheet.create({
  buttonBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 320,
    height: 64,
    marginBottom: 20,

    shadowColor: '#243A5E',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    marginLeft: 24,
    fontFamily: primaryFont,
    color: '#212121',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 18,
  },
  iconContainer: {
    backgroundColor: '#7F91BB',
    borderRadius: 8,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Styles;
