import React from 'react';
import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import {
  primaryColor,
  secondaryColor,
  primaryFont,
} from '../../../utils/CommonStyles';

const Styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: secondaryColor,
  },
  container: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  topSection: {
    backgroundColor: primaryColor,
    paddingHorizontal: 20,
    minHeight: 76,
    justifyContent: 'center',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: secondaryColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#F5F8FF',
    // alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },

  // deviceId: {
  //   fontFamily: primaryFont,
  //   fontSize: 12,
  //   fontWeight: '500',
  //   color: '#757575',
  //   marginTop: 6,
  // },
});

export default Styles;
