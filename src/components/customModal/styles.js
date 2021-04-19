import React from 'react';
import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import {
  primaryColor,
  secondaryColor,
  primaryFont,
} from '../../utils/CommonStyles';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  topSection: {
    flex: 0.4,
    // backgroundColor: 'red',
    // paddingHorizontal: 20,
    // minHeight: 76,
    // justifyContent: 'center',
  },
  bottomSection: {
    flex: 0.6,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
  },
  listHeading: {
    marginTop: 40,
    fontFamily: primaryFont,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212121',
    paddingVertical: 21,
  },
  listText: {
    fontFamily: primaryFont,
    fontSize: 15,
    fontWeight: '500',
    color: '#212121',
    paddingVertical: 21,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeIcon: {
    // position: 'absolute',
    // top: 20,
    // right: 20,
  },
});

export default Styles;
