import React from 'react';
import {StyleSheet} from 'react-native';
import {
  primaryColor,
  primaryFont,
  secondaryColor,
} from '../../utils/CommonStyles';

const Styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: '#7F91BB',
    borderRadius: 8,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginVertical: 15,
    borderRadius: 12,
    paddingTop: 10,
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  firstImage: {
    backgroundColor: 'rgba(127,145,187,0.2)',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  firstContainer: {
    width: '15%',
  },
  secondContainer: {
    width: '65%',
  },
  thirdContainer: {
    width: '20%',
    alignItems: 'flex-end',
  },
  boxContainerCollapse: {
    paddingHorizontal: 10,
    paddingHorizontal: 20,
  },
  boxDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginTop: 20,
  },
  textleft: {
    fontFamily: primaryFont,
    fontSize: 12,
    fontWeight: '500',
    color: '#757575',
  },
  textRight: {
    fontSize: 12,
    fontFamily: primaryFont,
    fontSize: 14,
    fontWeight: '500',
    color: '#757575',
  },
});

export default Styles;
