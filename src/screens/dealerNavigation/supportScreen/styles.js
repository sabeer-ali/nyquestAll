import React from 'react';
import {StyleSheet} from 'react-native';
import {
  primaryColor,
  secondaryColor,
  primaryFont,
  color,
} from '../../../utils/CommonStyles';

const Styles = StyleSheet.create({
  modalContainer: {flex: 1, backgroundColor: '#000000a6'},
  modalwrapper: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalClose: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 15,
  },
  tollFree: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 12,
    color: color.grey,
    marginVertical: 10,
  },
  customerCareNumber: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 24,
    color: color.black,
    marginVertical: 10,
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
});

export default Styles;
