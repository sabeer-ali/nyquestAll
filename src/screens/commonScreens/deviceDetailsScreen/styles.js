import React from 'react';
import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
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
  },
  secondaryListing: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',

    shadowColor: '#243A5E',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  pickerSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  pickerDescription: {
    fontFamily: primaryFont,
    fontSize: 14,
    fontWeight: '500',
    width: 112,
    height: 40,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#51648B',
    borderRadius: 38,
    width: '60%',
    height: 45,
    paddingHorizontal: 10,
  },
  pickerText: {
    fontFamily: primaryFont,
    fontSize: 14,
    fontWeight: '500',
    color: '#51648B',
  },
  barChartContainer: {
    paddingHorizontal: 20,
  },
  barChartHeading: {
    fontFamily: primaryFont,
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
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
