import React from 'react';
import {View, Text, TextInput, Image, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import NetInfo from '@react-native-community/netinfo';
import Styles from './styles';
import {
  TopBottomLayout,
  CustomButton,
  CustomHeader,
  CustomWrapper,
} from '../../../components';
import {color, CommonStyles} from '../../../utils/CommonStyles';
import {qrCodeFrameIcon, closeIcon} from '../../../assets';
import {MiddleWareForAuth, VALIDATE_DEVICE} from '../../../utils/apiServices';
import {getLocalDB, Loader, showToaster} from '../../../utils/commonUtils';

const QrCode = ({navigation}) => {
  return (
    <CustomWrapper flex={1}>
      <CustomWrapper pt1 ph2>
        <CustomHeader
          leftIcon={closeIcon}
          leftIconAction={() => navigation.goBack()}
          // centerText="Scan QR Code"
        />
      </CustomWrapper>
      <View
        style={{
          flex: 2,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Image source={qrCodeFrameIcon} />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            textAlign: 'center',
            width: 150,
          }}>
          Place QR Code inside this area to scan
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            textAlign: 'center',
            width: 150,
          }}>
          OR
        </Text>
      </View>
    </CustomWrapper>
  );
};

const DeviceID = ({navigation, validateDevice}) => {
  const [deviceId, setDeviceId] = React.useState('');
  return (
    <View
      style={[
        Styles.DeviceIDContainer,
        {height: 250, borderTopLeftRadius: 25, borderTopRightRadius: 25},
      ]}>
      <Text style={[Styles.DeviceIDHeading, {paddingTop: 30}]}>
        Enter the device ID manually
      </Text>
      <TextInput
        placeholder="Device ID"
        style={Styles.DeviceIDInput}
        placeholderTextColor={color.black}
        onChangeText={value => setDeviceId(value)}
      />
      <View style={CommonStyles.buttonWrapper}>
        <CustomButton
          text="Continue"
          backgroundStyle={CommonStyles.buttonBgStyle}
          textStyle={CommonStyles.buttonTextStyle}
          onpress={() => validateDevice(deviceId)}
        />
      </View>
    </View>
  );
};

class DeviceConfigScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isLoading: false,
    deviceId: 0,
  };

  validateDevice = deviceId => {
    NetInfo.fetch().then(state => {
      if (state.isInternetReachable) {
        this.setState({isLoading: true, deviceId});
        getLocalDB('@customerLoginDetails', resLocal => {
          const endPoints =
            VALIDATE_DEVICE +
            '/' +
            deviceId +
            '/' +
            resLocal.cust_id +
            '/' +
            resLocal.token;

          MiddleWareForAuth('GET', endPoints, null, (res, err) => {
            this.setState({isLoading: false});
            if (err === null) {
              if (res !== null && res.data) {
                if (res.data.code == '10') {
                  this.setState({deviceDetails: res.data.data[0]}, () => {
                    res.data.data[0].deviceId = deviceId;
                    this.props.navigation.navigate('deviceConfigDeviceInfo', {
                      deviceDetails: res.data.data[0],
                    });
                  });
                } else {
                  if (res.data && res.data.message) {
                    console.error(res.data.message);
                    Alert.alert('Warning', res.data.message);
                    // showToaster('error', res.data.message);
                  }
                }
              }
            } else {
              console.error('Device VAlidation API  Error', err);
              showToaster('error', 'Something went wrong');
            }
          });
        });
      } else {
        Alert.alert('Warning', 'No Internet Connection');
      }
    });
  };

  render() {
    const {isLoading} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
          }}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          // onGoogleVisionBarcodesDetected={({barcodes}) => {
          //   console.log(barcodes);
          // }}
          onBarCodeRead={data => {
            this.validateDevice(data.data);
          }}>
          {isLoading ? (
            <Loader />
          ) : (
            <CustomWrapper flex={2} bg={'transparent'} pt2>
              <QrCode navigation={this.props.navigation} />
              <DeviceID
                navigation={this.props.navigation}
                validateDevice={this.validateDevice}
              />
            </CustomWrapper>
          )}
        </RNCamera>
      </View>
    );
  }
}

export default DeviceConfigScreen;
