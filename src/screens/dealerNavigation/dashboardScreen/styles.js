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
    flex: 0.25,
    backgroundColor: primaryColor,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    paddingVertical: 20,
    paddingLeft: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: secondaryColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  welcomeText: {
    fontFamily: primaryFont,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 16,
  },
  descriptionText: {
    fontFamily: primaryFont,
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 10,
  },
  secondaryListing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,

    shadowColor: '#243A5E',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});

export default Styles;
