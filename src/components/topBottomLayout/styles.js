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
    backgroundColor: primaryColor,
    backgroundColor: 'transparent',
    paddingVertical: 20,
    // paddingLeft: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSection: {
    backgroundColor: secondaryColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  topSectionImageWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
  headerSection: {
    height: 50,
    position: 'relative',
    top: 25,
    zIndex: 101,
    justifyContent: 'flex-end',
    paddingLeft: 20,
  },
});

export default Styles;
