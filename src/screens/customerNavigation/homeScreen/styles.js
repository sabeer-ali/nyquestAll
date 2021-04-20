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
    flex: 0.7,
    paddingTop: 6,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontFamily: primaryFont,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
  },
  descriptionText: {
    fontFamily: primaryFont,
    fontSize: 14,
    fontWeight: '500',
    color: '#F5F8FF',
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 20,
  },
  bottomSection: {
    flex: 1.2,
    backgroundColor: '#F5F8FF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  configDeviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 14,
  },
  configDevice: {
    fontFamily: primaryFont,
    fontSize: 14,
    fontWeight: '500',
    color: '#757575',
  },
  deviceCountContainer: {
    backgroundColor: '#fff',
    borderRadius: 38,
    width: 99,
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceCount: {
    fontFamily: primaryFont,
    fontSize: 12,
    fontWeight: '600',
    color: '#7F91BB',
  },
  deviceListContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    minHeight: 92,
    alignItems: 'center',
    marginVertical: 5,
  },
  imageSection: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSection: {
    width: '55%',
  },
  navigateImageSection: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customerName: {
    fontFamily: primaryFont,
    fontSize: 15,
    fontWeight: '500',
    color: '#243A5E',
  },
  deviceNameContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  deviceName: {
    fontFamily: primaryFont,
    fontSize: 14,
    fontWeight: '700',
    color: '#212121',
  },
  deviceId: {
    fontFamily: primaryFont,
    fontSize: 12,
    fontWeight: '500',
    color: '#757575',
    marginTop: 6,
  },
});

export default Styles;
