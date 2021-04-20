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
    flex: 1,
    backgroundColor: primaryColor,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  bottomSection: {
    flex: 0.8,
    backgroundColor: secondaryColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  login: {
    fontFamily: primaryFont,
    fontWeight: '700',
    fontSize: 22,
    color: '#212121',
    marginTop: 40,
  },
  loginDescription: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 15,
    color: '#757575',
    marginTop: 8,
  },
});

export default Styles;
