import React from 'react';
import {StyleSheet} from 'react-native';
import {
  primaryColor,
  secondaryColor,
  primaryFont,
} from '../../../utils/CommonStyles';

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
    flex: 1.5,
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
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: '#BDBDBD',
    marginTop: 55,
  },
  inputText: {
    color: '#212121',
  },
  inputDescription: {
    fontFamily: primaryFont,
    color: '#757575',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 40,
  },
  buttonBgStyle: {
    justifyContent: 'center',
    backgroundColor: '#E28534',
    borderRadius: 10,
    height: 44,

    shadowColor: '#243A5E',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonWrapper: {
    marginTop: 36,
  },
  otpDesciption: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 12,
    color: '#757575',
    // marginTop: 10,
  },
  loggedInOtpResendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 27,
  },
  checkedBoxContainer: {flexDirection: 'row'},
  loggedInText: {
    fontFamily: primaryFont,
    fontSize: 12,
    fontWeight: '500',
    color: '#8B8B8B',
    marginLeft: 11,
  },
  resendOtp: {
    fontFamily: primaryFont,
    color: '#E28534',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Styles;
