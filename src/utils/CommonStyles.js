const primaryColor = '#243A5E';
const secondaryColor = '#F5F8FF';
const color = {
  black: '#212121',
  grey: '#757575',
  grey2: '#8B8B8B',
  darkBlue: '#51648B',
  darkBlue2: '#7F91BB',
  orange: '#E28534',
};

const CommonStyles = {
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  custom1FontStyle: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
  },
  secondaryFontStyle: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    color: '#fff',
  },
  primaryFontStyle: {
    fontFamily: primaryFont,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
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
  modalwrapper: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalClose: {
    position: 'absolute',
    top: 10,
    right: 20,
    padding: 15,
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
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 3,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: primaryFont,
  },
  buttonWrapper: {
    marginTop: 36,
  },
  buttonWrapperWithtwo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
};
const primaryFont = 'Montserrat-Regular';

export {primaryColor, secondaryColor, primaryFont, color, CommonStyles};
