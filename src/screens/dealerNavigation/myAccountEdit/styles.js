import React from 'react';
import {StyleSheet} from 'react-native';
import {
  primaryColor,
  secondaryColor,
  primaryFont,
  color,
} from '../../../utils/CommonStyles';

const Styles = StyleSheet.create({
  aboutVer: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 14,
    color: color.black,
  },
  aboutVerDate: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 14,
    color: color.grey,
  },
  userName: {
    fontFamily: primaryFont,
    fontWeight: '600',
    fontSize: 15,
    color: color.black,
    marginVertical: 10,
  },
  phNo: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 14,
    color: color.grey,
    marginVertical: 6,
  },
  mailId: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 14,
    color: color.grey,
    marginVertical: 6,
  },
  modalButton: {
    height: 44,
    marginVertical: 25,
    backgroundColor: '#E28534',
    borderRadius: 10,
  },
  modalButtonLabel: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 16,
  },
  halfmodalButton: {
    height: 44,
    width: '47%',
    marginVertical: 25,
    backgroundColor: '#E28534',
    borderRadius: 10,
  },
  halfmodalButtonLabel: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 16,
  },
});

export default Styles;
